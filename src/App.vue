<template>
  <div id="app">
  <v-card
    width="256"
    height="1080px"
    class="mx-auto"
    style="float: left;"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            PaaS云平台
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >

       <v-list-item
        @click="click2image()"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>镜像管理</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      <v-list-item
        @click="click2container()"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-image</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>容器管理</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
    <router-view/>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          { title: '镜像管理', icon: 'mdi-view-dashboard' },
          { title: '容器管理', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
      }
    },
    methods: {
      click2image(){
        this.$router.push('/images')
      },
      click2container(){
        this.$router.push('/containers')
      }
    },
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
