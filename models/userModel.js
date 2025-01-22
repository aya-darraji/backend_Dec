const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ValidationUserSchema } = require("../middlewares/validationUser");
const userSchema = new mongoose.Schema(
  {
    username: String ,
    age: Number,
    image_user: { type: String, required: false, default: "client.png" },
    email: { type: String, require: true, unique: true },
    password : String,
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
function ValidationUser(req, res, next) {
    ValidationUserSchema.validate(req.body)
        .then(() => {
            next();
        })
        .catch((err) => {
            res.status(400).json({
                message: "Validation des donnees echouée",
                errors: err.errors,
            });
        });
}
exports.ValidationUser = ValidationUser;
