const fs= require("fs");
const logModel = require("../models/logModel");
function logMiddleware(req, res, next) {
    const startTime = new Date(); // Temps de début de la requête

    res.on("finish", async() => {
        const headers = JSON.stringify(req.headers);
        const endTime = new Date(); // Temps de fin de la requête
        const executionTime = endTime - startTime; // Temps d'exécution en millisecondes
        const body = Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : "N/A";
        const referer = req.headers.referer || "N/A";
        const log = `
        ${new Date().toISOString()} -
        Méthode: ${req.method}
        URL: ${req.originalUrl}
        IP: ${req.ip}
        Referer: ${referer}
        Statut: ${res.statusCode}
        Utilisateur: ${req.user ? `${req.user._id} | ${req.user.username}` : "N/A"}
        Headers: ${headers}
        Temps d'exécution: ${executionTime} ms
        Corps de la requête: ${body}
        Résultat: ${res.locals.data || "N/A"}
        `;

        const logEntry = {
            timestamp: new Date(),
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            referer: req.headers.referer || "N/A",
            status: res.statusCode,
            user: req.user ? { id: req.user._id, username: req.user.username } : null,
            headers: req.headers,
            executionTime: new Date() - startTime, // Temps d'exécution en millisecondes
            requestBody: Object.keys(req.body).length > 0 ? req.body : null,
            result: res.locals.data || "N/A",
        };
        
        await logModel.create(logEntry);

        try {
            fs.appendFileSync("app.log", log);
        } catch (err) {
            console.error("Erreur lors de l'enregistrement dans le fichier journal :", err);
        }
    });

    next();
}

module.exports = logMiddleware;


/*const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireAuthUser = async (req, res, next) => {
    const token = req.cookies.jwt_token;
    console.log('jwt token', token);

    if(token) {

        jwt.verify(token,"net 3Click secret",async (err, decodedToken) => {

            if(err) {
                res.status(401).json("problem decoding token")
            }else {
                console.log("decodedToken",decodedToken)
                console.log("decodedToken id ",decodedToken.id)

                    //nsina configuration ta3 session fil app.js ba3ed pause nchoufouha 
                user = await userModel.findById(decodedToken.id)
                console.log("user", user)
                req.session.user = user
                next();
            }

        });
    
    } else {
        res.status(401).json("/pas de token / il faut etre conn")
    }
}

module.exports = {requireAuthUser};
*/