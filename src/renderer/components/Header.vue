<template>
  <div class="header">
    <div class="title">Whatafuck</div>
    <div class="icons">
      <b-icon-x class="icon" @click="close" />
    </div>
  </div>
</template>

<script>
import { remote } from 'electron'

export default {
  data: () => ({
    window: remote.getCurrentWindow()
  }),

  methods: {
    close () {
      this.window.close()
    }
  }
}
</script>

<style lang="scss" scoped>
$icon-size: 32px;
$padding: 10px;

.header {
  background: #ddd;
  border-bottom: 1px solid #ccc;
  padding: $padding;
  position: relative;
  width: 100%;

  .title {
    font-size: 1.2em;
    text-align: center;
  }

  .icons {
    align-items: center;
    display: flex;
    height: 100%;
    position: absolute;
    right: $padding / 2;
    top: 0;

    .icon {
      cursor: pointer;
      height: $icon-size;
      width: $icon-size;
    }
  }
}
</style>