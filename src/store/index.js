import Vue from 'vue'
import Vuex from 'vuex'
import { saveStatePlugin, uuid } from '../utils.js'

Vue.use(Vuex)

const todos = JSON.parse(localStorage.getItem('todos')) || [
  {
    title: 'Wake up at 5am',
    completed: true
  },
  {
    title: 'Learn how to use Vue.js',
    completed: false
  },
  {
    title: 'Drink coffee',
    completed: false
  }
]

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    todos,
    gridView: false,
    dialog: false,
    editedTodo: {
      title: '',
      id: '',
      completed: false
    },
    defaultTodo: {
      title: '',
      id: '',
      completed: false
    }
  },

  mutations: {
    CREATE_TASK(state, { title, completed }) {
      state.todos.push({
        title,
        id: uuid(),
        completed,
        description: ''
      })
    },
    REMOVE_TASK(state, { todo }) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },
    UPDATE_TODO(state, { todo }) {
      var i = state.todos.findIndex(o => o.id === todo.id)
      if (state.todos[i]) {
        Vue.set(state.todos, i, Object.assign({}, todo)) // Fixed Vue's Recativity Issue
      } else {
        state.todos.push(todo)
      }
    },
    UPDATE_TODOS(state, todos) {
      state.todos = todos
    },
    TOGGOLE_GRIDVIEW(state) {
      state.gridView = !state.gridView
    },
    TOGGLE_MODAL(state, dialog) {
      state.dialog = dialog
    },
    SET_EDITED_TODO(state, todo) {
      state.editedTodo = todo
    }
  },
  actions: {
    toggleGridView({ state, commit }) {
      commit('TOGGOLE_GRIDVIEW', state.gridView)
    },
    toggleModal({ commit }, dialog) {
      commit('TOGGLE_MODAL', dialog)
    },
    setEditedTodo({ commit }, todo) {
      commit('SET_EDITED_TODO', Object.assign({}, todo))
    },
    setDefaultTodo({ state, commit }) {
      commit('SET_EDITED_TODO', Object.assign({}, state.defaultTodo))
    },
    updateTodo({ dispatch, commit }, todo) {
      commit('UPDATE_TODO', { todo })
      dispatch('setDefaultTodo', { root: true })
    }
  },
  modules: {}
})
