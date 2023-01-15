const mongoose= require("mongoose");

const userShema= mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    age: Number,
});

const UserModel= mongoose.model("user", userShema);

module.exports= {
    UserModel
}