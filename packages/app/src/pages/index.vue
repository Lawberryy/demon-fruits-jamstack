<script lang="ts" setup>

// import Fuse from 'fuse.js';

const { find } = useStrapi4()
const search = useSearchStore()

const { data: fruits, pending, error } = useAsyncData('fruits',
  () => find('fruits', {
    populate: '*',
  })
)

onMounted(() => {
  console.log('fruits', fruits.value, 'pending', pending, 'error', error)
})

const { data: tags } = useAsyncData('tags',
  () => find('tags', {
    populate: '*',
  })
)

onMounted(() => {
  console.log('tags', tags.value)
})

// Ajouter un état pour stocker les tags sélectionnés
const selectedTags = ref([]); 

// Mettre à jour l'état des tags sélectionnés
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag.id);
  if (index === -1) {
    selectedTags.value.push(tag.id);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

// Vérifier si un tag est sélectionné
const isSelected = (tagId) => {
  return selectedTags.value.includes(tagId);
};



// Filtrer les fruits en fonction des tags sélectionnés
const filteredFruits = computed(() => {
  if (!fruits.value || !selectedTags.value.length) {
    return fruits.value ? fruits.value.data : [];
  }

  return fruits.value.data.filter(fruit =>
    fruit.tags.some(tag => selectedTags.value.includes(tag.id))
  );
});

</script>

<template>
  <UiTheHeader />

  <div class="flex">

    <!-- <div class="imgHome"></div> -->

    <div class="container flex flex-col items-center gap-y-4">
      <h1>Les fruits du démon</h1>

      <section v-if="tags" class="tagsLinks">
        <h2>Pages des tags</h2>
        <div class="tags">
          <NuxtLink :to="`/tags/${tag.slug}`" v-for="tag in tags.data" :key="tag.id" class="tag">
            {{ tag.name }}
          </NuxtLink>
        </div>
      </section>

      <section>
        <h2>Filtrer par tag</h2>
        <div v-if="tags" class="tags">
          <div v-for="tag in tags.data" :key="tag.id" @click="toggleTag(tag)">
            <button :class="{ 'tag-selected': isSelected(tag.id) }" class="tag">{{ tag.name }}</button>
          </div>
        </div>
      </section>


      <div v-if="fruits">
        <div v-if="filteredFruits.length" class="grid grid-cols-5 gap-4 fruitCards">
          <UiFruitCard 
            v-for="fruit in filteredFruits" 
            :key="fruit.id" 
            :fruit="fruit"
            class="flex flex-col gap-y-4 p-4"
          />
        </div>
        <div v-else>
          <p>Aucun fruit ne correspond à ce tag.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
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
h1 {
  color: #171717;
  text-align: center;
  font-size: 55px;
}
h2 {
    color: #171717;
    font-size: 30px;
    margin-bottom: 10px;
  }

.tagsLinks {
  margin: 30px 0 40px;
}

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  .tag {
    background-color: #171717;
    padding: 4px 10px;
    color: #fff;
    border-radius: 20px;
    text-decoration: none;
    border: none;
    cursor: pointer;
  }
}

  .tag-selected {
    background-color: lightcoral !important;
  }

  /* .imgHome {
    background-image: url('assets/media/Devil_Fruit_Infobox.webp');
    background-size: cover;
    background-position: center;
    width: 50%;
    background-color: #171717;
    position: sticky;
    top: 0;
  } */
</style>
