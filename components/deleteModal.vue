<template>
    <div tabindex="-1" aria-hidden="true" class="fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-[#0000004b] overflow-x-hidden overflow-y-auto z-50 select-none">
        <div class="relative w-full max-w-2xl h-full">
            <div class="flex flex-col relative top-[25%] h-fit pb-6 bg-white rounded-lg shadow" @click.stop>
                <div class="flex justify-between items-start p-4 rounded-t border-b">
                    <h3 class="text-xl font-semibold text-gray-900">
                        Удалить персонажа - {{characterName}}
                    </h3>
                    <button @click="$emit('close-modal')" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="flex justify-between mt-10 px-10">
                    <button type="button" @click="$emit('delete')" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Удалить</button>
                    <button type="button" @click="$emit('close-modal')" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Отменить</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    export default defineNuxtComponent({
        props: {
            characterName: {
                type: String,
                default: ''
            },
        },
        mounted() {
            window.document.body.style.overflowY = 'hidden'
        },
        unmounted() {
            window.document.body.style.overflowY = ''
        },
    })
</script>
<style>
.scrollarea::-webkit-scrollbar{
    display: none;
}
</style>