import Database from 'better-sqlite3'
export const db = new Database('./server/database/database.db', {});
