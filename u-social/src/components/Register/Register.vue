<template>
  <div class="wrapper">
    <div class="container">
      <form class="form">
        <div class="titulo">
          <h1 class="header heading">
            <span class="heading--underline">Registrarse</span>
          </h1>
        </div>
        <br />
        <br />
        <br />

        <div class="user-info">
          <div class="user-data">
            <input
              type="text"
              v-model="registerValues.name"
              placeholder="Nombre Completo"
            />
            <input
              type="text"
              v-model="registerValues.user"
              placeholder="Username"
            />
            <input
              type="text"
              v-model="registerValues.correo"
              placeholder="Email"
            />
            <input
              type="password"
              v-model="registerValues.contrasena"
              placeholder="Password"
            />
            <input
              type="password"
              v-model="registerValues.confirmPass"
              placeholder="Confirm Password"
            />
          </div>
          <div class="img-upload">
            <div class="imgPreview" v-if="!isCameraOpen">
              <img :src="imagen" />
            </div>
            <div v-if="isCameraOpen" class="imgPreview">
              <video
                ref="camera"
                :width="canvasWidth"
                :height="canvasHeight"
                class="cam-place"
                autoplay
              ></video>
              <canvas
                v-show="false"
                id="photoTaken"
                ref="canvas"
                :width="canvasWidth"
                :height="canvasHeight"
              ></canvas>
            </div>

            <div class="uploadButton">
              <label class="custom-file-upload">
                <input type="file" @change="handlePhoto" accept="image/*" />
                <svg
                  v-if="!isCameraOpen"
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </label>
              <button v-if="isCameraOpen" class="cam-button" @click="capture">
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
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
              <button class="cam-button" @click="toggleCamera">
                <svg
                  v-if="!isCameraOpen"
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
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <svg
                  v-else
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
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="Botones">
          <div>
            <button type="submit" id="register-button" @click="registerEvent">
              Registrarse
            </button>
          </div>
          <div><button @click="goBack" id="back-button">Volver</button></div>
        </div>
      </form>
    </div>

    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "Register",
  data() {
    return {
      registerValues: {
        name: "",
        user: "",
        correo: "",
        contrasena: "",
        confirmPass: "",
        idRol: 1,
      },
      imagen: "",
      imagenBase64: "",
      compatible_base64: "",
      isCameraOpen: false,
      canvasHeight: 170,
      canvasWidth: 170,
    };
  },
  beforeCreate() {
    let user = localStorage.getItem("user-info");
    if (user) {
      //this.$router.push({ name: "Home" });
    }
  },
  methods: {
    toggleCamera(event) {
      event.preventDefault();
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.startCameraStream();
      }
    },
    startCameraStream() {
      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.$refs.camera.srcObject = stream;
        })
        .catch((error) => {
          alert("Browser doesn't support or there is some errors." + error);
        });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    },

    async capture(event) {
      event.preventDefault();
      const FLASH_TIMEOUT = 50;
      let self = this;
      setTimeout(async () => {
        const context = self.$refs.canvas.getContext("2d");
        context.drawImage(
          self.$refs.camera,
          0,
          0,
          self.canvasWidth,
          self.canvasHeight
        );
        const dataUrl = self.$refs.canvas
          .toDataURL("image/jpeg")
          .replace("image/jpeg", "image/octet-stream");
      this.imagen = dataUrl;
      this.imagenBase64 = dataUrl;
      let arraybase64 = this.imagen.split("/");
      this.compatible_base64 = "";
      let i = 0;
      for await(let str of arraybase64){
        if(i >= 2){
          this.compatible_base64 += "/"+str;
        }
        i++;
      }          
        self.isCameraOpen = false;
        self.stopCameraStream();
      }, FLASH_TIMEOUT);
    },
   async registerEvent(event) {
      event.preventDefault();
      if (
        this.registerValues.user.length > 0 &&
        this.registerValues.correo.length > 0 &&
        this.imagenBase64.length > 0 &&
        this.registerValues.contrasena.length > 0 &&
        this.registerValues.confirmPass.length > 0
      ) {
      
        let user = {
          nickname: this.registerValues.user,
          email: this.registerValues.correo,
          name: this.registerValues.user,
          password: this.registerValues.contrasena,
          imagen: this.compatible_base64,
          bot: 0,
        };
        console.log(user);

        this.axios
          .post("/signup", user)
          .then((response) => {
            if (response.data.status === true) {
              this.mensajeOk();
            } else {
              Swal.fire({
                icon: "error",
                title: "ERROR al registrarse",
                text: "No se pudo completar el registro, intente mas tarde.",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Campos Incorrectos",
          text: "Llene todos los campos.",
        });
      }
    },
    goBack(event) {
      event.preventDefault();
      this.$router.push({ name: "Login" });
    },
    mensajeOk() {
      Swal.fire({
        title: "Usuario registrado satisfactoriamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        console.log(result);
        this.$router.push({ name: "Login" });
      });
    },
    handlePhoto(event) {
      Swal.fire({
        title: "Subir Foto",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        console.log(result);
        const file = event.target.files[0];
        this.imagen = URL.createObjectURL(file);
        this.createBase64Image(file);
      });
    },
    createBase64Image(fileObject) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.imagenBase64 = e.target.result;
        this.imagen = e.target.result;
        this.compatible_base64 = this.imagen.split(",")[1];
        console.log(this.compatible_base64);

      };
      reader.readAsDataURL(fileObject);
    },
  },
};
</script>

