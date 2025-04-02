export default eventHandler(async () => {
  //const createUser = db.prepare(`INSERT INTO user VALUES (null, ?, ?)`)
  //let createRes = createUser.run('zoupepepeeee', 'a')

  const data = db.prepare(`
    SELECT Score, Result, Timestamp, Name 
    FROM Leaderboard 
    INNER JOIN Game ON Game.idGame = Leaderboard.idGame 
    WHERE idUser = ?`);
    
    return data.all(2)
})