import { defineStore } from 'pinia'

function getQuery(argObj: object = {}) {
  let newQuery = ''
  for (const [index, [key, value]] of Object.entries(argObj).entries()) {
    newQuery = `${newQuery}${index != 0 ? '&' : ''}${key}=${value}`
  }
  return newQuery
}

export const useBooksStore = defineStore({
  id: 'BooksStore',
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    getBookListByTerm(term: string) {
      return fetch(
        `https://goodreads-server-express--dotdash.repl.co/search/${term}`,
        {
          method: 'GET',
        },
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error('error', error))
    },
  },
})
