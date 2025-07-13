struct Audit {
    id: isize,
    user_id: isize,
    action: String,
    created_at: String,
}

impl Audit {
    pub fn new(self) -> Audit {
        Audit {}
    }

    pub fn set_user_id(self, user_id: &isize) {
        self.user_id = user_id;
    }

    pub fn get_user_id(self) -> isize {
        self.user_id
    }

    pub fn set_action(self, action: &String) {
        self.action = action;
    }

    pub fn get_action(self) -> String {
        self.action
    }
}
