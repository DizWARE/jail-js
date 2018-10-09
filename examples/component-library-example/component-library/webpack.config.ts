import * as path from "path";
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
                        loader:"html-loader", 
                        options: {                        
                            minimize: true,
                            removeAttributeQuotes: true,
                            caseSensitive: true,
                            exportAsDefault: true,
                            customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
                            customAttrAssign: [ /\)?\]?=/ ]
                        }
                    }
                ]
            },
            {
                test: /.s[ca]ss$/,
                use: "sass-loader"
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