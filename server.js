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
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

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


// turn server on
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})