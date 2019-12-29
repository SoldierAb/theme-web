const plugins = [
  [
    "component",
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }
  ],
  ["import", {
    "libraryName": "view-design",
    "libraryDirectory": "src/components"
  }],
  "@babel/plugin-syntax-dynamic-import",
];

module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry'
    }]
    // ["es2015", {
    //   "modules": false
    // }]
  ],
  plugins
}
