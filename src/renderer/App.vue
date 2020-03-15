<template>
  <div id="app">
    <Header />
    <router-view class="content" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header, Footer
  }
}
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

body, html {
  height: 100vh;
  width: 100vw;
}

#app {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  height: 100%;
  width: 100%;
}

.content {
  background: #f4f4f4;
  flex: 1;
  overflow-y: auto;
  margin: 0;
  padding: 10px;
}
</style>
