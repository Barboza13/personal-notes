use bcrypt::{hash, DEFAULT_COST};

struct User {
    id: isize,
    name: String,
    email: String,
    pasword: String,
    created_at: String,
    updated_at: String,
    deleted_at: String,
}

impl User {
    pub fn new(self) -> User {
        User {}
    }

    pub fn set_name(self, name: &String) {
        self.name = name;
    }

    pub fn get_name(self) -> String {
        self.name.clone()
    }

    pub fn set_email(self, email: &String) {
        self.email = email;
    }

    pub fn get_email(self) -> String {
        self.email.clone()
    }

    pub fn set_password(self, password: &String) {
        let hashed_password = hash(password, DEFAULT_COST);
        self.password = hashed_password;
    }

    pub fn get_password(self) -> String {
        self.password.clone()
    }
}
