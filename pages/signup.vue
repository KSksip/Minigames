<script lang="ts" setup>
import { useFetch } from '#app'
const { fetch: refreshSession } = useUserSession()

const errorMsg = ref()

const credentials = reactive({
    username: '',
    password: '',
})

async function signUp() {
    await $fetch('/api/signup', {
        method: 'POST',
        body: credentials,
    })
    .then(async () => {
        await refreshSession()
        await navigateTo('/home')
    })
    .catch(() => {
        errorMsg.value = 'Username is taken.'
    })
}
</script>

<template>
  <div class="m-2">
    <div class="flex flex-col w-60 gap-2 mx-auto mt-40">
        <h1 class="text-3xl text-center font-bold pb-2"> Sign Up to Play!</h1>
        <div class="flex flex-col">
            <p class="text-xs text-red-600 pb-1" :class=" errorMsg ? 'opacity-100' : 'opacity-0' ">{{errorMsg}}</p>
            <input 
                class="outline-1 outline-neutral-500 py-0.5 px-2 rounded-sm focus:none" 
                :class=" errorMsg ? 'outline-red-600' : 'outline-neutral-500' "
                type="text" 
                placeholder="Username..." 
                v-model="credentials.username">
        </div>
        

        <input 
            class="outline-1 outline-neutral-500 py-0.5 px-2 rounded-sm focus:none" 
            :class=" errorMsg ? 'outline-red-600' : 'outline-neutral-500' "
            type="password" 
            placeholder="Password..." 
            v-model="credentials.password">

        <div class="flex flex-col gap-1">
            <button class="outline-1 outline-neutral-500 rounded-sm focus:none px-2 py-0.5 hover:bg-indigo-300 hover:text-white hover:cursor-pointer" @click="signUp()">Sign Up</button>
            <p class="text-xs">Already have a user? <NuxtLink href="/login" class="text-blue-600 hover:underline hover:cursor-pointer">Log in</NuxtLink>!</p>
        </div>
    </div>
  </div>
</template>

<style>

</style>