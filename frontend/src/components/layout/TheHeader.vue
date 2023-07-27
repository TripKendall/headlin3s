<template>
  <section class="flex sectionContain">
    <div class="flex-1">
      <div class="flex">
        <img src="../../assets/logo.webp" 
          alt="Headlin3s News Headlines" 
          class="h-10 w-10" />
        <div>
          <a href="/"> <h1>Headlin3s</h1> </a>
          <h2>Alternative News Headlines</h2>
        </div>
      </div>
    </div>
    <div>
      <Switch v-model="isDark" 
        class="mainSwitch">
        <span class="sr-only">
          Toggle Dark Mode
        </span>
        <span 
          :class="isDark ? 'translate-x-6 bg-black' : 'translate-x-1 bg-white'"
          class="inline-block h-4 w-4 transform rounded-full transition" />
      </Switch>
    </div>
  </section>
</template>

<script setup>
import { useDark } from "@vueuse/core";
import { ref } from "vue";
import { Switch } from "@headlessui/vue";
const isDark = ref(useDark());
</script>
