<template>
  <div class="grid grid-cols-2 gap-8 xl:col-span-4 p-10">
    <div class="md:grid md:grid-cols-2 md:gap-8">
      <FooterTags />
      <FooterCategories />
    </div>
    <div class="md:grid md:grid-cols-2 md:gap-8">
      <FooterInternal />
      <FooterExternal />
    </div>
  </div>
</template>

<script setup>
import FooterTags from "./links/FooterTags.vue";
import FooterCategories from "./links/FooterCategories.vue";
import FooterInternal from "./links/FooterInternal.vue";
import FooterExternal from "./links/FooterExternal.vue";
</script>
