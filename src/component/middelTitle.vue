<template>
  <div class="classify">
    <div class="textTitle">
      <svg class="icon"><use xlink:href="#icon-zuojiantou"></use></svg> &nbsp;
      <slot></slot>
      &nbsp;<svg class="icon"><use xlink:href="#icon-youjiantou"></use></svg>
    </div>
  </div>
</template>
<style scoped lang="scss">
.classify {
  background-color: #908989;
  text-align: center;
  line-height: 10vh;
  height: 10vh;
  .textTitle {
    font-size: 1.3em;
    letter-spacing: 6px;
    font-weight: 600;
    font-family: '阿里妈妈灵动体 VF Thin';
    .icon {
      padding: 5px 0 0 0;
    }
  }
}
</style>
