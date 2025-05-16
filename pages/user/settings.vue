<script lang="ts" setup>
import { useTemplateRef } from "vue";

const { user } = useUserSession();

const userData = await $fetch("/api/get-user-info", {
  method: "POST",
});

const dataCheck = ref({
  Email: "",
  Username: "",
});

const userCredentials = ref({
  Email: "",
  Username: "",
});

const credentialModification = ref({
  Email: false,
  Username: false,
});

userCredentials.value = JSON.stringify(userData[0]);
userCredentials.value = JSON.parse(userCredentials.value);
</script>

<template>
  <div class="flex m-6 gap-4 text-gray-800">
    <div class="flex flex-col w-full gap-4">
      <div
        class="w-full outline-1 outline-gray-300 rounded-md bg-white drop-shadow-md flex justify-between p-4"
      >
        <h1 class="text-3xl font-bold overflow-hidden pb-0.5">Your Settings</h1>
        <div class="flex pe-2">
          <NuxtLink to="/home">
            <Icon
              name="i-heroicons-home-solid"
              class="scale-175 translate-y-2 hover:cursor-pointer hover:text-gray-500"
            ></Icon>
          </NuxtLink>
        </div>
      </div>

      <div class="flex gap-4">
        <div
          class="w-1/2 outline-1 outline-gray-300 rounded-md bg-white drop-shadow-md p-8 flex-col gap-4"
        >
          <h2 class="text-2xl font-bold overflow-hidden">Account Details</h2>
          <div class="flex">
            <div class="grid grid-cols-2 gap-3 w-full">
              <h4 class="text-lg col-span-2 -mb-2 mt-2">Username</h4>
              <input
                placeholder="Username..."
                v-model="userCredentials.Username"
                class="flex w-full rounded-md outline-gray-300 px-2 py-1 inset-shadow-sm inset-shadow-gray-300/7 5 bg-white"
                :class="!credentialModification.Username ? '' : 'outline'"
                :disabled="!credentialModification.Username"
              />
              <button
                v-if="!credentialModification.Username"
                class="outline outline-gray-300 w-fit px-2 py-1 rounded-md drop-shadow-sm hover:drop-shadow-none hover:inset-shadow-sm inset-shadow-gray-300/75 bg-white hover:cursor-pointer"
                @click="
                  credentialModification.Username = !credentialModification.Username
                "
              >
                Change
              </button>

              <h4 class="text-lg col-span-2 -mb-2 mt-2">Email</h4>
              <input
                placeholder="Email..."
                v-model="userCredentials.Email"
                class="flex w-full rounded-md outline-gray-300 px-2 py-1 inset-shadow-sm inset-shadow-gray-300/7 5 bg-white"
                :class="!credentialModification.Email ? '' : 'outline'"
                :disabled="!credentialModification.Email"
              />
              <button
                v-if="userCredentials"
                class="outline outline-gray-300 w-fit px-2 py-1 rounded-md drop-shadow-sm hover:drop-shadow-none hover:inset-shadow-sm inset-shadow-gray-300/75 bg-white hover:cursor-pointer"
                @click="credentialModification.Email = !credentialModification.Email"
              >
                Change
              </button>
            </div>
          </div>

          <div class="flex gap-4 mt-6 justify-between">
            <button
              class="outline outline-gray-300 px-2 py-1 rounded-md drop-shadow-sm hover:drop-shadow-none hover:inset-shadow-sm inset-shadow-gray-300/75 bg-white hover:cursor-pointer"
            >
              Change Password
            </button>

            <button
              v-if="JSON.stringify(userCredentials) != JSON.stringify(userData[0])"
              class="outline outline-emerald-500 px-2 py-1 rounded-md drop-shadow-sm hover:drop-shadow-none hover:inset-shadow-sm inset-shadow-black/20 bg-emerald-500 text-white hover:cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div
          class="w-1/2 outline-1 outline-gray-300 rounded-md bg-white drop-shadow-md p-8 flex-col gap-4"
        >
          <h2 class="text-2xl font-bold overflow-hidden">Account Management</h2>
          <button
            class="mt-6 outline outline-red-300 text-red-500 px-2 py-1 rounded-md drop-shadow-sm hover:drop-shadow-none hover:inset-shadow-sm inset-shadow-gray-300/75 bg-white hover:cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
