<!-- <script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import CountryProfileComponent from './components/CountryProfileComponent.vue';

const mockCountry = {
  name: 'United States',
  region: 'North America',
  description:
    'The United States of America is a country primarily located in North America. It consists of 50 states, a federal district, five major self-governing territories, 326 Indian reservations, and some minor possessions.',
};
</script> -->

<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CountryProfileComponent from './components/CountryProfileComponent.vue';

const countries = ref([]);

async function fetchCountries() {
  try {
    const response = await axios.get('https://api.worldbank.org/v2/country?format=json&per_page=300');
    countries.value = response.data[1];
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

onMounted(fetchCountries);
</script> -->

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import CountryProfileComponent from './components/CountryProfileComponent.vue';
import CountrySearchComponent from './components/CountrySearchComponent.vue';

interface Country {
  id: string;
  name: string;
  region: { value: string };
  capitalCity: string;
}

const countries = ref<Country[]>([]);
const filteredCountries = computed(() =>
  countries.value.filter((country) => country.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
);
const searchTerm = ref('');

async function fetchCountries() {
  try {
    const response = await axios.get('https://api.worldbank.org/v2/country?format=json&per_page=300');
    countries.value = response.data[1];
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}


function searchCountries(search: string) {
  searchTerm.value = search;
}



onMounted(fetchCountries);
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold underline mb-8">
        Hello world!
      </h1>
      <CountrySearchComponent @search="searchCountries" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CountryProfileComponent v-for="country in filteredCountries" :key="country.id" :country="country" />
        <!-- Add more CountryCard components as needed -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
