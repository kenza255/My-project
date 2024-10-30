import {
    getEverything,
    getOneThing,
    createOneThing,
    modifyOneThing,
    deleteOneThing
} from '../models/companymodel.js'

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
    const { name, location} = req.body
    try {
        if (!name || !location) {
            return res.status(400).json({ message: 'name and location needed.' })
        }
        const newone = await createOneThing(name, location)
        res.status(201).json({ message: `Data upload with sucess`, data: newone })
    } catch (error) {
        console.error('Error creating data', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export async function modifyOne(req, res) {
    const id = req.params.id
    const { name, location} = req.body
    try {
        if (!name || !location) {
            return res.status(400).json({ message: 'name and location needed.'})
        }
        const updatedone = await modifyOneThing(name, location, id)
        if (updatedone) {
            res.status(200).json({ message: `Data ID=${id} updated with sucess`, data: updatedone })
        } else {
            res.status(404).json({ message: `Data ID=${id} not found` })
        }
    } catch (error) {
        console.error('Error creating data', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export async function deleteOne(req, res) {
    const id = req.params.id
    try {
        const deletedone = await deleteOneThing(id)
        if (deletedone) {
            res.status(200).json({ message: `Data ID=${id} deleted with sucess` })
        } else {
            res.status(404).json({ message: `Data ID=${id} not found` })
        }
    } catch (error) {
        console.error('Error deleting data', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
