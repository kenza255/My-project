import express from 'express'
import session from 'express-session' //middleware de session 
import path from 'path'
import adroute from './routes/adroute.js'
import companyroute from './routes/companyroute.js'
import userroute from './routes/userroute.js'
import approute from './routes/approute.js'
import bodyParser from 'body-parser' // pour recevoir les data du formulaires 
import cors from 'cors'
import { fileURLToPath } from 'url'// pour pouvoir acceder correctement au chemin jusqu'a home?html 
import { dirname } from 'path'
import { SECRET_KEY } from './config/dbconfig.js'



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname (__filename)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true })) 


app.use(session({
    secret: SECRET_KEY,
    resave : false,
    saveUninitialized: true,
    cookie: {maxAge: 6000, httpOnly: true,  secure : false}
}))

app.use(express.static(path.join(__dirname, ('../Job_board'))))

app.use('/ad', adroute);
app.use('/company', companyroute);
app.use('/user', userroute);
app.use('/appliance', approute);



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})


