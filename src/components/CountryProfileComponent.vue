<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

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

const router = useRouter();

function navigateToCountryDetails() {
  router.push({ name: 'CountryDetails', params: { id: props.country.id } });
}


const gdpPerCapita = ref<number | null>(null);
const gniPerCapita = ref<number | null>(null);

onMounted(fetchEconomicData);

const formatNumber = computed(() => {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format;
    });

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
    <div class="flex justify-self-center">
    <div class="card w-96 shadow-xl">
  <figure><img 
    :src="`https://flagcdn.com/w640/${props.country.iso2Code.toLowerCase()}.png`"
    :alt="`${props.country.name} Flag`"
    /></figure>
  <div class="card-body">
    <h2 class="card-title">
      {{ props.country.name }}
      <div class="badge badge-secondary">{{ props.country.region.value }}</div>
    </h2>
    <p>{{ props.country.capitalCity }}</p>
    <div class="card-actions justify-end items-center">
      <div class="badge badge-outline">{{ gdpPerCapita ? `$${formatNumber(gdpPerCapita)}` : 'N/A' }}</div>
      <div class="badge badge-outline">{{ gniPerCapita ? `$${formatNumber(gniPerCapita)}` : 'N/A' }}</div>
      <button class="btn btn-active btn-ghost btn-sm" @click="navigateToCountryDetails">Details</button>
    </div>
  </div>
</div>
<!-- <div class="divider lg:divider-horizontal"></div>  -->
</div>
  </template>