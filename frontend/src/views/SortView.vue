<template>
  <ContentHeading :heading="header" />
  <Headlin3sLoop :data="sortLinks" class="mt-5" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Headlin3sLoop from "../components/headlin3s/Headlin3sLoop.vue";
import ContentHeading from "../components/shared/ContentHeading.vue";
import dataProcessing from "../js/util.js";
import routeSort from "../js/sort";
const route = useRoute(); // <--- this is the magic line
const sortRoute = route.params.view; // (it is reactive)
const sortLinks = ref([]);
const url = routeSort(sortRoute);

const getsortLinks = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.count != 0) { 
      const processedData = dataProcessing(data.data);
      sortLinks.value = processedData;
     }
  } catch (err) {
    console.log(`get sort links error: ${err}`);
  }
};

const header =
{
  header: sortRoute,
  subHeader: `News Sorted by ${sortRoute}`,
}

onMounted(() => {
  getsortLinks(sortRoute);
});
</script>
