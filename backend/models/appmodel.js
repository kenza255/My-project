import pool from "../config/dbconfig.js"


export async function getEverything() {
    const [rows] = await pool.query("SELECT * FROM appliance")
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
        FROM appliance
        WHERE id = ?
        `, [id])
    return rows[0]
}


export async function createOneThing(idad, idcompany, name, email, message) {
    const [result] = await pool.query(`
        INSERT INTO appliance (idad, idcompany, name, email, message)
        VALUES (? , ? , ?, ?, ?)
        `, [idad, idcompany, name, email, message])
    return getOneThing(result.insertId)
}

