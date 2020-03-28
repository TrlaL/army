<template>
  <div class="header">
    <div class="title">Whatafuck by Tr1aL</div>
    <div class="icons">
      <b-icon-question class="icon-question" @click="visible = true" />
      <b-icon-x class="icon" @click="close" />
    </div>
    <b-modal
      centered
      hide-footer
      title="О приложении"
      :visible="visible"
      @hide="visible = false">
      <div>Разработчик: Марк Уолберг ака Tr1aL</div>
      <div>Версия: 1.0</div>
      <div>Дата разработки: 28.03.2020</div>
    </b-modal>
  </div>
</template>

<script>
import { remote } from 'electron'

export default {
  data: () => ({
    visible: false,
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

      &:hover {
        color: #666;
      }
    }

    .icon-question {
      @extend .icon;
      height: $icon-size - 8px;
      width: $icon-size - 8px;
    }
  }
}
</style>