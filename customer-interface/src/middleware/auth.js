
// HÄR TAR JAG EMOT
/*
const jwt = require('jsonwebtoken');
const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
    }
};
*/

import Cookies from 'js-cookie';


export default async function entryMiddleware({ next, router }) {
    try {
        console.log("MIDDLEWARE ACTIVATED");
        const cookie = Cookies.get('token');
        const parsedCookie = JSON.parse(cookie);
        console.log("logging cookie", parsedCookie);
        if (!cookie) {
            console.log("middleware no cookie, return next(home)");
            return next({ name: 'home' });
        }
        console.log("Accessing cookie from middleware: ", parsedCookie);
        return next();
    } catch(error){
        console.log("Error encountered in auth middleware: ", error);
        return next();
    }

}



/*
module.exports = {
    authorizeEntry,
};
*/
