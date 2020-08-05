<template>
  <div>
    <v-app-bar color="light-blue" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Todo App</v-toolbar-title>

      <v-btn text depressed>
        <router-link to="/">Home</router-link>
      </v-btn>
      <v-btn text depressed>
        <router-link to="/dashboard">Dashboard</router-link>
      </v-btn>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="changeLayout()" v-on="on">
            <v-icon v-if="gridView">mdi-view-list</v-icon>
            <v-icon v-else>mdi-view-module</v-icon>
          </v-btn>
        </template>
        <span>Change Todos Layout</span>
      </v-tooltip>
      <v-btn text depressed>
        <v-switch v-model="$vuetify.theme.dark" hide-details inset label="Theme Dark"></v-switch>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['gridView'])
  },
  methods: {
    ...mapActions({
      changeLayout: 'toggleGridView'
    })
  }
}
</script>

<style lang="scss" scoped>
a {
  font-weight: bold;
  color: #a79d1f;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

.router-link-exact-active {
  color: white;
  border-bottom: 2px solid #fff;
}
</style>
