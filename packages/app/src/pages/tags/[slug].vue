<script lang="ts" setup>

const { findOne } = useStrapi4()
const route = useRoute()

const { data: tag, pending } = useAsyncData(
    'tag',
  () => findOne(`tags/${route.params.slug}`)
)

// onMounted(() => {
//   if (tag.value) {
//     console.log('tag.data.fruits', tag.value.data.fruits);
//   }
// });

</script>

<template>
    <UiTheHeader />
    <div class="container">
        <template v-if="pending">Chargement des fruits du démon...</template>
        <template v-if="tag">
            <h1>Les fruits du démon de type {{ tag.data.name }}</h1>
            <p v-if="tag.data.description">{{ tag.data.description }}</p>
            <!-- <NuxtImg v-if="fruit.data.image" :src="fruit.data.image.url" provider="strapi" alt="" /> -->
            <div v-if="tag.data.fruits">
                <ul>
                    <li v-for="(fruit, index) in tag.data.fruits" :key="index">
                        {{ fruit.title }}
                    </li>
                </ul>
            </div>
            <div v-else>
                Aucun fruit ne correspond au tag {{ tag.data.name }}.
            </div>
        </template>
    </div>
</template>