const dev = process.env.NODE_ENV !== "production";
const path = require( "path" );
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new ExtractTextPlugin( {
        // filename: "style.css?h=[hash]",
        filename: "style.css",
        disable: false,
        allChunks: true,
    } ),
];

if ( !dev ) {
    plugins.push( new BundleAnalyzerPlugin( {
        analyzerMode: "static",
        reportFilename: "webpack-report.html",
        openAnalyzer: false,
    } ) );
}

module.exports = {
    mode: dev ? "development" : "production",
    context: path.join( __dirname, "src" ),
    devtool: dev ? "none" : "source-map",
    entry: {
        app: [ "./client.js", "../assets/sass/main.sass" ],
    },
    resolve: {
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract( {
                    fallback: "style-loader",
                    use: [ "css-loader", "sass-loader" ],
                } ),
            },
        ],
    },
    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "[name].bundle.js",
    },
    plugins,
};
