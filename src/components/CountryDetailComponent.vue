<template>
  <div>
    <h1 v-if="country">{{ country.name }} Details</h1>
    <div v-else>Loading...</div>
    <!-- Add more information and D3js visualizations here -->
  </div>
</template>

<script setup lang="ts">
interface Country {
  id: string;
  name: string;
  // Add more properties as needed
}
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
});

const country = ref<Country | null>(null);;

onMounted(async () => {
  try {
    const response = await axios.get(`https://api.worldbank.org/v2/country/${props.params.id}?format=json`);
    country.value = response.data[1][0];
  } catch (error) {
    console.error('Error fetching country:', error);
  }
});
</script>