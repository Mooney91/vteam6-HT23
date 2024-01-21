

import Cookies from 'js-cookie';

export default async function logoutMiddleware({ next }) {
    try {
        console.log("LOGOUT MIDDLEWARE ACTIVATED");
        console.log("Cookie before removal", Cookies.get('token'));
        Cookies.remove('token', { sameSite: 'lax', secure: true });
        console.log("Cookie after removal", Cookies.get('token'));
        return next();
    } catch(error){
        console.log("Error encountered in logout middleware: ", error);
        return next();
    }
}
