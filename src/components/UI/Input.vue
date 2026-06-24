<script setup lang="ts">
import { computed } from "vue"
import { onlyNumber, optimizePersian } from "../../utils/helper"

interface Props {
  id: string
  modelValue: string
  label?: string
  disabled?: boolean
  type?: "string" | "number"
  placeholder?: string
  separate?: boolean
  dir?: "rtl" | "ltr"
  maxLength?: number
  minLength?: number
  autoComplete?: string
  readOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "string",
  separate: false,
  dir: "rtl",
})

const emit = defineEmits<{
  "update:modelValue": [value: string]
  focus: []
}>()

const formatNumber = (value: string) => {
  return value ? Number(value).toLocaleString() : ""
}

const displayValue = computed(() => {
  if (props.separate && props.type === "number") {
    return formatNumber(onlyNumber(props.modelValue))
  }
  return props.modelValue
})

const inputType = computed(() => {
  return props.type === "number" ? "tel" : "text"
})

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let rawValue = input.value

  if (props.type === "number") {
    rawValue = onlyNumber(rawValue)

    input.value = props.separate ? formatNumber(rawValue) : rawValue
  } else {
    rawValue = optimizePersian(rawValue)
  }

  emit("update:modelValue", rawValue)
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
    <input
      :id="id"
      :name="id"
      :value="displayValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readOnly"
      :maxlength="maxLength"
      :minlength="minLength"
      :autocomplete="autoComplete"
      class="w-full border h-11.75 md:h-13 text-xs md:text-sm placeholder:text-right px-3 rounded-lg outline-none transition-all duration-300 border-fifth shadow-sm focus:border-primary"
      :class="{
        'bg-gray-100 cursor-not-allowed opacity-60': disabled,
        'border-danger': false,
      }"
      @input="handleInput"
      @focus="emit('focus')"
    />
  </div>
</template>
