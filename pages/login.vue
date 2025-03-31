<script lang="js" setup>
import { ref } from 'vue'
const { loggedIn, user, fetch: refreshSession, clear: clearSession } = useUserSession()

const errorMsg = ref(false)

const credentials = reactive({
    username: '',
    password: '',
})

async function logIn() {
    $fetch('/api/login', {
        method: 'POST',
        body: credentials,
    })
    .then(async () => {
        await refreshSession()
        await navigateTo('/home')
    })
    .catch(() => {
        errorMsg.value = true
    })
}

async function logOut() {
    await clearSession()
    await navigateTo('/home')
}
</script>


<template>
  <div class="m-2">
    <div class="flex flex-col w-60 gap-2 mx-auto mt-40">
        <h1 class="text-3xl text-center font-bold"> Log In to Play!</h1>
        <div class="flex flex-col">
            <p class="text-xs text-red-600 pb-1" :class=" errorMsg ? 'opacity-100' : 'opacity-0' ">Wrong Username or Password.</p>
            <input 
                class="outline-1 py-0.5 px-2 rounded-sm focus:none" 
                :class=" errorMsg ? 'outline-red-600' : 'outline-neutral-500' "
                type="text" 
                placeholder="Username..." 
                v-model="credentials.username">
        </div>
        

        <input 
            class="outline-1 py-0.5 px-2 rounded-sm focus:none w-full"
            :class=" errorMsg ? 'outline-red-600' : 'outline-neutral-500' " 
            type="password" 
            placeholder="Password..." 
            v-model="credentials.password">

        <div class="flex flex-col gap-1">
            <button class="outline-1 outline-neutral-500 rounded-sm focus:none px-2 py-0.5 hover:bg-indigo-300 hover:text-white hover:cursor-pointer" @click="logIn()">Log In</button>
            <p class="text-xs">Don't have a user? <NuxtLink href="/signup" class="text-blue-600 hover:underline hover:cursor-pointer">Sign up</NuxtLink>!</p>
        </div>
    </div>
  </div>
</template>

<style>

</style>