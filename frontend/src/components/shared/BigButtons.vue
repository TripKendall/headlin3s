<template>
  <div class="pb-5 md:flex space-x-3 align-top hidden">
    <span v-if="pageRoute !='/'">
      <a href="/" class="primaryButton">
        Home Page
      </a>
    </span>
    <a href="/suggest" class="primaryButton">
      Suggest a Headlin3
    </a>
    <a href="/user/login" class="primaryButton">
      Partner Login
    </a>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute(); // <--- this is the magic line
const pageRoute = route.path; // (it is reactive)
</script>