<!-- CountrySearchComponent.vue -->
<template>
    <div class="w-full flex justify-center">
      <input
        type="text"
        v-model="searchTerm"
        @input="onSearch"
        class="input w-full mx-10 "
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