export default [
    {
    router: {
        extendRoutes(routes, resolve) {
        routes.push(
        {
            path: '/users/:id',
            components: {
            default: resolve(__dirname, 'pages/users'), // or routes[index].component
            modal: resolve(__dirname, 'components/modal.vue')
            },
            chunkNames: {
            modal: 'components/modal'
            }
        }
        )}
    },
    }
]