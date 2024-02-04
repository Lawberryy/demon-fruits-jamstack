<script lang="ts" setup>

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
    <main>
        <section class="fruitSection" :style="{ background: `linear-gradient(90deg, ${fruit.data.color} 0%, #fff 50%, ${fruit.data.color} 100%)` }">
            <!-- <template v-if="pending">Chargement du fruit du démon...</template> -->
            <template v-if="fruit">
                <div class="fruitLeftSection">
                    <div class="fruitTags">
                        <span class="fruitTag" v-for="(tag, index) in fruit.data.tags" :key="index" :style="{ background: fruit.data.color }">
                            <NuxtLink :to="`/tags/${tag.slug}`">{{ tag.name }}</NuxtLink>
                        </span>
                    </div>
                    <h1 :style="{ color: fruit.data.color }">{{ fruit.data.title }}</h1> <!-- : est un raccourci pour v-bind: -->
                    <!-- <div v-html="$md.render(fruit.data.description )"></div> -->
                </div>
                <div class="fruitRightSection">
                    <NuxtImg v-if="fruit.data.imgfruit" :src="fruit.data.imgfruit.url" provider="strapi" :alt="fruit.data.title" />
                </div>
            </template>
        </section>

        <section>
            <div class="fruitDescription container" v-html="$md.render(fruit.data.description )"></div>
        </section>

        <section class="container powerSection">
            <template v-if="fruit.data.image">
                <div class="powerImg" v-for="(image, index) in fruit.data.image" :key="index">
                    <NuxtImg :src="image.url" provider="strapi" :alt="fruit.data.title" :style="{ border: `15px ${fruit.data.color} solid` }" />
                </div>
            </template>
            <!-- <button class="powerPopUp" :style="{ background: fruit.data.color }">Le pouvoir</button> -->
        </section>
    </main>
</template>

<style scoped>
  h1 {
    font-size: 70px;
}
.fruitDescription {
    margin-top: 30px;

    h2 {
        margin: 15px 0 10px;
    }
}

.fruitTags {
    display: flex;
    gap: 6px;
    margin-bottom: 7px;
}
.fruitTag {
    padding: 4px 10px;
    border-radius: 15px;
    font-family: "Chewy";

    a {
        text-decoration: none;
        color: #fff;
        font-size: 14px;
    }
}

  .fruitSection {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    
    .fruitRightSection {
        img {
            width: 220px;
            margin-left: 20px;
        }
    }
    .fruitLeftSection {
        max-width: 530px;
    }
  }

  .powerImg {
    display: flex;
    justify-content: center;
    margin: 50px 0 30px;

    img {
        width: 100%;

        @media screen and (min-width: 768px) {
            width: 70%;
        }
        @media screen and (min-width: 1024px){
            width: 50%;
        }
        @media screen and (min-width: 1200px){
            width: 35%;
        }
    }

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
    }
  }
</style>