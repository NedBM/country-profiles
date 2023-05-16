<script setup lang="ts">
import * as d3 from 'd3';
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
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
    await fetchAccessToElectricityData(); fetchCountryStats(currentYear.value);
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

const currentYear = ref(2020);
const latestYear = ref(2000)
async function fetchCountryStats(year: number) {
  try {
    const responsePopulation = await axios.get(
      `https://api.worldbank.org/v2/country/${country.value?.id}/indicator/SP.POP.TOTL?format=json&date=${year}`
    );
    const responseGdpPerCapita = await axios.get(
      `https://api.worldbank.org/v2/country/${country.value?.id}/indicator/NY.GDP.PCAP.CD?format=json&date=${year}`
    );
    const responseLifeExpectancy = await axios.get(
      `https://api.worldbank.org/v2/country/${country.value?.id}/indicator/SP.DYN.LE00.IN?format=json&date=${year}`
    );

    stats.value = {
      population: responsePopulation.data[1][0].value,
      gdpPerCapita: responseGdpPerCapita.data[1][0].value,
      lifeExpectancy: responseLifeExpectancy.data[1][0].value
    };
    currentYear.value = year;
  } catch (error) {
    console.error('Error fetching country stats:', error);
  }
}

function nextYear() {
  if (currentYear.value < 2021) {
    currentYear.value++;
    fetchCountryStats(currentYear.value);
  }
}

function prevYear() {
    currentYear.value--;
    fetchCountryStats(currentYear.value);
}
const isDataUnavailable = computed(() => currentYear.value === 2021);

const router = useRouter();
function navigateToHome() {
  router.push({ name: 'Home',});
}

const formatGDP = computed(() => {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format;
    });

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function drawAccessToElectricityChart(data: ElectricityData[]) {
  // Set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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
    .attr('stroke', '#FFFFFF')
    .attr('stroke-width', 3)
    .attr('d', line);

    svg
  .selectAll('.data-point')
  .data(data)
  .join('circle')
  .attr('class', 'data-point')
  .attr('cx', (d) => x(d.year))
  .attr('cy', (d) => y(d.percentage))
  .attr('r', 6)
  .attr('fill', (d) => (d.year === currentYear.value ? 'red' : '#FFFFFF'));

// Add tooltips to display the percentage in that year
const tooltip = d3
  .select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('position', 'absolute')
  .style('visibility', 'hidden')
  .style('background-color', '#FFFFFF')
  .style('padding', '5px')
  .style('border-radius', '3px')
  .style('text-align', 'center');

svg
.selectAll('.data-point')
.on('mouseover', function(event, d) {
  const dataPoint = d as ElectricityData;
  tooltip
    .style('visibility', 'visible')
    .html(`<div class="text-accent">Year: ${dataPoint.year}<br>Percentage: ${dataPoint.percentage.toFixed(2)}%</div>`);
})
.on('mousemove', (event) => {
  tooltip
    .style('top', `${event.pageY - 10}px`)
    .style('left', `${event.pageX + 10}px`);
})
.on('mouseout', () => {
  tooltip.style('visibility', 'hidden');
});
}

function drawBubbleChart(data: CountryStats[]) {
  // Set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // Create an SVG element and append it to the DOM
  const svg = d3
    .select('#bubbleChart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  //@ts-ignore
  const x = d3.scaleLinear().domain([0, d3.max(data, d => d.gdpPerCapita)]).range([0, width]);
  //@ts-ignore
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.lifeExpectancy)]).range([height, 0]);
  //@ts-ignore
  const radius = d3.scaleSqrt().domain([0, d3.max(data, d => d.population)]).range([0, 40]);

  // Add dots
  svg
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
  //@ts-ignore
      .attr('cx', d => x(d.gdpPerCapita))
  //@ts-ignore
      .attr('cy', d => y(d.lifeExpectancy))
  //@ts-ignore
      .attr('r', d => radius(d.population))
      .style('fill', '#69b3a2')
      .style('opacity', '0.7')
      .attr('stroke', 'black');
}



</script>


<template>
  <div>
  <div class="w-full">
    <div class="flex justify-start items-start">
    <button class="btn btn-square m-4 hover:animate-rotate-x hover:animate-once hover:animate-duration-[1200ms] hover:animate-ease-out hover:animate-alternate hover:animate-fill-both" @click="navigateToHome" >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-pulse">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  </button> 
