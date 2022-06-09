<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavComponent from '@/components/NavComponent.vue'
</script>

<template>
  <header>
    <NavComponent />
  </header>
  <RouterView />
</template>
