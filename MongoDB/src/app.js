const express = require("express")

const app = express()

app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const tasksRouter = require("./routes/tasks")

app.get("/", (req,res)=>{
    res.status(200).send({"message": "API works"})
})

app.use("/tasks", tasksRouter)

module.exports = app