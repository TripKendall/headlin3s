<template>
  <div class="share">
    Share:&nbsp; <ShareNetwork v-for="network in networks"
        :network="network.network"
        :key="network.network"
        :url=data.url
        :title=data.name
        :description=data.shareDescription
        :hashtags=data.tagString
        twitterUser="headlin3s">
        <i :class="network.icon"></i>
        <span>{{ network.name }}</span>
      </ShareNetwork>
  </div>
</template>


<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const networks = [
  {
    network: "email",
    name: "Email",
    icon: "far fah fa-lg fa-envelope",
    color: "#ddd",
  },
  {
    network: "sms",
    name: "SMS",
    icon: "far fah fa-lg fa-comment-dots",
    color: "#ddd",
  },
  {
    network: "twitter",
    name: "Twitter",
    icon: "fab fah fa-lg fa-twitter",
    color: "#ddd",
  },
]

</script>
