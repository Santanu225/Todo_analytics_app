<template>
  <v-list two-line subheader>
    <div v-for="(todo, i) in listItems" :key="i">
      <v-list-item>
        <v-list-item-action>
          <v-checkbox v-model="todo.completed" color="primary"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="title" @dblclick="editTodo(todo)">
            <label
              :class="{
                                 done: todo.completed
                                  }"
              v-show="todo.id != editedTodo.id"
            >{{todo.title | capitalize}}</label>
            <v-text-field
              v-model="todo.title"
              v-show="todo.id == editedTodo.id"
              :autofocus="todo.id == editedTodo.id"
              @blur="doneEdit(todo)"
              @change="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
            ></v-text-field>
          </v-list-item-title>
          <!-- <v-list-tile-sub-title>Added on: {{date}}{{ord}} {{day}} {{year}}</v-list-tile-sub-title> -->
        </v-list-item-content>
        <v-list-item-action>
          <!-- For edit task we can double click on the text . for edit in odal uncomment the below button. -->
          <!-- <v-btn icon ripple color="green" @click.stop="toggleModal(true);setEditedTodo(todo)">
            <v-icon color="white--text">mdi-pen</v-icon>
          </v-btn>-->
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon ripple color="red" @click="removeTodo(todo)">
            <v-icon color="white--text">mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider class="mx-4"></v-divider>
    </div>
  </v-list>
</template>

<script>
import TodoMixin from '@/mixins/TodoMixin'
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    listItems: {
      type: Array
    }
  },
  mixins: [TodoMixin],
  computed: {
    ...mapState(['dialog', 'editedTodo'])
  },
  methods: {
    ...mapActions(['toggleModal', 'setEditedTodo', 'setDefaultTodo']),
    cancelEdit: function(todo) {
      this.setDefaultTodo()
      todo.title = this.beforeEditCache
    },
    doneEdit: function(todo) {
      if (!this.editedTodo) {
        return
      }
      this.setDefaultTodo()
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },
    //Set Edited Todo when double click on todo title
    editTodo(todo) {
      this.setEditedTodo(todo)
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>