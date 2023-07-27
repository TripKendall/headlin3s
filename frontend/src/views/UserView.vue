<template>
  <div class="wrapper">
    <div class="w-full max-w-xl space-y-4">
      <section v-if="pageName == 'login'">
        <UserLogin />
      </section>
      <section v-if="pageName == 'register'">
        <UserRegister />
      </section>
      <section v-if="pageName == 'forgot'">
        <ForgotPassword />
      </section>
    </div>
  </div>
</template>

<script setup>
import UserLogin from "../components/user/UserLogin.vue";
import UserRegister from "../components/user/UserRegister.vue";
import ForgotPassword from "../components/user/shared/ForgotPassword.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const pageName = route.params.name;
</script>
