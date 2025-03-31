import Database from 'better-sqlite3'
export const db = new Database('./server/database/database.db', {});

const sql = db.prepare(`insert into user values (null, ?, ?)`)
const res = sql.run('test1', '1212')

console.log(res)