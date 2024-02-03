<script lang="ts" setup>
const search = useSearchStore()
</script>

<template>
  <UiTheHeader />
  <div class="container">
    <div class="my-4">
      <h1>Recherchez un fruit</h1>
      <input v-model="search.query" placeholder="Rechercher un fruit" type="text">

      <template v-if="!search.pending">
        <ul class="list-none grid grid-cols-3 gap-4">
         <UiFruitCard 
         v-for="fruit in search.results" 
         :key="fruit.id"  
          :fruit="fruit"
         class="flex flex-col gap-y-4 p-4 border-2 border-black border-solid"
         />
        </ul>
      </template>


    </div>
  </div>
</template>
