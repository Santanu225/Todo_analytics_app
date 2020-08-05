<template>
  <v-card elevation="15" class="event-card">
    <v-list-item>
      <v-list-item-content>
        <div class="overline">Task No {{index}}</div>
      </v-list-item-content>
      <v-list-item-avatar tile>
        <v-icon v-if="card.completed" color="success" large>mdi-checkbox-marked-circle</v-icon>
      </v-list-item-avatar>
    </v-list-item>
    <v-card-text class="pt-0">
      <p class="title text--primary" :class="{done:card.completed }">{{card.title}}</p>
      <p>Added On</p>
      <div class="text--primary">
        Description.
        <br>"a benevolent smile"
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-checkbox v-model="card.completed" color="primary"></v-checkbox>
      <v-spacer></v-spacer>
      <v-btn icon ripple color="green" @click.stop="toggleModal(true);setEditedTodo(card)">
        <v-icon color="white--text">mdi-pen</v-icon>
      </v-btn>

      <v-btn icon ripple color="red" @click="removeTodo(card)">
        <v-icon color="white--text">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TodoMixin from '@/mixins/TodoMixin'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  components: {
    ...mapState(['dialog'])
  },
  mixins: [TodoMixin],
  props: {
    card: {
      type: Object
    },
    index: Number
  },
  methods: {
    ...mapActions(['toggleModal', 'setEditedTodo'])
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
</style>