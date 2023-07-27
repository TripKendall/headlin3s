<template>
  <!-- {{ data [0] }} -->
  <ul role="list" class="linkGrid sm:grid-cols-4 md:gap-x-4 lg:gap-x-6 lg:gap-y-8 xl:grid-cols-6">
    <li v-for="d in data" :key="d.details.id" class="headline">
      <NewsHeader :data="d.header" />
      <MetaData :data="d.meta" />
      <ShareNetwork :data="d.share" />
      <div class="desc">
        <LinkDescription :data="d.description" />
        <CastVote :item="d.details" />
      </div>
      <LinkTags :tags="d.tags" />
      <span class="text-xs">{{d.details.id}}</span>
    </li>
  </ul>
</template>

<script setup>
import LinkTags from "../shared/TheTags.vue";
import CastVote from "../shared/CastVote.vue";
import MetaData from "../shared/MetaData.vue";
import ShareNetwork from "../shared/ShareNetwork.vue";
import NewsHeader from "../shared/NewsHeader.vue";
import LinkDescription from "../shared/LinkDescription.vue";
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

</script>
