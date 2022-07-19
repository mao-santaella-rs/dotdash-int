<template>
  <div class="loader">
    <div class="loader__dot-container">
      <div v-for="n in 8" :key="'dot-' + n" class="loader__dot" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>
@use "sass:math"
.loader
  position: fixed
  inset: 0
  background-image: linear-gradient(45deg, rgba(29,34,58,0.95) 0%, rgba(75,92,148,0.95) 100%)
  display: flex
  align-items: center
  justify-content: center
  animation: show-loader 0.2s ease-in-out forwards
  &__dot-container
    position: relative
  &__dot
    width: 20px
    height: 20px
    background-image: linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)
    border-radius: 50%
    position: absolute
    animation-name: circle-animation
    animation-duration: 0.75s
    animation-iteration-count: infinite
    animation-direction: alternate-reverse
    transform: scale(0,0)
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0)
    &:nth-child(1)
      top: -30px
    &:nth-child(2)
      top: -21px
      left: 21px
    &:nth-child(3)
      left: 30px
    &:nth-child(4)
      left: 21px
      top: 21px
    &:nth-child(5)
      top: 30px
    &:nth-child(6)
      top: 21px
      left: -21px
    &:nth-child(7)
      left: -30px
    &:nth-child(8)
      top: -21px
      left: -21px

    @for $i from 1 to 8
      &:nth-child(#{$i})
        animation-delay: $i * math.div(1.5s,8)

@keyframes show-loader
  0%
    opacity: 0
  100%
    opacity: 1

@keyframes circle-animation
  0%
    opacity: 1
    transform: scale(1,1)
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.3)
  100%
    opacity: 1
    transform: scale(0,0)
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0)
</style>
