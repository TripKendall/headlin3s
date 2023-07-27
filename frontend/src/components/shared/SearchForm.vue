<template>
  <section id="searchBox">

    <form class="flex w-full md:ml-0" 
      @submit.prevent="siteSearch">
      
      <label for="search-field" class="sr-only">Search</label>
      
      <div class="ml-1 relative w-full text-slate-500">

        <div class="searchIcon">
          <MagnifyingGlassCircleIcon 
          class="h-5 w-5 flex-shrink-0 cursor-pointer text-slate-400" 
          aria-hidden="true" />
        </div>

        <input name="desktop-search-field" id="searchField"
          class="text-sm h-full w-full py-2 px-10 focus:outline-none focus:ring-0 sm:block" 
          placeholder="Search the News"
          v-model="searchTerm" 
          @keyup.enter="siteSearch" 
          type="search" />
      
      </div>
    </form>

    <div class="mx-2 flex items-center">
      <button type="submit" 
        class="rounded-full hover:bg-orange-500 p-1 text-white bg-slate-500 bg-opacity-50 focus:outline-none">
        <ChevronDoubleRightIcon @click="siteSearch" class="h-3 w-3" aria-hidden="true" />
      </button>
    </div>

  </section>
</template>

<script setup>
import { ref } from "vue";
import { ChevronDoubleRightIcon } from "@heroicons/vue/24/outline";
import { MagnifyingGlassCircleIcon } from "@heroicons/vue/20/solid";
const searchTerm = ref("");

const siteSearch = () => {
  if (searchTerm) {
    window.location.href = `/search/${searchTerm.value}`;
  }
};
</script>