</div> 
<div class="flex justify-center items-center justify-self-center">
    <h1 class="text-2xl font-semibold animate-fade-up" v-if="country">{{ country.name }} Details</h1>
    <div role="status" v-else="loading">
      <button class="btn loading">loading</button>
    </div>
</div>
</div>
<div class="flex-col">
    <div v-if="country" class="flex w-full items-center md:flex-row gap-14 my-6 content-center justify-center flex-col">
    <div id="chart"/>
    <div class="flex-col flex gap-4">
      <div class="flex items-center gap-4">
    <div class="tooltip" data-tip="Prev Year" @click="prevYear">
      <button class="btn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
</svg>
</button>
    </div>
    <div class="stats shadow stats-vertical border-accent-content border-[1px]">
      <div class="stat" key="currentYear">
        {{ currentYear }}
      </div>
  <div class="stat">
    <div class="stat-figure text-accent-content">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
    </div>
    <div class="stat-title">Population</div>
  <div class="stat-value animate-fade-up">{{ stats.population ? `${numberWithCommas(stats.population)}` : 'N/A' }}</div>
  </div>
  
  <div class="stat">
    <div class="stat-figure text-accent-content">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    </div>
    <div class="stat-title">GDP per capita</div>
  <div class="stat-value animate-fade-up">{{ stats.gdpPerCapita ? `$${formatGDP(stats.gdpPerCapita)}` : 'N/A' }}</div>
  </div>
  <div class="stat">
    <div class="stat-figure text-accent-content">
      <svg xmlns="http://www.w3.org/2000/svg" class="accent-content" width="1.5em" height="1.5em" viewBox="0 0 240 240"><path fill="currentColor" d="M245.83 121.63a15.53 15.53 0 0 0-9.52-7.33a73.51 73.51 0 0 0-22.17-2.22c4-19.85 1-35.55-2.06-44.86a16.15 16.15 0 0 0-18.79-10.88a85.53 85.53 0 0 0-28.55 12.12a94.58 94.58 0 0 0-27.11-33.25a16.05 16.05 0 0 0-19.26 0a94.48 94.48 0 0 0-27.11 33.25a85.53 85.53 0 0 0-28.55-12.12a16.15 16.15 0 0 0-18.79 10.88c-3 9.31-6 25-2.06 44.86a73.51 73.51 0 0 0-22.17 2.22a15.53 15.53 0 0 0-9.52 7.33a16 16 0 0 0-1.6 12.27c3.39 12.57 13.8 36.48 45.33 55.32S113.13 208 128.05 208s42.67 0 74-18.78c31.53-18.84 41.94-42.75 45.33-55.32a16 16 0 0 0-1.55-12.27ZM59.14 72.14a.2.2 0 0 1 .23-.15a70.43 70.43 0 0 1 25.81 11.67A118.65 118.65 0 0 0 80 119.17c0 18.74 3.77 34 9.11 46.28A123.59 123.59 0 0 1 69.57 140C51.55 108.62 55.3 84 59.14 72.14Zm3 103.35C35.47 159.57 26.82 140.05 24 129.7a59.82 59.82 0 0 1 22.5-1.17a129.08 129.08 0 0 0 9.15 19.41a142.28 142.28 0 0 0 34 39.56a114.92 114.92 0 0 1-27.55-12.01ZM128 190.4c-9.33-6.94-32-28.23-32-71.23C96 76.7 118.38 55.24 128 48c9.62 7.26 32 28.72 32 71.19c0 42.98-22.67 64.27-32 71.21Zm42.82-106.74A70.43 70.43 0 0 1 196.63 72a.2.2 0 0 1 .23.15c3.84 11.85 7.59 36.47-10.43 67.85a123.32 123.32 0 0 1-19.54 25.48c5.34-12.26 9.11-27.54 9.11-46.28a118.65 118.65 0 0 0-5.18-35.54ZM232 129.72c-2.77 10.25-11.4 29.81-38.09 45.77a114.92 114.92 0 0 1-27.55 12a142.28 142.28 0 0 0 34-39.56a129.08 129.08 0 0 0 9.15-19.41a59.69 59.69 0 0 1 22.49 1.19Z"/></svg>
    </div>
    <div class="stat-title">Life expectancy at birth</div>
  <div class="stat-value animate-fade-up">{{ stats.lifeExpectancy ? `${formatGDP(stats.lifeExpectancy)}` : 'N/A' }}</div>
  </div>
