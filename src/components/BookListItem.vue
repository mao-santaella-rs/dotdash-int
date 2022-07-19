<template>
  <div class="book-item">
    <div class="book-item__content">
      <div class="book-item__content__title">
        {{ props.book.title }}
      </div>
      <div class="book-item__content__author">
        <span> By: {{ props.book.authorName }}</span>
      </div>
      <div class="book-item__content__action">
        <a
          class="book-item__link"
          :href="getGoogleLink(props.book)"
          target="_blank"
        >
          Shop with google
        </a>
      </div>
    </div>
    <div class="book-item__img-container">
      <div
        class="book-item__img"
        :style="{ 'background-image': `url(${props.book.imageUrl})` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'
import type { bookApi } from '../types/books'
const props = withDefaults(defineProps<{ book: bookApi }>(), {
  book: () => ({
    authorName: '',
    imageUrl: '',
    title: '',
  }),
})

function getGoogleLink(bookObj: bookApi) {
  const googleQuery = encodeURIComponent(
    `book ${bookObj.title} by ${bookObj.authorName}`,
  )
  return `https://www.google.com/search?q=${googleQuery}&tbm=shop`
}
</script>

<style lang="sass" scoped>
.book-item
  display: flex
  flex-direction: row-reverse
  align-items: center
  // width: 100%
  padding: 0 15px
  margin-bottom: 50px

  &__img-container
    border-radius: 15px
    background-image: linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)
    box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.5)
    position: relative

  &__img
    width: 150px
    height: 150px
    background-repeat: no-repeat
    background-size: contain
    background-position: center

  &__content
    display: flex
    flex-direction: column
    justify-content: center
    background-image: linear-gradient(0deg, #cbcbcb 0%, #fff 100%)
    min-height: 100px
    // max-height: 150px
    flex: 1
    border-radius: 15px
    box-shadow: 0px 7px 7px 0px rgba(0,0,0,0.5)
    padding: 15px 20px 15px 40px
    transform: translateX(-20px)

    &__title
      font-weight: 700
      margin-bottom: 5px

    &__author
      display: flex
      justify-content: space-between
      flex-wrap: wrap
      align-items: end

    &__action
      display: flex
      justify-content: end

  &__link
    font-size: 0.7rem
    text-decoration: none
    font-weight: 400
    color: #4B5C94


  @media (max-width: 425px)
    // align-items: start

    &__img
      width: 100px
      height: 100px
</style>
