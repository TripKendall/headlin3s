<template>
  <div class="w-full space-y-10 mb-10">
    <ContentHeading :heading="content" />
    <RegisterForm :freeSpots="freeSpotsRemaing" />
  </div>
</template>

<script setup>
import RegisterForm from "./RegisterForm.vue";
import ContentHeading from "../shared/ContentHeading.vue";
const freeSpotsRemaing = 13
const content = {
  header: "New User Sign Up",
  subHeader: "Please use this form to create an account.",
}
</script>
