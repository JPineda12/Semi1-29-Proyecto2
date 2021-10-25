<template>
  <div class="container">
    <div class="friends-list">
      <div
        id="user-request"
        v-for="user of Requests"
        :key="user.idUsuario"
        class="card-top"
      >
        <div class="card-image">
          <img :src="user.imagen_url" />
        </div>
        <div class="card-text">
          <h2>{{ user.nombre }}</h2>
          <button class="btn-accept" @click="acceptRequest(user)">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
            <a>Accept Request</a>
          </button>
          <button class="btn-reject" @click="rejectRequest(user)">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
            <a>Reject Request</a>
          </button>
        </div>
      </div>

      <div
        id="user-info"
        v-for="user of Users"
        :key="user.idUsuario"
        class="card-top"
      >
        <div class="card-image">
          <img :src="user.imagen_url" />
        </div>
        <div class="card-text">
          <h2>{{ user.nombre }}</h2>
          <button class="btn-gr" @click="addFriend(user)">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
            <a>Add Friend</a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      Users: [],
      Requests: [],
    };
  },
  beforeMount() {
    this.getRequests();
    this.getUsuarios();
  },

  methods: {
    getUsuarios() {
      let us = {
        idUsuario: 1,
        nombre: "Test User",
        imagen_url:
          "https://www.naruto-guides.com/wp-content/uploads/2019/05/sakura-haruno.jpg",
      };
      this.Users.push(us);
      this.Users.push(us);
      this.Users.push(us);
      this.Users.push(us);
      this.Users.push(us);
      this.Users.push(us);
    },
    getRequests() {
      let us = {
        idUsuario: 1,
        nombre: "Request User",
        imagen_url:
          "https://www.naruto-guides.com/wp-content/uploads/2019/05/sakura-haruno.jpg",
      };
      this.Requests.push(us);
      console.log("");
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #18191a;
}

button {
  appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 5px 15px;
  margin-left: 10px;
  color: #000000;
  border-radius: 13px;
  width: 70%;
  cursor: pointer;
  font-size: 95%;
  transition-duration: 0.25s;
}
button:hover {
  background-color: #48e455;
}

.friends-list {
  display: table;
  margin-left: 15%;
}
svg {
  width: 22px;
  height: 22px;
  position: relative;
  z-index: 10;
  overflow: hidden;
}
svg:hover {
  fill: white;
}
#user-info,
#user-request {
  display: inline-table;
  margin-top: 10px;
  margin-left: 10px;
}
.card-top,
.card-right,
.card-bottom,
.card-left {
  display: flex;
  flex-wrap: nowrap;
  width: 25%;
  border-radius: 95.2380952381px;
  box-shadow: 0px 3px 9px 1px rgba(0, 10, 20, 0.2);
  align-items: center;
  align-content: center;
}
.card-top {
  flex-direction: column;
  grid-column: auto / span 1;
  grid-row: auto / span 2;
  background: #242526;
}
.card-image {
  display: flex;
}
.card-image img {
  width: 100%;
  object-fit: cover;
}
.card-top img {
  border-radius: 95.2380952381px 95.2380952381px 0 0;
}
.card-text h2 {
  align-content: center;
  color: #dedde5;
  margin-left: 25%;
}
.card-top .card-text {
  height: auto;
  width: auto;
  padding-bottom: 36.8px;
}
.card-text button {
  margin-left: 18%;
}
@media (max-width: 200px) {
  .card-top {
    flex-direction: row;
    grid-column: auto / span 2;
    grid-row: auto / span 1;
  }
  .card-bottom {
    flex-direction: row-reverse;
    grid-column: auto / span 2;
    grid-row: auto / span 1;
  }
  .card-top .card-image,
  .card-bottom .card-image {
    height: 100%;
    width: 50%;
  }
  .card-top img {
    border-radius: 95.2380952381px 0 0 95.2380952381px;
  }
  .card-bottom img {
    border-radius: 0 95.2380952381px 95.2380952381px 0;
  }
  .card-top .card-text {
    height: auto;
    width: 50%;
    padding-right: 36.8px;
  }
  .card-bottom .card-text {
    height: auto;
    width: 50%;
    padding-left: 36.8px;
  }
}
@media (max-width: 200px) {
  .card-image {
    width: 38% !important;
  }
  .card-text {
    width: 62% !important;
  }
}

#user-request button {
  width: 160px;
  margin-bottom: 5px;
  margin-left: 30px;
}
.btn-accept:hover{
  background-color:rgb(0, 255, 13);
}

.btn-reject:hover{
  background-color: rgb(255, 14, 14);
}
</style>