// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image-edge',
        '@sidebase/nuxt-auth',
        '@nuxtjs/google-fonts',
        // '@pinia/nuxt',
        // '@vueuse/nuxt',
    ],
    typescript: {
        strict: true
    },
    auth: {
        origin: process.env.AUTH_ORIGIN
    },
    app: {
        head: {
            title: 'Magic Football',
            meta: [
                {name: 'description', content: 'Website about Warcraft 3 Map - Magic Football'}
            ]
        }
    },
    googleFonts: {
        families: {
            Cuprum: true,
            KellySlab: true,
            OpenSans: true
        }
    }
})
