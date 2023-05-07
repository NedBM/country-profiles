<template>
  <div>
    <h1 v-if="country">{{ country.name }} Details</h1>
    <div role="status" v-else="loading">
    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
    <div v-if="country" class="flex w-full items-center flex-col">
    <div id="chart"></div>
    <div class="stats shadow">
  
  <div class="stat">
    <div class="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>
    <div class="stat-title">Population</div>
  <div class="stat-value">{{ stats.population }}</div>
  <div class="stat-desc">2020</div>
  </div>
  
  <div class="stat">
    <div class="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
    </div>
    <div class="stat-title">GDP per capita (2010 US$)</div>
  <div class="stat-value">{{ stats.gdpPerCapita }}</div>
  <div class="stat-desc">2020</div>
  </div>
  
  <div class="stat">
    <div class="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
    </div>
    <div class="stat-title">Life expectancy at birth</div>
  <div class="stat-value">{{ stats.lifeExpectancy }}</div>
  <div class="stat-desc">2020</div>
  </div>
  
</div>
  </div>
  </div>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
interface Country {
  id: string;
  name: string;
  // Add more properties as needed
}

interface ElectricityData {
    year: number;
    percentage: number;
  }

  interface CountryStats {
  population: number | null;
  gdpPerCapita: number | null;
  lifeExpectancy: number | null;
}

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const country = ref<Country | null>(null);
  const stats = ref<CountryStats>({
  population: null,
  gdpPerCapita: null,
  lifeExpectancy: null,
});

onMounted(async () => {
  try {
    const response = await axios.get(`https://api.worldbank.org/v2/country/${route.params.id}?format=json`);
    country.value = response.data[1][0];
    
    // Call fetchAccessToElectricityData() after fetching data
    await fetchAccessToElectricityData();
  } catch (error) {
    console.error('Error fetching country:', error);
  }
});

async function fetchAccessToElectricityData() {
  try {
    const response = await axios.get(
      `https://api.worldbank.org/v2/country/${country.value?.id}/indicator/EG.ELC.ACCS.ZS?format=json&date=2000:2020`
    );

    const electricityData: ElectricityData[]  = response.data[1].map((item: { date: any; value: any; }) => ({
      year: item.date,
      percentage: item.value,
    }));

    drawAccessToElectricityChart(electricityData);
  } catch (error) {
    console.error('Error fetching access to electricity data:', error);
  }
}

async function fetchCountryStats() {
  try {
    const responsePopulation = await axios.get(
      `https://api.worldbank.org/v2/country/${country.value?.id}/indicator/SP.POP.TOTL?format=json&date=2020`
    );
    const responseGdpPerCapita = await axios.get(
      `https://api.worldbank.org/v2/country/${country.value?.id}/indicator/NY.GDP.PCAP.CD?format=json&date=2020`
    );
    const responseLifeExpectancy = await axios.get(
      `https://api.worldbank.org/v2/country/${country.value?.id}/indicator/SP.DYN.LE00.IN?format=json&date=2020`
    );

    stats.value = {
      population: responsePopulation.data[1][0].value,
      gdpPerCapita: responseGdpPerCapita.data[1][0].value,
      lifeExpectancy: responseLifeExpectancy.data[1][0].value,
    };
  } catch (error) {
    console.error('Error fetching country stats:', error);
  }
}

function drawAccessToElectricityChart(data: ElectricityData[]) {
  // Set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // Create an SVG element and append it to the DOM
  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Create X and Y scales
  const x = d3.scaleLinear().domain([2000, 2020]).range([0, width]);
  const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

  // Add X and Y axis to the SVG
  svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x).tickFormat(d3.format('d')));
  svg.append('g').call(d3.axisLeft(y));

  // Draw the line
  const line = d3
    .line<ElectricityData>()
    .x((d) => x(d.year))
    .y((d) => y(d.percentage));

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', line);
}



</script>