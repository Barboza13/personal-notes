struct Note {
    id: isize,
    user_id: isize,
    title: String,
    content: String,
    created_at: String,
    updated_at: String,
    deleted_at: String,
}

impl Note {
    pub fn new(self) -> Note {
        Note {}
    }

    pub fn set_title(self, title: &String) {
        self.title = title;
    }

    pub fn get_title(self) -> String {
        self.title.clone()
    }

    pub fn set_content(self, content: &String) {
        self.content = content;
    }

    pub fn get_content(self) -> String {
        self.content
    }

    pub fn set_user_id(self, user_id: &isize) {
        self.user_id = user_id;
    }

    pub fn get_user_id(self) -> isize {
        self.user_id
    }
}
