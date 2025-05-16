<script lang="ts" setup>
const props = defineProps({
  uid: Number,
});

interface Data {
  Name: String;
  Score: Number;
  Timestamp: String;
}

const { data, status, error, refresh, clear } = await useFetch(
  `/api/userscores?uid=${props.uid}&scoresPerPage=5&page=1`
);
</script>

<template>
  <div>
    <table class="rounded-md w-full text-center">
      <thead>
        <tr>
          <th class="w-3/10 py-1">Game</th>
          <th class="w-2/10">Score</th>
          <th class="w-5/10">Time</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in data" class="odd:bg-gray-200">
          <td class="py-1 rounded-s-md">{{ item.Name }}</td>
          <td>{{ item.Score }}</td>
          <td class="rounded-e-md">{{ item.Timestamp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
