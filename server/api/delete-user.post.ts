export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    if(user.uid){
        let sql = db.prepare(`
            DELETE FROM Leaderboard WHERE idUser = ?
        `).run(user.uid)

        sql = db.prepare(`
            DELETE FROM User WHERE idUser = ?
        `).run(user.uid)
        
        return sql
    } else {
        return null
    }
})
