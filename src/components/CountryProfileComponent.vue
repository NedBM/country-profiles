<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  country: {
    type: Object,
    required: true,
  },
});

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


const gdpPerCapita = ref<number | null>(null);
const gniPerCapita = ref<number | null>(null);

onMounted(fetchEconomicData);

async function fetchEconomicData() {
  try {
    const countriesResponse = await axios.get(
      'https://api.worldbank.org/v2/country?format=json&per_page=300'
    );

    const countries = countriesResponse.data[1].filter(
      (country: Country) =>
        country.iso2Code.length === 2 &&
        country.region.value !== 'Aggregates' &&
        country.incomeLevel.value !== 'Aggregates'
    );

    // Loop through the countries array and fetch economic data
    const gdpResponse = await axios.get(
      `https://api.worldbank.org/v2/country/${props.country.id}/indicator/NY.GDP.PCAP.CD?format=json&date=2019&per_page=1`
    );
    const gniResponse = await axios.get(
      `https://api.worldbank.org/v2/country/${props.country.id}/indicator/NY.GNP.PCAP.CD?format=json&date=2019&per_page=1`
    );

    gdpPerCapita.value = gdpResponse.data[1][0]?.value || null;
    gniPerCapita.value = gniResponse.data[1][0]?.value || null;
  } catch (error) {
    console.error('Error fetching economic data:', error);
  }
}
</script>

<template>
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="md:flex-shrink-0 relative">
          <img class="h-48 w-full object-cover md:w-80 md:h-48" :src="`https://flagcdn.com/w640/${props.country.iso2Code.toLowerCase()}.png`" :alt="`${props.country.name} Flag`" />
          <div class="absolute bottom-0 left-0 mb-4 ml-4">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{{ props.country.name }}</div>
            <div class="block mt-1 text-lg leading-tight font-medium text-black">{{ props.country.region.value }}</div>
          </div>
        </div>
        <div class="p-8">
          <p class="mt-2 text-gray-500">{{ props.country.capitalCity }}</p>
          <div class="mt-4">
            <div class="text-sm font-semibold text-gray-700">GDP per capita:</div>
            <div class="text-lg font-medium text-gray-900">{{ gdpPerCapita ? `$${gdpPerCapita.toFixed(2)}` : 'N/A' }}</div>
          </div>
          <div class="mt-4">
            <div class="text-sm font-semibold text-gray-700">GNI per capita:</div>
            <div class="text-lg font-medium text-gray-900">{{ gniPerCapita ? `$${gniPerCapita.toFixed(2)}` : 'N/A' }}</div>
            <div>
              <router-link :to="{ name: 'CountryDetail', params: { id: props.country.id } }" class="text-indigo-600 hover:text-indigo-900">
  View Details
</router-link>
  </div>
          </div>
        </div>
      </div>
    </div>
  </template>