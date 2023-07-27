<template>
  <ContentHeading :heading="header" />
  <Headlin3sLoop :data="tagLinks" class="mt-5" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Headlin3sLoop from "../components/headlin3s/Headlin3sLoop.vue";
import ContentHeading from "../components/shared/ContentHeading.vue";
import dataProcessing from "../js/util.js";
const route = useRoute(); // <--- this is the magic line
const tagRoute = route.params.name; // (it is reactive)
const tagLinks = ref([]);
const tagUrl = `http://localhost:5000/api/v1/links/?tags=${tagRoute}`;

const getTagLinks = async () => {
  const response = await fetch(tagUrl);
  const data = await response.json();
  if (data.count != 0) { 
    const processedData = dataProcessing(data.data);
    tagLinks.value = processedData;
  }
};

const header = {
  header: tagRoute,
  subHeader: `Headlin3s tagged with ${tagRoute}`,
}

onMounted(() => {
  try {
    getTagLinks();
  } catch (err) {
    console.log(`getTagLinks error: ${err}`);
  }
});

</script>
