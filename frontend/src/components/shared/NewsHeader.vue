<template>
  <a 
    :href="data.url" 
    class="newsHeader" 
    target="_blank">
    <img 
      :src="`../images/${data.img}`" 
      :alt=data.name />
    <h5>{{ data.name }}</h5>
  </a>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
