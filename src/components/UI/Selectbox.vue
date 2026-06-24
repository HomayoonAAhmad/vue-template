<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/outline"
import { computed, ref } from "vue"

interface Props {
  id: string
  modelValue: string
  label?: string
  disabled?: boolean
  options: { key: string; label: string }[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()

const isOpen = ref(false)

const selectedOption = computed(() =>
  props.options.find((item) => item.key === props.modelValue),
)

const selectOption = (value: string) => {
  emit("update:modelValue", value)
  isOpen.value = false
}
</script>

<template>
  <div class="w-full relative" dir="rtl">
    <label
      v-if="label"
      :for="id"
      class="block text-[10px] bg-white text-primary absolute -top-3 lg:-top-2.5 right-3 z-1 px-1.75 py-0.5 lg:py-1"
    >
      {{ label }}
    </label>

    <button
      type="button"
      class="w-full flex items-center justify-between border h-11.75 md:h-13 text-xs md:text-sm placeholder:text-right px-3 rounded-lg outline-none transition-all duration-300 border-primary"
      :class="{
        'bg-gray-100 cursor-not-allowed opacity-60': disabled,
      }"
      @click="isOpen = !isOpen"
    >
      {{ selectedOption?.label || "انتخاب کنید..." }}

      <ChevronDownIcon
        class="aspect-square transition-all duration-300 size-4.5"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition name="fade">
      <div
        v-if="isOpen"
        class="absolute top-full z-10 mt-2 w-full rounded-xl shadow overflow-scroll scrollbar-hidden max-h-50 bg-white"
      >
        <div
          v-for="option in options"
          :key="option.key"
          @click="selectOption(option.key)"
        >
          <slot
            name="option"
            :option="option"
            :selected="option.key === modelValue"
          >
            <div
              class="cursor-pointer text-xs md:text-sm px-3 py-2 hover:bg-gray-200"
            >
              {{ option.label }}
            </div>
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
