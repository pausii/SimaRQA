const jwt = require("jsonwebtoken");
const { users, user } = require("../models");
const dotenv = require("dotenv");
dotenv.config();

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.user_id;
        next();
    });
};

isAdmin = (req, res, next) => {
    users.findByPk(req.userId).then(user => {
        if (user.role === "administrator") {
            next();
            return;
        }
        res.status(403).send({
            message: "Require Admin Role!"
        });
    });
};

isDivision = (req, res, next) => {
    users.findByPk(req.userId).then(user => {
        if (user.role === "division") {
            next();
            return;
        }
        res.status(403).send({
            message: "Require Division Role!"
        });
    });
}

isDivisonOrAdmin = (req, res, next) => {
    user.findByPk(req.userId).then(user => {
        if (user.role === "division" || user.role === "administrator") {
            next();
            return;
        }
        res.status(403).send({
            message: "Require Division or Admin Role!"
        });
    });
};

module.exports = {
    verifyToken,
    isAdmin,
    isDivision,
    isDivisonOrAdmin
};

