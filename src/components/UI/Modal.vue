<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/outline"
import { onUnmounted, watch } from "vue"

interface Props {
  open: boolean
  className?: string
  parentClassName?: string
  showCloseButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  className: "",
  parentClassName: "",
  showCloseButton: true,
})

const emit = defineEmits(["update:open", "close"])

const handleClose = () => {
  emit("update:open", false)
  emit("close")
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    handleClose()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.open) {
    handleClose()
  }
}

watch(
  () => props.open,
  (newValue) => {
    if (newValue) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape)
  document.body.style.overflow = ""
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        @click="handleBackdropClick"
        class="fixed inset-0 z-40 flex justify-center items-center transition-colors backdrop-blur-xs"
        :class="{ visible: open, invisible: !open }"
      >
        <div
          @click.stop
          class="bg-white w-[90%] md:max-w-100 min-h-37.5 rounded-xl shadow-2xl p-5 m-2 transition-all duration-350 z-50 relative"
          :class="[
            open ? 'scale-100 opacity-100' : 'scale-125 opacity-0',
            className,
          ]"
        >
          <button
            v-if="showCloseButton"
            @click="handleClose"
            class="absolute top-0 left-0 p-1 rounded-lg transition-all duration-150 ease-in-out text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <XCircleIcon class="size-6" />
          </button>

          <div :class="['mt-3', parentClassName]">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.35s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  backdrop-filter: blur(0);
}

.modal-enter-from > div,
.modal-leave-to > div {
  opacity: 0;
  transform: scale(1.1);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.modal-enter-to > div,
.modal-leave-from > div {
  opacity: 1;
  transform: scale(1);
}
</style>
