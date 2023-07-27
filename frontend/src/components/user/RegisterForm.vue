<template>

  <form @submit.prevent="" class="mt-5 space-y-6">
    <input type="hidden" name="remember" value="true" />
    <div class="-space-y-px rounded-md shadow-sm">

      <div>
        <label for="name" class="sr-only">Name</label>
        <input id="name" v-model="name" name="name" type="text" autocomplete="name" required="" placeholder="Name"
          class="formInput sm:text-sm" />
      </div>

      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required=""
          placeholder="Email address" class="formInput sm:text-sm" />
      </div>

      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" v-model="password" name="password" type="password" autocomplete="current-password"
          required="" placeholder="Password" class="formInput sm:text-sm" />
      </div>

      <div>
        <label for="confirm-password" class="sr-only">Password</label>
        <input id="confirm-password" v-model="confirmPassword" name="confirm-password" type="password"
          autocomplete="confirm-password" required="" placeholder="Confirm Password"
          class="formInput sm:text-sm" />
      </div>
    </div>

    <MemberLink :login=false />

    <button @click="register" type="submit"
      class="primaryButton"
      aria-label="Register">
      Register
    </button>

  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MemberLink from "./shared/MemberLink.vue";
import Swal from "sweetalert2";
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errors = ref([]);
var token = '';

const props = defineProps({
  freeSpots: {
    type: Number,
    required: true,
  },
})

const register = async () => {
  try {

    if (password.value !== confirmPassword.value) {
      errors.value.push("Passwords do not match");
      return false;
    }

    if (props.freeSpots <= 0) {
      errors.value.push("No free spots remaining");
      return false;
    }

    if (email.value === "" || password.value === "" || name.value === "") {
      errors.value.push("Please fill out all fields");
      return false;
    }

    const response = await fetch('http://localhost:5000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        role: "user"
      })
    })
     
    const data = await response.json();
    
    if (data.success) {
      token = data.token;
      Swal.fire({
        icon: "success",
        name: "Success",
        text: "You have successfully registered",
      })
      .then(() => {
        window.location.href = "/user/login";
      });
    } else {
      Swal.fire({
        icon: "error",
        name: "Oops...",
        text: data.success,
      });
    }

  } catch (err) {
    console.log(`Registration Error: ${err}`);
  }
}

onMounted(async () => {
  // reckon I should check if the user is already logged in here?
  // alsao this file is large, should I split it up?
  console.log('this is where we do the sign up...');
});

</script>