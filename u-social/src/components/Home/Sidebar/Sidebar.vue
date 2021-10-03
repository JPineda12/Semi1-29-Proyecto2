<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed" class="titulo">
        <img :src="logo" />
      </span>
      <span v-else>U-Social</span>
    </h1>
    <SidebarLink :to="compActivo" name="Posts" icon="fas fa-home" @click='changeTo("Posts")'> Posts</SidebarLink> 
    <SidebarLink :to="compActivo" name="Chat" icon="fas fa-comments" @click='changeTo("Chat")'> Chat</SidebarLink> 
    <SidebarLink :to="compActivo" name="Users" icon="fas fa-user-friends" @click='changeTo("Users")'> Users</SidebarLink> 


    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from "./state";
import SidebarLink from "./SidebarLink"
export default {
  name: "Sidebar",
  emits: ["change"],
  components:{ 
    SidebarLink
  },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
  data(){
    return{
      logo: require("../../../assets/logo.png"),
      compActivo: "Posts"
    }
  },
  methods:{
    changeTo(nombrePagina){
      this.compActivo = nombrePagina;
      this.$emit('change', this.compActivo);
    }
  }
};
</script>
<style >
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>
<style scoped>
.sidebar {
  color: rgb(255, 255, 255);
  background-color: var(--sidebar-bg-color);
  overflow:hidden;
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: (255, 255, 255, 0.7);
  transition: 0.4s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.4s linear;
}
.guion {
  transform: rotate(90deg);
  font-size: 55px;
}
</style>