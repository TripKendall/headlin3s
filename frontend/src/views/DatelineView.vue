<template>
  <ContentHeading :heading="header" />
  <Headlin3sLoop :data="newsLinks" class="mt-5" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Headlin3sLoop from "../components/headlin3s/Headlin3sLoop.vue";
import ContentHeading from "../components/shared/ContentHeading.vue";
import dataProcessing from "../js/util.js";
const route = useRoute(); // <--- this is the magic line
const placeRoute = route.params.place; // (it is reactive)
const newsLinks = ref([]);
const dateline = placeRoute[0].toUpperCase() + placeRoute.slice(1);
const placeUrl = `http://localhost:5000/api/v1/links/?dateline=${dateline}`;

const getNewsLinks = async () => {
  try {
    const response = await fetch(placeUrl);
    const data = await response.json();
    if (data.count != 0) { 
      const processedData = dataProcessing(data.data);
      newsLinks.value = processedData;
     }
  } catch (err) {
    console.log(`getNewsLinks error: ${err}`);
  }
};

const header =
{
  header: dateline,
  subHeader: `Headlin3s From ${dateline}`,
}

onMounted(() => {
  getNewsLinks(placeRoute);
});
</script>
