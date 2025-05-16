<template>
  <form @submit.prevent="handleSignup" class="flex flex-col justify-center h-screen">
    <h1 class="text-2xl font-bold mb-6 text-center winky">Join the hive! (:</h1>
    <input v-model="username" type="text" placeholder="Username"
      class="mb-4 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm" />
    <input v-model="fullName" type="text" placeholder="Full Name"
      class="mb-4 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm" />
    <input v-model="email" type="email" placeholder="Email"
      class="mb-4 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm" />

   <PasswordInput v-model="password" />

    <SubmitButton label="Continue" :isLoading="isLoading" :disabled="!isFormValid || isLoading"
      buttonClass="bg-purple-600 text-white py-3 rounded-full font-medium relative flex justify-center items-center disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer" />
    <p class="mt-4 flex gap-x-6 text-sm">
      Already have an account?
      <router-link to="/" class="cursor-pointer text-blue-600 w-fit ml-auto">Sign In</router-link>
    </p>
  </form>
</template>

<script setup>
import PasswordInput from "@/components/ui/PasswordInput.vue";
import SubmitButton from "@/components/ui/SubmitButton.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useApiRequest } from "@/lib/useApiRequest";
import { useFormValidation } from "@/lib/useFormValidation";

const router = useRouter();
const { isLoading, makeRequest } = useApiRequest();

const username = ref("");
const fullName = ref("");
const email = ref("");
const password = ref("");

const isFormValid = useFormValidation([username, fullName, email, password]);

const handleSignup = async () => {
  try {
    const response = await makeRequest(
      "https://coursehive-uhi6.onrender.com/api/users/register",
      "POST",
      {
        email: email.value,
        username: username.value,
        fullName: fullName.value,
        password: password.value,
      }
    );
    router.push("/main");
  } catch (error) {
    console.error(error);
  }
};
</script>
