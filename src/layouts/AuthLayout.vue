<template>
   <div class="flex items-center h-screen">
    <!-- BANNER -->
    <div class="hidden lg:flex justify-center items-center w-[60%] h-full bg-linear-to-r from-purple-500 via-purple-600 to-purple-600">
      <div class="flex-shrink-0">
        <div class="flex items-center">
          <svg
            class="h-20 w-20 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          ></path>
          </svg>
          <span
            class="ml-2 text-white font-bold text-6xl"
            >CourseHive</span
          >
        </div>
      </div>
    </div>
    
    <!-- FORM -->
    <div class="flex justify-center w-full lg:w-[40%]">
        <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

