<template>

  <div v-if="adminRoute == 'add'">
    <ManualSubmit />
  </div>
  <div v-if="adminRoute == 'manage'">
    <ManageLinks />
  </div>


  <!-- Batch functions, etc go here.  
  maybe even a dashboard if I can ever get away from having to do plumbing. -->
</template>

<script setup>

import ManualSubmit from "../components/admin/ManualSubmit.vue";
import ManageLinks from "../components/admin/ManageLinks.vue";

import { useRoute } from "vue-router";
const route = useRoute(); // <--- this is the magic line
const adminRoute = route.params.view; // (it is reactive)



</script>
