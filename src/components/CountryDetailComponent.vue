<template>
    <div class="container mx-auto p-8">
      <h1 class="text-3xl font-bold">{{ country.name }}</h1>
      <!-- Add your D3 data visualization code here -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  // import { useRoute } from 'vue-router';
  
  // const route = useRoute();
  // const countryId = route.params.id;
  
  // Initialize country ref with an object containing a name property
  const country = ref<{ name: string }>({ name: '' });
  
  async function fetchCountryData() {
    try {
      const response = await axios.get(`https://api.worldbank.org/v2/country/${country}?format=json`);
      country.value = response.data[1];
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  }
  
  onMounted(fetchCountryData);
  </script>