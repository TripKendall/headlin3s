<template>
  <div class="mt-12 md:mt-0">
    <h4>Bias:</h4>
    <ul role="list" class="mt-4 space-y-4">
      <li v-for="item in external" :key="item.name">
        <a :href="item.href" class="footerLinks">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const external = [
  { name: "Far Right", href: "/sort/far-right" },
  { name: "Right Leaning", href: "/sort/right" },
  { name: "Neutral", href: "/sort/neutral" },
  { name: "Left Leaning", href: "/sort/left" },
  { name: "Far Left", href: "/sort/far-left" },
]
</script>