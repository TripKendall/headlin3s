<template>
  <section class="castVote">
    <p v-if="item.rating">
      Rated: {{ item.rating }}
    </p>
    <span class="flex pt-1 pr-1">
      <ArrowUpCircleIcon 
        @click="voteUp(item.id, item.name)" 
        aria-hidden="true"
        class="arrows flex-1" />
      <ArrowDownCircleIcon 
        @click="voteDown(item.id, item.name)" 
        aria-hidden="true"
        class="arrows" />
    </span>
  </section>
</template>

<script setup>
import { ArrowUpCircleIcon } from "@heroicons/vue/24/outline";
import { ArrowDownCircleIcon } from "@heroicons/vue/24/outline";
import { ref} from "vue";
import swal from "sweetalert2";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const votes = ref(Number(window.localStorage.getItem('votes')));
console.log(votes.value);

const voteUp = (i, t) => {
  swal.fire({
    icon: 'warning',
    name: t,
    text: `You voted up ${t}.`,
    footer: '<a href="/page/help">Have Questions?</a>'
  }).then(() => {
    vote(true, i)
  })
};

const voteDown = (i, t) => {
  swal.fire({
    icon: 'warning',
    name: t,
    text: `You voted down ${t}.`,
    footer: '<a href="/page/help">Have Questions?</a>'
  }).then(() => {
    vote(false, i)
  })
};

const vote = async (v, i) => {

  votes.value = votes.value + 1;
  window.localStorage.setItem('votes', votes.value);

  if (votes.value > 6) {
    swal.fire({
      name: "Too Many Votes",
      text: "You have already voted half a dozen times. Please wait a few minutes before voting again.",
      icon: "error",
      confirmButtonText: "Cool",
    });
    return;
  }

  const apiURL = `http://localhost:5000/api/v1/vote`;

  const response = await fetch(apiURL, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      "id": i,
      "vote": v
    }),
  });

  try {
    const data = await response.json();
    const result = data.success;
    swal.fire({
      name: result,
      text: "Vote Recorded",
      icon: "warning",
      confirmButtonText: "Cool",
    }).then(() => {
      window.location.href = "/";
    });
  } catch (error) {
    console.log(`Could not record vote: ${error}`);
  }
};
</script>