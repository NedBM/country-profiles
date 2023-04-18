<template>
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold underline mb-8">
          Country List
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CountryProfileComponent v-for="country in countries" :key="country.id" :country="country" />
          <!-- Add more CountryProfileComponent components as needed -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import CountryProfileComponent from './CountryProfileComponent.vue';
  
  const countries = ref([]);
  
  async function fetchCountries() {
    try {
      const response = await axios.get('https://api.worldbank.org/v2/country?format=json&per_page=100');
      countries.value = response.data[1];
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }
  
  onMounted(fetchCountries);
  </script>