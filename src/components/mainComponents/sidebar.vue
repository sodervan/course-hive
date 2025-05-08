<template>
  <div
    :class="[
      'sidebar-container transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-16' : 'w-64',
      isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0',
    ]"
  >
    <!-- Mobile overlay backdrop -->
    <div
      v-if="isMobile && isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-10"
      @click="isOpen = false"
    ></div>

    <!-- Sidebar content -->
    <div
      class="h-full flex flex-col bg-white border-r border-gray-200 shadow-sm z-20 relative"
    >
      <!-- Sidebar header with logo -->
      <div
        class="p-4 flex items-center justify-between border-b border-gray-100"
      >
        <div class="flex items-center space-x-3">
          <!--                    <div-->
          <!--                      class="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold"-->
          <!--                    >-->
          <!--                      A-->
          <!--                    </div>-->
          <h1 v-show="!isCollapsed" class="font-semibold text-gray-800 text-sm">
            Two..is better than one
          </h1>
        </div>
        <button
          class="p-1 rounded-md hover:bg-gray-100 lg:flex hidden"
          @click="toggleCollapse"
        >
          <svg
            v-if="isCollapsed"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          class="p-1 rounded-md hover:bg-gray-100 lg:hidden flex"
          @click="isOpen = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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

      <!-- Navigation section -->
      <nav class="flex-1 overflow-y-auto p-4">
        <div class="space-y-1">
          <h3
            v-show="!isCollapsed"
            class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            Main
          </h3>

          <a
            v-for="(item, index) in mainNavItems"
            :key="index"
            :href="item.href"
            :class="[
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
              item.active
                ? 'bg-purple-50 text-purple-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-purple-700',
            ]"
          >
            <div class="flex items-center">
              <span
                :class="[
                  'mr-3 h-5 w-5 flex-shrink-0',
                  item.active
                    ? 'text-purple-700'
                    : 'text-gray-500 group-hover:text-purple-700',
                ]"
              >
                <i :class="['fas', item.icon]"></i>
              </span>
              <span v-show="!isCollapsed">{{ item.name }}</span>
            </div>
            <span
              v-if="item.badge && !isCollapsed"
              :class="[
                'ml-auto inline-block py-0.5 px-2 text-xs rounded-full',
                item.badgeColor,
              ]"
            >
              {{ item.badge }}
            </span>
          </a>
        </div>

        <!-- Collectives section -->
        <div class="mt-8" v-show="!isCollapsed || isMobile">
          <h3
            class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            Collectives
          </h3>
          <div class="mt-2 space-y-1">
            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-700 rounded-md"
            >
              <span class="mr-3 h-5 w-5 text-gray-500">
                <i class="fas fa-layer-group"></i>
              </span>
              <span>Explore All</span>
            </a>
            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-700 rounded-md"
            >
              <span class="mr-3 h-5 w-5 text-orange-500">
                <i class="fa-solid fa-square-root-variable"></i>
              </span>
              <span>Math</span>
            </a>
            <a
              href="#"
              class="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-700 rounded-md"
            >
              <span class="mr-3 h-5 w-5 text-blue-500">
                <i class="fa-solid fa-dna"></i>
              </span>
              <span>Cell Biology</span>
            </a>
          </div>
        </div>

        <!-- Teams section -->
        <div class="mt-8" v-show="!isCollapsed || isMobile">
          <h3
            class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            Teams
          </h3>
          <div class="mt-2 bg-gray-50 rounded-md p-3 text-sm">
            <div class="flex items-center mb-2">
              <div class="flex -space-x-1">
                <div
                  class="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center text-white text-xs"
                >
                  T
                </div>
                <div
                  class="w-6 h-6 rounded-md bg-gray-700 flex items-center justify-center text-white text-xs"
                >
                  Q
                </div>
                <div
                  class="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center text-white text-xs"
                >
                  D
                </div>
              </div>
            </div>
            <p class="text-gray-600 text-sm">
              Collaborate with your team in a private space
            </p>
            <button
              class="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
            >
              Create Team
            </button>
          </div>
        </div>
      </nav>

      <!-- User profile section -->
      <div
        class="border-t border-gray-200 p-4"
        v-show="!isCollapsed || isMobile"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700"
            >
              <span class="text-sm font-medium">JD</span>
            </div>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700">John Doe</p>
            <p class="text-xs text-gray-500">View profile</p>
          </div>
          <button class="ml-auto p-1 rounded-full hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile toggle button for opening sidebar -->
  <button
    v-if="isMobile && !isOpen"
    @click="isOpen = true"
    class="fixed top-4 left-4 p-2 rounded-md bg-white shadow-md z-30"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

// State
const isCollapsed = ref(false);
const isMobile = ref(false);
const isOpen = ref(false);

// Navigation items with active state
const mainNavItems = ref([
  {
    name: "Home",
    icon: "fa-home",
    href: "#",
    active: true,
    badge: null,
    badgeColor: "",
  },
  {
    name: "Questions",
    icon: "fa-question-circle",
    href: "#",
    active: false,
    badge: "14",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    name: "Tags",
    icon: "fa-tag",
    href: "#",
    active: false,
    badge: null,
    badgeColor: "",
  },
  {
    name: "Calculations",
    icon: "fa-calculator",
    href: "#",
    active: false,
    badge: null,
    badgeColor: "",
  },
  {
    name: "Chat",
    icon: "fa-comment",
    href: "#",
    active: false,
    badge: "3",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    name: "Lists",
    icon: "fa-list",
    href: "#",
    active: false,
    badge: null,
    badgeColor: "",
  },
]);

// Toggle sidebar collapse state
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

// Check if device is mobile
const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 1024;
  // Auto-collapse sidebar on smaller screens (but not mobile)
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    isCollapsed.value = true;
  } else if (window.innerWidth >= 1280) {
    isCollapsed.value = false;
  }

  // On mobile, default to closed
  if (isMobile.value) {
    isOpen.value = false;
  } else {
    isOpen.value = true;
  }
};

// Lifecycle hooks for responsiveness
onMounted(() => {
  checkIfMobile();
  window.addEventListener("resize", checkIfMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkIfMobile);
});
</script>

<style scoped>
.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 30;
}

@media (min-width: 1024px) {
  .sidebar-container {
    position: relative;
    height: 100vh;
  }
}
</style>
