const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const BASE_JS = "./src/client/js/"

module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    home: BASE_JS + "home.js",
    goalCRUD: BASE_JS + "goalCRUD.js",
    setTimeFunctions: BASE_JS + "setTimeFunctions.js",
    homeYearlyGoals: BASE_JS + "homeYearlyGoals.js",
    homeMonthlyGoals: BASE_JS + "homeMonthlyGoals.js",
    homeWeeklyGoals: BASE_JS + "homeWeeklyGoals.js",
    homeDailyGoals: BASE_JS + "homeDailyGoals.js",
    createRecap: BASE_JS + "createRecap.js",
    editRecap: BASE_JS + "editRecap.js",
    recapCRUD: BASE_JS + "recapCRUD.js",
  },
  mode: "development",
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};