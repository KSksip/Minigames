import { z } from 'zod'

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    if(user.uid){
        const sql = db.prepare(`
            SELECT Username, Email FROM User WHERE idUser = ?
        `);

        return sql.all(user.uid)    
    } else {
        return null
    }
})