<template>
  <div class="sm:flex sm:items-center ml-2 mb-2">
    <div class="sm:flex-auto">
      <ContentHeading :heading="header" />
    </div>
    <a href="/admin/manage" class="primaryButton">
      Manage Headlin3s
    </a>
  </div>
  <form @submit.prevent id="addHeadlin3Form">
    <dl>
      <dt>Add News Story Link:</dt>
      <dd class="sm:col-span-2">
        <div class="flex-grow">
          <input type="text" class="formInput" v-model="url" />
        </div>
      </dd>

      <dt>Title:</dt>
      <dd class="sm:col-span-2">
        <div class="flex-grow">
          <input type="text" class="formInput" v-model="name" />
          <span class="formHelpers">
            The Actual Headlin3 - Around 25 characters is ideal.
            <span class="text-orange-500">{{ name.length }}</span> / 25
          </span>
        </div>
      </dd>

      <dt>Description:</dt>
      <dd class="sm:col-span-2">
        <div class="flex-grow">
          <textarea rows="2" cols="50" class="formInput" v-model="desc" />
          <span class="formHelpers">
            Be descriptive! Around 75 characters is ideal.
            <span class="text-orange-500">{{ desc.length }}</span> / 75
          </span>
        </div>
      </dd>

      <div class="flex">
        <div class="mr-5">
          <dt>Category:</dt>
          <dd class="sm:col-span-2">
            <div class="flex-grow">
              <select id="selected-tab" name="selected-tab" v-model="category" class="formInput sm:text-sm">
                <option v-for="cat in cats" :key="cat">
                  {{ cat }}
                </option>
              </select>
            </div>
          </dd>
        </div>

        <div class="mr-5">
          <dt>Bias:</dt>
          <dd class="sm:col-span-2">
            <div class="flex-grow">
              <select id="selected-tab" name="selected-tab" v-model="pol" class="formInput sm:text-sm">
                <option v-for="b in bias" :key="b">
                  {{ b }}
                </option>
              </select>
            </div>
          </dd>
        </div>

        <div class="flex-1">
          <dt>Tags:</dt>
          <dd class="sm:col-span-2">
            <div class="flex-grow">
              <input type="text" class="formInput" v-model="tags" />
              <span class="formHelpers">Separate tags with a comma.</span>
            </div>
          </dd>
        </div>
      </div>

      <div class="-mt-5 flex">

        <div class="flex-1 mr-5">
          <dt>Image:</dt>
          <dd class="sm:col-span-2">
            <div class="flex-grow">
              <input type="text" class="formInput" v-model="image" />
              <span class="formHelpers">This should always end in .webp!</span>
            </div>
          </dd>
        </div>

        <div class="flex-1">
          <dt>Dateline:</dt>
          <dd class="sm:col-span-2">
            <div class="flex-grow">
              <input type="text" class="formInput" v-model="dateline" />
              <span class="formHelpers">Where did it take place?</span>
            </div>
          </dd>
        </div>

      </div>
    </dl>

    <div class="flex justify-start mb-10 mt-5">
      <button type="submit" class="primaryButton" @click="handleSubmit">
        Suggest a Link
      </button>
    </div>

  </form>
</template>

<script setup>
import { ref } from "vue";
import swal from "sweetalert2";
import { cats } from "../../js/cats";
import { bias } from "../../js/bias.js";
import { token } from "../../js/test.js";
import validateData from "../../js/validate.js";
import ContentHeading from "../shared/ContentHeading.vue";
const name = ref("");
const desc = ref("");
const url = ref("");
const tags = ref("");
const image = ref("");
const dateline = ref("");
const category = ref(cats[0]);
const pol = ref(bias[0]);
const apiURL = `http://localhost:5000/api/v1/org/63fcba2a292f0a3e8fe0f21e/links`;

const header = {
  header: "Headlin3 Admin",
  subHeader: "This is the headlin3s management section.  Navigate via url path.",
}

const handleSubmit = async () => {

  const bodyData = {
    name: name.value,
    url: url.value,
    desc: desc.value,
    image: image.value,
    clicks: Math.floor(Math.random() * 5) + 1,
    rating: Math.floor(Math.random() * 3) + 1,
    similar: [],
    tags: tags.value.split(",").map((e) => e.trim()),
    pol: pol.value,
    category: category.value,
    dateline: dateline.value,
  }

  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`, // notice the Bearer before your token
  }

  if (validateData(bodyData)) {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bodyData),
    });

    try {
      const data = await response.json();
      const result = data.success;
      swal.fire({
        name: result,
        text: "Your link has been added!",
        icon: "warning",
        confirmButtonText: "Cool",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
