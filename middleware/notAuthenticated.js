export default function ({ store, redirect }) {
    const Cookie = process.client ? require('js-cookie') : undefined;
    // If the user is authenticated redirect to home page
    if (Cookie.get('auth') && store.state.role === 'user') {
        return redirect('/')
    }
}