<template>
  <div>
    <Button
      label="התחבר עם Google"
      icon="pi pi-google"
      @click="loginWithGoogle"
      class="login-button"
    ></Button>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { LOGIN_URL } from "./consts";

async function loginWithGoogle() {
  try {
    const resUrl = await axios.get(LOGIN_URL, { withCredentials: true });
    const url = await resUrl.data;
    window.location.href = url;
  } catch (e: any) {
    console.log(e.message);
  }
}
</script>

<style>
.login-button,
.login-button:focus,
.login-button:active,
.login-button:hover {
  border: none !important;
  outline: none !important;
  transform: none !important;
  background: var(--main-gradient) !important;
}
</style>
