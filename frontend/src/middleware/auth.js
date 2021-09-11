export default function auth (to, from, next) { // Route access at the start of the page 
    if (!localStorage.getItem('userToken') && !localStorage.getItem('userData')) {
        return next({ name: 'Login' })
    }
    return next()
}