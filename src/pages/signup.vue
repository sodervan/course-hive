<template>
  <div class="flex items-center h-screen">
    <img src="/img/auth-page-logo.png" alt="Signup Image" class="h-full w-[70%] object-fill max-lg:hidden" />
    <div class="flex justify-center max-lg:w-full w-[30%]">
      <form @submit.prevent="handleSignup" class="flex flex-col justify-center h-screen">
        <h1 class="text-2xl font-bold mb-6 text-center winky">Join the hive! (:</h1>
        <input type="text" placeholder="Username"
          class="mb-4 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm" />
        <input type="text" placeholder="fullname"
          class="mb-4 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm" />
        <input type="email" placeholder="email"
          class="mb-4 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm" />
        <input type="password" placeholder="Password"
          class="mb-6 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm" />
        <button type="submit" class="bg-blue-500 text-white py-3 rounded-full font-medium relative flex justify-center items-center">
          <span :class="{ 'invisible': isLoading }">Continue</span>
          <svg class="h-5 w-5 animate-spin absolute text-white" :class="{ 'invisible': !isLoading }"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" fill="transparent"
              strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </button>
        <p class="mt-4 flex gap-x-6 text-sm">Already have an account? <span @click="$router.push('/login')"
            class="cursor-pointer text-purple-600">Sign In</span></p>
      </form>
    </div>
  </div>
</template>

<script setup>
// import {defineComponent} from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoading = ref(false);

// export default defineComponent({
//   name: "SignupPage",
//   components:{}
// })

const handleSignup = async () => {
  console.log('Signup button clicked');
  isLoading.value = true;
  try {
    const response = await fetch('https://coursehive-uhi6.onrender.com/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // credentials: 'include',
      body: JSON.stringify({
        email: 'email@example.com',
        username: 'exampleUser',
        fullName: 'John Doe',
        password: 'examplePassword',
      })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    router.push('/login');
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

</script>

<style></style>