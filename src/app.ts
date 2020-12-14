import express, { Express } from "express"
import mongoose from "mongoose"
import habitRoutes from "./routes"
const cors = require('cors')
const bodyParser = require('body-parser')

const app: Express = express()

const PORT : string | number = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use(habitRoutes)

const uri : string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dvpbd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options : object = { useNewUrlParser: true, useUnifiedTopology: true}
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() => 
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  )
  .catch(error => {
    throw error
  })