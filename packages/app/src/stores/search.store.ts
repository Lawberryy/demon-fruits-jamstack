import Fuse from 'fuse.js'
// import { recipesMock } from '~/mocks/recipes.mock'

export const useSearchStore = defineStore('search', () => {

  const { find } = useStrapi4()

  const { data: fruits, pending, error } = useAsyncData('fruits',
      () => find('fruits', {populate: '*'})
  )

  const query = ref('')

  // TODO: Replace any with your Recipe type and change elements
  const elements = reactive<Set<any>>(fruits.value?.data || [])
  const keys = ['title', 'tags.name', 'description']

  const fuse = computed(() => new Fuse(Array.from(elements), {
    keys,
    threshold: 0.2,
  }))

  const results = computed(() => {
    if (!query.value)
      return Array.from(elements)
      return [...fuse.value.search(query.value).map(r => r.item)]
  })

  return { query, results, elements, pending }
})
