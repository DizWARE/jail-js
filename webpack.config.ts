import * as path from "path";
import { Configuration } from "webpack";

const config = {
    mode: "production",
    entry: "./src/index.ts",
    target: "node",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: "tsconfig.json",
                    }
                },
                exclude: /node_modules/
            },         
        ]
    },    
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ],
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    }
} as Configuration;

export default config;