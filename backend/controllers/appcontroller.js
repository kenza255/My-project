import {
    getEverything,
    getOneThing,
    createOneThing
} from '../models/appmodel.js'

export async function getAll(req, res) {
    try {
        const datas = await getEverything()
        res.status(200).json({ message: `Table accessed with sucess`, datas })
    } catch (error) {
        console.error('Error fetching data', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export async function getOne(req, res) {
    try {
        const id = req.params.id
        const data = await getOneThing(id)
        if (data) {
            res.status(200).json({ message: `Data ID=${id} accessed with sucess`, data })
        } else {
            res.status(404).json({ message: `Data ID=${id} not found` })
        }
    }
    catch (error) {
        console.error('Error fetching data', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export async function createOne(req, res) {
    console.log(req.body)
    const { idad, idcompany, name, email, message } = req.body
    try {
        if (!idad|| !idcompany || !name || !email || !message) {
            return res.status(400).json({ message: 'idad, idcompany, name, email, message  required to apply.' })
        }
        const newone = await createOneThing(idad, idcompany, name, email, message)
        res.status(201).json({ message: `Data upload with sucess`, data: newone })
    } catch (error) {
        console.error('Error creating data', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


