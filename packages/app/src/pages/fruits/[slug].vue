<script lang="ts" setup>

const { findOne } = useStrapi4()
const route = useRoute()

const { data: fruit, pending } = useAsyncData(
    'fruit',
  () => findOne(`fruits/${route.params.slug}`)
)

</script>

<template>
    <UiTheHeader />
    <div class="container">
        <template v-if="pending">Chargement du fruit du démon...</template>
        <template v-if="fruit">
            <h1>{{ fruit.data.title }}</h1>
            <NuxtImg v-if="fruit.data.image" :src="fruit.data.image.url" provider="strapi" alt="" />
            <div>{{ fruit.data.tags.map(tag => tag.name).join(', ')}}</div>
        </template>
    </div>
</template>