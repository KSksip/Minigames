import { z } from 'zod'

const bodySchema = z.object({
    username: z.string(),
    password: z.string(),
})

interface User {
    Password: String,
    idUser: Number
}

export default defineEventHandler(async (event) => {
    const { username, password } = await readValidatedBody(event, bodySchema.parse)

    const getUser = db.prepare(`SELECT password, idUser FROM user WHERE username = ?`)
    const userInfo = getUser.all(username) as User[]

    if(userInfo[0].Password === password){
        await setUserSession(event, {
            user: {
                uid: userInfo[0].idUser,
                name: username
            }
        })
        return {}
    }
    throw createError({
        statusCode: 401,
        message: 'Bad credentials'
    })
})