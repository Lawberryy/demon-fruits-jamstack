<script lang="ts" setup>

const { find } = useStrapi4()

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

      <div v-if="fruits">

        <div v-if="filteredFruits.length">
          <div v-for="fruit in filteredFruits" :key="fruit.id">
            <NuxtImg v-if="fruit.image" :src="fruit.image.url" provider="strapi" alt="" />
            {{ fruit.title }}
            <NuxtLink :to="`/fruits/${fruit.slug}`">Voir le fruit</NuxtLink>
          </div>
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
