module.exports = {
    mode: 'universal',

    srcDir: 'client',

    /*
    ** Headers of the page
    */
    head: {
        title: 'NUXT BLOG',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js 프레임워크를 사용해 제작된 블로그 서비스 입니다.' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: '//fonts.googleapis.com/css?family=Noto+Sans+KR'
            }
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },

    /*
    ** Global CSS
    */
    css: ['~/assets/styles/main.scss'],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [],

    /*
    ** Nuxt.js modules
    */
    modules: [],

    /*
    ** Build configuration
    */
    build: {
        postcss: {
            plugins: {
                'postcss-preset-env': {
                    autoprefixer: { grid: true }
                }
            }
        }
    }
}