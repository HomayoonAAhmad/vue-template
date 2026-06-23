<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline"

interface Props {
  text?: string
  className?: string
  disabled?: boolean

  loading?: boolean
  //   type?: ButtonProps["type"]
  icon?: string
  iconClassName?: string
  iconOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit("click", event)
}
</script>

<template>
  <button
    :disabled="disabled || loading"
    :class="{ 'opacity-50 cursor-not-allowed!': disabled }"
    class="transition-all duration-300 min-h-11 w-full cursor-pointer rounded-[9px] bg-primary text-white text-sm flex items-center justify-center gap-2"
    @click="handleClick"
  >
    <ArrowPathIcon
      v-if="loading"
      class="text-white aspect-square size-6 animate-spin"
    />
    <template v-else>
      {{ text }}
      <component v-if="icon" :is="icon"></component>
    </template>
  </button>
</template>
