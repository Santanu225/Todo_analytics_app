<template>
  <div class="board">
    <!-- Common Dialog For edit individual task -->
    <v-dialog v-model="show" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Update Todo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedTodo.title" label="Todo title*" required></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-col>-->
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="close()">Close</v-btn>
          <v-btn color="blue darken-1" text @click="updateTodo(editedTodo);close()">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog Modal Ends -->
    <v-container fluid>
      <v-row class>
        <v-col cols="12">
          <v-row align="center" justify="center">
            <v-card class="mx-auto pt-3" height="550" :width="boardWidth">
              <v-list>
                <v-list-item>
                  <v-text-field
                    clearable
                    hide-details="auto"
                    outlined
                    v-model="newTodo"
                    id="newTodo"
                    name="newTodo"
                    label="Type your task"
                    @keyup.enter="addTodo"
                    @click:append-outer="addTodo"
                    :append-outer-icon="newTodo ? 'mdi-send' : ''"
                  ></v-text-field>
                  <!-- <button class="new-todo-button" @click="addTodo" v-show="newTodo.length > 0"></button> -->
                </v-list-item>
                <v-subheader class="subheading" v-if="todos.length == 0">You have 0 Tasks, add some</v-subheader>

                <v-list-item v-show="todos.length" class="pt-0">
                  <v-list-item-action>
                    <v-checkbox v-model="allDone" label="Complete all tasks" color="primary"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <span class="todo-count">
                      <strong>{{ remaining }}</strong>
                      {{ remaining | pluralize }} left
                    </span>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn @click="removeCompleted" rounded color="warning">Clear Completed</v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-subheader class="py-0 mt-0" v-if="!gridView">
                <v-spacer></v-spacer>*Double Click on task to edit
              </v-subheader>
              <!-- bottom Navigation For Filters -->
              <v-bottom-navigation absolute horizontal v-model="activeBtn">
                <v-btn text color="deep-purple accent-4" @click="visibility = 'all'">
                  <span>All Tasks</span>
                </v-btn>

                <v-btn text color="deep-purple accent-4" @click="visibility = 'active'">
                  <span>Uncompleted</span>
                </v-btn>

                <v-btn text color="deep-purple accent-4" @click="visibility = 'completed'">
                  <span>Completed</span>
                </v-btn>
              </v-bottom-navigation>
              <v-sheet id="scroll-area-1" class="overflow-y-auto" max-height="350">
                <v-container style="height: auto;">
                  <!-- Load Todos in Listed View -->
                  <template v-if="!gridView">
                    <todo-list :listItems="filteredTodos"/>
                  </template>

                  <!-- Load Todos in GridView -->
                  <template v-else>
                    <v-container fluid>
                      <v-row dense justify="space-around">
                        <v-col v-for="(todo,i) in filteredTodos" :key="todo.id" :cols="4">
                          <TodoCard :card="todo" :index="i+1"/>
                        </v-col>
                      </v-row>
                    </v-container>
                  </template>

                  <v-card-text></v-card-text>
                </v-container>
              </v-sheet>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TodoCard from './TodoCard.vue'
import TodoList from './TodoList.vue'

// visibility filters
var filters = {
  all: function(todos) {
    return todos
  },
  active: function(todos) {
    return todos.filter(function(todo) {
      return !todo.completed
    })
  },
  completed: function(todos) {
    return todos.filter(function(todo) {
      return todo.completed
    })
  }
}
export default {
  data() {
    return {
      newTodo: '',
      visibility: 'all',
      activeBtn: 0
    }
  },
  components: {
    TodoCard,
    TodoList
  },
  computed: {
    ...mapState(['todos', 'gridView', 'dialog', 'editedTodo']),
    filteredTodos: function() {
      return filters[this.visibility](this.todos)
    },
    remaining: function() {
      return filters.active(this.todos).length
    },
    allDone: {
      get: function() {
        return this.remaining === 0
      },
      set: function(value) {
        this.todos.forEach(function(todo) {
          todo.completed = value
        })
      }
    },
    boardWidth() {
      return this.gridView == true ? 900 : 600
    },
    show: {
      get() {
        return this.dialog
      },
      set(value) {
        if (!value) {
          this.setDefaultTodo()
          this.close()
        }
      }
    }
  },
  watch: {
    todos: {
      handler: function(todos) {
        this.$store.commit('UPDATE_TODOS', todos)
      },
      deep: true
    }
  },
  methods: {
    // Adding
    ...mapActions([
      'toggleModal',
      'setEditedTodo',
      'setDefaultTodo',
      'updateTodo'
    ]),
    addTodo: function() {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.$store.commit('CREATE_TASK', { title: value, completed: false })
    },
    changeLayout() {
      this.gridView = !this.gridView
      //this.boardWidth = this.gridView == true ? 900 : 600;
    },
    removeCompleted: function() {
      let dymmytodos = filters.active(this.todos)
      this.$store.commit('UPDATE_TODOS', dymmytodos)
    },
    close() {
      this.toggleModal(false)
    }
  },
  //Usage of filter
  filters: {
    pluralize: function(n) {
      return n === 1 ? 'task' : 'tasks'
    }
  },
  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': {
      inserted: function(el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
</style>