use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Audit {
    id: Option<i64>,
    user_id: i64,
    action: String,
    created_at: DateTime<Utc>,
}

#[allow(dead_code)]
impl Audit {
    pub fn new(&self, user_id: i64, action: &str, created_at: DateTime<Utc>) -> Audit {
        Audit {
            id: None,
            user_id,
            action: action.to_string(),
            created_at
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

    pub fn set_action(&mut self, action: &str) {
        self.action = action.to_string();
    }

    pub fn get_action(&self) -> &String {
        &self.action
    }

    pub fn get_created_at(&self) -> DateTime<Utc> {
        self.created_at
    }
}
