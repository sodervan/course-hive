<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <navbar />
    <div class="flex flex-1">
      <sidebar />
      <main-content />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/mainComponents/navbar.vue";
import Sidebar from "@/components/mainComponents/sidebar.vue";
import mainContent from "@/components/mainComponents/mainContent.vue";
export default {
  name: "CourseHive",
  components: { Sidebar, Navbar, mainContent },
  data() {
    return {
      activeTab: "newest",
      questions: [
        {
          id: 1,
          title: "MQ14 OrderSend Failed Error 130 - why even with no SL?",
          description:
            "I'm trying to create a simple EA tool in MT4 so that I can drag and drop two lines on the chart and based on these parameters place buy/sell stop, and then when targets are met close position.",
          tags: ["MAT233", "ea", "maths"],
          votes: 5,
          answers: 17,
          views: 130,
          time: "5 hours ago",
          author: "trading_dev",
        },
        {
          id: 2,
          title: "Bare Git Repo Creation changed?",
          description:
            "I have a project on a live fail server and want people can pull and push from it locally (pull). In the past, when I started a new project, I would create a folder, open the git bash in the folder, and...",
          tags: ["git", "github", "git", "remote"],
          votes: 3,
          answers: 52,
          views: 221,
          time: "2 days ago",
          author: "developer123",
        },
        {
          id: 3,
          title: "Ubuntu second monitor display scale has incorrect ratio",
          description:
            'I got a ubuntu 22.04 app. I have a Dell 24" monitor. When I connect the second monitor, the scale ratio is much larger than normal. When I change the scale setting of the second monitor, the scale of...',
          tags: ["ubuntu", "scaling", "dell", "display"],
          votes: 1,
          answers: 13,
          views: 87,
          time: "1 day ago",
          author: "techguy",
        },
        {
          id: 4,
          title: "odoo node in npm both in sass mode",
          description:
            "I'm currently learning npm, and I'm working with an Odoo node. It is working fine, and I want it to call Odoo once a day to import contacts and then synchronize them with npm. However, I would like...",
          tags: ["node", "npm", "odoo", "sass"],
          votes: 2,
          answers: 123,
          views: 315,
          time: "3 days ago",
          author: "web_dev",
        },
      ],
      collections: [
        {
          id: 1,
          title: "Microsoft Azure",
          description:
            "A collection for developers to engage, share, and learn about Microsoft Azure cloud services",
          hot: true,
        },
        {
          id: 2,
          title: "Microsoft Azure",
          description:
            "A collection for developers to engage, share, and learn about Microsoft Azure cloud services",
          hot: true,
        },
        {
          id: 3,
          title: "Microsoft Azure",
          description:
            "A collection for developers to engage, share, and learn about Microsoft Azure cloud services",
          hot: true,
        },
      ],
      blogPosts: [
        {
          id: 1,
          title: "Open source AI: Are younger developers leading the way?",
        },
        {
          id: 2,
          title: "Reform of the Bot: A woman's VC's take on the AI landscape",
        },
        {
          id: 3,
          title:
            "Changes to reporting for the public-review moderation process",
        },
        {
          id: 4,
          title: "Retro: Generative AI (e.g., ChatGPT) is banned",
        },
        {
          id: 5,
          title:
            "A discussion about closed (and potentially useful) posts on Stack Overflow",
        },
      ],
    };
  },
  methods: {
    // You can add methods here if needed
  },
};
</script>

<style scoped>
/* Additional custom CSS if needed */
</style>
