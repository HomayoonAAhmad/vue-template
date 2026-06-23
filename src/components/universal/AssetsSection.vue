<script setup lang="ts">
import AssetCard from "../cards/AssetCard.vue"
import WalletCard from "../cards/WalletCard.vue"
</script>

<template>
  <div class="flex flex-col gap-5">
    <AssetCard :amount="10" unit="میلی گرم" :profit="20" />

    <WalletCard />
  </div>
</template>
