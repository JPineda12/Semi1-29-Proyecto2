<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed" class="titulo">
        <img :src="User.img_url" />
      </span>
      <span v-else>
        <div class="profile">
          <img :src="User.img_url" />
          
          <SidebarLink
            :to="compActivo"
            name="EditPerfil"
            icon="fas fa-user-circle"
            @click="changeTo('EditPerfil')"
            class="user"
          >
            {{ User.username }}
          </SidebarLink>
        </div>
      </span>
    </h1>

    <SidebarLink
      :to="compActivo"
      name="Posts"
      icon="fas fa-home"
      @click="changeTo('Posts')"
    >
      Posts</SidebarLink
    >
    <SidebarLink
      :to="compActivo"
      name="Chat"
      icon="fas fa-comments"
      @click="changeTo('Chat')"
    >
      Chat</SidebarLink
    >
    <SidebarLink
      :to="compActivo"
      name="Users"
      icon="fas fa-user-friends"
      @click="changeTo('Users')"
    >
      Users</SidebarLink
    >
    <SidebarLink
      :to="compActivo"
      name="Logout"
      icon="fas fa-power-off"
      @click="logout()"
    >
      Logout</SidebarLink
    >

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
import SidebarLink from "./SidebarLink";
export default {
  name: "Sidebar",
  emits: ["change"],
  props: {
    User: { type: Object, required: true },
  },
  components: {
    SidebarLink,
  },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
  data() {
    return {
      logo: require("../../../assets/logo.png"),
      compActivo: "Posts",
    };
  },
  methods: {
    changeTo(nombrePagina) {
      this.compActivo = nombrePagina;
      this.$emit("change", this.compActivo);
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style >
:root {
  --sidebar-bg-color: #3a3e42;
  --sidebar-item-hover: #a8dadc;
  --sidebar-item-active: #03045e;
}
</style>
<style scoped>
.sidebar {
  color: rgb(255, 255, 255);
  background-color: var(--sidebar-bg-color);
  overflow: hidden;
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

.profile img {
  min-width: 80px;
  min-height: 80px;
  max-width: 80px;
  max-height: 80px;
  border: 1px solid;
  border-radius: 13px;
  position: relative;
  margin-bottom: -15px;
  right: 10px;
}

.profile {
  margin-left: auto;
  margin-right: auto;
  font-size: 15px;
  white-space: nowrap;
}
h1 {
  margin-left: auto;
  margin-right: auto;
}

.titulo img {
  min-width: 30px;
  min-height: 30px;
  max-width: 30px;
  max-height: 30px;
}
.user{
  margin-top: 10px;
  margin-left: -10px;
}
</style>