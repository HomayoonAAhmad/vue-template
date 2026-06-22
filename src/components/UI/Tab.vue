<script setup lang="ts">
type Option = {
  id: string
  name: string
}

const props = defineProps<{
  options: Option[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
  (e: "change", value: string): void
}>()

const handleChange = (key: string) => {
  emit("update:modelValue", key)
  emit("change", key)
}
</script>

<template>
  <div
    class="flex gap-3 px-4 py-3 items-center justify-between w-full bg-white rounded-xl shadow-[0_3px_6px_rgba(0,0,0,0.1)] min-h-10.75"
  >
    <button
      v-for="item in options"
      :key="item.id"
      @click="handleChange(item.id)"
      class="w-full hover:bg-fifth rounded-lg py-2 transition-all duration-200 cursor-pointer text-primary"
      :class="{ 'bg-fifth': item.id === modelValue }"
    >
      {{ item.name }}
    </button>
  </div>
</template>
