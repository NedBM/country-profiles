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

<!-- <template>
  <div class="">
    <div class="max-w-md mx-auto bg-stone-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="md:flex-shrink-0 relative">
          <img class="h-48 w-full object-cover md:w-80 md:h-48" :src="`https://flagcdn.com/w640/${props.country.iso2Code.toLowerCase()}.png`" :alt="`${props.country.name} Flag`" />
          <div class="absolute bottom-0 left-0 mb-4 ml-4">
            <div class="uppercase tracking-wide text-sm text-yellow-300 font-semibold">{{ props.country.name }}</div>
            <p class=" text-stone-400 text-xs">{{ props.country.capitalCity }}</p>
            <div class="block mt-1 text-sm leading-tight font-medium text-stone-400">{{ props.country.region.value }}</div>
          </div>
        </div>
        <div class="p-8">
          <div class="mt-4">
            <div class="text-sm font-semibold text-stone-500">GDP per capita:</div>
            <div class="text-sm font-medium text-stone-400">{{ gdpPerCapita ? `$${formatNumber(gdpPerCapita)}` : 'N/A' }}</div>
          </div>
          <div class="mt-4">
            <div class="text-sm font-semibold text-stone-500">GNI per capita:</div>
            <div class="text-sm font-medium text-stone-400">{{ gniPerCapita ? `$${formatNumber(gniPerCapita)}` : 'N/A' }}</div>
            <div>
              <button
  class="text-yellow-500 hover:text-yellow-200"
  @click="navigateToCountryDetails"
>
  View Details
</button>
  </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template> -->


  <template>
    <div class="">
      <div class="max-w-md mx-auto bg-stone-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-12 w-11/12 md:w-auto">
        <div class="flex flex-col">
          <div class="w-full">
            <img
              class="w-full h-48 object-cover"
              :src="`https://flagcdn.com/w640/${props.country.iso2Code.toLowerCase()}.png`"
              :alt="`${props.country.name} Flag`"
            />
          </div>
          <div class="p-8">
            <div class="mb-2">
              <div class="uppercase tracking-wide text-md text-yellow-300 font-semibold">{{ props.country.name }}</div>
              <p class="text-stone-400 text-xs">{{ props.country.capitalCity }}</p>
              <div class="block mt-1 text-sm leading-tight font-medium text-stone-400">{{ props.country.region.value }}</div>
            </div>
            <div class="mt-2 flex flex-row gap-1">
              <div class="text-sm font-semibold text-stone-500">GDP per capita:</div>
              <div class="text-sm font-medium text-stone-400">{{ gdpPerCapita ? `$${formatNumber(gdpPerCapita)}` : 'N/A' }}</div>
            </div>
            <div class="mt-2 flex flex-row gap-1">
              <div class="text-sm font-semibold text-stone-500">GNI per capita:</div>
              <div class="text-sm font-medium text-stone-400">{{ gniPerCapita ? `$${formatNumber(gniPerCapita)}` : 'N/A' }}</div>
            </div>
            <div class="mt-2">
              <button
                class="text-yellow-500 hover:text-yellow-200"
                @click="navigateToCountryDetails"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>