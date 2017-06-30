module.exports = {
  plugins: [
    require("postcss-cssnext")({
      browsers: "last 2 versions",
      features: {
        customProperties: {
          variables: {
            mainColor: "#111",
            mainColorContrasted: "#eee",
          },
        },
      },
    }),
    require('postcss-easy-import')({glob: true})
  ]
}