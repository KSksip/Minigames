export default eventHandler(async () => {
    const row = db.prepare(`INSERT INTO user VALUES(null, 'GAH', 'RAAAH')`).run();
    
    return row
  })

