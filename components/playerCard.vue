<template>
    <div @click="click" @mouseenter="enter" @mouseleave="leave" class="w-[220px] h-[300px] bg-gray-500 rounded-[5px] bg-cover bg-center [background-image:url(/playercard.png)] border-solid border-white border-[5px] [outline:solid_1px_rgb(0,0,0,0.15)] font-kelly-slab font-thin m-0 p-0 text-center cursor-pointer select-none">
        <div ref="card" :class="reversed ? '-scale-x-100' : ''">
            <div class="h-[60px] flex flex-col justify-center pb-[10px]">
                <h1 class="text-3xl">{{player.season}}</h1>
            </div>
            <div class="text-white [text-shadow:0_0_5px_black,0_0_2px_rgba(0,0,0,0.6)] h-[100px]">
                <h1 class="text-3xl">{{player.name}}</h1>
            </div>
            <div class="text-white [text-shadow:0_0_3px_black] h-[65px] pl-[45px] mt-[10px] text-left flex flex-col justify-center">
                <h3 class="text-sm">Победы: {{player.wins}}</h3>
                <h3 class="text-sm">Поражения: {{player.losses}}</h3>
                <h3 class="text-sm">Ничьи: {{player.draws}}</h3>
            </div>
            <div>
                <h2 class="uppercase underline text-xl">
                    {{reversed ? `PTS: ${player.pts}` : `Ранг: ${player.rank}`}}
                </h2>
                <h2 class="text-xl">
                    {{reversed ? `Winrate: ${player.winrate}%` : `Club: ${player.club}`}}
                </h2>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import gsap from 'gsap'

    export default defineNuxtComponent({
        props: {
            player: {
                type: Object as PropType<Player>,
                required: true
            }
        },
        mounted() {
            this.animation1 = gsap.timeline({paused: true})
                .to(this.$el, {
                    rotateY: 180,
                    duration: 0.2,
                    onReverseComplete: () => {this.reversed = false},
                    onComplete: () => {this.reversed = true}
                })
                .to(this.$refs.card as HTMLDivElement, {
                    scaleX: -1,
                    duration: 0.2,
                }, '<')
            this.animation2 = gsap.to(this.$el, {
                paused: true,
                scale: 1.1,
                duration: 0.1
            })
        },
        unmounted() {
            this.animation1.revert()
            this.animation2.kill()
        },
        methods: {
            click() {
                this.reversed ? this.animation1.reverse() : this.animation1.play()
            },
            enter() {
                this.animation2.play()
            },
            leave() {
                this.animation2.reverse()
            }
        },
        data() {
            return {
                animation1: {} as unknown as GSAPTimeline,
                animation2: {} as unknown as GSAPAnimation,
                reversed: false
            }
        }
    })
</script>