import * as path from "path";
import { Configuration } from "webpack";

const config = {
    mode: "production",
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
                ]
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
                ]
            }
        ]
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ],
    },
    output: {
        library: "component-library",
        libraryTarget: "commonjs2",
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    }
} as Configuration;

export default config;