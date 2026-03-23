use tauri_plugin_sql::Migration;

mod migrations;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations: Vec<Migration> = migrations::get_migrations();

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:personalnotes.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
