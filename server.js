// Import dependencies
require("dotenv").config() // load env variables into process.env object
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

// Variables
const { PORT = 4000, DATABASE_URL } = process.env // destructuring
// same as 
// const PORT = process.env.PORT || 4000
// const DATABASE_URL = process.env.DATABASE_URL


// create express app object
const app = express()

//---------------------------------------------
// MODELS--------------------------------------
//---------------------------------------------

// Connect to DB
mongoose.connect(DATABASE_URL)

// logic to check mongoose connection
mongoose.connection
.on("open", () =>  console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", () => console.log(error))

// create Schema
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})

// create model
const People = mongoose.model("People", PeopleSchema)


//---------------------------------------------
// CONTROLLERS---------------------------------
//---------------------------------------------

// Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// Routes
app.get("/", (req, res) => {
    res.send("Hello World")
})

// Index
app.get("/people", async (req, res) => {
    try {
        // People.find() is a promise
        res.json(await People.find({}))
    } catch(error) {
        res.status(400).json(error)
    }
})

// Update Route
app.put("/people/:id", async (req, res) => {
    try {
        res.json(await People.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch {
        res.status(400).json(error)
    }
})

// Create Route
app.post("/people", async (req, res) => {
    try{
        res.json(await People.create(req.body))
    } catch(error) {
        res.status(400).json(error)
    }
})


// turn server on
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})