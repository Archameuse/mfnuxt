<template>
    <button 
    v-bind:to="link"
    @mouseenter="enter"
    @mouseleave="leave"
    @click="click"
    class="bg-transparent cursor-pointer uppercase opacity-80 h-full justify-center flex flex-col"
    >
        {{label}}
    </button>
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
        },
        event: {
            type: Function,
            default: () => {}
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
        },
        click() {
            this.event()
        }
    },
    data() {
        return {animation: {} as unknown as GSAPAnimation}
    }
})

</script>