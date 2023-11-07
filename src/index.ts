require('dotenv').config()

import express from 'express'
import 'reflect-metadata'
import morgan from 'morgan'
import cors from 'cors'
import router from './router'
import { AppDataSource } from './data-source'

const port = Number(process.env.PORT) || 3031
const app = express();

app.use((req, res, next) => next(), cors({ maxAge: 84600 }))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev') as any)
app.use(router);

AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}!`);
        });
    })
    .catch((error) => {
        console.log(error);
    });