<template>
  <div>
    <h1 v-if="country">{{ country.name }} Details</h1>
    <div v-else>Loading...</div>
    <div id="chart"></div>
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

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const country = ref<Country | null>(null);

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