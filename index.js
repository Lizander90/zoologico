import express from 'express'
import mongoose from 'mongoose'

const Animal = mongoose.model('Animal', new mongoose.Schema({
    tipo: String,
    estado: String,
}))

const app = express()
const port = process.env.PORT || 3000

// docker create --name zooApp -p3000:3000 --network mired miapp:1
// docker create --name animalsBD -p27017:27017 --network mired -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=secret mongo
// docker build -t miapp:1
//docker compose -f Dockerfile.dev up

mongoose.connect('mongodb://user:secret@animalsBD:27017/miapp?authSource=admin')

app.get('/', async (_req, res) => {
    console.log('peticion...')
    const animales = await Animal.find();
    return res.send({ cantidad: animales.length, animales })
})
app.get('/crear', async (_req, res) => {
    console.log('creando...')
    await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' })
    return res.send('ok')
})

app.get('/mockup', async (_req, res) => {
    console.log('creando...')
    for (let index = 0; index < 10; index++) {
        await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' })
    }
    return res.send('ok')
})
app.listen(port, () => console.log('escuchando... [' + port + ']'))