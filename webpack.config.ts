import * as path from "path";
import { Configuration } from "webpack";

const config = {
    mode: "development",
    entry: "./src/index.ts",
    target: "web",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },         
        ]
    },    
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },
    output: {
        library: "jail-js",
        libraryTarget: "commonjs2",
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    }
} as Configuration;

export default config;