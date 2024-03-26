import express from 'express'
import { Client } from 'pg'
import { router } from './router'

async function main() {
    
    
    const app = express()
    const port = 3000

    app.use(express.json());
    app.use(express.urlencoded());
    
    const client = new Client()
    await client.connect()
    
    const res = await client.query('SELECT $1::text as message', ['DB Conn is ok!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
    
    app.get('/', (req, res) => {
        res.send('Hello wossd!')
    })

    app.use('/api/v1', router);
    
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })  
}

main();

