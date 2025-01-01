const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: String ,
    age: Number,
    image_user: { type: String, required: false, default: "client.png" },
    email: { type: String, require: true, unique: true },
    password: {type: String, require: true, validate:{
        validator: function(value){
            //au moin lettre majus /au moin lettre minus/au moin chiffre/ au moin de 8 carracteres
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.text(value);
        },
        message: 'Password must be at least 8 characters long , and include one upper'
        },
    },
    role: { type: String, enum: ["admin", "client"] },
    isconnect : Boolean,
    //cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }] // Référence vers l'utilisateur
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSalt()
        const User = this 
        User.password = await bcrypt.hash(User.password, salt)
        User.isconnect = false;
        next()
    } catch (error) {
        next(error);
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;