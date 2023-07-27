<template>
  <section>
    <h4>
      Hot Tags:
    </h4>
    <ul role="list" class="mt-4 space-y-4">
      <li v-for="item in categories" :key="item.name">
        <a :href="item.href" class="footerLinks">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
const categories = [
  { name: "Bitcoin", href: "/tag/bitcoin" },
  { name: "Football", href: "/tag/football" },
  { name: "YouTube", href: "/tag/youtube" },
  { name: "Tech", href: "/tag/tech" },
  { name: "Joe Biden", href: "/tag/joe%20biden"}
];
</script>