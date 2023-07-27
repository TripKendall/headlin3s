<template>
  <section>
    <Header />
    <main class="sectionContain">
      <router-view />
    </main>
    <Footer />
  </section>

</template>

<script setup>
import Header from "./components/layout/TheHeader.vue";
import Footer from "./components/layout/TheFooter.vue";
</script>