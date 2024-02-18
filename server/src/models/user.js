const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default: "user",
    },
    cart: {
        type: Array,
        default: [],

    }
}, {
    timestamps: true,
});

userSchema.pre("save", async function(next){
    if(this.isModified("password")) {
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hashSync(this.password, salt)
})

//Export the model
module.exports = mongoose.model('User', userSchema);