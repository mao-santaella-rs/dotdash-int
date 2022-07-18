<template>
  <div class="search">
    <div class="search__bar">
      <input type="text" v-model="term" @keyup.enter="onSearch" />
      <button @click="onSearch">
        <span>Search</span>
      </button>
    </div>
    <PaginationFoot
      v-model="page"
      :responseTotalItems="20"
      :totalItems="bookApiResponse?.total"
    />
    <div v class="search__results">
      <BookListItem
        v-for="(book, index) in bookList"
        :book="book"
        :key="book.imageUrl + index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BookListItem from '@/components/BookListItem.vue'
import PaginationFoot from '../components/PaginationFoot.vue'
import type { BookApiResponse } from '../types/books'

// search
const term = ref('')
const bookApiResponse = ref<BookApiResponse>()
const bookList = computed(() => {
  return bookApiResponse.value?.list
})

function onSearch() {
  if (term.value.length) {
    getBookListByTerm(term.value, { page: 1 })
  }
}

// pagination
const page = ref(1)

watch(page, (newVal, oldVal) => {
  if (newVal === oldVal) return
  paginationSearch()
})

function paginationSearch() {
  getBookListByTerm(term.value, { page: page.value })
}

// fetch
function getQuery(argObj: object = {}) {
  let newQuery = ''
  for (const [index, [key, value]] of Object.entries(argObj).entries()) {
    newQuery = `${newQuery}${index != 0 ? '&' : ''}${key}=${value}`
  }
  return newQuery
}

function getBookListByTerm(term: string, queryObj: object = {}) {
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
      console.log(result)
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

  &__results
    width: 100%
    max-width: 1100px
    display: flex
    flex-wrap: wrap
    padding: 0 30px

    & >div
      flex: 50%
</style>
