<template>
  <div class="notFound">
    <main class="mx-auto max-w-max sm:flex">
      <span class="responseCode"> 404 </span>
      <div class="ml-5">
        <ContentHeading :heading="header" />
        <BigButtons class="mt-5" />
      </div>
    </main>
  </div>
</template>

<script setup>
import BigButtons from "../components/shared/BigButtons.vue";
import ContentHeading from "../components/shared/ContentHeading.vue";
import { useRoute } from "vue-router";
const route = useRoute(); // <--- this is the magic line
let pageRoute = route.path; // (it is reactive)
pageRoute = pageRoute.substring(1)

const header =
{
  header: `"${pageRoute}" not found`,
  subHeader: "Please check the URL in the address bar and try again.",
}
</script>
