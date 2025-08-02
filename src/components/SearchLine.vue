<script setup lang="ts">
import { onMounted, ref } from "vue";
import Button from "primevue/button";
import "primeicons/primeicons.css";
import { checkAuthAndRedirect } from "../services/authService";
import { useRoute, useRouter } from "vue-router";
import { fetchAiResult } from "../services/aiService";
import AiResult from "./AiResult.vue";
import { ProgressSpinner } from "primevue";

const searchQuery = ref("");
const hasSearch = ref(false);
const isLoading = ref(false);
const isNextPageToken = ref(false);

const route = useRoute();
const router = useRouter();
const accumulatedResults = ref<Record<string, any[]>>({});

onMounted(async () => {
  checkAuthAndRedirect(route, router);
});

const handleSearch = async () => {
  isLoading.value = true;
  if (searchQuery.value.trim() == "") {
    return;
  }
  try {
    hasSearch.value = true;
    const result = await fetchAiResult(searchQuery.value.trim());
    accumulatedResults.value = result.data.result;
    isNextPageToken.value = result.data.isNextPageToken ?? false;
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

const handleLoadMore = async () => {
  isLoading.value = true;
  try {
    const result = await fetchAiResult(searchQuery.value.trim());

    for (const [provider, items] of Object.entries(result.data.result)) {
      if (!accumulatedResults.value[provider]) {
        accumulatedResults.value[provider] = [];
      }
      accumulatedResults.value[provider].push(...(items as any[]));
    }

    isNextPageToken.value = result.data.isNextPageToken ?? false;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="main-container" :class="{ searched: hasSearch }">
    <div class="search-container">
      <FloatLabel>
        <InputText class="p-inputtext" v-model="searchQuery"></InputText>
        <label class="p-float-label" for="Enter Question">Enter Question</label>
      </FloatLabel>
      <Button
        class="custom-button"
        label="Search"
        icon="pi pi-search"
        iconPos="right"
        size="small"
        @click="handleSearch"
      />
    </div>
    <div v-if="isLoading" class="loader">
      <ProgressSpinner />
    </div>
    <div v-if="hasSearch && !isLoading" class="result">
      <AiResult
        :queryResult="accumulatedResults"
        :isNextPageToken="isNextPageToken"
        @load-more="handleLoadMore"
      ></AiResult>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  transition: all 0.3s ease;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh; /* כדי למרכז אנכית */
  width: 100%;
}

.main-container.searched {
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2em;
  height: auto;
}
.search-container {
  display: flex;
  gap: 0.4em;
}
.custom-button,
.custom-button:focus,
.custom-button:active,
.custom-button:hover {
  border: none !important;
  outline: none !important;
  transform: none !important;
  background: var(--main-gradient) !important;
}

.p-float-label {
  background: var(--main-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.p-inputtext {
  border: 1.5px solid transparent;
  border-image: var(--main-gradient);
  border-image-slice: 1;
  border-radius: 20px !important;
  width: 40em;
}
</style>
