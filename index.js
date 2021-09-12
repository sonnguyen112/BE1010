const express = require("express")
const app = express()

//set middleware
app.use(express.urlencoded())
app.use(express.json())

//set route
app.use("/", require("./routes/index"))

//start server
app.listen(3000, () => {
    console.log("http://localhost:3000")
})
