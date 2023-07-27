<template>
  <div class="">
    <p class="meta mb-2">Dateline:
      <a :href="getURL(data.dateline)">{{ data.dateline }}</a></p>
    <p> {{ data.description }} </p>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const getURL = (dateline) => {
  return `/dateline/${dateline}`;
};
</script>
