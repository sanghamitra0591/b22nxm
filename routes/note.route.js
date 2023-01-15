const express= require("express");

const noteRouter= express.Router();


const {NoteModel} = require("../models/Note.model");


noteRouter.get("/", async(req, res)=>{
    const query= req.query;
    try {
        const data= await NoteModel.find(query);
        res.send(data);
    } catch (error) {
        res.send({"msg":"Something went wrong"});
        console.log({"ERROR":error});
    }
})

noteRouter.post("/create", async(req, res)=>{
    const payload= req.body;
    try {
        const newnote= new NoteModel(payload);
        await newnote.save();
        res.send("Created Note")
    } catch (error) {
        res.send({"msg":"Something went wrong"});
        console.log({"ERROR":error});
    }
})

noteRouter.patch("/update/:id", async(req, res)=>{
    const payload= req.body;
    const id= req.params.id;
    const note= await NoteModel.findOne({"_id":id});
    const userID_in_note= note.userID;
    const userID_making_req= req.body.userID;
    try {
        if(userID_in_note!==userID_making_req){
            res.send({"msg": "You are not authorized"});
        }else{
            await NoteModel.findByIdAndUpdate({"_id": id}, payload);
            res.send("Updated the note");
        }
    } catch (error) {
        res.send({"msg":"Something went wrong"});
        console.log({"ERROR":error});
    }
})

noteRouter.delete("/delete/:id", async(req, res)=>{
    try {
        const id= req.params.id;
        const note= await NoteModel.findOne({"_id":id});
        const userID_in_note= note.userID;
        const userID_making_req= req.body.userID;
        if(userID_in_note!==userID_making_req){
            res.send({"msg": "You are not authorized"})
        }else{
            await NoteModel.findByIdAndDelete({"_id":id});
            res.send("Deleted the note");
        }
    } catch (error) {
        res.send({"msg":"Something went wrong"});
        console.log({"ERROR":error});
    }
})




module.exports= {
    noteRouter
}


//63c3c78f67d9f1c2bb401743