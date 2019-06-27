<template>
  <div class="svg-icon" v-html="require(`@/assets/icon/${name}.svg`)"></div>
</template>
<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  display: inline-block;
}
.svg-icon >>> svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>

