module.exports = {
  siteMetadata: {
    title: "Practica",
  },
  plugins: [
    // "gatsby-plugin-sitemap",
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Practica`,
        short_name: `Practica`,
        start_url: `/`,
        lang: `es`,
        description: `Practica Redux`,
        background_color: `#b90000`,
        theme_color: `#b90000`,
        display: `standalone`,
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Hind`,
          `source sans-serif\:300,400,400i,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: './src/redux/store',
        // [optional] - options passed to `serialize-javascript`
        // info: https://github.com/yahoo/serialize-javascript#options
        // will be merged with these defaults:
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
      },
    },
  ],
};
