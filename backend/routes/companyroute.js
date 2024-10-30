import express from 'express';
import * as companycontroller from '../controllers/companycontroller.js'

const router = express.Router()


router.get("/", companycontroller.getAll) // get all datas about our companies  
router.get("/:id", companycontroller.getOne) // to get data from a particular company 
router.post("/", companycontroller.createOne) // create an account for a company 
router.put("/:id", companycontroller.modifyOne) // modify param 
router.delete("/:id", companycontroller.deleteOne) // delete 

export default router