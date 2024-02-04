<script lang="ts" setup>
const search = useSearchStore()
</script>

<template>
  <UiTheHeader />
  <div class="container">
    <div class="my-4">
      <h1>Rechercher un fruit</h1>
      <div class="searchFruit">
        <input v-model="search.query" placeholder="Rechercher un fruit" type="text">
      </div>

      <template v-if="!search.pending">
        <div class="grid grid-cols-5 gap-4 fruitCards">
         <UiFruitCard 
         v-for="fruit in search.results" 
         :key="fruit.id"  
          :fruit="fruit"
         class="flex flex-col gap-y-4 p-4"
         />
        </div>
      </template>


    </div>
  </div>
</template>

<style scoped>
  h1 {
    color: #171717;
    text-align: center;
    font-size: 50px;
  }
  .searchFruit {
    display: flex;
    justify-content: center;

    input {
      width: 60%;
      padding: 10px;
      margin: 50px 0 40px;
      font-size: 20px;
      background-color: #d5d5d5;
      border: none;
      border-radius: 20px;
      font-family: "Chewy";

      &:focus {
        outline: none;
      }
    }
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