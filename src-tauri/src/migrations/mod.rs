use tauri_plugin_sql::Migration;

mod m001_create_users_table;
mod m002_create_notes_table;
mod m003_create_audits_table;

pub fn get_migrations() -> Vec<Migration> {
    vec![
        m001_create_users_table::migration(),
        m002_create_notes_table::migration(),
        m003_create_audits_table::migration(),
    ]
}
