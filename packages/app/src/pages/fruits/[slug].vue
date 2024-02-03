<script lang="ts" setup>
// import marked from 'marked';

const { findOne } = useStrapi4()
const route = useRoute()

const { data: fruit, pending } = useAsyncData(
    'fruit',
  () => findOne(`fruits/${route.params.slug}`)
)

// Fonction pour convertir le Markdown en HTML
// const convertMarkdownToHTML = (markdownText) => {
//   return marked(markdownText);
// };

</script>

<template>
    <UiTheHeader />
    <div class="container">
        <template v-if="pending">Chargement du fruit du démon...</template>
        <template v-if="fruit">
            <h1>{{ fruit.data.title }}</h1>
            <NuxtImg v-if="fruit.data.image" :src="fruit.data.image.url" provider="strapi" alt="" />
            <div v-html="$md.render(fruit.data.description )"></div>
            <!-- <p v-html="markdownToHtml(fruit.description)"></p> -->
            <div>{{ fruit.data.tags.map(tag => tag.name).join(', ')}}</div>
        </template>
    </div>
</template>