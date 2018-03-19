var config = {
  entry: './main.js',

  output: {
    path: './',
    filename: 'index.js'
  },

  devServer: {
    inline: true,
    port: 7777
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        include: /app/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /app/,
        loader: 'style!css'
      }
    ]
  }
}

module.exports = config;
