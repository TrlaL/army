<template>
  <span
    class="material-icons"
    @click="$emit('click')">
    {{ name }}
  </span>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.material-icons {
  user-select: none;
}
</style>