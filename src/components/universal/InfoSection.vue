<script setup lang="ts">
import { computed, reactive, watch } from "vue"
import { userStore } from "../../store/userStore"
import Input from "../UI/Input.vue"
import Button from "../UI/Button.vue"

const user = userStore()

interface State {
  name: string
  //   shaba: string
  //   national: string
  phone: string
}

const state = reactive<State>({
  name: user.$state.name,
  //   shaba: "",
  //   national: "",
  phone: user.$state.phone,
})

const isDifferentFromStore = computed(() => {
  return state.name !== user.$state.name || state.phone !== user.$state.phone
})

const isButtonDisabled = computed(() => {
  return !state.name || !state.phone || !isDifferentFromStore.value
})

watch(
  state,
  (newState) => {
    console.log("State changed:", newState)
    console.log("Is different from store:", isDifferentFromStore.value)
  },
  { deep: true },
)
</script>

<template>
  <div class="h-full flex flex-col gap-5">
    <Input id="name" v-model="state.name" name="name" label="نام شما" />

    <Input
      dir="ltr"
      type="number"
      id="phone"
      v-model="state.phone"
      name="phone"
      label="شماره تماس"
    />

    <Button
      text="ثبت اطلاعات"
      :disabled="isButtonDisabled"
      @click="
        () => {
          console.log(state)
          user.setUserData(state)
        }
      "
    />
  </div>
</template>
