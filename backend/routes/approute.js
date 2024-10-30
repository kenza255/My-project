import express from 'express';
import * as appcontroller from '../controllers/appcontroller.js'

const router = express.Router()


router.get("/", appcontroller.getAll) // get all datas about our companies  
router.get("/:id", appcontroller.getOne) // to get data from a particular app 
router.post("/", appcontroller.createOne) // create an account for a app 
router.put("/id", appcontroller.createOne)

export default router