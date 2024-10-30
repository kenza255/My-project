import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/dbconfig.js'


export function interceptor(req, res, next){
    const token = req.header ('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (!err){
                req.user = user
            }
        next()
        })
    } else {
        next()
    }
}
