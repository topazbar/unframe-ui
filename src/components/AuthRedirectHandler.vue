<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import axios from "axios";
import { VALID_TOKEN_ROUTE } from "./consts";

const router = useRouter();

onMounted(async () => {
  try {
    await axios.get(VALID_TOKEN_ROUTE, {
      withCredentials: true,
    });

    router.replace("/search");
  } catch (err) {
    console.error("missing token");
    router.replace("/");
  }
});
</script>

<template>
  <div></div>
</template>
