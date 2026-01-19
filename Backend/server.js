require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/database")

const PORT = process.env.PORT || 5000

connectDB()
    .then( () => {
        console.log("Database connection successfull!")
        app.listen(PORT, () => {
            console.log(`Server running on the Port ${PORT}`)
        })
    } )
    .catch( (error) => {
        console.error("Database connection failed: ", error.message)
        process.exit(1)
    } )