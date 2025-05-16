<script lang="ts" setup>
const { data, status, error, refresh, clear } = await useFetch("/api/gameslist");
</script>

<template>
  <NuxtLink
    :to="`/games/${game.Name.toLowerCase()}`"
    v-for="game in data"
    class="outline outline-neutral-300 p-2 rounded-sm w-50 h-30 flex flex-col hover:bg-neutral-300 hover:cursor-pointer"
  >
    <Icon :name="game.Image" class="scale-400 mx-auto my-auto"></Icon>
    <p class="mx-auto text-xl font-bold">{{ game.Name }}</p>
  </NuxtLink>
</template>

<style></style>
