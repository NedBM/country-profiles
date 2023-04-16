

<template>
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img class="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/150" alt="Country Flag" />
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{{ country.name }}</div>
          <div class="block mt-1 text-lg leading-tight font-medium text-black">{{ country.region }}</div>
          <p class="mt-2 text-gray-500">{{ country.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      country: {
        type: Object,
        required: true,
      },
    },
  });
  </script>