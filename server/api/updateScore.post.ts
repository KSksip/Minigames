import { z } from 'zod'

const bodySchema = z.object({
    uId: z.any(),
    gId: z.any(),
    score: z.any()
})


export default eventHandler(async (event) => {

    const { uId, gId, score } = await readValidatedBody(event, bodySchema.parse)

    const sql = db.prepare(`
        INSERT INTO Leaderboard (idUser, idGame, Score, Timestamp) 
        VALUES (?, ?, ?, current_timestamp)
        `);

    sql.run(uId, gId, score)
})