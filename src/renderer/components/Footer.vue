<template>
  <div class="footer">
    <b-button
      small
      variant="secondary"
      :disabled="cancelButton"
      @click="handle(false)">
      Отмена
    </b-button>
    <b-button
      small
      variant="primary"
      :disabled="okButton"
      @click="handle(true)">
      Обработать
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['cancelButton', 'okButton'])
  },

  methods: {
    handle (state) {
      this.$bus.emit('button-clicked', state)
    }
  }
}
</script>

<style lang="scss" scoped>
$padding: 7px 10px;

.footer {
  background: #ddd;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  padding: $padding;
}
</style>