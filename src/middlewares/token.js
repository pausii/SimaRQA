const jwt = require('jsonwebtoken');
require('dotenv').config({path: './.env'});
const { JWT_SECRET } = process.env;

module.exports = {
    tokenGenerated: (data) => {
        const token = jwt.sign({ data }, JWT_SECRET, {
            expiresIn: '24h'
        });
        return token;
    },

    tokenVerified: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            console.log('Received token', token);
            const verified = jwt.verify(token, JWT_SECRET);
            console.log('Verified token:', verified);
            req.user = verified.data;

            if (verified) {
                next();
            }
        } catch (error) {
            res.status(401).send({
                error: error.message
            });
            res.end();
        }
    },

    onlyAdmin: (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const verified = jwt.verify(token.split(' ')[1], JWT_SECRET);
            if (verified.data.role === 'administrator') {
                next();
            } else {
                res.status(403).send('Access forbidden: Administrator only');
                res.end();
            }
        } catch (error) {
            res.status(401).send({
                error: error.message
            });
            res.end();
        }
    },


    forDivision: (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const verified = jwt.verify(token.split(' ')[1], JWT_SECRET);
            if (verified.data.role === 'division') {
                next();
            } else {
                res.status(401).send({
                    message: 'unauthorized!, forbidden'
                });
                res.end();
            }
        } catch (error) {
            res.status(401).send({
                error: error.message
            });
            res.end();
        }
    },

    adminOrDivision: (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const verified = jwt.verify(token.split(' ')[1], JWT_SECRET);
            if (verified.data.role === 'administrator' || 'division') {
                next();
            } else {
                res.status(401).send({
                    message: 'unauthorized!, forbidden'
                });
                res.end();
            }
        } catch (error) {
            res.status(401).send({
                error: 'Unauthorized access'
            });
            res.end();
        }
    }
}