import pool from "../config/dbconfig.js"

export async function getOneEmail(email) {
    const [rows] = await pool.query(`
        SELECT *
        FROM user
        WHERE email = ?
        `, [email])
    return rows[0]
}

export async function createOneThing(name, email, password, role) { 
    const [result] = await pool.query(`
        INSERT INTO user (name, email, password, role)
        VALUES (? , ?, ?, ?)
        `, [name, email, password, role])
    return (result.insertId)
}

export async function getEverything() {
    const [rows] = await pool.query("SELECT * FROM user")
    return rows
}

export async function getHomePage (userId) { // pour récupérer les informations de l'user puis faire une requete get 
    const [rows] = await pool.query(`
        SELECT *
        FROM user
        WHERE ID = ?
        `, [userId])
    return rows[0]
}




