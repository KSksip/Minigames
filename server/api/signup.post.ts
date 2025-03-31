import { z } from 'zod'

const bodySchema = z.object({
    username: z.string().toLowerCase().min(4),
    password: z.string().min(8, {message: 'Password is too short!'}),
})

interface User {
    readonly idUser: Number
}

export default defineEventHandler(async (event) => {
    const { username, password } = await readValidatedBody(event, bodySchema.parse)
    let userInfo: User[] = []
    let createRes

    const createUser = db.prepare(`INSERT INTO user VALUES (null, ?, ?)`)
    
    try { 
        createRes = createUser.run(username, password)
    } catch {
        throw createError({
            statusCode: 400,
            statusMessage: 'Username Taken'
        })
    }


    if(createRes.changes >= 1){
        const getUser = db.prepare(`SELECT idUser FROM user WHERE rowid = ?`)
        userInfo = getUser.all(createRes.lastInsertRowid) as User[]

        if(userInfo[0].idUser){
            await setUserSession(event, {
                user: {
                    uid: userInfo[0].idUser,
                    name: username
                }
            })
        }
        return {}
    }   

    throw createError({
        statusCode: 400,
        message: 'Oops something went wrong!'
    })
})