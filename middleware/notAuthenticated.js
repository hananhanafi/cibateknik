export default function ({ store, redirect }) {
    const Cookie = process.client ? require('js-cookie') : undefined;
    // If the user is authenticated redirect to home page
    console.log("STR",store.state);
    if (Cookie.get('auth')) {
        return redirect('/admin')
    }
}