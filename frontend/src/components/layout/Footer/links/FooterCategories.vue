<template>
  <div class="mt-12 md:mt-0">
    <h4>Categories:</h4>
    <ul role="list" class="mt-4 space-y-4">
      <li v-for="item in categories" :key="item.name">
        <a :href="item.href" class="footerLinks">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const categories =  [
    { name: "Social Media", href: "/cat/social media" },
    { name: "Politics", href: "/cat/politics" },
    { name: "Sports", href: "/cat/sports" },
    { name: "Crypto", href: "/cat/crypto" },
    { name: "YouTube", href: "/cat/youtube" },
  ];
</script>