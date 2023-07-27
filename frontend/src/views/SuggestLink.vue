<template>
  <ContentHeading :heading="header" />

  <form @submit.prevent>
    <dl>
      <div class="formGrid mt-10 md:grid sm:block">
        <dt>Your Email Address*:</dt>
        <dd class="sm:col-span-2">
          <div class="flex-grow">
            <input type="text" class="formInput" v-model="emailAddress" />
            <span class="formHelpers">
              * We will not share your email address with anyone. We will only use it to contact you if we have questions
              about your submission.
            </span>
          </div>
        </dd>
      </div>

      <div class="formGrid md:grid sm:block">
        <dt>Suggest News Story Link:</dt>
        <dd class="sm:col-span-2">
          <div class="flex-grow">
            <input type="text" class="formInput" v-model="linkUrl" />
            <span class="formHelpers">
              Please enter the URL of the news story you would like to suggest.
            </span>
          </div>
        </dd>
      </div>

      <div>
        <h5 class="my-5">Optional Fields:</h5>
        <span class="formHelpers mb-5">
          None of the remaining fields are required, but it's quite helpful when
          users provide quality information on the stories that they submit.
          If you have a title, description, category, or tags, please enter them below.
        </span>
      </div>

      <div class="formGrid md:grid sm:block">
        <dt>Title:</dt>
        <dd class="sm:col-span-2">
          <div class="flex-grow">
            <input type="text" class="formInput" v-model="linkTitle" />
            <span class="formHelpers">
              Please provide a title as pithfully as possible.
            </span>
          </div>
        </dd>
      </div>

      <div class="formGrid md:grid sm:block">
        <dt>Description:</dt>
        <dd class="sm:col-span-2">
          <div class="flex-grow">
            <textarea rows="4" cols="50" class="formInput" v-model="linkDescription" />
            <span class="formHelpers">
              The key to a description is to be descriptive! All hype will be stripped.
            </span>
          </div>
        </dd>
      </div>

      <div class="formGrid md:grid sm:block">
        <dt>Category:</dt>
        <dd class="sm:col-span-2">
          <div class="flex-grow">
            <select id="selected-tab" name="selected-tab" v-model="linkCat" class="formInput sm:text-sm">
              <option v-for="cat in cats" :key="cat">
                {{ cat }}
              </option>
            </select>
            <span class="formHelpers">
              Choose a category that best fits your submission.
            </span>
          </div>
        </dd>
      </div>

      <div class="formGrid md:grid sm:block">
        <dt>Tags:</dt>
        <dd class="sm:col-span-2">
          <div class="flex-grow">
            <input type="text" class="formInput" v-model="linkTags" />
            <span class="formHelpers">
              Please provide appropriate tags for your submission. Separate tags with commas.
            </span>
          </div>
        </dd>
      </div>
    </dl>

    <div class="flex justify-end mb-10 max-w-4xl">
      <button type="submit" class="primaryButton" @click="handleSubmit">
        Suggest a Link
      </button>
    </div>

  </form>
</template>

<script setup>
import { ref } from "vue";
import swal from "sweetalert2";
import ContentHeading from "../components/shared/ContentHeading.vue";
import { cats } from "../js/cats.js";
const linkTitle = ref("");
const linkDescription = ref("");
const linkUrl = ref("");
const linkTags = ref("");
const emailAddress = ref("");

const header = {
  header: "Suggest a Headlin3",
  subHeader: "Have a hot headlin3? Suggest it here and we'll review it for inclusion on the site.",
}

const linkCat = ref(cats[0]);

const handleSubmit = async () => {
  if (linkTitle.value === undefined || linkTitle.value === "") {
    swal.fire({
      icon: "error",
      name: "Oops...",
      text: "Please enter a Title",
    });
    return;
  }

  if (linkDescription.value === undefined || linkDescription.value === "") {
    swal.fire({
      icon: "error",
      name: "Oops...",
      text: "Please enter a Description",
    });
    return;
  }

  if (linkUrl.value === undefined || linkUrl.value === "") {
    swal.fire({
      icon: "error",
      name: "Oops...",
      text: "Please enter a URL",
    });
    return;
  }

  const apiURL = `http://localhost:5000/api/v1/suggest`;
  const tagList = linkTags.value.split(",").map((e) => e.trim());

  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      emailAddress: emailAddress.value,
      linkUrl: linkUrl.value,
      linkTitle: linkTitle.value,
      linkDescription: linkDescription.value,
      linkCat: linkCat.value,
      linkTags: tagList,
    }),
  });

  try {
    const data = await response.json();
    const result = data.success;
    swal.fire({
      name: result,
      text: "Your link has been added to the queue for approval",
      icon: "success",
      confirmButtonText: "Cool",
    }).then(() => {
      window.location.href = "/";
    });
  } catch (error) {
    console.log(error);
  }
};

</script>
