// import {createServer} from 'node:http'
// const server = createServer((req, res) =>{
//     res.write('Hello World')
//     return res.end()
// })
// server.listen(3333)

import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// GET, POST, PUT, DELETE, PATCH 
// ( CRUD - CREATE, READ, UPDATE, DELETE)

// const database = new DatabaseMemory
const database = new DatabasePostgres

server.post('/videos', async (req, res) => {
    const { title, description, duration } = req.body
    await database.create({
        title: title,
        description: description,
        duration: duration
    })

    console.log(database.list())
    return res.status(201).send('')
})

server.get('/videos', async (req, res) => {
    const search = req.query.search
    console.log(search)
    const videos = await database.list(search)
    return videos
})

// Route Parameter :id
// I can access params.id because :id - the id can be any name
server.put('/videos/:id', async (req, res) => {
    const videoId = req.params.id
    const { title, description, duration } = req.body
    await database.update(videoId, {
        title,
        description,
        duration
    })
    return res.status(204).send()
})

server.delete('/videos/:id', async (req, res) => {
    const videoId = req.params.id
    await database.delete(videoId)

    return res.status(204).send()
})

server.listen({
    // port: 3333
    port: process.env.PORT ?? 3333
})