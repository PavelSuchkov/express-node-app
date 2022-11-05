import express from 'express'
import mongoose from "mongoose"
import postsRouter from "./routers/postsRouter.js"
import fileUpload from 'express-fileupload'
import authRouter from "./routers/authRouter.js";


const PORT = 5010
const dbUrl = 'mongodb://localhost:27017/express_course_db'

const app = express()
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))

app.use('/auth', authRouter)
app.use('/api', postsRouter)


async function startApp() {
    try {
        await mongoose.connect(dbUrl, {useUnifiedTopology: true, UseNewUrlParser: true}, () => {
            console.log('connect success')
        })
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

startApp()