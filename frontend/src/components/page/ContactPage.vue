<template>
  <div class="max-w-prose ml-5 relative overflow-hidden justify-start">

    <ContentHeading :heading="header" />

    <div class="my-5">

      <p>
        Use this form to get in touch with us. If you would like to suggest a news story, please use the <a href="/suggest">Suggest a News Story</a> form.
        If you are a partner / member you can <a href="user/login/">Login Here</a>.
      </p>

      <form @submit.prevent>
        <dl>
          <div class="formGrid mt-10 md:grid sm:block">
            <dt>*Your Email Address:</dt>
            <dd class="sm:col-span-2">
              <div class="flex-grow">
                <input type="text" class="formInput" v-model="emailAddress" />
                <span class="formHelpers">
                  * We will not share your email address with anyone. We will only use it to reply to your message.
                </span>
              </div>
            </dd>
          </div>

          <div class="formGrid md:grid sm:block">
            <dt>*Contact Subject:</dt>
            <dd class="sm:col-span-2">
              <div class="flex-grow">
                <input type="text" class="formInput" v-model="messageSubject" />
                <span class="formHelpers">
                  * Please let us know what this is in regards to so that our robots can sort it appropriately.
                </span>
              </div>
            </dd>
          </div>

          <div class="formGrid md:grid sm:block">
            <dt>Your Message:</dt>
            <dd class="sm:col-span-2">
              <div class="flex-grow">
                <textarea rows="4" cols="50" class="formInput" v-model="theMessage" />
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

    </div>

  </div>
</template>

<script setup>
import ContentHeading from '../shared/ContentHeading.vue';
import { ref } from 'vue';
const theMessage = ref("");
const messageSubject = ref("");
const emailAddress = ref("");

const header =
{
  header: "Contact Headlin3s",
  subHeader: "Get in touch",
}



</script>