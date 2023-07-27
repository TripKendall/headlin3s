<template>
  <footer id="footer" aria-labelledby="footer-heading">
    <h3 id="footer-heading" class="sr-only">Footer</h3>
    <aside>
      <FooterLinks />
      <FooterNav />
    </aside>
  </footer>
</template>

<script setup>
import FooterNav from "./Footer/FooterNav.vue";
import FooterLinks from "./Footer/FooterLinks.vue";
</script>
