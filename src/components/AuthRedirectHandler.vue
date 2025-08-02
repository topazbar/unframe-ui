<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import axios from "axios";

const router = useRouter();

onMounted(async () => {
  try {
    await axios.get("http://localhost:3000/auth/validToken", {
      withCredentials: true,
    });

    router.replace("/search");
  } catch (err) {
    console.error("הטוקן לא תקף או חסר");
    router.replace("/");
  }
});
</script>

<template>
  <div></div>
</template>
