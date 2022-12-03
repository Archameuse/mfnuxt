<template>
    <NuxtLink 
    v-bind:to="link"
    @mouseenter="enter"
    @mouseleave="leave"
    class="bg-transparent cursor-pointer uppercase opacity-80 h-full justify-center flex flex-col"
    >
        {{label}}
    </NuxtLink>
</template>

<script lang="ts">
import gsap from 'gsap'

export default defineNuxtComponent({
    props: {
        label: {
            type: String,
            default: 'link'
        },
        link: {
            type: String,
            default: '/'
        }
    },
    mounted() {
        this.animation = gsap.to(this.$el, {
            paused: true,
            opacity: 1,
            duration: 0.2
        })
    },
    unmounted() {
        this.animation.kill()
    },
    methods: {
        enter() {
            this.animation.play()
        },
        leave() {
            this.animation.reverse()
        }
    },
    data() {
        return {animation: {} as unknown as GSAPAnimation}
    }
})

</script>