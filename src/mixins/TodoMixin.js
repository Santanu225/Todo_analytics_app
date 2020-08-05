export default {
  data() {
    return {
      beforeEditCache: ''
    }
  },
  watch: {},
  methods: {
    removeTodo: function(todo) {
      this.$store.commit('REMOVE_TASK', {
        todo
      })
    }
  }
}
