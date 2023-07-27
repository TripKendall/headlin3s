<template>
  <section>
    <!-- This is a little wonky because that resultCount computed property is 
    the bullet-proof way to get that results count. -->
    <ContentHeading 
      :heading="{
        header: searchTerm,
        subHeader: `${resultCount} Results for ${searchTerm}`
      }" />
    <Headlin3sLoop :data="returnedLinks" class="mt-5" />
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import ContentHeading from "../components/shared/ContentHeading.vue";
import Headlin3sLoop from "../components/headlin3s/Headlin3sLoop.vue";
import dataProcessing from "../js/util.js";
const route = useRoute();
const searchTerm = route.params.searchTerm; // (it is reactive)
const returnedLinks = ref([]);

const getSearchedLinks = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      searchTerm: searchTerm,
    }),
  };

  const response = await fetch(
    "http://localhost:5000/api/v1/search",
    requestOptions
  );

  const data = await response.json();
  if (data.count != 0) {
    const processedData = dataProcessing(data.data);
    returnedLinks.value = processedData;
  }
};

onMounted(() => {
  try {
    getSearchedLinks();
  } catch (err) {
    console.log(`getSearchedLinks error: ${err}`);
  }
});

const resultCount = computed(() => {
  return returnedLinks.value.length;
});

</script>
