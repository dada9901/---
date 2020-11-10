module.exports = {
    devServer: {
        proxy: {
            '/login': {
                target: 'http://localhost:8888',
                changeOrigin: true,
            },
            '/register':{
                target: 'http://localhost:8888',
                changeOrigin: true
            }
        },
    }
}