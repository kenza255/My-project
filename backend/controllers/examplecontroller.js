// import {
//     getEverything,
//     getOneThing,
//     createOneThing,
//     modifyOneThing,
//     deleteOneThing
// } from '../models/examplemodel.js'

// export async function getAll(req, res) {
//     try {
//     const datas = await getEverything()
//     res.status(200).json({message:`Table accessed with sucess`, datas})
//     } catch (error) {
//         console.error('Error fetching data', error)
//         res.status(500).json({message:'Internal Server Error'})
//     }
// }

// export async function getOne(req, res) {
//     try{
//     const id = req.params.id
//     const data = await getOneThing(id)
//     if (data){
//         res.status(200).json({message:`Data ID=${id} accessed with sucess`, data})
//     } else { 
//         res.status(404).json({message:`Data ID=${id} not found`})
//     }}
//     catch (error){
//         console.error('Error fetching data', error)
//         res.status(500).json({message:'Internal Server Error'})
//     }
//     }

// export async function createOne(req, res) {
//     const { title, contents} = req.body
//     try {
//         if(!title || !contents) {
//             return res.status(400).json({message: 'Title and contents'})
//         }
//     const newone = await createOneThing(title, contents)
//     res.status(201).json({message: `Data upload with sucess`, data:newone})
//     } catch (error) {
//         console.error('Error creating data', error)
//         res.status(500).json({message: 'Internal Server Error'})
//     }
// }

// export async function modifyOne(req, res) {
//     const id = req.params.id
//     const { title, contents } = req.body
//     try{
//         if (!title || !contents) {
//             return res.status(400).json({message: 'Title and contents'})
//         }
//         const updatedone = await modifyOneThing(title, contents, id)
//         if (updatedone) {
//             res.status(200).json({message:`Data ID=${id} updated with sucess`, data: updatedone})
//         } else{
//             res.status(404).json({message: `Data ID=${id} not found`})
//         }
//     } catch (error) {
//         console.error('Error creating data', error)
//         res.status(500).json({message: 'Internal Server Error'})
//     }
// }

// export async function deleteOne(req, res){
//     const id = req.params.id
//     try{
//         const deletedone = await deleteOneThing(id)
//         if (deletedone) {
//             res.status(200).json({message:`Data ID=${id} deleted with sucess`})
//         } else{
//             res.status(404).json({message: `Data ID=${id} not found`})
//         }
//     } catch (error) {
//         console.error('Error deleting data', error)
//         res.status(500).json({message: 'Internal Server Error'})
//     }
// }
