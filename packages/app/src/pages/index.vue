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

  <div class="container">
    <div class="flex flex-col items-center gap-y-4">
      <h1>Les fruits du démon</h1>


      <div v-if="tags">
        <div v-for="tag in tags.data" :key="tag.id" @click="toggleTag(tag)">
          <button :class="{ 'tag-selected': isSelected(tag.id) }">{{ tag.name }}</button>
        </div>
      </div>


      <div v-if="tags">
        <h2>Liste des tags</h2>
        <div v-for="tag in tags.data" :key="tag.id">
          <NuxtLink :to="`/tags/${tag.slug}`">
            {{ tag.name }}
          </NuxtLink>
        </div>
      </div>

      <!-- <input v-model="search.query" placeholder="Rechercher un fruit" type="text"> -->

      <!-- <template v-if="!search.pending">
        <ul class="list-none grid grid-cols-3 gap-4">
         <li v-for="fruit in search.results" :key="fruit.id" class="flex flex-col gap-y-4 p-4 border-2 border-black border-solid">
           <NuxtImg v-if="fruit.image" :src="fruit.image.url" alt="" />
           <h3 class="my-0">{{ fruit.title }}</h3>
           <p class="my-0">{{ fruit.description }}</p>
           <NuxtLink :to="`/fruits/${fruit.slug}`">Voir le fruit</NuxtLink>
         </li>
        </ul>
      </template> -->


      <div v-if="fruits">
        <div v-if="filteredFruits.length">
          <UiFruitCard 
            v-for="fruit in filteredFruits" 
            :key="fruit.id" 
            :fruit="fruit"
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
  .tag {
    color: red;
    cursor: pointer;
  }

  .tag-selected {
    background-color: lightcoral;
  }
</style>
