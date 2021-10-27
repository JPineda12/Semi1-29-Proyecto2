<template>
  <div class="container">
    <Sidebar @change="show($event)" :User="User" />
    <div class="comps" :style="{ 'margin-left': sidebarWidth }">
      <Posts class="comp" v-if="showPosts" />
      <Chat class="comp" v-if="showChat" />
      <Users class="comp" v-if="showUsers" />
      <EditPerfil class="comp" :User="User" v-if="showEdit" />
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar/Sidebar";
import { sidebarWidth } from "./Sidebar/state";
import Posts from "./Posts/Posts.vue";
import Users from "./Users/Users.vue";
import Chat from "./Chat/Chat.vue";
import EditPerfil from "./EditPerfil/EditPerfil";

export default {
  name: "Home",
  created() {
    document.querySelector("html").classList.add("prueba");
  },
  unmounted() {
    document.querySelector("html").classList.remove("prueba");
  },
  beforeMount() {
    let us = localStorage.getItem("user-info");
    this.User = JSON.parse(us);
  },

  setup() {
    return { sidebarWidth };
  },
  data() {
    return {
      User: {},
      showPosts: true,
      showChat: false,
      showUsers: false,
      showEdit: false,
    };
  },
  components: {
    Sidebar,
    Posts,
    Users,
    Chat,
    EditPerfil,
  },

  methods: {
    show(comp) {
      if (comp === "Posts" && this.showPosts === false) {
        this.showPosts = true;
        this.showChat = false;
        this.showUsers = false;
        this.showEdit = false;
      } else if (comp === "Chat" && this.showChat === false) {
        this.showPosts = false;
        this.showChat = true;
        this.showUsers = false;
        this.showEdit = false;
      } else if (comp === "Users" && this.showUsers === false) {
        this.showPosts = false;
        this.showChat = false;
        this.showUsers = true;
        this.showEdit = false;
      } else if (comp === "EditPerfil" && this.showEdit === false) {
        this.showEdit = true;
        this.showPosts = false;
        this.showChat = false;
        this.showUsers = false;
      }
    },
  },
};
</script>

<style>
.prueba {
  background: #18191a;
}
</style>
<style scoped>
.comp {
  margin-top: -10px;
}
</style>