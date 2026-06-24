<script setup lang="ts">
import {
  BriefcaseIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowDownTrayIcon,
} from "@heroicons/vue/24/outline"

const skills = [
  "Next.js",
  "React",
  "JavaScript",
  "TypeScript",
  "Vue.js",
  "Nuxt",
  "Node.js",
  "Docker",
  "MySQL",
  "TailwindCSS",
]
</script>

<template>
  <div
    class="grid h-[calc(100dvh-170px)] md:h-[calc(100dvh-170px)] overflow-scroll scrollbar-hidden grid-cols-1 gap-10 md:gap-20 md:grid-cols-2 items-center pb-10"
  >
    <!-- Content -->
    <div class="order-2 md:order-1 flex flex-col gap-8 animate-fade-up">
      <div class="flex flex-col gap-5">
        <span
          class="w-fit rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
        >
          Front-End Developer
        </span>

        <h1 class="text-4xl font-black leading-tight md:text-6xl">
          سلام،
          <br />
          من
          <span class="text-primary">همایون</span>
          هستم
        </h1>

        <p class="max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
          توسعه‌دهنده فرانت‌اند با تمرکز بر React، Next.js و Vue. علاقه‌مند به
          ساخت رابط‌های کاربری مدرن، سریع و کاربرپسند که تجربه‌ای روان و حرفه‌ای
          برای کاربران ایجاد کنند.
        </p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4">
        <div
          class="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm"
        >
          <h3 class="text-2xl font-black text-primary">2+</h3>
          <p class="text-sm text-zinc-500">سال تجربه</p>
        </div>

        <div
          class="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm"
        >
          <h3 class="text-2xl font-black text-primary">5+</h3>
          <p class="text-sm text-zinc-500">پروژه</p>
        </div>

        <div
          class="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm"
        >
          <h3 class="text-2xl font-black text-primary">10+</h3>
          <p class="text-sm text-zinc-500">تکنولوژی</p>
        </div>
      </div>

      <!-- About -->
      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">درباره من</h2>

        <p class="leading-8 text-zinc-600">
          تمرکز اصلی من طراحی و توسعه اپلیکیشن‌های وب مدرن، داشبوردهای مدیریتی و
          سیستم‌های تحت وب است. همیشه تلاش می‌کنم محصولاتی بسازم که علاوه بر
          ظاهر حرفه‌ای، عملکرد سریع، ساختار تمیز و تجربه کاربری لذت‌بخشی داشته
          باشند.
        </p>
      </div>

      <!-- Skills -->
      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">مهارت‌ها</h2>

        <div class="flex flex-wrap gap-3">
          <span
            v-for="(item, index) in skills"
            :key="index"
            class="group cursor-default rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-lg"
          >
            {{ item }}
          </span>
        </div>
      </div>

      <div class="h-px bg-zinc-200" />

      <!-- Info -->
      <div class="flex flex-wrap gap-6">
        <div class="flex items-center gap-2">
          <MapPinIcon class="size-5 text-primary" />
          <span>رشت، گیلان</span>
        </div>

        <div class="flex items-center gap-2">
          <div class="size-2 rounded-full bg-green-500 animate-pulse" />

          <span>آماده همکاری</span>
        </div>

        <div class="flex items-center gap-2">
          <BriefcaseIcon class="size-5 text-primary" />
          <span>Freelance | Remote | Full time</span>
        </div>
      </div>

      <!-- Actions -->
      <!-- <div class="flex flex-wrap gap-4">
        <button
          class="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <ArrowDownTrayIcon class="size-5" />
          دانلود رزومه
        </button>

        <button
          class="rounded-xl border border-zinc-200 px-6 py-3 font-medium transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
        >
          تماس با من
        </button>
      </div> -->

      <!-- Contact -->
      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">راه‌های ارتباطی</h2>

        <div class="flex gap-4">
          <a
            to="tel:09396420039"
            class="rounded-xl border border-zinc-200 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-lg"
          >
            <PhoneIcon class="size-6" />
          </a>

          <a
            href="https://t.me/fackoffdude"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-xl border border-zinc-200 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"
              ></path>
            </svg>
          </a>

          <a
            href="https://github.com/HomayoonAAhmad"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-xl border border-zinc-200 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="size-6 fill-current"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
              />
            </svg>
          </a>

          <button
            class="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <ArrowDownTrayIcon class="size-5" />
            دانلود رزومه
          </button>
        </div>
      </div>
    </div>

    <!-- Image -->
    <div
      class="md:sticky items-center justify-center mt-15 mb-8 md:mt-0 md:top-20 order-1 md:order-2 flex md:mr-[5%] md:mb-auto animate-fade-up"
    >
      <div class="relative aspect-square size-70 md:size-100">
        <div
          class="absolute inset-0 md:w-[80%] w-full rounded-full bg-primary/20 blur-3xl animate-pulse"
        />

        <img
          src="/images/me_bw.jpg"
          alt="Homayoun"
          loading="lazy"
          decoding="async"
          class="relative z-10 h-full w-full rounded-full object-cover object-top shadow-2xl ring-8 ring-white transition duration-700 hover:scale-105"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-up {
  animation: fadeUp 0.8s ease forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
