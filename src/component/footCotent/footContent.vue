<script setup></script>

<template>
  <div class="box">
    <div class="logo">
      <img src="@/assets/logo.png" />
    </div>
    <div class="text1">官方QQ：3160476026</div>
    <div class="text2">招新QQ群：776728854</div>
  </div>
</template>

<style scoped lang="scss">
.box {
  display: flex;
  position: relative;
  z-index: 100;
  justify-content: space-around;
  align-items: center;
  height: 20vh;
  background-color: #0d0d0d;
}
.logo {
  margin-top: 10px;
  margin-left: 50px;
  img {
    width: 100px;
    height: 100px;
  }
}
.text1,
.text2 {
  font-size: 1.2em;
  color: #e4e4e4;
}
</style>
