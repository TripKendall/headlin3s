<template>
  <div class="space-y-12">
    <Headlin3sLoop :data="theLinks" />
  </div>
</template>

<script setup>
import Headlin3sLoop from "./Headlin3sLoop.vue";
import { ref, onMounted } from "vue";
import dataProcessing from "../../js/util.js";
const theLinks = ref({})

const getLinks = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/links?sort`);
    const data = await response.json();
    if (data.count != 0) { 
      const processedData = dataProcessing(data.data);
      theLinks.value = processedData;
    }
  } catch (err) {
    console.log(err);
  }
}

onMounted(async () => {
  await getLinks().then(() => {
    console.log('done getting news links');
  });
});

</script>
