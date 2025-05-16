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
            ORDER BY Score Desc
            limit ?
            offset ?
        `);
        return data.all(query.uid, query.gid, query.scoresPerPage, Number(query.page)! - 1)

    } else if(query.gid){
        const data = db.prepare(`
            SELECT Score, Result, Timestamp, Name 
            FROM Leaderboard 
            INNER JOIN Game ON Game.idGame = Leaderboard.idGame 
            WHERE Game.idGame = ?
            ORDER BY Score Desc
            limit ?
            offset ?
        `);
        return data.all(query.gid, query.scoresPerPage, Number(query.page)! - 1)

    } else {
        const data = db.prepare(`
            SELECT Score, Result, Timestamp, Name 
            FROM Leaderboard 
            INNER JOIN Game ON Game.idGame = Leaderboard.idGame 
            WHERE idUser = ?
            ORDER BY Score Desc
            limit ?
            offset ?
        `);
        return data.all(query.uid, query.scoresPerPage, Number(query.page)! - 1)
    }
})