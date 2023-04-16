<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import CountryProfileComponent from './components/CountryProfileComponent.vue';

const mockCountry = {
  name: 'United States',
  region: 'North America',
  description:
    'The United States of America is a country primarily located in North America. It consists of 50 states, a federal district, five major self-governing territories, 326 Indian reservations, and some minor possessions.',
};
</script>

<!-- <template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <CountryProfileComponent :country="mockCountry" />
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template> -->

<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold underline mb-8">
        Hello world!
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CountryProfileComponent :country="mockCountry" />
        <CountryProfileComponent :country="mockCountry" />
        <CountryProfileComponent :country="mockCountry" />
        <CountryProfileComponent :country="mockCountry" />
        <CountryProfileComponent :country="mockCountry" />
        <CountryProfileComponent :country="mockCountry" />
        <CountryProfileComponent :country="mockCountry" />
        <CountryProfileComponent :country="mockCountry" />
        <CountryProfileComponent :country="mockCountry" />
        <CountryProfileComponent :country="mockCountry" />
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
