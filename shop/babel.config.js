module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    //下载npm i babel-plugin-component -D   更改配置,让下载好的element-ui可以按需引入
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}