<script lang="ts" setup>
const { user } = useUserSession();

const { data } = await useFetch(`/api/userscores?uid=${user.value.uid}&gid=1`, {
  method: "GET",
});

const scoreList = ref([]);

for (const item of data.value) {
  scoreList.value.push(item.Score);
}

console.log(data);
console.log(scoreList.value);

const paused = ref(false);
const gameOver = ref(false);

function randInt(max: number) {
  return Math.floor(Math.random() * max);
}

const snake = ref({
  head: {
    direction: 1,
    position: 108,
  },
  body: [106, 107, 108],
  apple: 113,
  score: 0,
});

function move(tiles: number) {
  let collisionAdjustement = 0;
  if (snake.value.head.position % 15) {
    collisionAdjustement = 1;
  } else {
    collisionAdjustement = 0;
  }

  if (
    !snake.value.body.includes(snake.value.head.position + tiles) &&
    snake.value.head.position % 15 != collisionAdjustement &&
    snake.value.head.position + tiles > 0 &&
    snake.value.head.position + tiles < 225
  ) {
    snake.value.head.position += tiles;
    snake.value.body.shift();
    snake.value.body.push(snake.value.head.position);
    if (snake.value.head.position == snake.value.apple) {
      snake.value.body.push(snake.value.apple);
      snake.value.apple = randInt(225);
      snake.value.score++;
    }
  } else {
    gameOver.value = true;
    uploadScore();
  }
}

function turn(direction: number) {
  if (!snake.value.body.includes(direction + snake.value.head.position)) {
    snake.value.head.direction = direction;
  }
}

async function uploadScore() {
  const res = await $fetch("/api/updateScore", {
    method: "POST",
    body: {
      uId: user.value.uid,
      score: snake.value.score,
      gId: 1,
    },
  });
}

const intervalId = setInterval(function () {
  if (!paused.value && !gameOver.value) {
    move(snake.value.head.direction);
  }
}, 400);

function playAgain() {
  snake.value = {
    head: {
      direction: 1,
      position: 108,
    },
    body: [106, 107, 108],
    apple: 113,
    score: 0,
  };

  gameOver.value = false;
}

intervalId;
</script>

<template>
  <div class="flex h-screen">
    <input
      class="fixed w-full h-full opacity-0"
      @keydown.down="turn(15)"
      @keydown.right="turn(1)"
      @keydown.left="turn(-1)"
      @keydown.up="turn(-15)"
      @keydown.space="paused = !paused"
      type="text"
    />
    <div class="flex flex-row justify-center h-200 gap-3 m-auto">
      <div class="flex h-fit">
        <div
          class="outline-1 outline-neutral-300 rounded-md flex justify-center px-6 py-4 font-black text-neutral-700 text-xl gap-10"
        >
          <div class="flex flex-col">
            <span class="m-auto w-fit">Current</span>
            <span class="mx-auto text-4xl">{{ snake.score }}</span>
          </div>

          <div class="flex flex-col">
            <span class="mx-auto">Hi-score</span>
            <span class="mx-auto text-4xl">{{ Math.max(...scoreList) }}</span>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-15 grid-rows-15 w-200 h-200 outline-2 outline-neutral-200 rounded-md"
      >
        <div
          v-for="i in 225"
          class="p-2 text-center"
          :class="snake.body.includes(i) ? 'bg-green-400' : 'odd:bg-neutral-200'"
        >
          <div v-if="i == snake.apple" class="bg-red-500 rounded-full size-full"></div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="gameOver"
    class="fixed top-1/2 left-1/2 -translate-1/2 outline-1 outline-neutral-300 rounded-xl p-3 bg-white w-50 h-fit"
  >
    <div class="opacity-140 flex flex-col gap-2 justify-between h-fit p-5">
      <span class="text-3xl font-black text-neutral-700 mx-auto">You lost!</span>
      <span class="text-5xl font-black text-neutral-700 mx-auto">{{ snake.score }}</span>
      <button
        @click="playAgain"
        class="bg-green-500 rounded-md text-white font-bold text-lg size-fit px-3 py-1 mx-auto hover:cursor-pointer"
      >
        Play Again!
      </button>
      <NuxtLink
        class="bg-gray-500 rounded-md text-white font-bold text-lg size-fit px-3 py-1 mx-auto hover:cursor-pointer"
        to="/home"
        >Home</NuxtLink
      >
    </div>
  </div>
</template>

<style></style>
