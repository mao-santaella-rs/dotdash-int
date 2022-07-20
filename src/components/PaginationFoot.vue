<template>
  <div class="pagination">
    <div
      v-if="paginationObj.previous_page"
      class="pagination__arrow pagination__arrow--left"
      @click="$emit('update:modelValue', paginationObj.previous_page)"
    />
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
      v-if="paginationObj.next_page"
      class="pagination__arrow pagination__arrow--right"
      @click="$emit('update:modelValue', paginationObj.next_page)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps({
  modelValue: { type: Number, required: true },
  paginationObj: { type: Object, required: true },
})

const computedNumbers = computed(() => {
  const totalPages = props.paginationObj.total_pages
  if (totalPages) {
    const maxAmmount = 4
    const finalArr: number[] = []
    if (totalPages > maxAmmount * 2) {
      const pageSelected = props.modelValue
      const initialNumber =
        pageSelected >= maxAmmount
          ? pageSelected > totalPages - maxAmmount + 1
            ? totalPages - maxAmmount + 1
            : pageSelected - 1
          : 1

      if (initialNumber != 1) {
        finalArr.push(1)
        finalArr.push(0)
      }

      for (
        let number = initialNumber;
        number < initialNumber + maxAmmount;
        number++
      ) {
        finalArr.push(number)
      }

      if (initialNumber + maxAmmount < totalPages) {
        finalArr.push(0)
      }
      if (initialNumber + maxAmmount <= totalPages) {
        finalArr.push(totalPages)
      }

      return finalArr
    } else {
      for (let number = 1; number <= totalPages; number++) {
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
  margin-bottom: 25px

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
    @media (max-width: 425px)
      padding: 15px 10px

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
