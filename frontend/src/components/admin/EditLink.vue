<template>
  <form @submit.prevent id="addHeadlin3Form">

    <div class="flex">

      <div class="mr-5 flex-grow">
        <div class="flex">
          <span class="text-xs">Name:</span>
          <div v-if="link.name" class="text-xs">
            <span class="text-orange-500"> &nbsp; {{ link.name.length }}</span> / 25
          </div>
        </div>
        <input type="text" class="formInput" v-model="link.name" />
      </div>

      <div class="mr-5 flex-grow">
        <div class="flex">
          <span class="text-xs">Tags:</span>
          <div class="text-xs">
          </div>
        </div>
        <input type="text" class="formInput" v-model="link.tags" />
      </div>

      <div class="flex-grow">
        <div class="flex">
          <span class="text-xs">Dateline:</span>
          <div class="text-xs">
          </div>
        </div>
        <input type="text" class="formInput" v-model="link.dateline" />
      </div>
    </div>

    <div class="flex-grow">
      <div class="flex mt-5">
        <span class="text-xs ml-1">Headlin3 URL:</span>
        <div class="text-xs">
          This should start with https: and should not contain any query
          parameters / trackers / etc.
        </div>
      </div>
      <input type="text" class="formInput" v-model="link.url" />
    </div>

    <div class="flex-grow">
      <div class="flex mt-5">
        <span class="text-xs ml-1">Headlin3 Description:</span>
        <div v-if="link.desc" class="text-xs">
          <span class="text-orange-500">&nbsp; {{ link.desc.length }}</span> / 75
        </div>
      </div>
      <textarea rows="2" cols="50" class="formInput flex-grow" v-model="link.desc" />
    </div>

    <div class="flex align-middle mt-3">
      <div class="flex align-middle ml-1">
        <div class="mr-5 align-middle text-xs">
          Bias: <input type="text" class="formInput" v-model="link.pol" />
        </div>
      </div>
      <div class="flex mr-5">
        <div class="text-xs">
          Rating: <input type="text" class="formInput" v-model="link.rating" />
        </div>
      </div>
      <div class="flex">
        <div class="mr-5 text-xs">
          Clicks: <input type="text" class="formInput" v-model="link.clicks" />
        </div>
      </div>
      <div class="flex-grow text-xs">
        Image: <input type="text" class="formInput" v-model="link.image" />
      </div>
    </div>

    <div class="flex justify-start mb-10 mt-5">
      <button type="submit" class="primaryButton" @click="handleEditLink">
        Edit Link
      </button>
    </div>

  </form>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import { token } from "../../js/test.js";
const link = ref({});
const result = ref('');

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const getLink = async () => {
  const response = await fetch(`http://localhost:5000/api/v1/links/${props.id}`);
  const data = await response.json();
  if (!data) {
    link.value = '{"error": "No Data"}';
    return
  }
  link.value = data.data;
}

const handleEditLink = async () => {

  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`, // notice the Bearer before your token
  }

  const response = await fetch(`http://localhost:5000/api/v1/links/${props.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(link.value),
  });

  const data = await response.json();

  if (data.success === false) {
    result.value = 'Error - Update Failed';
    return
  }

  result.value = data.success;

  Swal.fire({
    title: 'Success!',
    text: 'Link Updated',
    icon: 'success',
    confirmButtonText: 'Cool'
  }).then(() => {
    window.location.href = '/admin/manage';
  });
}

onMounted(async () => {
  try {
    await getLink().then(() => {
      // console.log('done getting link to edit');
    });
  } catch (err) {
    console.log(err);
  }
});

</script>