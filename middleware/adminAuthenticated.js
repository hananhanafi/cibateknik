// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ({ store, redirect }) {
    
    const Cookie = process.client ? require('js-cookie') : undefined;
    // If the user is not authenticated
    if (!Cookie.get('auth') || store.state.role !== 'admin' ) {
        return redirect('/admin/login')
    }
}