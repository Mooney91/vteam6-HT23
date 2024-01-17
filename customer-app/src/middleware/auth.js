import Cookies from 'js-cookie';

export default async function entryMiddleware({ next }) {
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
