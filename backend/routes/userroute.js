import express from 'express';
import * as usercontroller from '../controllers/usercontroller.js'

import { registerValidator, loginValidator } from '../validators/uservalidator.js';
import { authenticateToken } from '../middlewares/authmiddleware.js';


const router = express.Router()

router.post('/register', registerValidator, usercontroller.register)
router.post('/login', loginValidator, usercontroller.login)
router.get("/", usercontroller.getAll) 
router.get('/home.html', authenticateToken, usercontroller.getHomePage) // middleware pour protéger la route 
router.post('logout', usercontroller.logout)
// router.get("/:id", usercontroller.getOne) // to get data from a particular user 
// router.post("/", usercontroller.createOne) // create an account for a user 
// router.put("/:id", usercontroller.modifyOne) // modify param 
// router.delete("/:id", usercontroller.deleteOne) // delete 

export default router