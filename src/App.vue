<script setup lang="ts">
import UserDataProvider from "./providers/UserDataProvider.vue"
</script>

<template>
  <user-data-provider>
    <router-view></router-view>
  </user-data-provider>
</template>
