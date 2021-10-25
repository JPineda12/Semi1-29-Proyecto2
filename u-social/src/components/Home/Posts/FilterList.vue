<template>
  <div class="card-view">
    <div class="r-layout">
      <div class="tag" id="selected">{{ selectedTag }}</div>
      <div class="vl"></div>
      <div class="taglist" v-for="tag in getTags" :key="tag.idTag">
        <div class="tag" @click="selecTag(tag)">{{ tag.Etiqueta }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterList",
  emits: ["filter"],
  props: {
    Tags: { type: Array, required: true },
  },
  computed: {
    getTags: function () {
      return this.Tags;
    },
  },
  data() {
    return {
      selectedTag: "Todos",
    };
  },
  methods: {
    selecTag(tag) {
      this.selectedTag = tag.Etiqueta;
      this.$emit("filter", tag.Etiqueta);
    },
  },
};
</script>

<style scoped>
:root {
  --dark-green: #9cc675;
  --dark-yellow: #e89a3d;
  --extra-light-brown: #fdf0d7;
  --light-brown: #ecd5ab;
  --dark-brown: #915b40;
  --light-yellow: #f8e3a8;
  --light-red: #f3ac99;
  --light-teal: #a6c8cc;
  --light-gray: #ddd5d6;
  --theme-color2: #e89a3d;
  --theme-color1: #e89a3d;
}

.card-view {
  -webkit-box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 15px;
  height: 35px;
  margin-bottom: 20px;
  background: #242526;


}
.flex-row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.bg-gray {
  background: #f8f8f8;
}
.no-margin {
  margin: 0 !important;
}
.flex-row .flex-col {
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.r-layout {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  overflow-x: auto;
  position: relative;
}
.r-layout .r-img {
  position: relative;
  min-width: 139px;
  min-height: 132px;
  max-width: 139px;
  max-height: 132px;
  margin-right: 20px;
}
.cm-sm {
  width: 154px !important;
  height: 156px !important;
  border-radius: 20px;
}
.dashed {
  width: 154px !important;
  height: 156px !important;
  border-radius: 20px;
  border: 3px dashed rgb(99, 99, 99);
}
.r-layout .r-img img {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  -o-object-fit: cover;
  object-fit: cover;
}

.card-sm-content .r-layout .r-content .title {
  font-size: 17px;
}
.r-layout .r-content .title {
  font-size: 22px;
  font-weight: 600;
  color: #dedde5;
  margin-bottom: 2px;
}
.title {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
}

.r-layout .r-content p {
  font-size: 14px;
  color: #dedde5;
  margin: 0;
  margin-bottom: 10px;
}
.r-layout .r-content p {
  font-size: 14px;
  color: #dedde5;

  margin: 0;
  margin-bottom: 10px;
}

textarea {
  width: 600px;
  height: 50px;
  border: 3px solid #cccccc;
  padding: 5px;
  font-family: Tahoma, sans-serif;

  background-position: bottom right;
  background-repeat: no-repeat;
  resize: none;
}

.custom-file-upload {
  appearance: none;
  outline: 0;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;
}
.upload {
  margin-left: 25%;
}
button:hover {
  background-color: #dedde5;
  cursor: pointer;
}

svg {
  width: 30px;
  height: 30px;
}
#fileIcon {
  color: white;
}
input[type="file"] {
  display: none;
}

.bt-post {
  background-color: white;
  width: 100px;
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

.bt-post a {
  position: relative;
  top: -25%;
  margin-top: 20px;
  line-height: 30px;
}

.s-tag {
  width: 41px;
  height: 36px;
  background: transparent;
  color: #212121;
  border-radius: 3px;
  background: var(--theme-color1);
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 20px;
}

.taglist {
  display: inline-block;
  margin-bottom: 10px;
}
.taglist .tag:first-child {
  margin-left: 0;
}
.taglist .tag {
  margin-left: 10px;
}
.tag:hover {
  background-color: white;
  border: 0.2px solid;
  cursor: pointer;
}

.tag {
  padding-right:5px;
  padding-left: 5px;
  height: 26px;
  border-radius: 2px;
  background-color: #e4e4e4;
  font-size: 14px;
  color: #666666;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-right: 3px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
}
.vl {
  border-left: 3px solid rgb(139, 139, 139);
  height: 50px;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: -30px;
}
#selected {
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  padding-left: 15px;
  padding-right: 15px;
}
</style>