use bcrypt::{hash, DEFAULT_COST};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;

#[derive(Debug, Deserialize, Serialize)]
pub struct User {
    id: Option<i64>,
    name: String,
    email: String,
    password: String,
    created_at: DateTime<Utc>,
    updated_at: Option<DateTime<Utc>>,
    deleted_at: Option<DateTime<Utc>>,
}

impl User {
    pub fn new(&self, name: &str, email: &str, password: &str, created_at: DateTime<Utc>) -> User {
        User {
            id: None,
            name: name.to_string(),
            email: email.to_string(),
            password: password.to_string(),
            created_at,
            updated_at: None,
            deleted_at: None,
        }
    }

    pub fn from_row(row: serde_json::Value) -> Result<Self, String> {
        // El row viene como un objeto JSON, necesitamos convertirlo a HashMap
        let row_map: HashMap<String, Value> = match row {
            Value::Object(map) => map.into_iter().collect(),
            _ => return Err("Expected row to be an object".to_string()),
        };

        // Función auxiliar para extraer valores string
        fn get_string_value(map: &HashMap<String, Value>, key: &str) -> Result<String, String> {
            map.get(key)
                .ok_or_else(|| format!("Missing field: {}", key))?
                .as_str()
                .ok_or_else(|| format!("Field '{}' is not a string", key))
                .map(|s| s.to_string())
        }

        // Función auxiliar para extraer valores i64
        fn get_i64_value(map: &HashMap<String, Value>, key: &str) -> Result<i64, String> {
            map.get(key)
                .ok_or_else(|| format!("Missing field: {}", key))?
                .as_i64()
                .ok_or_else(|| format!("Field '{}' is not a valid integer", key))
        }

        // Función auxiliar para valores opcionales string
        fn get_optional_string_value(map: &HashMap<String, Value>, key: &str) -> Result<Option<String>, String> {
            match map.get(key) {
                Some(Value::Null) | None => Ok(None),
                Some(value) => {
                    value.as_str()
                        .map(|s| Some(s.to_string()))
                        .ok_or_else(|| format!("Field '{}' is not a valid string", key))
                }
            }
        }

        // Función auxiliar para valores opcionales i64
        fn get_optional_i64_value(map: &HashMap<String, Value>, key: &str) -> Result<Option<i64>, String> {
            match map.get(key) {
                Some(Value::Null) | None => Ok(None),
                Some(value) => {
                    value.as_i64()
                        .map(Some)
                        .ok_or_else(|| format!("Field '{}' is not a valid integer", key))
                }
            }
        }

        // Función para parsear DateTime desde string
        fn parse_datetime(value: Option<String>) -> Result<Option<DateTime<Utc>>, String> {
            match value {
                Some(date_str) => {
                    // Intentar parsear diferentes formatos de fecha
                    if let Ok(dt) = DateTime::parse_from_rfc3339(&date_str) {
                        Ok(Some(dt.with_timezone(&Utc)))
                    } else if let Ok(dt) = chrono::NaiveDateTime::parse_from_str(&date_str, "%Y-%m-%d %H:%M:%S") {
                        Ok(Some(dt.and_utc()))
                    } else if let Ok(dt) = chrono::NaiveDateTime::parse_from_str(&date_str, "%Y-%m-%dT%H:%M:%S") {
                        Ok(Some(dt.and_utc()))
                    } else {
                        Err(format!("Unable to parse datetime: {}", date_str))
                    }
                }
                None => Ok(None),
            }
        }

        // Extraer los campos
        let id: Option<i64> = get_optional_i64_value(&row_map, "id")?;
        let name: String = get_string_value(&row_map, "name")?;
        let email: String = get_string_value(&row_map, "email")?;
        let password: String = get_string_value(&row_map, "password")?;

        // Para created_at (requerido)
        let created_at_str: String = get_string_value(&row_map, "created_at")?;
        let created_at = parse_datetime(Some(created_at_str))?
            .ok_or_else(|| "created_at is required".to_string())?;

        // Para updated_at (opcional)
        let updated_at_str: Option<String> = get_optional_string_value(&row_map, "updated_at")?;
        let updated_at = parse_datetime(updated_at_str)?;

        // Para deleted_at (opcional)
        let deleted_at_str: Option<String> = get_optional_string_value(&row_map, "deleted_at")?;
        let deleted_at = parse_datetime(deleted_at_str)?;

        Ok(User {
            id,
            name,
            email,
            password,
            created_at,
            updated_at,
            deleted_at,
        })
    }

    pub fn get_id(&self) -> Option<i64> {
        self.id
    }

    pub fn set_name(&mut self, name: &str) {
        self.name = name.to_string();
    }

    pub fn get_name(&self) -> &String {
        &self.name
    }

    pub fn set_email(&mut self, email: &str) {
        self.email = email.to_string();
    }

    pub fn get_email(&self) -> &String {
        &self.email
    }

    pub fn set_password(&mut self, password: &str) {
        let hashed_password = hash(password, DEFAULT_COST);
        self.password = hashed_password.unwrap().to_string();
    }

    pub fn get_password(&self) -> &String {
        &self.password
    }

    pub fn set_created_at(&mut self, created_at: DateTime<Utc>) {
        self.created_at = created_at;
    }

    pub fn get_created_at(&self) -> DateTime<Utc> {
        self.created_at
    }

    pub fn set_deleted_at(&mut self, deleted_at: DateTime<Utc>) {
        self.deleted_at = Option::from(deleted_at);
    }

    pub fn get_deleted_at(&self) -> Option<DateTime<Utc>> {
        self.deleted_at
    }

    pub fn set_updated_at(&mut self, updated_at: DateTime<Utc>) {
        self.updated_at = Option::from(updated_at);
    }

    pub fn get_updated_at(&self) -> Option<DateTime<Utc>> {
        self.updated_at
    }
}
