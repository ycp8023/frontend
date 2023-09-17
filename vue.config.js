module.exports = {
 
    configureWebpack: {
      devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8080,
        https: false,
        /* 使用代理 */
        proxy: { // string | Object
            '/api': {
                /* 目标代理服务器地址 */
                target: 'http://10.251.252.203:8000',
                /* 允许跨域 */
                changeOrigin: true,
                pathRewrite: {
                	'^/api': '' //规定请求地址以什么作为开头
            	}
            },
        },
    },

    module: {
      rules: [
        {
          test: /\.s(c|a)ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              // Requires sass-loader@^7.0.0
              options: {
                implementation: require('sass'),
                indentedSyntax: true // optional
              },
              // Requires >= sass-loader@^8.0.0
              options: {
                implementation: require('sass'),
                sassOptions: {
                  indentedSyntax: true // optional
                },
              },
            },
          ],
        },
      ],
    }
}
  }