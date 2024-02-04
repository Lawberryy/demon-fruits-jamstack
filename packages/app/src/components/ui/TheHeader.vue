
<template>
    <header>
        <nav>
            <ul>
                <li><NuxtLink to="/">
                    <svg height="30" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="30" fill="#171717" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M12,3c0,0-6.186,5.34-9.643,8.232C2.154,11.416,2,11.684,2,12c0,0.553,0.447,1,1,1h2v7c0,0.553,0.447,1,1,1h3  c0.553,0,1-0.448,1-1v-4h4v4c0,0.552,0.447,1,1,1h3c0.553,0,1-0.447,1-1v-7h2c0.553,0,1-0.447,1-1c0-0.316-0.154-0.584-0.383-0.768  C18.184,8.34,12,3,12,3z"/></svg>
                </NuxtLink></li>
                <li><NuxtLink to="/recherche">
                    <svg height="30" viewBox="0 0 512 512" width="30" xmlns="http://www.w3.org/2000/svg" fill="#171717"><title/><path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z"/></svg>
                </NuxtLink></li>
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
    padding: 15px 30px;
}

nav ul {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
}

nav ul li {
    display: inline;
    margin-right: 10px;
}
</style>
