<template>
  <ContentHeading :heading="header" />
  <Headlin3sLoop :data="catLinks" class="mt-5"/>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Headlin3sLoop from "../components/headlin3s/Headlin3sLoop.vue";
import ContentHeading from "../components/shared/ContentHeading.vue";
import dataProcessing from "../js/util.js";
const route = useRoute(); // <--- this is the magic line
const catRoute = route.params.name; // (it is reactive)
const catLinks = ref([]);
const catUrl = `http://localhost:5000/api/v1/links/?category=${catRoute}`;

const getCatLink = async () => {
  try {
    const response = await fetch(catUrl);
    const data = await response.json();
    if (data.count != 0) { 
      const processedData = dataProcessing(data.data);
      catLinks.value = processedData;
     }
  } catch (err) {
    console.log(`getCatLink`);
  }
};

const header ={
  header: catRoute,
  subHeader: `The latest headlin3s from the ${catRoute} category.`,
}

onMounted(() => {
  getCatLink(catRoute);
});

</script>
