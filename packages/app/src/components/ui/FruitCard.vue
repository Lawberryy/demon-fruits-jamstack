<template>
    <div :style="{ backgroundColor: fruit.color }" class="fruitCard">
      <span :style="{ color: fruit.color }">{{ fruit.id }}</span>
      <NuxtImg v-if="fruit.imgfruit" :src="fruit.imgfruit.url" provider="strapi" :alt="fruit.title" />
      <NuxtLink :to="`/fruits/${fruit.slug}`"><h2>{{ fruit.title }}</h2></NuxtLink>
      <div class="fruitTag" :style="{ color: fruit.color }">{{ fruit.tags && fruit.tags.map(tag => tag.name).join(', ')}}</div>
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
h2 {
  color: #fff;
  text-align: center;
}

span {
  position: absolute;
  font-family: "Chewy";
  padding: 10px;
  border-radius: 50%;
  background: #fff;
}

.fruitCard {
  border-radius: 20px;

  img {
    max-width: 90%;
    margin: auto;
  }

  a {
    text-decoration: none;
  }
}

.fruitTag {
  padding: 10px;
  border-radius: 20px;
  background-color: #fff;
  color: #000;
  text-align: center;
  font-family: "Chewy";
}
</style>