<style lang="css" scoped>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300);
.heading--underline {
  background-image: linear-gradient(120deg, #5087da 0%, #7a8df7 100%);
  background-repeat: no-repeat;
  background-size: 100% 0.2em;
  background-position: 0 88%;
  transition: background-size 200ms ease-in;
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px #000000;
  z-index: 2;
  float: left;
  margin-left: 18%;
}
.heading--underline:hover {
  background-size: 100% 88%;
  z-index: 2;
}
#register-button {
  margin-bottom: 2px;
}
.Botones {
  float: left;
  margin-left: 14%;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
}
.user-info {
  display: flex;
}
.msjError {
  color: rgba(221, 33, 33, 0.986);
  text-shadow: 0px 0px 10px rgba(255, 0, 0, 0.9);
}
.user-data {
  width: 70%;
}
.img-upload {
  margin-left: auto;
  margin-right: auto;
}
.imgPreview {
  border-radius: 20px;
  border: 3px dashed rgb(99, 99, 99);
  margin-bottom: 15px;
}
form img {
  min-width: 170px;
  min-height: 170px;
  max-width: 170px;
  max-height: 170px;
  border-radius: 20px;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  font-weight: 300;
}
body ::-webkit-input-placeholder {
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  font-weight: 300;
}
body :-moz-placeholder {
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body ::-moz-placeholder {
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body :-ms-input-placeholder {
  font-family: "Source Sans Pro", sans-serif;
  color: white;
  font-weight: 300;
}
.wrapper {
  background: #50a3a2;
  background: -webkit-linear-gradient(top left, #4ab1ec 0%, #154eb8 100%);
  background: -moz-linear-gradient(top left, #4ab1ec 0%, #154eb8 100%);
  background: -o-linear-gradient(top left, #4ab1ec 0%, #154eb8 100%);
  background: linear-gradient(to bottom right, #4ab1ec 0%, #154eb8 100%);
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 450px;
  margin-top: -230px;
  overflow: hidden;
}
.wrapper.form-success .container h1 {
  transform: translateY(85px);
}
.container {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -60px;
  padding: 80px 0;
  height: 400px;
  text-align: center;
}
.container h1 {
  font-size: 40px;
  transition-duration: 1s;
  transition-timing-function: ease-in-put;
  font-weight: 200;
}

form input {
  display: block;
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  text-align: center;
  font-size: 18px;
  color: white;
  transition-duration: 0.25s;
  font-weight: 300;
  z-index: 15;
}
form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
form input:focus {
  background-color: white;
  width: 300px;
  color: #536de3;
}
.Botones button {
  appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #7689c7;
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;
}
form {
  position: relative;
  z-index: 2;
}
input[type="file"] {
  display: none;
}

.custom-file-upload {
  appearance: none;
  outline: 0;
  border: 0;
  padding: 10px 15px;
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;
}
.Botones button:hover {
  background-color: #f5f7f9;
}
.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(148, 5, 5, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  animation-delay: 2s;
  animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-duration: 22s;
  background-color: rgba(255, 86, 86, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  animation-delay: 3s;
  background-color: rgba(255, 24, 24, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  animation-delay: 15s;
  animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  animation-delay: 2s;
  animation-duration: 40s;
  background-color: rgba(202, 46, 46, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-700px) rotate(600deg);
  }
}

svg {
  width: 30px;
  height: 30px;
}

.cam-button {
  width: 40px;
  height: 40px;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}
</style>