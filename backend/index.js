const pg = require('pg')
const client = new pg.Client('postgres://localhost/pets')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/api/pets', async (req, res, next) => {
    try {
        const SQL = `
            SELECT * 
            FROM pets
        `
        const response = await client.query(SQL)
        console.log(response.rows)
        res.send(response.rows)
    } catch (error) {
        next(error)
    }
})

const init = async () => {
    await client.connect()
    console.log("connected")
    const SQL = `
    DROP TABLE IF EXISTS pets;
    CREATE TABLE pets(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20)
        
    );
    INSERT INTO pets (name) VALUES ('foo');
    INSERT INTO pets (name) VALUES ('leo');
    INSERT INTO pets (name) VALUES ('frank');
    `
        await client.query(SQL)
        
        const port = 3001
        app.listen(port, () => {
            console.log(`listening on ${port}`)
        })
}
init()