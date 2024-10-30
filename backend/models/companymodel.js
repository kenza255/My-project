import pool from "../config/dbconfig.js"


export async function getEverything() {
    const [rows] = await pool.query("SELECT * FROM company")
    return rows
}

// Future requete SQL en utilisant la clé étrangère company. A tester demain
// " SELECT ad.title, ad.short_description, company.name FROM ad JOIN company ON ad.idcompany = company.id"

// Use of ? because untrusted value from the user. Practice used to avoid
// leak of datas. Separately we send the id as second parameter and 
// mysql will manage to get the untrusted data but avoid the data to
// be part of the query. For security.


export async function getOneThing(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM company
        WHERE id = ?
        `, [id])
    return rows[0]
}


export async function createOneThing(name, location) {
    const [result] = await pool.query(`
        INSERT INTO company (name, location)
        VALUES (? , ? )
        `, [name, location])
    return getOneThing(result.insertId)
}


export async function modifyOneThing(name, location, id) {
    const [result] = await pool.query(`
        UPDATE company SET name = ?, location = ? WHERE ID = ?
        `, [name, location, id])
    return getOneThing(id)
}


export async function deleteOneThing(id) {
    const [result] = await pool.query(
        `DELETE FROM company WHERE id= ?
        `, [id])
    return getOneThing(result.insertId)
}
