import {applicationDefault, initializeApp} from  "firebase-admin/app"
import {getAuth} from  "firebase-admin/auth"

const app = getAuth(initializeApp(
    {
        credential: applicationDefault()
    }
))


export default app