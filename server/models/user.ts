import mongoose from "mongoose";
const {Schema,model} = mongoose;

const UserSchema = new Schema({
    nick:{
        type:String,
        required:[true,"Podaj pseudonim"],
    },
    email:{
        type:String,
        required:[true,"Podaj email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Podaj hasło"]
    },
    role:{
        type:String,
        default:"user"
    }
})

export default model("User",UserSchema);