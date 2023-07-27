<template>
  <div class="relative overflow-hidden ml-5">
    <ContentHeading :heading="header" />
    <div class="rounded-2xl m-5 p-2 pt-5 justify-start">
      <Disclosure v-slot="{ open }" v-for="h in help" :key="h.id">
        <DisclosureButton class="disclosure">
          <span> {{ h.question }} </span>
          <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-orange-500" />
        </DisclosureButton>
        <DisclosurePanel class="panel">
          <p v-html="h.answer" class="mb-5"> </p>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script setup>
import ContentHeading from '../shared/ContentHeading.vue';
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import { Disclosure, DisclosureButton, DisclosurePanel, } from '@headlessui/vue'
import { help } from "../../js/help.js";

const header = 
  {
    header: "What is Headlin3s?",
    subHeader: "Headlin3s is a news aggregator that pulls the latest news from a variety of sources; determines bias, chooses the most important stories, and presents them in a clean, easy to read format.",
  }
</script>
