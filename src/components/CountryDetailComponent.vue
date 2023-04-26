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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const country = ref<Country | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get(`https://api.worldbank.org/v2/country/${route.params.id}?format=json`);
    country.value = response.data[1][0];
    
    // Call drawChart() after fetching data
    drawChart();
  } catch (error) {
    console.error('Error fetching country:', error);
  }
});

function drawChart() {
  // Use the D3.js API to create your chart
  // Example: create a simple bar chart with random data
  const data = [30, 86, 168, 281, 303, 365];
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", 500)
    .attr("height", 150);

  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 25)
    .attr("y", (d) => 150 - d)
    .attr("width", 20)
    .attr("height", (d) => d)
    .attr("fill", "blue");
}
</script>