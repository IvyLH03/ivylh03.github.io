import express, { response } from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

import { applyRateLimiting, applyLooseCORSPolicy, applyBodyParsing, applyLogging, applyErrorCatching } from './api-middleware.js'

const app = express();
const port = 8000;

const GET_CURRENT_STATUS_SQL = "SELECT * FROM CurrentStatus"
const UPDATE_CURRENT_STATUS_SQL = "UPDATE CurrentStatus SET status = ?, starttime = ? WHERE id = ?;"
const INSERT_CURRENT_STATUS_SQL = "INSERT INTO CurrentStatus(status, starttime) VALUES (?, ?) RETURNING id;"

const INITIAL_STATUS = "Wandering"
const INITIAL_START_TIME = Date.UTC(2003, 12, 11)

const db = await open({
    filename: "./db.db",
    driver: sqlite3.Database
});

// initialize current status
await db.exec("CREATE TABLE IF NOT EXISTS CurrentStatus(id INTEGER PRIMARY KEY UNIQUE, status TEXT NOT NULL, starttime INT NOT NULL);")
const currentStatus = await db.get(GET_CURRENT_STATUS_SQL)
if(!currentStatus) {
    await db.get(INSERT_CURRENT_STATUS_SQL, INITIAL_STATUS, INITIAL_START_TIME)
}

applyRateLimiting(app);
applyLooseCORSPolicy(app);
applyBodyParsing(app);
applyLogging(app);

// update current status
app.post('/update_status', async (req, res) => {
    const status = req.body.status;
    
    if (!status) {
        res.status(400).send({
            msg: "You must specify a status!"
        })
    } else {
        const currentStatus = await db.get(GET_CURRENT_STATUS_SQL)
        await db.get(UPDATE_CURRENT_STATUS_SQL, status, Date.now(), currentStatus.id)
        res.status(200).send({
            msg:"Update successful!"
        })
    }
})

// get current status
app.get('/get_status', async (req, res) => {
    try {
        const currentStatus = await db.get(GET_CURRENT_STATUS_SQL)
        console.log(currentStatus)
        res.status(200).send({
            currentStatus
        })
    } catch(e) {
        console.error(e);
        res.status(500).send({
            msg: "Something went wrong!"
        });
    }
})

applyErrorCatching(app);

app.listen(port, () => {
    console.log(`My API has been opened on :${port}`)
});
