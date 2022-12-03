<template>

        <div class="h-full w-full absolute" @mouseenter="enter" @mouseleave="leave">
        <!--  ивенты когда мышка заходит onMouseEnter={() => gsapRef.current?.play()} onMouseLeave={() => gsapRef.current?.reverse()}-->
            <div class="absolute w-full h-full">
                <video preload="auto" :src="ability.video" loop muted autoplay class="w-full h-full object-cover" />
            </div>
            <div ref="text" class="absolute bottom-0 h-0 opacity-100 bg-[#00000030] text-white w-full overflow-y-scroll text-center textdiv">
                <h1 class="text-3xl mt-2.5">
                    {{`${ability.name} (${ability.hotkey})`}}
                </h1>
                <p class="mt-2.5 p-5">
                    {{`${ability.description}. ${!!ability.cd ? `Перезарядка - ${ability.cd} секунд` : ''}`}}
                </p>
            </div>
        </div>

</template>

<script lang="ts">
import gsap from 'gsap';
import { PropType } from 'vue';

    export default defineNuxtComponent({
        props: {
            ability: {
                type: Object as PropType<Ability>,
                required: true
            }
        },
        mounted() {
            this.animation = gsap.to(this.$refs.text as HTMLDivElement, {
                height: '100%',
                opacity: 1,
                duration: 0.25,
                paused: true
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

<style>
.textdiv::-webkit-scrollbar{
    display: none;
}
</style>