

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import CountryProfileComponent from "./CountryProfileComponent.vue";
import CountrySearchComponent from "./CountrySearchComponent.vue";
import { Icon } from '@iconify/vue';

interface Country {
  id: string;
  iso2Code: string;
  name: string;
  region: {
    value: string;
  };
  incomeLevel: {
    value: string
  }
}

const countries = ref<Country[]>([]);
const filteredCountries = computed(() =>
  countries.value.filter((country) => country.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
);
const searchTerm = ref('');

async function fetchCountries() {
  try {
    const response = await axios.get('https://api.worldbank.org/v2/country?format=json&per_page=300');
    countries.value = response.data[1].filter(
      (country: Country) =>
        country.iso2Code.length === 2 &&
        country.region.value !== 'Aggregates' &&
        country.incomeLevel.value !== 'Aggregates'
    );
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
    <div>
      <div class="mb-8 flex mt-10 ml-16 items-center gap-1">
        <div class="hover:animate-jump">
        <Icon icon="mdi:web" class="w-8 h-8" />
      </div>
      <h1 class="text-3xl font-bold">
        Country Profiles
      </h1>
    </div>
      <div class="my-6">
        <CountrySearchComponent @search="searchCountries" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full items-center">
        <CountryProfileComponent
          v-for="country in filteredCountries"
          :key="country.id"
          :country="country"
        />
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