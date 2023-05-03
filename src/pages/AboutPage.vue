<template>
  <div
    class="my-4 min-h-screen grid grid-cols-3 max-w-4xl mx-auto  gap-1 justify-center items-center"
  >
    <div
      class="rounded-xl bg-blue-400 p-4 group  cursor-pointer hover:bg-green-300 transition-all duration-150"
      v-for="user in users"
      :key="user.id"
    >
      <p class="text-left bg-gray-200 group-hover:bg-red-300 shadow-md rounded-md px-3 py-1">
        name :{{ user.name }}
      </p>
      <p class="text-left mt-2 bg-gray-100 group-hover:bg-yellow-300 shadow-md rounded-md px-3 py-1">
        {{ user.email }}
      </p>
      <p class="text-left mt-2 bg-gray-100 group-hover:bg-indigo-100 shadow-md rounded-md px-3 py-1">
        {{ user.website }}
      </p>
    </div>
  </div>
</template>


<script>
import axios from "@/axios";

export default {
  data() {
    return {
      errorMessage: "",
      users: [],
    };
  },
  mounted() {
    axios
      .get("/users")
      .then((response) => {
        this.users = response.data;
        
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  },
};
</script>

<style scoped></style>
