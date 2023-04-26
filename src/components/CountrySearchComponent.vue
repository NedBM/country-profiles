<!-- CountrySearchComponent.vue -->
<template>
    <div class="w-full flex justify-center">
      <input
        type="text"
        v-model="searchTerm"
        @input="onSearch"
        class="w-full p-2 rounded-md shadow-md border border-stone-600 focus:border-yellow-300 focus:outline-none focus:ring-[1px] focus:ring-yellow-300 bg-stone-800 mx-20 text-yellow-300"
        placeholder="Search for a country..."
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  
  const searchTerm = ref('');
  const emit = defineEmits<(event: 'search', value: string) => void>();
  
  const onSearch = () => {
    emit('search', searchTerm.value);
  };
  </script>