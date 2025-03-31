export default eventHandler(async () => {
    const data = db.prepare(`SELECT idGame, Name, Image FROM Game`);
    
    return data.all()
  })