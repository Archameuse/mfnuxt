<template>
    <div tabindex="-1" aria-hidden="true" class="fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-[#0000004b] overflow-x-hidden overflow-y-auto z-50 select-none">
        <div class="relative w-full max-w-2xl h-full">
            <div class="flex flex-col relative top-[10%] h-[80%] pb-6 bg-white rounded-lg shadow" @click.stop>
                <div class="flex justify-between items-start p-4 rounded-t border-b">
                    <h3 class="text-xl font-semibold text-gray-900">
                        Добавить персонажа
                    </h3>
                    <button @click="$emit('close-modal')" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-6 overflow-y-scroll scrollarea">
                    <form class="space-y-6" @submit.prevent="submit">
                        <AddInput text="Название персонажа" tag='name' placeholder="Кошмар"/>
                        <AddInput text="Ссылка на иконку" tag='icon' placeholder="https://i.imgur.com/bJUoGF0.png"/>
                        <AddInput text="Сложность" variant="slider" tag="difficulty" />
                        <AddInput text="Изображение героя" tag='image' placeholder="https://i.imgur.com/bJUoGF0.png"/>
                        <div class="flex flex-col">
                            <h2 class="text-md font-medium text-gray-900">Таланты</h2>
                            <AddInput tag='talent-1' placeholder="Основной R талант"/>
                            <AddInput tag='talent-2' placeholder="Альтернативный T талант"/>
                        </div>
                        <AddInput text="Описание" tag='description' variant="area"/>
                        <AbilityInputs v-for="index in abilityInputs" :key="index" :index="index" />
                        <div class="flex justify-center">
                            <button v-if="(abilityInputs < 4)" @click="addInputs" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">+</button>
                            <button v-if="(abilityInputs > 1)" @click="removeInputs" type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">x</button>
                        </div>
                        <div class="flex justify-between">
                            <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Добавить</button>
                            <button type="button" @click="$emit('close-modal')" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Отменить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    export default defineNuxtComponent({
        data() {
            return {
                abilityInputs: 1
            }
        },
        methods: {
            addInputs() {
                if(this.abilityInputs < 4) this.abilityInputs++
            },
            removeInputs() {
                if(this.abilityInputs > 1) this.abilityInputs--
            },
            submit(e:Event) {
                const target = e.target as HTMLFormElement
                const inputsArray:HTMLInputElement[] = []
                for(const input of e.target as HTMLFormElement) {
                    if(input.nodeName !== 'BUTTON') {
                        inputsArray.push(input as HTMLInputElement)
                    }
                }
                const name = inputsArray.shift()?.value
                const preview = inputsArray.shift()?.value
                const difficulty = inputsArray.shift()?.valueAsNumber
                const image = inputsArray.shift()?.value
                const talents = [
                    inputsArray.shift()?.value||'',
                    inputsArray.shift()?.value||''
                ]
                const description = inputsArray.shift()?.value
                const abilities:Ability[] = []
                const abilityInputs:HTMLInputElement[][] = arrSplitter(inputsArray.length/this.abilityInputs, inputsArray)
                abilityInputs.map(item => {
                    const hotkey = item.shift()?.value
                    const name = item.shift()?.value
                    const description = item.shift()?.value
                    const cd = item.shift()?.valueAsNumber
                    const passive = item.shift()?.checked
                    const image = item.shift()?.value
                    const video = item.shift()?.value
                    if(!hotkey||!name||!description||!image||!video||cd === undefined||passive === undefined) return
                    abilities.push({
                        hotkey,
                        name,
                        description,
                        cd,
                        passive,
                        image,
                        video
                    })
                })
                if(!description||!image||!name||!preview||!talents[0]||!talents[1]||difficulty === undefined||abilities.length !== this.abilityInputs) return alert('Не все поля были заполнены')
                const character:Character = {
                    abilities,
                    description,
                    difficulty,
                    image,
                    name,
                    preview,
                    talents
                }
                this.$emit('add', character)
            }
        }
    })
</script>
<style>
.scrollarea::-webkit-scrollbar{
    display: none;
}
</style>