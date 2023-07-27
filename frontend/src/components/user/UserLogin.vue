<template>
  <div class="w-full space-y-8 mb-10">

    <ContentHeading :heading="content" />

    <form @submit.prevent="" class="my-8 space-y-6">
      <input type="hidden" name="remember" value="true" />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" v-model="emailAddress" name="email" type="email" autocomplete="email" required=""
            class="formInput focus:z-10 sm:text-sm" placeholder="Email address" />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" v-model="password" name="password" type="password" 
            required="" class="formInput focus:z-10 sm:text-sm" placeholder="Password" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <RememberMe />
        <MemberLink :login=true />
      </div>

      <button @click="login" type="submit" class="primaryButton  focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        aria-label="Login">
        Sign in
      </button>

    </form>
  </div>
</template>

<script setup>
import MemberLink from './shared/MemberLink.vue';
import RememberMe from './shared/RememberMe.vue';
import ContentHeading from '../shared/ContentHeading.vue';
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue';
const router = useRouter()
const emailAddress = ref('');
const password = ref('');
const token = ref('');

const content = {
  header: "Sign in to your account",
  subHeader: "Please use this form to login.",
}

const login = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailAddress.value,
      password: password.value,
    }),
  };

  const response = await fetch(
    "http://localhost:5000/api/v1/auth/login",
    requestOptions
  );
  const data = await response.json();
  token.value = data.token;

  if (token.value) {
    console.log(token.value);
    router.push({name: "HomePage"});
  }
}
 
</script>
