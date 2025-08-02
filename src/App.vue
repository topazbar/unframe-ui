<script setup lang="ts">
import { onMounted } from "vue";
import { checkAuthAndRedirect } from "./services/authService";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  checkAuthAndRedirect(route, router);
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
