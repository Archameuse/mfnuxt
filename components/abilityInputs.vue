<template>
<div class="select-none">
    <h1 class="text-xl font-medium text-gray-900">Способность {{index}}</h1>
    <div class="flex flex-col gap-5 pt-2">
        <div>
            <label class="text-sm font-medium text-gray-900">Хоткей способности - </label>
            <select :value="getHotkey">
                <option v-for="hotkey of hotkeys" :key="(hotkey + index)">{{hotkey}}</option>
            </select>
        </div>
        <AddInput :value="ability.name" :tag="('ability-name' + index)" text="Название способности" />
        <AddInput :value="ability.description" text="Описание способности" :tag="('ability-description' + index)" variant="area"/>
        <AddInput :value="ability.cd" :tag="('ability-cd' + index)" text="Перезарядка" variant="number" />
        <div class="flex items-center mb-4">
            <input :checked="ability.passive" type="checkbox" :id="('ability-ispassive' + index)" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500">
            <label :for="('ability-ispassive' + index)" class="ml-2 text-sm font-medium text-gray-900">Пассивная</label>
        </div>
        <AddInput :value="ability.image" :tag="('ability-image' + index)" text="Изображение" placeholder='https://i.imgur.com/bJUoGF0.png'/>
        <AddInput :value="ability.video" :tag="('ability-video' + index)" text="Видео" placeholder='https://i.imgur.com/bJUoGF0.png'/>
    </div>
</div>
</template>
<script lang="ts">
import { PropType } from 'vue';

    export default defineNuxtComponent({
        props: {
            index: {
                type: Number,
                default: 1
            },
            ability: {
                type: Object as PropType<Ability>,
                default: {}
            }
        },
        data() {
            return {
                hotkeys: ['Q', 'W', 'R', 'T']
            }
        },
        computed: {
            getHotkey() {
                return this.hotkeys[this.index-1]
            }
        }
    })
</script>
    <!-- <TextInput label='Изображение' placeholder='https://i.imgur.com/bJUoGF0.png'/> -->
    <!-- <TextInput label='Гифка/Видео' placeholder='https://i.imgur.com/bJUoGF0.gif'/> -->