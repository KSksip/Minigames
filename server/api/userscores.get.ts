/* import { z } from 'zod'

const bodySchema = z.object({
    uid: z.number(),
}) */

export default eventHandler(async (event) => {
    const query = getQuery(event)
      
    if(query.uid && query.gid){
        const data = db.prepare(`
            SELECT Score, Result, Timestamp, Name 
            FROM Leaderboard 
            INNER JOIN Game ON Game.idGame = Leaderboard.idGame 
            WHERE idUser = ?
            AND
            Game.idGame = ?
        `);
        return data.all(query.uid, query.gid)

    } else if(query.gid){
        const data = db.prepare(`
            SELECT Score, Result, Timestamp, Name 
            FROM Leaderboard 
            INNER JOIN Game ON Game.idGame = Leaderboard.idGame 
            WHERE Game.idGame = ?
        `);
        return data.all(query.gid)

    } else {
        const data = db.prepare(`
            SELECT Score, Result, Timestamp, Name 
            FROM Leaderboard 
            INNER JOIN Game ON Game.idGame = Leaderboard.idGame 
            WHERE idUser = ?
        `);
        return data.all(query.uid)
    }
})