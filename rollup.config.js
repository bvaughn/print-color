import babel from "rollup-plugin-babel";

export default {
  input: "./src/index.js",
  output: {
    file: "./lib/index.js",
    format: "cjs",
    name: "bundle"
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ]
};