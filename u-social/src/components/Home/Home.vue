<template>
  <Sidebar @change="show($event)"/>
  <div :style="{ 'margin-left': sidebarWidth }">
    <Posts v-if="showPosts"  />
    <Chat v-if="showChat"  />
    <Users v-if="showUsers" />
  </div>
</template>

<script>
import Sidebar from "./Sidebar/Sidebar";
import { sidebarWidth } from "./Sidebar/state";
import Posts from "./Posts/Posts.vue";
import Users from "./Users/Users.vue";
import Chat from "./Chat/Chat.vue";

export default {
  name: "Home",
  setup() {
    return { sidebarWidth };
  },
  data() {
    return {
      showPosts: true,
      showChat: false,
      showUsers: false,
    };
  },
  components: {
    Sidebar,
    Posts,
    Users,
    Chat,
  },

  methods: {
    show(comp){
      if(comp === 'Posts' && this.showPosts === false){
        this.showPosts = true;
        this.showChat = false;
        this.showUsers = false;
      }else if(comp === 'Chat' && this.showChat === false){
        this.showPosts = false;
        this.showChat = true;
        this.showUsers = false;        
        console.log
      }else if(comp === 'Users' && this.showUsers === false){
        this.showPosts = false;
        this.showChat = false;
        this.showUsers = true; 
        console.log("Uss")       
      }
    }
  }
};
</script>

<style scoped>
</style>