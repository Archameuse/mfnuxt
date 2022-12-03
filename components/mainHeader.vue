<template>
    <div :class="getClass" class='top-0 w-full py-3 px-5 text-white flex justify-between overflow-hidden font-cuprum h-20'>
      <div class="flex justify-center text-center gap-5 text-xl">
        <div class="relative h-full w-16">
            <NuxtLink draggable="false" to="/">
              <nuxt-img draggable="false" src='/mflogosquare.png' preload alt='Magic Football Logo' class="object-contain drop-shadow h-full w-full object-center"/>
            </NuxtLink>
        </div>
        <ButtonHeader label="герои" link="/heroes"/>
        <!-- <ButtonHeader label="патчи" /> -->
        <ButtonHeader label="статистка" link="/statistics"/>
      </div>
      <div class="flex flex-col justify-center items-end text-center text-base">
        <div v-if="data?.user" class="flex flex-row">
          <h1 class="m-0 p-0 mr-5">{{data.user.name}}</h1>
          <AuthHeader :event="signOut" label="выйти" />
        </div>
        <AuthHeader :event="() => signIn('discord')" label="войти" v-else/>
        <!-- <ButtonHeader label="язык" />  -->
      </div>
    </div>
</template>

<script lang="ts">
  export default defineNuxtComponent({
    setup() {
      const { data, signIn, signOut } = useSession()
      return {
        signIn,
        signOut,
        data
      }
    },
    computed: {
      getClass() {
        if(this.$route.fullPath === '/') return 'absolute z-40'
        return 'relative z-20 bg-gradient-to-b from-[#98ce9f] to-[#97be84]'
      }
    }
  })
</script>
