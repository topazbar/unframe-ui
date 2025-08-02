<script setup lang="ts">
import { computed, ref } from "vue";
import { DISPLAY_SCHEMA, PAGE_SIZE } from "./consts";

const props = defineProps<{
  queryResult: Record<string, any>;
  isNextPageToken?: boolean;
}>();
const emit = defineEmits<{
  (e: "load-more"): void;
}>();

const startIndex = ref(0);

const flatResults = computed(() => {
  const result: { provider: string; item: any }[] = [];
  for (const [provider, data] of Object.entries(props.queryResult)) {
    data?.forEach((item: any) => {
      result.push({ provider, item });
    });
  }
  return result;
});
const visibleResults = computed(() =>
  flatResults.value.slice(startIndex.value, startIndex.value + PAGE_SIZE)
);
const hasMoreLocal = computed(
  () => startIndex.value + PAGE_SIZE < flatResults.value.length
);

const hasPrev = computed(() => startIndex.value > 0);
const handlePrev = () => {
  startIndex.value = Math.max(0, startIndex.value - PAGE_SIZE);
};

const handleNext = () => {
  if (hasMoreLocal.value) {
    startIndex.value += PAGE_SIZE;
  } else if (props.isNextPageToken) {
    emit("load-more");
  }
};
</script>

<template>
  <div class="result-wrapper">
    <Card class="card-style">
      <template #title>
        <h2 class="gradient-title">תוצאות חיפוש</h2>
      </template>

      <template #content>
        <div>
          <div
            v-for="({ item, provider }, index) in visibleResults"
            :key="item.id || index"
            class="result-item"
          >
            <div
              v-for="field in DISPLAY_SCHEMA[provider]"
              :key="field"
              class="field-line"
            >
              <span class="field-key">{{ field }}:</span>
              <span class="field-value">{{ item[field] }}</span>
            </div>
          </div>
          <div
            v-if="hasPrev || hasMoreLocal || props.isNextPageToken"
            class="pagination-buttons"
          >
            <button
              class="pagination-button"
              @click="handlePrev"
              :disabled="!hasPrev"
            >
              ← הקודם
            </button>
            <button
              class="pagination-button"
              @click="handleNext"
              :disabled="!hasMoreLocal && !props.isNextPageToken"
            >
              הבא →
            </button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style>
.card-style {
  width: 40em;
  margin: 2em auto;
  padding: 1rem;
  overflow-x: auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.gradient-title {
  font-size: 2rem;
  font-weight: bold;
  background: var(--main-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5em;
  text-align: center;
}

.result-item {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 1em;
  margin-bottom: 1em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: 0.2s;
}

.field-key {
  font-weight: bold;
  margin-inline-end: 0.3em;
  color: #333;
}
.field-value {
  color: #444;
  direction: ltr;
}
.result-item:hover {
  background-color: #f0f0f0;
}

.field-line {
  margin-bottom: 0.3em;
}
</style>
