<template>
  <div class="metaData">
    <p> Filed in:
      <a :href="getURL(data.category)">
        {{ data.category }}
      </a>
      &nbsp;.&nbsp; Bias:
      <span class="reverse">
        {{ getBias(data.bias) }}
      </span>
    </p>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const getBias = (bias) => {
  const politics = {
    "2": 'Far Right',
    "1": 'Right',
    "0": 'Center',
    "-1": 'Left',
    "-2": 'Far Left'
  }
  return politics[bias]
}

const getURL = (cat) => {
  return `/cat/${cat}`;
};
</script>
