const yup = require("yup");
const { ValidationUser } = require("../models/userModel");

const ValidationUserSchema = yup.object({
    username: yup
      .string()
      .required("Le nom est obligatoire")
      .min(3, "Le nom doit comporter au moins 3 caractères")
      .max(30, "Le nom doit comporter au max 30 caractères"),
    age: yup
      .number()
      .integer("l'âge doit être un nombre entier")
      .min(18, "dot avoir au moins 18 ans")
      .max(100, "ne peut pas dépasser 100 ans"),
    image_user: yup.string().notRequired(),
    email: yup
      .string()
      .required("email obligatoire")
      .email("email n'est pas valide"),
    password: yup
      .string()
      .required("password est obligatoire")
      .min(8)
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])/,
         "le mdp doit être Exemple: Sazr123"
    ),
    role: yup.string().oneOf(["admin", "client"]),
    cars: yup.array().of(yup.string().matches(/^[0-9a-fA-F]{24}$/,"invalide")).notRequired(),
    });
exports.ValidationUserSchema = ValidationUserSchema;

    Module.exports = ValidationUser;