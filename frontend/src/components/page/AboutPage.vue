<template>
  <div class="relative overflow-hidden justify-start">
    <div class="max-w-prose ml-5 justify-start">
      <ContentHeading :heading="header" />
      <div v-for="item in about" :key="item.header" class="my-10">
        <h3 v-if="item.header"> {{ item.header }} </h3>
        <div v-html="item.subHeader" class="mt-4 dark:text-gray-500">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ContentHeading from '../shared/ContentHeading.vue';

const header =
{
  header: "What is Headlin3s",
  subHeader: "HEADLIN3S is my oldest, longest running project. It collects news stories from around the world, categorizes, summarizes, and determines each story's bias. It then ranks them for relevance, reputation, and quality and posts the highest rated each day.",
}

const about = [
  {
    header: "Partner with Headlin3s",
    subHeader: "Do you have a web site or app that needs fresh, currated, categorized news? Only want news that has a right to far right bias? In the state of Florida? Headlin3s provides customized APIs that targets users unique news feed needs. If you need fresh topical or locational news data.",
  },
  {
    header: "Headlin3s Questions",
    subHeader: 'If you have any questions about Headlin3s, please feel free to head on over to the <a href="page/help">Help Page</a> to read the answers to questions about Headlin3s.'
  },
  {
    header: "Want to create your own Headlin3s?",
    subHeader: 'Headlin3s is now multi-user!  We are building multiple collections in addition to Headlin3s classic. If you want to create your own news aggrigation site / system <a href="page/contact">I can help</a>',
  },
  {
    header: "Headlin3s Terms and Info",
    subHeader: "This website will set one cookie on your device and that is CloudFlare's __cfdruid. It is a technical cookie and is exempt under GDPR. CloudFlare is a great service and almost a must to have a modern website. Other than that we do not track you with link or ad trackers; or in any other manner. We do not accept advertising that requires user tracking. This eliminates significant revenue options but we believe that people should be able to read the news without being tracked by us or by a third party.",
  }
]

</script>