<template>
  <div class="container">
    <div class="profile-card">
      <div class="user-info">
        <div class="imgplace">
          <img :src="logo" @click="$refs.file.click()" />
          <input
            type="file"
            id="imgupload"
            ref="file"
            @change="handlePhoto"
            style="display: none"
          />
        </div>
        <div class="info">
          <p>
            Username:
            <input type="text" :value="User.username" disabled="true" />
          </p>
        </div>
        <div class="info">
          <p>
            Correo:
            <input type="text" v-model="email" disabled="true" />
          </p>
        </div>
        <div class="info">
          <p>
            Nombre:
            <input type="text" v-model="nombre" />
          </p>
        </div>

        <div class="info">
          <p>
            New Password:
            <input type="password" v-model="newpass" />
          </p>
        </div>
        <div class="check">
          <input type="checkbox" id="checkbox" v-model="botmode" />
          <label for="checkbox">Bot Mode</label>
        </div>
        <div class="info">
          <button @click="edit()">
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
            <a> Editar</a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "EditPerfil",
  props: {
    User: { type: Object, required: true },
  },
  beforeMount() {
    console.log(this.User);
    if (this.User.botmode === "1") {
      this.botmode = true;
    }
  },
  data() {
    return {
      logo: this.User.img_url,
      botmode: false,
      newpass: "",
      base64: "",
      nombre: this.User.name,
      email: this.User.email,
    };
  },
  methods: {
    handlePhoto() {
      const file = event.target.files[0];
      this.imagen = URL.createObjectURL(file);
      this.createBase64Image(file);
    },
    createBase64Image(fileObject) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.base64 = e.target.result;
        this.base64 = this.base64.split(",")[1];
        this.logo = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    edit() {
      Swal.fire({
        title: "¿Editar Perfil?",
        text: "Ingresa la contraseña actual para confirmar esta accion!",
        input: "password",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, editar!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result);
          let bot = 0;
          if (this.botmode) {
            bot = 1;
          }
          let editBody = {
            username: this.User.username,
            password: result.value,
            newpassword: this.newpass,
            name: this.nombre,
            email: this.email,
            botmode: bot,
            imgbase64: this.base64,
          };
          console.log(editBody);
          this.axios.put("/edit-profile", editBody).then((response) => {
            if (response.data.code === "UserNotConfirmedException") {
              Swal.fire("Error!", "Usuario sin confirmar", "error");
            } else if (
              response.data.code === "NotAuthorizedException" ||
              response.data.code === "InvalidParameterException"
            ) {
              Swal.fire("Error!", "Contraseña Incorrecta", "error");
            } else {
              console.log("averr: ", response.data);
              if (response.data.toLowerCase() === "success") {
                Swal.fire("Updated!", "Perfil actualizado", "success");
              }
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #18191a;
  width: 100%;
  height: 1000px;
}
.profile-card {
  position: relative;
  top: 5%;
  border: 1px solid #3a3e42;
  border-radius: 20px;
  width: 355px;
  height: 450px;
  margin-left: auto;
  margin-right: auto;
  background-color: #3a3e42;
  overflow: hidden;
  box-shadow: 5px 5px 5px rgb(0, 0, 0);
  -moz-box-shadow: 5px 5px 5px rgb(0, 0, 0);
  -webkit-box-shadow: 5px 5px 5px rgb(0, 0, 0);
  -khtml-box-shadow: 5px 5px 5px rgb(0, 0, 0);
}
.user-info {
  color: white;
  margin-left: 50px;
}
.info {
  margin-left: -30px;
  font-size: 20px;
}
.check {
  font-size: 20px;
  margin-left: 40%;
}
.info input {
  float: right;
  width: 125px;
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(235, 235, 235, 0.2);
  border-radius: 3px;
  padding: 2px 2px;
  margin-right: 50px;
  text-align: center;
  font-size: 18px;
  color: white;
  transition-duration: 0.25s;
  font-weight: 300;
  z-index: 15;
}
.info input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

.info input:focus {
  background-color: white;
  width: 150px;
  color: #536de3;
}
img {
  max-width: 150px;
  max-height: 150px;
  min-height: 150px;
  min-width: 150px;
  margin-left: 60px;
  margin-top: 10px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px rgb(0, 0, 0);
  -moz-box-shadow: 5px 5px 5px rgb(0, 0, 0);
  -webkit-box-shadow: 5px 5px 5px rgb(0, 0, 0);
  -khtml-box-shadow: 5px 5px 5px rgb(0, 0, 0);
}
img:hover {
  cursor: pointer;
  max-width: 155px;
  max-height: 155px;
  min-height: 155px;
  min-width: 155px;
  background-color: rgb(187, 187, 187);
  box-shadow: 5px 5px 5px rgb(255, 255, 255);
  -moz-box-shadow: 5px 5px 5px rgb(255, 255, 255);
  -webkit-box-shadow: 5px 5px 5px rgb(255, 255, 255);
  -khtml-box-shadow: 5px 5px 5px rgb(255, 255, 255);
}
button:hover {
  background-color: #dedde5;
  cursor: pointer;
}
button {
  margin-top: 20px;
  margin-left: 100px;
  background-color: white;
  width: 150px;
  height: 35px;
  text-align: center;
  border: 2px solid;
  border-radius: 5px;
  display: inline-block;
  box-sizing: border-box;
  padding-bottom: 0px;
  padding-top: 0px;
  line-height: 30px;
}

button a {
  position: relative;
  top: -25%;
  margin-top: 20px;
  line-height: 30px;
}
svg {
  width: 30px;
  height: 30px;
}
</style>