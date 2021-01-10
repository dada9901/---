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
            },
            '/resetpassword':{
                target: 'http://localhost:8888',
                changeOrigin: true
            },
            '/minerconfig':{
                target: 'http://localhost:8888',
                changeOrigin: true
            },
            '/search2':{
                target: 'http://localhost:8888',
                changeOrigin: true
            },
            '/remove':{
                target: 'http://localhost:8888',
                changeOrigin: true
            },
            '/site':{
                target: 'http://localhost:8888',
                changeOrigin: true
            }
        },
    }
}