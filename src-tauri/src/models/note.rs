use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Note {
    id: Option<i64>,
    user_id: i64,
    title: String,
    content: String,
    created_at: DateTime<Utc>,
    updated_at: Option<DateTime<Utc>>,
    deleted_at: Option<DateTime<Utc>>,
}

#[allow(dead_code)]
impl Note {
    pub fn new(&self, user_id: i64, title: &str, content: &str, created_at: DateTime<Utc>) -> Note {
        Note {
            id: None,
            user_id,
            title: title.to_string(),
            content: content.to_string(),
            created_at,
            updated_at: None,
            deleted_at: None
        }
    }

    pub fn get_id(&self) -> Option<i64> {
        self.id
    }

    pub fn set_user_id(&mut self, user_id: i64) {
        self.user_id = user_id;
    }

    pub fn get_user_id(&self) -> i64 {
        self.user_id
    }

    pub fn set_title(&mut self, title: &str) {
        self.title = title.to_string();
    }

    pub fn get_title(&self) -> &String {
        &self.title
    }

    pub fn set_content(&mut self, content: &str) {
        self.content = content.to_string();
    }

    pub fn get_content(&self) -> &String {
        &self.content
    }

    pub fn set_created_at(&mut self, created_at: DateTime<Utc>) {
        self.created_at = created_at;
    }
    
    pub fn get_created_at(&self) -> DateTime<Utc> {
        self.created_at
    }
    
    pub fn set_updated_at(&mut self, updated_at: Option<DateTime<Utc>>) {
        self.updated_at = updated_at;
    }
    
    pub fn get_updated_at(&self) -> Option<DateTime<Utc>> {
        self.updated_at
    }
    
    pub fn set_deleted_at(&mut self, deleted_at: Option<DateTime<Utc>>) {
        self.deleted_at = deleted_at;
    }
    
    pub fn get_deleted_at(&self) -> Option<DateTime<Utc>> {
        self.deleted_at
    }
}
