<script lang="ts" setup>

const { findOne } = useStrapi4()
const route = useRoute()

const { data: tag, pending } = useAsyncData(
    'tag',
  () => findOne(`tags/${route.params.slug}`)
)

</script>

<template>
    <UiTheHeader />
    <div class="container">
        <template v-if="pending">Chargement des fruits du démon...</template>
        <template v-if="tag">
            <h1>{{ tag.data.name }}</h1>
            <!-- <NuxtImg v-if="fruit.data.image" :src="fruit.data.image.url" provider="strapi" alt="" /> -->
            <div class="grid grid-cols-5 gap-4 fruitCards" v-if="tag.data.fruits">
                <UiFruitCard 
                v-for="(fruit, index) in tag.data.fruits" 
                :key="index"
                :fruit="fruit"
                class="flex flex-col gap-y-4 p-4"
                />
                    <!-- <li v-for="(fruit, index) in tag.data.fruits" :key="index">
                        {{ fruit.title }}
                    </li> -->
            </div>
            <div v-else>
                Aucun fruit ne correspond au tag {{ tag.data.name }}.
            </div>
        </template>
    </div>
</template>

<style scoped>
    h1 {
        font-size: 50px;
        text-align: center;
    }

    .fruitCards {
  margin-top: 50px;

  @media screen and (max-width: 1024px){
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 768px){
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 540px){
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 430px){
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>