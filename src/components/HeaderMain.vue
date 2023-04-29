<template>
  <header class="bg-white shadow">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between py-4">
        <div>
          <router-link
            to="/"
            class="text-gray-500 hover:text-gray-900 font-semibold text-lg mr-4 inline-block"
            >صفحه اصلی</router-link
          >
          <router-link
            to="/about"
            class="text-gray-500 hover:text-gray-900 font-semibold text-lg mr-4 inline-block"
            >درباره ما</router-link
          >
          <router-link
            to="connect"
            class="text-gray-500 hover:text-gray-900 font-semibold text-lg mr-4 inline-block"
            >تماس با ما</router-link
          >
          <router-link
            to="/blog"
            class="text-gray-500 hover:text-gray-900 font-semibold text-lg mr-4 inline-block"
            >بلاگ</router-link
          >
          <router-link
            to="/jobs"
            class="text-gray-500 hover:text-gray-900 font-semibold mr-4 text-lg"
            >فرصت های شغلی</router-link
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
