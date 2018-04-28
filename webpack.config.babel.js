import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'


console.log(__dirname)

module.exports = {
    mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			},
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'stylus-loader'
                        }
                    ]
                })

            }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
        new ExtractTextPlugin('style.css')
	],
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    }
}