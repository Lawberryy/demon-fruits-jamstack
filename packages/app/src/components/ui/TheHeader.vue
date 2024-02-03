
<!-- import type { NuxtLink } from '#build/components'; -->
<template>
    <header>
        <nav>
            <ul>
                <li><NuxtLink to="/">Accueil</NuxtLink></li>
                <li><NuxtLink to="/recherche">Rechercher</NuxtLink></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'TheHeader',
        data() {
            return {
                selectedTag: null
            }
    }
}
</script>

<style scoped>
header {
    background-color: #f2f2f2;
    padding: 10px;
}

nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

nav ul li {
    display: inline;
    margin-right: 10px;
}

nav ul li a {
    text-decoration: none;
    color: #333;
    cursor: pointer;
}
</style>
