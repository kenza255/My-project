import pool from "../config/dbconfig.js"


export async function getEverything() {
    const [rows] = await pool.query("SELECT * FROM ad")
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
        FROM ad
        WHERE id = ?
        `, [id])
    return rows[0]
}


export async function createOneThing(title, short_description, description, wages, contract_type, idcompany) {
    const [result] = await pool.query(`
        INSERT INTO ad (title, short_description, description, wages, contract_type, idcompany)
        VALUES (? , ?)
        `, [title, short_description, description, wages, contract_type, idcompany])
    return getOneThing(result.insertId)
}


export async function modifyOneThing(title, short_description, description, wages, contract_type, idcompany, id){
    const [result] = await pool.query(`
        UPDATE ad SET title = ?, short_description = ? , description = ?, wages = ?, contract_type = ?, idcompany = ? WHERE ID = ?
        `, [title, short_description, description, wages, contract_type, idcompany, id])
        return getOneThing(id)
}

// export async function modifycompanyid(companyid, id){
//     const [result] = await pool.query(`
//         ALTER TABLE 
//         ADD CONSTRAINT FK_PersonOrder
//     FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);WHERE ID = ?
//         `, [title, short_description, description, wages, contract_type, id])
//         return getOneThing(id)
// }

// export async function modifycompanyid(companyid, id){
//     const [result] = await pool.query(`
//         ALTER TABLE 
//         ADD CONSTRAINT FK_PersonOrder
//     FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);WHERE ID = ?
//         `, [title, short_description, description, wages, contract_type, id])
//         return getOneThing(id)
// }


export async function deleteOneThing(id) {
    const [result] = await pool.query(
        `DELETE FROM ad WHERE id= ?
        `, [id])
    return getOneThing(result.insertId)
}