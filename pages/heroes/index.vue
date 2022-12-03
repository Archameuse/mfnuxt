<script lang="ts">
    export default defineNuxtComponent({
        data()  {
            const { data } = useSession()
            return {
                showModal: false,
                data
            }
        },
        methods: {
            openmodal() {
                this.showModal = true
            },
            closemodal() {
                this.showModal = false
            },
            async add(character:Character) {
                const res = await $fetch('/api/characters', {
                    method: 'POST',
                    body: {
                        'character': character
                    }
                }).then(this.closemodal)
                    .finally(this.refresh)
                    .catch(err => console.log(err))
            }
        },
        watch: {
            'showModal': function(status:boolean) {
                window.document.body.style.overflowY = status ? 'hidden' : ''
            }
        },
        async setup() {
            useHead({
                titleTemplate: '%s - Герои'
            })
            const { data:heroes, refresh } = await useFetch<Character[]>('/api/characters?max=4', {
                method: 'GET'
            })
            return {
                heroes,
                refresh
            }
        }
    })
</script>

<template>
    <div>
        <div class='grid w-full max-w-3xl m-auto p-[10px] grid-cols-chartable justify-center auto-rows-[90px] transition-opacity'>
            <HeroPreview v-for="(hero, index) in heroes" v-bind:hero="hero || undefined" :key="index" v-bind:index='index' />
        </div>
        <aside v-if="data?.user.admin" @click="openmodal" class="w-10 h-10 p-1 [outline:solid_1px_gray] cursor-pointer z-40 fixed left-4 bottom-4 rounded-sm shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
        </aside>
        <Transition>
            <AddModal v-show="showModal" @add="add" @close-modal="closemodal" />
        </Transition>
    </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>