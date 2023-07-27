<template>
  <section>
    <div class="homePage">
      <SearchForm />
      <BigButtons />
    </div>
    <LatestHeadlin3s />
  </section>
</template>

<script setup>
import BigButtons from "../components/shared/BigButtons.vue";
import LatestHeadlin3s from "../components/headlin3s/LatestHeadlin3s.vue";
import SearchForm from "../components/shared/SearchForm.vue";
</script>
