<template>
  <div>
    <!-- Mobile menu backdrop (visible only when mobile menu is open) -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
      @click="isMobileMenuOpen = false"
    ></div>

    <nav
      class="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo Section -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center">
                <svg
                  class="h-8 w-8 text-purple-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  ></path>
                </svg>
                <span
                  class="ml-2 text-purple-800 font-bold text-xl tracking-tight"
                  >CourseHive</span
                >
              </div>
            </div>
          </div>

          <!-- Desktop Navigation Links (hidden on mobile) -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-8">
              <template
                v-for="(item, index) in navItemsWithActive"
                :key="index"
              >
                <a
                  :href="item.href"
                  class="relative px-2 py-2 text-gray-600 hover:text-purple-700 transition-colors duration-200 ease-in-out text-sm font-medium"
                  :class="{ 'text-purple-700': item.active }"
                  @mouseenter="item.hovered = true"
                  @mouseleave="item.hovered = false"
                >
                  {{ item.name }}
                  <div
                    class="absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-200 ease-out"
                    :class="item.active || item.hovered ? 'w-full' : 'w-0'"
                  ></div>
                </a>
              </template>
            </div>
          </div>

          <!-- Account Buttons (hidden on mobile) -->
          <div class="hidden md:flex items-center space-x-3">
            <button
              class="relative overflow-hidden px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all duration-200 ease-in-out"
              @mouseenter="accountBtnHovered = true"
              @mouseleave="accountBtnHovered = false"
            >
              <span class="relative z-10">Account</span>
              <div
                class="absolute inset-0 bg-gray-100 transform scale-x-0 origin-left transition-transform duration-200 ease-out"
                :class="{ 'scale-x-100': accountBtnHovered }"
              ></div>
            </button>
            <button
              class="cursor-pointer relative overflow-hidden px-5 py-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all duration-200 ease-in-out"
              @mouseenter="logoutBtnHovered = true"
              @mouseleave="logoutBtnHovered = false"
              @click="$router.push('/')"
            >
              <span class="relative z-10">Log Out</span>
              <div
                class="absolute inset-0 bg-red-600 transform scale-x-0 origin-left transition-transform duration-200 ease-out"
                :class="{ 'scale-x-100': logoutBtnHovered }"
              ></div>
            </button>
          </div>

          <!-- Mobile menu button (visible only on mobile) -->
          <div class="md:hidden flex items-center">
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-700 hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              :aria-expanded="isMobileMenuOpen"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Hamburger icon when menu is closed -->
              <svg
                :class="{ hidden: isMobileMenuOpen, block: !isMobileMenuOpen }"
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!-- X icon when menu is open -->
              <svg
                :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state -->
      <div
        id="mobile-menu"
        class="md:hidden transform transition-transform duration-300 ease-in-out overflow-hidden"
        :class="isMobileMenuOpen ? 'max-h-96' : 'max-h-0'"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <template v-for="(item, index) in navItemsWithActive" :key="index">
            <a
              :href="item.href"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-gray-100 transition-colors duration-200 ease-in-out"
              :class="{ 'bg-purple-50 text-purple-700': item.active }"
            >
              {{ item.name }}
            </a>
          </template>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <div
                class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium"
              >
                U
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">User Name</div>
              <div class="text-sm font-medium text-gray-500">
                user@example.com
              </div>
            </div>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <a
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-gray-100 transition-colors duration-200 ease-in-out"
            >
              Your Profile
            </a>
            <a
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-700 hover:bg-gray-100 transition-colors duration-200 ease-in-out"
            >
              Settings
            </a>
            <a
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors duration-200 ease-in-out"
            >
              Log out
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Spacer to prevent content from being hidden behind fixed navbar -->
    <div class="h-16"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";

// Get the current route
const route = useRoute();

// Base navigation items
const navItems = reactive([
  { name: "About", href: "/about", hovered: false },
  { name: "Product", href: "#", hovered: false },
  { name: "Hive!", href: "/main", hovered: false },
  { name: "Support", href: "#", hovered: false },
]);

// Compute active state based on current route path
const navItemsWithActive = computed(() => {
  return navItems.map((item) => ({
    ...item,
    active: item.href === route.path,
  }));
});

// Button hover states
const accountBtnHovered = ref(false);
const logoutBtnHovered = ref(false);

// Mobile menu state
const isMobileMenuOpen = ref(false);
</script>

<style scoped>
/* Optional: Add a scroll animation to the fixed navbar */
nav {
  transition: transform 0.3s ease;
}

nav.navbar-hidden {
  transform: translateY(-100%);
}

/* Optional: Add scroll behavior to the mobile menu */
#mobile-menu {
  transition-property: max-height;
  will-change: max-height;
}
</style>
