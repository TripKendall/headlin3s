<template>
  <div class="theTags">
    <span v-for="tag in tags">
      <a :href="getURL(tag)">
        {{ tag }}
      </a>
    </span>
  </div>
</template>

<script setup>
defineProps({
  tags: {
    type: Array,
    required: true,
  },
});

const getURL = (tag) => {
  return `/tag/${tag}`;
};
</script>
