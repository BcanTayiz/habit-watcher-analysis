#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use tauri_plugin_sql::{Builder, Migration, MigrationKind};

fn main() {

    let migrations = vec![Migration {
        version: 1,
        description: "Initial migration",
        kind: MigrationKind::Up,
        sql: include_str!("../migrations/1.sql"),
    }];

    
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default()
            .add_migrations("sqlite:mydatabase.db", migrations)
            .build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
