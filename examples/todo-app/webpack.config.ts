import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as HtmlWebpackTemplate from "html-webpack-template";
import { Configuration } from "webpack";

const config = {
    mode: "development",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /.html$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "templates",
                            name: "[name].[hash].[ext]"
                        }
                    }
                ],
                exclude: path.resolve(__dirname, "public")
            },
            {
                test: /.s[ca]ss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "styles",
                            name: "[name].[hash].css"
                        }
                    },
                    "sass-loader"
                ],
                include: path.resolve(__dirname, "src/components")
            },
            {
                test: /.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "styles",
                            name: "[name].[hash].css"
                        }
                    },
                    "sass-loader"
                ],
                include: path.resolve(__dirname, "styles/")
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin( {
            inject: false,
            hash: true,
            template: HtmlWebpackTemplate,
            bodyHtmlSnippet: `
            <div id="app">
                <todo-title></todo-title>
                <todo-control-panel></todo-control-panel>
                <todo-list></todo-list>
            </div>
            `,
            links: ["main.css"]
        }),
    ],
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ],
        alias: {
            styles: path.resolve(__dirname, "styles")
        }
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
} as Configuration;

export default config;