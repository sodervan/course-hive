<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/mainComponents/navbar.vue";

const teamMembers = ref([
  {
    name: "Elizabeth Ogunmola",
    title: "Team Lead",
    bio: "Cloud Engineer with multiple years of experience",
    avatar: "/api/placeholder/64/64",
  },
  {
    name: "Eniola",
    title: "Assistant Lead, Frontend Developer",
    bio: "Proficient Frontend Developer, Specialised in developing visually appealing web applications",
    avatar: "/api/placeholder/64/64",
  },
  {
    name: "Emmanuel",
    title: "Frontend Developer",
    bio: "Frontend Developer || Mobile Developer",
    avatar: "/api/placeholder/64/64",
  },
  {
    name: "Abdullah",
    title: "Backend Developer",
    bio: "Java Backend Developer. Seamless or Nothing",
    avatar: "/api/placeholder/64/64",
  },
  {
    name: "Abdul",
    title: "Backend Developer",
    bio: "Backend Developer, Specialised in constructing fully functional backend infrastructure",
    avatar: "/api/placeholder/64/64",
  },
  {
    name: "Timileyin",
    title: "Contributor",
    bio: "Idealist",
    avatar: "/api/placeholder/64/64",
  },
]);

const stats = ref([
  { value: "50,000+", label: "Active Users" },
  { value: "120+", label: "Institutions" },
  { value: "75,000+", label: "Questions Answered" },
  { value: "92%", label: "Resolution Rate" },
]);

const features = ref([
  {
    title: "Peer-Reviewed Answers",
    description: "All responses are verified by academic experts in the field.",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    title: "AI-Assisted Research",
    description:
      "Our intelligent system connects your questions with relevant academic papers and resources.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0114 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    title: "Academic Reputation System",
    description:
      "Build your scholarly reputation through quality contributions and peer endorsements.",
    icon: "M19 9l-7 7-7-7",
  },
  {
    title: "Departmental Collaboration",
    description:
      "Create private spaces for your institution to foster interdisciplinary research.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
]);

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <div class="about-container">
    <navbar />
    <header class="hero">
      <div class="hero-content">
        <h1 class="hero-title">About CourseHive</h1>
        <p class="hero-subtitle">
          Reimagining scholarly collaboration in the digital age
        </p>
      </div>
    </header>

    <section class="mission">
      <div class="container">
        <h2 class="section-title">Our Mission</h2>
        <div class="mission-content">
          <div class="mission-text">
            <p>
              CourseHive bridges the gap between traditional academic forums and
              modern collaborative platforms, creating a space where scholars,
              researchers, and students can exchange knowledge freely and
              efficiently.
            </p>
            <p>
              We believe that academic knowledge should be accessible,
              verifiable, and built upon collaboration across disciplines and
              institutions.
            </p>
          </div>
          <div class="mission-image">
            <img
              src="#"
              alt="Collaborative academic environment"
              class="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="stats bg-purple-50">
      <div class="container">
        <div class="stats-grid">
          <div v-for="(stat, index) in stats" :key="index" class="stat-card">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="section-title">Our Innovations</h2>
        <div class="features-grid">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card"
          >
            <div class="feature-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="feature.icon"
                />
              </svg>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="team">
      <div class="container">
        <h2 class="section-title">Leadership Team</h2>
        <div class="team-grid">
          <div
            v-for="(member, index) in teamMembers"
            :key="index"
            class="team-card"
          >
            <img :src="member.avatar" :alt="member.name" class="team-avatar" />
            <h3 class="team-name">{{ member.name }}</h3>
            <p class="team-title">{{ member.title }}</p>
            <p class="team-bio">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="join-us bg-purple-50">
      <div class="container">
        <div class="join-content">
          <h2 class="join-title">Join Our Academic Community</h2>
          <p class="join-text">
            Whether you're a professor, researcher, or student, CourseHive
            provides the tools you need to expand your knowledge and contribute
            to the academic community.
          </p>
          <button class="join-button">Sign Up Today</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-container {
  font-family: "Inter", sans-serif;
  color: #1e293b;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero {
  background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
  color: white;
  padding: 6rem 1rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(109, 40, 217, 0.15);
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  letter-spacing: -0.025em;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 36rem;
  margin: 0 auto;
  opacity: 0.9;
  font-weight: 400;
  line-height: 1.6;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  color: #4c1d95;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 4rem;
  height: 0.25rem;
  background-color: #8b5cf6;
  border-radius: 0.125rem;
}

.mission {
  padding: 6rem 1rem;
  background-color: #fafafa;
}

.mission-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.mission-text {
  flex: 1;
}

.mission-text p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.05rem;
  color: #374151;
}

.mission-image {
  flex: 1;
}

.mission-image img {
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: auto;
}

.stats {
  padding: 5rem 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2rem;
}

.stat-card {
  background-color: white;
  padding: 2.5rem 1.5rem;
  border-radius: 0.75rem;
  box-shadow:
    0 10px 20px -5px rgba(79, 70, 229, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid rgba(139, 92, 246, 0.1);
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 25px -5px rgba(79, 70, 229, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 800;
  color: #8b5cf6;
  margin-bottom: 0.75rem;
}

.stat-label {
  color: #4b5563;
  font-weight: 500;
  font-size: 1.05rem;
}

.features {
  padding: 6rem 1rem;
  background-color: #fff;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2.5rem;
}

.feature-card {
  background-color: white;
  padding: 2.5rem;
  border-radius: 0.75rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.08),
    0 4px 6px -2px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;
  position: relative;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: rgba(139, 92, 246, 0.2);
}

.feature-icon {
  background-color: #ede9fe;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.75rem;
  color: #7c3aed;
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.feature-description {
  color: #4b5563;
  line-height: 1.7;
  font-size: 1rem;
}

.team {
  padding: 6rem 1rem;
  background-color: #f9fafb;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 2.5rem;
}

.team-card {
  background-color: white;
  padding: 2.5rem;
  border-radius: 0.75rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.08),
    0 4px 6px -2px rgba(0, 0, 0, 0.03);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: rgba(139, 92, 246, 0.2);
}

.team-avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1.25rem;
  border: 3px solid #ede9fe;
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.2);
}

.team-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.team-title {
  color: #8b5cf6;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.team-bio {
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.7;
}

.join-us {
  padding: 6rem 1rem;
}

.join-content {
  max-width: 42rem;
  margin: 0 auto;
  text-align: center;
  background-color: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow:
    0 10px 25px rgba(139, 92, 246, 0.1),
    0 4px 10px rgba(0, 0, 0, 0.05);
}

.join-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: #4c1d95;
}

.join-text {
  color: #4b5563;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  font-size: 1.05rem;
}

.join-button {
  background-color: #8b5cf6;
  color: white;
  font-weight: 600;
  padding: 0.85rem 2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
}

.join-button:hover {
  background-color: #7c3aed;
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(139, 92, 246, 0.3);
}

@media (max-width: 768px) {
  .mission-content {
    flex-direction: column;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }

  .join-content {
    padding: 2rem 1.5rem;
  }

  .section-title {
    font-size: 1.75rem;
  }
}
</style>
