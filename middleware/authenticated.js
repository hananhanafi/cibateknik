// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ({ store, redirect }) {
    
    const Cookie = process.client ? require('js-cookie') : undefined;
    console.log("cookie",Cookie.get('auth'));
    // If the user is not authenticated
    if (!Cookie.get('auth') ) {
        return redirect('/admin/login')
    }
}