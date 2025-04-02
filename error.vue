<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div class="flex flex-col h-screen justify-center">
    <div
      class="size-fit m-auto outline p-10 text-center outline-neutral-300 rounded-md bg-white drop-shadow-md text-neutral-800"
    >
      <h1 class="text-7xl font-bold">{{ error.statusCode }}</h1>
      <h2 class="text-4xl">{{ error.statusMessage }}</h2>
    </div>
  </div>
</template>
