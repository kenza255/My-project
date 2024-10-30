import {
    getOneEmail,
    createOneThing,
    getEverything,
    getHomePage as getUser
} from '../models/usermodel.js'
import { SECRET_KEY } from '../config/dbconfig.js'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

// fonction pour le register 
export async function register(req, res) {
    console.log("ceci est mon req.body: ", req.body) // pour voir ce qui est reçu via le forms comme données
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log({ errors: errors.array() }) // pour pouvoir affincher les erreurs 
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password, role } = req.body
    try {
        const existingUser = await getOneEmail(email)
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userId = await createOneThing(name, email, hashedPassword, role)
        req.session.userId = userId
        req.session.userName = name
        return res.status(201).json({ message: 'User registered with sucess! ', name })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Server Error' })
    }
}
// fonction pour le login 

export async function login(req, res) {
    console.log('Session before connexion', req.session) // verifier l'état de la session 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        const user = await getOneEmail(email)
        if (!user) {
            console.log('Invalid email ', email)
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            console.log('Password invalid', email)
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ userName: user.name }, SECRET_KEY, { expiresIn: '48h' })
        req.session.userId = user.id
        req.session.userName = user.name
        return res.status(200).json({ userId: user.id, token,  userName: user.name })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Server Error' })
    }
}


// function pour avoir toutes les données sur tous les utilisateurs 
export async function getAll(req, res) {
    try {
        const datas = await getEverything()
        return res.status(200).json({ message: `Table accessed with sucess`, datas })
    } catch (error) {
        console.error('Error fetching data', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export async function getHomePage(req, res) {
    console.log('Session still active?', req.session)
    try {
        const userId = req.session.userId
        if (!userId) {
            return res.status(401).json({ error: 'Access denied not connected' })

        }
        const user = await getUser(userId);
        console.log('User:', user)
        if (!user) {
            return res.status(404).json({ error: 'User Not Found' })
        }

        return res.send(`Hello ${user.name}`);
    }
    catch (err) {

        console.error(err)
        return res.status(500).json({ error: 'Internal server error' })
    }
}  



export async function logout(req, res) {
    return res.status(200).json({message: "Successfully logged out"})
        
    }
    
