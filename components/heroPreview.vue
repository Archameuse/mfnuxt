<template>
    <div class="select-none group relative w-[100px] h-[100px] bg-black border-solid border-[10px] [border-image:url(/orb-borders.png)_40]">
        <div v-if="hero.preview" class="peer scale-100 w-full h-full active:opacity-80 active:scale-95">
            <NuxtLink draggable="false" :to="`/heroes/${index+1}`">
                <nuxt-img draggable="false" :src="hero.preview" :alt="hero.name" class="object-cover h-full w-full object-center" preload/>
            </NuxtLink>
        </div>
        <div v-if="hero.name" class="transition-opacity absolute px-2 py-1 pointer-events-none top-1/2 left-full -translate-y-1/2 translate-x-2 opacity-0 rounded z-20 bg-black text-white hover peer-hover:opacity-100">{{hero.name}}</div>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default defineNuxtComponent({
    props: {
        hero: {
            type: Object as PropType<Character>,
            default: {}
        },
        index: {
            type: Number,
            default: 1
        }
    }
})
</script>