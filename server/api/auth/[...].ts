import { NuxtAuthHandler } from "#auth"; 
import DiscordProvider from 'next-auth/providers/discord'
import {google} from 'googleapis'

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    providers: [
        // @ts-ignore
        DiscordProvider.default({ 
            clientId: '1048299650991538216', 
            clientSecret: '6dSiPAB5f8uxd5gIOVIizo3Let0GoKDa' ,
            authorization: {
                params: {
                    scope: 'identify'
                }
            },
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if(session?.user && token) {
                const auth = new google.auth.GoogleAuth({
                    credentials: JSON.parse(process.env.DB_KEY),
                    scopes: "https://www.googleapis.com/auth/spreadsheets",
                  })
                const client = await auth.getClient();
                const sheets = google.sheets({ version: 'v4', auth: client });
                const range = process.env.DB_ADMINS_RANGE
                const response = await sheets.spreadsheets.values.get({
                    spreadsheetId: process.env.DB_ID,
                    range,
                }).then(res => res.data.values)
                const admins:any[] = []
                response?.map(res => admins.push(res[0]))
                session.user.admin = admins.includes(token.sub)
                // const guilds = await fetch(`https://discordapp.com/api/v6/users/@me/guilds/${process.env.DISCORD_SERVER_ID}/member`, {
                // const guilds = await fetch(`https://discordapp.com/api/v6/users/@me/guilds/610518077183885323/member`, {
                    // headers: {
                        // Authorization: 'Bearer ' + token.accessToken
                    // }
                // }).then(res => res.json())
                // console.log(guilds.roles[0])
                // session.user.admin = guilds.roles.includes(process.env.DISCORD_SERVER_ROLE)
                // session.user.admin = guilds
            }
            return session
        }
    }
})