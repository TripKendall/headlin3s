<template>
  <div class="contentHeading">
    <h3 v-if="heading.header">
      {{ heading.header }}
    </h3>
    <p class="uppercase">
     {{ heading.subHeader }} 
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
})
</script>