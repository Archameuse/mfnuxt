<template>
    <main class="w-full p-4 grid justify-center grid-cols-playertable gap-4">
        <PlayerCard v-for="player of players" :player="player"/>
    </main>
</template>

<script lang="ts">
    export default defineNuxtComponent({
        async setup() {
            useHead({
                titleTemplate: '%s - Статистика'
            })
            const { data: players } = await useFetch<Player[]>('/api/players')
            return {
                players
            }
        },
        computed: {
            sortPlayers() {
                return this.players?.sort((a, b) => {
                    if(b.games===0) return -1
                    if(a.games===0) return 1
                    if(b.pts>a.pts) return 1
                    if(b.pts<a.pts) return -1
                    if(b.pts===a.pts) {
                        if(b.wins > a.wins) return 1
                        if(b.wins < a.wins) return -1
                    }
                    return 0
                })
            }
        }
    })
</script>