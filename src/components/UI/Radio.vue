<script setup lang="ts">
interface Option {
  value: string | number
  title: string
  description?: string
  disabled?: boolean
}

interface Props {
  modelValue: string | number
  options: Option[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void
}>()

const select = (option: Option) => {
  if (option.disabled) return
  emit("update:modelValue", option.value)
}
</script>

<template>
  <div
    class="p-4.5 border shadow-sm border-fifth rounded-xl pb-5 flex flex-col gap-5"
  >
    <slot name="title" />

    <template v-for="(option, index) in options" :key="option.value">
      <div
        class="flex items-center gap-2"
        :class="{
          'cursor-pointer': !option.disabled,
          'cursor-not-allowed opacity-50': option.disabled,
        }"
        @click="select(option)"
      >
        <span
          class="aspect-square border-2 flex items-center p-0.75 rounded-full size-5"
          :class="
            modelValue === option.value ? 'border-primary' : 'border-gray-200'
          "
        >
          <span
            v-if="modelValue === option.value"
            class="rounded-full w-full h-full bg-primary"
          ></span>
        </span>

        <div class="flex w-full items-center justify-between">
          <div class="flex flex-col gap-1">
            <span class="text-xs md:text-sm font-semibold">
              {{ option.title }}
            </span>

            <span
              v-if="option.description"
              class="text-[10px] text-[#828282] font-light"
            >
              {{ option.description }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="index !== options.length - 1"
        class="h-px w-full bg-gray-200"
      />
    </template>
  </div>
</template>
