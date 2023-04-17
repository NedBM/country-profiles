<!-- CountrySearchComponent.vue -->
<template>
    <div class="relative">
      <input
        type="text"
        v-model="searchTerm"
        @input="onSearch"
        class="w-full p-3 rounded-md shadow-md border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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