<template>
    <div @mouseenter="enter" @mouseleave="leave" className="h-screen w-screen overflow-hidden p-0 m-0 absolute top-0 left-0 right-0 bottom-0">
        <video preload="auto" ref="video" autoplay loop muted src="/Video/mfforsite.mp4" class="w-full h-full object-cover scale-110 blur-sm"></video>
        <div ref="image" class="pointer-events-none absolute z-10 w-10/12 aspect-video left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
            <nuxt-img preload src="mflogobig.png" alt="Magic Football Logo" class="object-contain w-full h-full object-center" quality="1"/>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap'

export default {
    mounted() {
        this.animation = gsap.timeline({paused: true})
            .to(this.$refs.video, {
                filter: 'blur(0.2px)',
                scale: 1.01,
            })
            .to(this.$refs.image, {
                top: 0,
                y: 0,
                opacity: 0,
            }, '<')
    },
    methods: {
        enter() {
            this.animation.play()
        },
        leave() {
            this.animation.reverse()
        }
    }
}
</script>
