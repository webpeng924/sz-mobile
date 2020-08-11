
<template>
  <div class="loading">
    <img src="../assets/images/loading.gif" alt />
  </div>
</template>
 
<script>
export default {
  name: 'LOADING',
  data () {
    return {}
  },
}
</script>
<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 121;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.loading img {
  width: 1.5rem;
  /* height: 1rem; */
  opacity: 0.6;
  margin: 6rem auto;
}
</style>