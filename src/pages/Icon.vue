<template>
  <div class="icon-svg-wrapper">
    <icon-svg name="check-circle"/>
    <icon-svg name="close-circle"/>
    <icon-svg name="compass"/>
    <icon-svg name="sync"/>
  </div>
</template>
<script>
import IconSvg from "@/components/SvgIcon";
export default {
  components: {
    IconSvg
  }
};
</script>
<style scoped>
.icon-svg-wrapper >>> .svg-icon {
  width: 100px;
  height: 100px;
}
</style>

