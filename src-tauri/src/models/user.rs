use bcrypt::{hash, DEFAULT_COST};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

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

#[allow(dead_code)]
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
