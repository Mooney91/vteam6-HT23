<template>
  <div class="p-4 rounded-lg shadow-md stats-card bg-light-bg dark:bg-dark-bg">

    <h3
      class="text-lg font-light text-gray-600 uppercase font-Karla dark:text-gray-300"
    >
    {{ title }}
    </h3>

    <p
      class="font-bold font-PlexMono text-light-fg dark:text-dark-fg"
    >
    {{ subtitle }}
    </p>

  </div>
</template>

<script setup>
defineProps(['title', 'subtitle'])
</script>
