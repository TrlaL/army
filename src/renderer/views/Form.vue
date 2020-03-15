<template>
  <div class="form">
    <b-form-group label="Файл приказа">
      <b-form-file placeholder="Выберите файл..." v-model="order" />
    </b-form-group>
    <b-form-group class="mb-0" label="Файл с информацией">
      <b-form-file placeholder="Выберите файл..." v-model="info" />
    </b-form-group>
  </div>
</template>

<script>
import { remote } from 'electron'

export default {
  data: () => ({
    info: null,
    order: null,
    window: remote.getCurrentWindow()
  }),

  computed: {
    files () {
      return { info: this.info, order: this.order }
    }
  },

  watch: {
    files: {
      deep: true,
      handler ({ info, order }) {
        this.$store.commit('SET_OK_BUTTON', !(info && order))
      }
    }
  },

  created () {
    this.$bus.on('button-clicked', this.onButtonClicked)
    this.$store.commit('SET_CANCEL_BUTTON', true)
    this.$store.commit('SET_OK_BUTTON', true)
  },

  mounted () {
    this.window.setSize(500, 250)
    this.window.center()
  },

  beforeDestroy () {
    this.$bus.off('button-clicked', this.onButtonClicked)
  },

  methods: {
    onButtonClicked (state) {
      if (state) {
        this.$router.push({ name: 'table' })
        this.$store.commit('SET_FILES', this.files)
      }
    }
  }
}
</script>