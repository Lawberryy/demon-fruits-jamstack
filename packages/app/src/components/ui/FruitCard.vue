<template>
    <div>
      <NuxtImg v-if="fruit.image" :src="fruit.image.url" provider="strapi" :alt="fruit.title" />
      {{ fruit.title }}
      <div>{{ fruit.tags.map(tag => tag.name).join(', ')}}</div>
      <NuxtLink :to="`/fruits/${fruit.slug}`">Voir le fruit</NuxtLink>
    </div>
</template>
  
<script>
  export default {
    name: 'UiFruitCard',
    props: {
      fruit: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>