</div>
<div class="tooltip" :data-tip="isDataUnavailable ? 'Data unavailable' : 'Next Year'" @click="nextYear">
      <button class="btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
  </svg>
</button>
    </div>
  </div>
    <div class="flex items-center gap-4">
    <div class="tooltip" data-tip="Prev Year" @click="prevYear">
      <button class="btn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
</svg>
</button>
    </div>
    <div class="stats shadow stats-vertical border-info border-[1px]">
      <div class="stat" key="latestYear">
        {{ latestYear }}
      </div>
  <div class="stat">
    <div class="stat-figure text-accent-content">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-info">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
    </div>
    <div class="stat-title">Population</div>
  <div class="stat-value animate-fade-up">{{ stats.population ? `${numberWithCommas(stats.population)}` : 'N/A' }}</div>
  </div>
  
  <div class="stat">
    <div class="stat-figure text-accent-content">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-info">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    </div>
    <div class="stat-title">GDP per capita</div>
  <div class="stat-value animate-fade-up">{{ stats.gdpPerCapita ? `$${formatGDP(stats.gdpPerCapita)}` : 'N/A' }}</div>
  </div>
  <div class="stat">
    <div class="stat-figure text-accent-content">
      <svg xmlns="http://www.w3.org/2000/svg" class="text-info" width="1.5em" height="1.5em" viewBox="0 0 240 240"><path fill="currentColor" d="M245.83 121.63a15.53 15.53 0 0 0-9.52-7.33a73.51 73.51 0 0 0-22.17-2.22c4-19.85 1-35.55-2.06-44.86a16.15 16.15 0 0 0-18.79-10.88a85.53 85.53 0 0 0-28.55 12.12a94.58 94.58 0 0 0-27.11-33.25a16.05 16.05 0 0 0-19.26 0a94.48 94.48 0 0 0-27.11 33.25a85.53 85.53 0 0 0-28.55-12.12a16.15 16.15 0 0 0-18.79 10.88c-3 9.31-6 25-2.06 44.86a73.51 73.51 0 0 0-22.17 2.22a15.53 15.53 0 0 0-9.52 7.33a16 16 0 0 0-1.6 12.27c3.39 12.57 13.8 36.48 45.33 55.32S113.13 208 128.05 208s42.67 0 74-18.78c31.53-18.84 41.94-42.75 45.33-55.32a16 16 0 0 0-1.55-12.27ZM59.14 72.14a.2.2 0 0 1 .23-.15a70.43 70.43 0 0 1 25.81 11.67A118.65 118.65 0 0 0 80 119.17c0 18.74 3.77 34 9.11 46.28A123.59 123.59 0 0 1 69.57 140C51.55 108.62 55.3 84 59.14 72.14Zm3 103.35C35.47 159.57 26.82 140.05 24 129.7a59.82 59.82 0 0 1 22.5-1.17a129.08 129.08 0 0 0 9.15 19.41a142.28 142.28 0 0 0 34 39.56a114.92 114.92 0 0 1-27.55-12.01ZM128 190.4c-9.33-6.94-32-28.23-32-71.23C96 76.7 118.38 55.24 128 48c9.62 7.26 32 28.72 32 71.19c0 42.98-22.67 64.27-32 71.21Zm42.82-106.74A70.43 70.43 0 0 1 196.63 72a.2.2 0 0 1 .23.15c3.84 11.85 7.59 36.47-10.43 67.85a123.32 123.32 0 0 1-19.54 25.48c5.34-12.26 9.11-27.54 9.11-46.28a118.65 118.65 0 0 0-5.18-35.54ZM232 129.72c-2.77 10.25-11.4 29.81-38.09 45.77a114.92 114.92 0 0 1-27.55 12a142.28 142.28 0 0 0 34-39.56a129.08 129.08 0 0 0 9.15-19.41a59.69 59.69 0 0 1 22.49 1.19Z"/></svg>
    </div>
    <div class="stat-title">Life expectancy at birth</div>
  <div class="stat-value animate-fade-up">{{ stats.lifeExpectancy ? `${formatGDP(stats.lifeExpectancy)}` : 'N/A' }}</div>
  </div>
</div>
<div class="tooltip" :data-tip="isDataUnavailable ? 'Data unavailable' : 'Next Year'" @click="nextYear">
      <button class="btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
  </svg>
</button>
    </div>
  </div>
</div>
</div>
</div>
  </div>
</template>