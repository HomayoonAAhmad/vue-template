<script setup lang="ts">
import UserDataProvider from "./providers/UserDataProvider.vue"
import { version } from "../package.json"

console.log(version)
</script>

<template>
  <user-data-provider>
    <router-view></router-view>
  </user-data-provider>
</template>
