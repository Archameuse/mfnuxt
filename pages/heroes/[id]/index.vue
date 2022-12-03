<template>
    <article v-if="currentHero">
        <div class="relative w-full aspect-video bg-[#252525]">
            <div class='px-10 m-0 text-white text-center relative top-10 z-10 flex justify-between h-12'>
                <div>
                    <NuxtLink v-if="prevHero" :to="`/heroes/${prevId + 1}`">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1"/>
                        </svg>
                    </NuxtLink>
                </div>
                <h1 className="text-5xl">{{currentHero.name}}</h1>
                <div>
                    <NuxtLink v-if="nextHero" :to="`/heroes/${nextId + 1}`">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1"/>
                        </svg>
                    </NuxtLink>
                </div>
            </div>
            <nuxt-img preload draggable='false' :src="currentHero.image" alt="Кошмар" class='h-full w-full object-center select-none mask' />
        </div>
        <main class="flex flex-col items-center text-center mb-10">
            <div class="text-2xl border-b-2 border-black pb-2 w-full max-w-[60ch] mt-5">
                <p>{{currentHero.description}}</p>
            </div>
            <div class="w-full m-0 relative mt-5 max-w-[140ch]" v-if="currentHero.abilities">
                <div class="w-full aspect-video relative">
                    <HeroesVideo v-for="(ability, index) in currentHero.abilities" :key="ability.hotkey" v-show="(selected === index)" :ability="ability" />
                </div>
                <div class="mt-0 relative w-fit -top-10 grid max-w-3xl m-auto grid-cols-chartable justify-center auto-rows-[90px]">
                    <div v-for="(ability, index) in arrFiller<Ability>(currentHero.abilities, 4)" :key="index" class="select-none group relative w-[100px] h-[100px] bg-black border-solid border-[10px] [border-image:url(/orb-borders.png)_40]">
                        <div @click="select(index)" class="scale-100 peer w-full h-full active:opacity-80 active:scale-95">
                            <nuxt-img preload v-if="ability?.image" :src="ability.image" draggable="false" class="object-cover w-full h-full object-center cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full relative mt-5 max-w-[140ch] text-3xl text-center flex flex-col gap-14">
                <div v-if="currentHero.talents[0]">
                    <b>Особый талант:</b> <br/>
                    {{currentHero.talents[0]}}
                </div>
                <div v-if="currentHero.talents[1]">
                    <b>Особый талант:</b> <br/>
                    {{currentHero.talents[1]}}
                </div>
            </div>
        </main>
        <Transition>
            <EditModal v-if="showEditModal" @edit="edit" @close-modal="closeEditModal" :character="currentHero" />
        </Transition>
        <Transition>
            <DeleteModal v-if="showDelModal" @delete="del" @close-modal="closeDelModal" :character-name="currentHero.name" />
        </Transition>
        <aside v-if="data?.user.admin" @click="openEditModal" class="w-10 h-10 p-1 [outline:solid_1px_gray] cursor-pointer z-40 fixed left-4 bottom-4 rounded-sm shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
                <path d="M16 5l3 3"/>
            </svg>
        </aside>
        <aside v-if="data?.user.admin" @click="openDelModal" class="w-10 h-10 p-1 [outline:solid_1px_gray] cursor-pointer z-40 fixed right-4 bottom-4 rounded-sm shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </aside>
    </article>
</template>

<script lang="ts">
    export default defineNuxtComponent({
        async setup() {
            const { data:heroes, refresh } = await useFetch<Character[]>('/api/characters')
            return {
                heroes,
                refresh
            }
        },
        mounted() {
            useHead({
                titleTemplate: (mf) => (
                    this.currentHero ? `${mf} - ${this.currentHero.name}` : ''
                )
            })
        },
        data() {
            var id = this.$route.params.id
            if(typeof id === 'object') id = id[0]
            const prevId = Number.parseInt(id) - 2
            const currentId = Number.parseInt(id) - 1
            const nextId = Number.parseInt(id)
            const { data } = useSession()
            return {
                prevId,
                currentId,
                nextId,
                selected: 0,
                showEditModal: false,
                showDelModal: false,
                data
            }
        },
        methods: {
            select(index:number) {
                this.selected = index
            },
            openEditModal() {
                this.showEditModal = true
            },
            closeEditModal() {
                this.showEditModal = false
            },
            openDelModal() {
                this.showDelModal = true
            },
            closeDelModal() {
                this.showDelModal = false
            },
            async edit(character:Character) {
                const res = await $fetch('/api/characters', {
                    method: 'PUT',
                    body: {
                        'character': character,
                        'id': this.currentId
                    }
                }).then(this.closeEditModal)
                    .finally(this.refresh)
                    .catch(err => console.log(err))
            },
            async del() {
                const res = await $fetch('/api/characters', {
                    method: 'DELETE',
                    body: {
                        'id': this.currentId
                    }
                }).then(this.closeDelModal)
                    .finally(this.refresh)
                    .catch(err => console.log(err))
            }
        },
        computed: {
            prevHero() {
                return this.heroes?.[this.prevId]
            },
            currentHero() {
                return this.heroes?.[this.currentId]
            },
            nextHero() {
                return this.heroes?.[this.nextId]
            }
        }
    })
</script>

<style>
.mask{
    mask-image: linear-gradient(rgba(0, 0, 0, 0) 6rem, rgb(0, 0, 0) 10rem);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

