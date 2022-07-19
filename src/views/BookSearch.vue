<template>
  <div class="search">
    <div class="search__bar">
      <div v-if="inputIsFocus" class="search__bar__hint">
        Press Enter to search
      </div>
      <input
        type="text"
        v-model="term"
        ref="searchInput"
        @keyup.enter="onSearch"
        @focus="inputIsFocus = true"
        @blur="inputIsFocus = false"
      />
      <button @click="onSearch">
        <span>Search</span>
      </button>
    </div>
    <div v class="search__results">
      <BookListItem
        v-for="(book, index) in bookList"
        :book="book"
        :key="book.imageUrl + index"
      />
    </div>
    <PaginationFoot
      v-if="bookApiResponse?.total"
      v-model="page"
      :responseTotalItems="20"
      :totalItems="bookApiResponse.total"
    />
  </div>
  <BookSearchLoader v-if="isLoading" />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
// type imports
import type { BookApiResponse } from '../types/books'
// component imports
import BookListItem from '@/components/BookListItem.vue'
import PaginationFoot from '../components/PaginationFoot.vue'
import BookSearchLoader from '@/components/BookSearchLoader.vue'

// search
const searchInput = ref<HTMLInputElement | null>(null)
const term = ref('')
const bookApiResponse = ref<BookApiResponse>()
const bookList = computed(() => bookApiResponse.value?.list)
const inputIsFocus = ref(false)
const isLoading = ref(false)

function onSearch() {
  if (term.value.length) {
    page.value = 1
    getBookListByTerm(term.value, { page: 1 })
  }
}

// pagination
const page = ref(1)

watch(page, (newVal, oldVal) => {
  if (newVal === oldVal) return
  getBookListByTerm(term.value, { page: newVal })
})

// fetch
function getQuery(argObj: object = {}) {
  let newQuery = ''
  for (const [index, [key, value]] of Object.entries(argObj).entries()) {
    newQuery = `${newQuery}${index != 0 ? '&' : ''}${key}=${value}`
  }
  return newQuery
}

function getBookListByTerm(term: string, queryObj: object = {}) {
  searchInput.value?.blur()
  isLoading.value = true
  const query = getQuery(queryObj)
  return fetch(
    `https://goodreads-server-express--dotdash.repl.co/search/${term}?${query}`,
    {
      method: 'GET',
    },
  )
    .then((response) => response.json())
    .then((result) => {
      bookApiResponse.value = result
      isLoading.value = false
    })
    .catch((error) => console.error('error', error))
}
</script>

<style lang="sass">
body
  background-image: linear-gradient(45deg, #1D223A 0%, #4B5C94 100%)

.search
  width: 100%
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  &__bar
    height: 70px
    display: flex
    margin: 100px 0
    position: relative

    & > *

      position: relative

    input
      display: block
      padding: 10px 20px 13px
      box-sizing: border-box
      height: 100%
      font-size: 1.5rem
      border-radius: 20px 0 0 20px
      border: none
      color: #1D223A
      box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.3)
      width: 400px
      transition: box-shadow 0.2s ease-in-out

      &:focus-visible
        border: none
        outline: none
        box-shadow: 0px 0px 10px 0px rgba(255,255,255,0.5)

    button
      display: block
      box-sizing: border-box
      font-size: 1.5rem
      height: 100%
      padding: 5px 30px
      border: none
      border-radius: 0 20px 20px 0
      background-image: linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)
      color: #fff
      box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.3)
      transition: background-image 0.3s ease-in-out
      position: relative
      overflow: hidden
      cursor: pointer
      span
        font-weight: 400
        text-shadow: 0px 1px 2px rgba(0,0,0,0.3)
        position: relative

      &:before
        content: ''
        display: block
        position: absolute
        inset: 0
        background-image: linear-gradient(45deg, #FFCC70 0%, #C850C0 46%, #4158D0 100%)
        opacity: 0
        transition: opacity 0.5s ease-in-out
      &:hover
        &:before
          opacity: 1

    &__hint
      position: absolute
      bottom: 0
      left: 50%
      color: #7d8dc1
      transform: translate(-50%,0)
      animation: show-hint 0.1s ease-in-out forwards

  &__results
    width: 100%
    max-width: 1100px
    display: flex
    flex-wrap: wrap
    padding: 0 30px

    & >div
      flex: 50%


@keyframes show-hint
  0%
    transform: translate(-50%,0)
  100%
    transform: translate(-50%,25px)
</style>
