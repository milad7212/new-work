<template>
    <div>
      <p class="bg-blue-500 rounded-t-lg font-black flex m-2 p-2 max-w-3xl mx-auto text-white items-center">{{ title }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    }
  };
  </script>