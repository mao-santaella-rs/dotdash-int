<template>
  <div class="pagination">
    <div
      v-if="modelValue > 1"
      class="pagination__arrow pagination__arrow--left"
    ></div>
    <template v-for="number in computedNumbers" :key="`number-${number}`">
      <div
        v-if="number === 0"
        class="pagination__number pagination__number--dots"
      >
        ...
      </div>
      <div
        v-else
        class="pagination__number"
        :class="{ 'pagination__number--selected': number === modelValue }"
        @click="$emit('update:modelValue', number)"
      >
        {{ Number(number).toLocaleString('en') }}
      </div>
    </template>
    <div
      v-if="modelValue != totalPages"
      class="pagination__arrow pagination__arrow--right"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps({
  modelValue: { type: Number, required: true },
  responseTotalItems: Number,
  totalItems: Number,
})

const totalPages = computed(() => {
  const { totalItems, responseTotalItems } = props
  if (totalItems && responseTotalItems) {
    return Math.round(totalItems / responseTotalItems)
  }
  return 0
})

const computedNumbers = computed(() => {
  if (totalPages.value) {
    const maxAmmount = 4
    const finalArr: number[] = []
    if (totalPages.value > maxAmmount * 2) {
      for (let number = 1; number <= maxAmmount; number++) {
        finalArr.push(number)
      }

      finalArr.push(0)

      finalArr.push(totalPages.value)

      return finalArr
    } else {
      for (let number = 1; number <= totalPages.value; number++) {
        finalArr.push(number)
      }
    }
    return finalArr
  }
  return []
})
</script>

<style lang="sass">
.pagination
  display: flex
  align-items: center

  & > div
    color: #fff

  &__number
    padding: 15px
    cursor: pointer
    transition: transform 0.2s ease-in-out
    &:hover
      transform: scale(1.2)
    &--selected
      font-weight: 700
    &--dots
      pointer-events: none

  &__arrow
    width: 15px
    height: 15px
    transform: rotate(45deg) scale(1)
    cursor: pointer
    transition: transform 0.2s ease-in-out

    &:hover
      transform: rotate(45deg) scale(1.2)

    &--left
      border-left: 1px solid #fff
      border-bottom: 1px solid #fff
      margin-right: 10px

    &--right
      border-right: 1px solid #fff
      border-top: 1px solid #fff
      margin-left: 10px
</style>
