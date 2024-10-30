import express from 'express';
import * as adcontroller from '../controllers/adcontroller.js'

const router = express.Router()

router.get("/", adcontroller.getAll) // = /ad seulement 
router.get("/:id", adcontroller.getOne) // = /ad/number
router.post("/", adcontroller.createOne)
router.put("/:id", adcontroller.modifyOne)
router.delete("/:id", adcontroller.deleteOne)

export default router

