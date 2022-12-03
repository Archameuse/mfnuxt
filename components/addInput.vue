<template>
    <div class="flex flex-col w-full">
        <label v-if="text" :for="tag" class="block mb-2 text-sm font-medium text-gray-900 w-fit">
            {{text + `${isRange ? ` - ${val}` : ''}`}}
        </label>
        <input :value="value" type="text" :placeholder="placeholder" v-if="isText" :id="tag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        <textarea :value="value" v-else-if="isArea" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" rows="4" :name="tag" :id="tag">{{placeholder}}</textarea>
        <input v-else-if="isRange" type="range" :id="tag" step="1" max="5" min="1" :value="val" @input="test">
        <input :value="value||'0'" v-else-if="isNumber" type="number" :id="tag" step="1" min="0" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5">
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
    type varType = "text"|"area"|"slider"|"number"
    export default defineNuxtComponent({
        props: {
            text: {
                type: String,
                default: ''
            },
            tag: {
                type: String,
                default: 'default'
            },
            placeholder: {
                type: String,
                default: ''
            },
            variant: {
                type: String as PropType<varType>,
                default: 'text'
            },
            value: {
                type: [String, Number],
                default: ''
            }
        },
        data() {
            return {
                val: this.value||3
            }
        },
        methods: {
            test(e:Event) {
                const target = e.target as HTMLInputElement
                this.val = Number.parseInt(target.value)
            }
        },
        computed: {
            isText() {
                return this.variant === 'text'
            },
            isArea() {
                return this.variant === 'area'
            },
            isRange() {
                return this.variant === 'slider'
            },
            isNumber() {
                return this.variant === 'number'
            }
        }
    })
</script>