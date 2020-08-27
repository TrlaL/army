<template>
  <div class="header">
    <div class="title">Whatafuck</div>
    <div class="icons">
      <Icon class="icon" name="save_alt" v-show="exportIcon" @click="exportFile" />
      <Icon class="icon" name="help_outline" @click="showModal" />
      <Icon class="icon" name="minimize" @click="minimize" />
      <Icon class="icon" name="close" @click="close" />
    </div>
    <b-modal
      centered
      hide-footer
      title="О приложении"
      :visible="visible"
      @hide="visible = false">
      <div>Разработчик: Марк Уолберг ака Tr1aL</div>
      <div>Версия: 1.0.1</div>
      <div>Дата разработки: 05.04.2020</div>
    </b-modal>
  </div>
</template>

<script>
import excel from 'node-excel-export'
import fs from 'fs'
import lodash from 'lodash'
import { mapGetters } from 'vuex'
import { remote } from 'electron'
import { TABLE_FIELDS } from '../constants'

export default {
  data: () => ({
    visible: false,
    window: remote.getCurrentWindow()
  }),

  computed: {
    ...mapGetters([
      'items'
    ]),
    exportIcon () {
      return this.$route.meta.exportIcon
    },
    options () {
      return {
        title: 'Сохранить файл',
        defaultPath: 'export',
        buttonLabel: 'Сохранить',
        filters: [
          { name: 'xlsx', extensions: ['xlsx'] }
        ]
      }
    },
    specification () {
      let fields = TABLE_FIELDS.map(({ key, label }) => ({
        displayName: label,
        key: key,
        headerStyle: this.styles.headerDark,
        width: 120
      }))
      return lodash.keyBy(fields, 'key')
    },
    styles () {
      return {
        headerDark: {
          fill: {
            fgColor: { rgb: 'FF000000' }
          },
          font: {
            color: { rgb: 'FFFFFFFF' },
            sz: 12
          }
        }
      }
    }
  },

  methods: {
    close () {
      this.window.close()
    },
    exportFile () {
      remote.dialog.showSaveDialog(this.options, name => {
        let exportFile = excel.buildExport([{ data: this.items, specification: this.specification }])
        fs.writeFileSync(name, exportFile, 'utf-8')
      })
    },
    minimize () {
      this.window.minimize()
    },
    showModal () {
      this.visible = true
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
      margin-left: 5px;

      &:hover {
        color: #666;
      }
    }
  }
}
</style>