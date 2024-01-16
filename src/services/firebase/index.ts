import app from "./app" 



class firebase{
 static async  verifyToken(token:string){
        const decodedToken = await app.verifyIdToken(token)

        return decodedToken
    }
}

export default firebase