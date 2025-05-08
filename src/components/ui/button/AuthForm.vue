<template>
    <div class="flex items-center h-screen">
        <img src="/img/auth-page-logo.png" alt="Auth Image" class="h-full w-[70%] object-fill max-lg:hidden" />
        <div class="flex justify-center max-lg:w-full w-[30%]">
            <form @submit.prevent="handleAuth" class="flex flex-col justify-center h-screen">
                <h1 class="text-2xl font-bold mb-6 text-center">
                    {{ mode === 'signup' ? 'Join the hive! (:' : 'Welcome Back!' }}
                </h1>
                <!-- Only show additional fields for signup -->
                <input
                    v-if="mode === 'signup'"
                    type="text"
                    placeholder="Full Name"
                    v-model="fullName"
                    class="mb-4 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm"
                />
                <input
                    v-if="mode === 'signup'"
                    type="email"
                    placeholder="Email"
                    v-model="email"
                    class="mb-4 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm"
                />
                <input
                    type="text"
                    placeholder="Username"
                    v-model="username"
                    class="mb-4 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm"
                />
                <input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    class="mb-6 py-3 px-4 border border-gray-200 rounded-full placeholder:text-sm placeholder:text-gray-400 focus-visible:outline-none text-sm"
                />
                <button type="submit" class="bg-blue-500 text-white py-3 rounded-full font-medium relative flex justify-center items-center">
                    <span :class="{ invisible: isLoading }">
                        {{ mode === 'signup' ? 'Sign Up' : 'Sign In' }}
                    </span>
                    <svg class="h-5 w-5 animate-spin absolute text-white" :class="{ invisible: !isLoading }" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" fill="transparent" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                                 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </button>
                <p class="mt-4 flex gap-x-6 text-sm" v-if="mode === 'signup'">
                    Already have an account?
                    <span @click="toggleAuth" class="cursor-pointer text-purple-600">Sign In</span>
                </p>
                <p class="mt-4 flex gap-x-6 text-sm" v-else>
                    Don't have an account?
                    <span @click="toggleAuth" class="cursor-pointer text-purple-600">Sign Up</span>
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    mode: {
        type: String,
        default: 'signup' // or 'signin'
    }
});
const emit = defineEmits(['update:mode']);

const router = useRouter();
const isLoading = ref(false);
const fullName = ref('');
const email = ref('');
const username = ref('');
const password = ref('');

const handleAuth = async () => {
    isLoading.value = true;
    let url = '';
    let payload = {};

    if (props.mode === 'signup') {
        url = 'https://coursehive-uhi6.onrender.com/api/users/register/';
        payload = {
            fullName: fullName.value,
            email: email.value,
            username: username.value,
            password: password.value,
        };
    } else {
        url = 'https://coursehive-uhi6.onrender.com/api/users/login/';
        payload = {
            username: username.value,
            password: password.value,
        };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Navigate after a successful submission
        if (props.mode === 'signup') {
            router.push('/login');
        } else {
            router.push('/dashboard');
        }
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

const toggleAuth = () => {
    const newMode = props.mode === 'signup' ? 'signin' : 'signup';
    emit('update:mode', newMode);
};
</script>

<style></style>