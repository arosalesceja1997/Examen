const { Pool } = require("pg")
const express = require("express")
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

const pool = new Pool({
    "user": "postgres",
    "password" : "1234",
    "host" : "localhost",
    "port" : 5432,
    "database" : "mexico"
})


app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))

app.get("/todos", async (req, res) => {
    const rows = await readTodos();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.listen(port, () => console.log("Web server is listening.. on port " + port))

start()

async function start() {
    await connect();
}

async function connect() {
    try {
        await pool.connect();
    }
    catch (e) {
        console.error(`Failed to connect ${e}`)
    }
}

async function readTodos() {
    try {
        const results = await pool.query("select * from radiobases_examen limit 100");
        return results.rows;
    }
    catch (e) {
        return [];
    }
}

