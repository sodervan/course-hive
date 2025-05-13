<template>
  <form @submit.prevent="handleLogin" class="flex flex-col justify-center h-screen">
    <h1 class="text-2xl font-bold mb-6 text-center winky">Welcome Back! (:</h1>
    <input v-model="username" type="text" placeholder="Username"
      class="mb-4 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm"
      required />

    <PasswordInput v-model="password" />

    <SubmitButton label="Continue" :isLoading="isLoading" :disabled="!isFormValid || isLoading"
      buttonClass="bg-purple-600 text-white py-3 rounded-full font-medium relative flex justify-center items-center disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer" />
    <p class="mt-4 flex gap-x-6 text-sm">
      Don't have an account?
      <router-link to="/signup" class="cursor-pointer text-blue-600">Sign Up</router-link>
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
const { isLoading, setIsLoading, makeRequest } = useApiRequest();

const username = ref("");
const password = ref("");

const isFormValid = useFormValidation([username, password]);

const handleLogin = async () => {
  try {
    const response = await makeRequest(
      "https://coursehive-uhi6.onrender.com/api/users/login",
      "POST",
      {
        username: username.value,
        password: password.value,
      }
    );
    router.push("/main");
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
</script>
