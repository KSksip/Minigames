<script lang="ts" setup>
import gamesList from "~/components/games-list.vue";
import personalLeaderboard from "~/components/personal-leaderboard.vue";

const { loggedIn, user, fetch: refreshSession, clear: clearSession } = useUserSession();

async function logOut() {
  await navigateTo("/login");
  await clearSession();
}
</script>

<template>
  <div class="flex h-full m-6 gap-4 text-neutral-800">
    <div class="flex flex-col gap-4">
      <div
        class="w-120 outline-1 outline-neutral-300 rounded-md bg-white drop-shadow-md p-8 flex flex-col"
      >
        <div class="flex justify-between p-2">
          <div class="flex gap-6 w-full">
            <Icon
              name="i-heroicons-user-circle-solid"
              class="scale-300 mt-2 ms-2 translate-y-1"
            ></Icon>
            <h1 class="text-3xl font-bold overflow-hidden">{{ user.name as user }}</h1>
          </div>
        </div>

        <div class="p-2">
          <hr class="border-neutral-300" />
        </div>

        <div class="flex gap-2">
          <button
            class="hover:cursor-pointer hover:text-gray-500 translate-y-1 p-2"
            @click=""
          >
            <Icon name="i-heroicons-cog-6-tooth-solid" class="scale-175"></Icon>
          </button>

          <button
            class="hover:cursor-pointer hover:text-red-500 translate-y-1 p-2"
            @click="logOut"
          >
            <Icon
              name="i-heroicons-arrow-right-start-on-rectangle"
              class="scale-175"
            ></Icon>
          </button>
        </div>
      </div>

      <div
        class="w-120 outline-1 outline-neutral-300 rounded-md bg-white drop-shadow-md p-8 flex flex-col gap-4"
      >
        <h1 class="text-2xl font-bold overflow-hidden">Your Scores</h1>
        <div>
          <personalLeaderboard :uid="user.uid" />
        </div>
      </div>

      <div
        class="w-120 outline-1 outline-neutral-300 rounded-md bg-white drop-shadow-md p-8 flex flex-col gap-4"
      >
        <h1 class="text-2xl font-bold overflow-hidden">Leaderboard</h1>
      </div>
    </div>

    <div
      class="grow outline-1 outline-neutral-300 rounded-md bg-white drop-shadow-md p-4 flex flex-col"
    >
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold overflow-hidden">Games</h1>
        <hr class="border-neutral-300 w-60 mb-2" />

        <div class="flex flex-wrap gap-4">
          <gamesList />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
