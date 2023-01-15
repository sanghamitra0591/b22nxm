const express= require("express");

const {connection}= require("./configs/db");
const { authenticate } = require("./middlewares/authenticate.middleware");
const { noteRouter } = require("./routes/note.route");

const cors= require("cors");



const app= express();

require("dotenv").config();

app.use(cors({
    origin:"*"
}))
app.use(express.json());


const { userRouter } = require("./routes/user.route");

app.get("/", (req, res)=>{
    res.send("Welcome")
})

app.use("/users", userRouter)

app.use(authenticate)
app.use("/notes", noteRouter)


app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log({"Error":error});
    }
    console.log(`Running at port ${process.env.port}`);
})