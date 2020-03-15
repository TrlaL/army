<template>
  <div class="table">
    <template v-if="isLoading">
      <div class="loading">
        <b-spinner v-if="isLoading" />
      </div>
    </template>
    <template v-else>
      <b-form-input
        class="mb-2"
        placeholder="Поиск по таблице"
        v-model="query">
      </b-form-input>
      <b-table
        bordered
        empty-text="Пусто"
        hover
        show-empty
        small
        :fields="fields"
        :items="filteredItems"
        :sort-by="sortBy">
        <template v-slot:cell()="data">
          <div
            class="cell"
            :class="getCellClass(data)"
            @click="selectCell(data)">
             {{ data.value || '-' }}
          </div>
        </template>
      </b-table>
    </template>
    <GlobalEvents
      @keydown="onKeyDown"
      @keyup.67.prevent="onCopy">
    </GlobalEvents>
  </div>
</template>

<script>
import getFileContent from '../../helpers/getFileContent'
import lodash from 'lodash'
import { mapGetters } from 'vuex'
import { clipboard, remote } from 'electron'
import { KEY_CODES, MONTHS, REGULAR_EXPRESSIONS, TABLE_FIELDS } from '../constants'

export default {
  data: () => ({
    expressions: REGULAR_EXPRESSIONS,
    info: null,
    isLoading: false,
    items: [],
    months: MONTHS,
    order: null,
    personnel: [],
    query: '',
    selectedCell: { field: 0, row: 0 },
    sortBy: 'order',
    tableFields: TABLE_FIELDS,
    window: remote.getCurrentWindow()
  }),

  computed: {
    ...mapGetters([
      'files'
    ]),
    count () {
      return this.filteredItems.length.toString()
    },
    fields () {
      return this.tableFields.map(field => {
        return { ...field, tdClass: 'p-0', sortable: true }
      }).concat(this.monthsFields)
    },
    filteredItems () {
      return this.items.filter(item => {
        return lodash.values(item).find(value => new RegExp(this.query, 'i').test(value))
      })
    },
    monthsFields () {
      return this.months.map((month, index) => {
        return {
          key: this.pad(index + 1),
          label: month,
          sortable: true,
          tdClass: 'p-0'
        }
      })
    },
    selectedValue () {
      let { row, field } = this.selectedCell
      let item = this.items[row]
      let findedField = this.fields[field]
      return item[findedField.key]
    }
  },

  created () {
    this.$bus.on('button-clicked', this.onButtonClicked)
    this.$store.commit('SET_CANCEL_BUTTON', false)
    this.$store.commit('SET_OK_BUTTON', true)
  },

  async mounted () {
    await this.init()
    this.window.maximize()
    this.parseInfo()
    this.parseOrder()
  },

  beforeDestroy () {
    this.$bus.off('button-clicked', this.onButtonClicked)
  },

  methods: {
    async init () {
      this.isLoading = true
      this.order = await getFileContent(this.files.order)
      this.info = await getFileContent(this.files.info)
      this.isLoading = false
    },
    getCellClass (data) {
      return {
        'cell_selected': this.selectedCell.row === data.index && this.selectedCell.field === this.getFieldIndex(data.field.key)
      }
    },
    getFieldIndex (key) {
      return lodash.findIndex(this.fields, { key })
    },
    getNumber (value) {
      return parseFloat(value.replace(this.expressions.notNumber), '')
    },
    onButtonClicked (state) {
      if (!state) {
        this.$router.push({ name: 'form' })
      }
    },
    onCopy () {
      if (this.selectedValue) {
        this.$bvToast.toast('Значение ячейки скопировано в буффер!', {
          title: 'Уведомление',
          toaster: 'b-toaster-bottom-right',
          variant: 'info'
        })
        clipboard.writeText(this.selectedValue.toString())
      }
    },
    onKeyDown (event) {
      let key = KEY_CODES[event.keyCode]
      if (key) {
        let fieldsLast = this.fields.length - 1
        let rowLast = this.items.length - 1
        let { field, row } = this.selectedCell
        event.preventDefault()
        switch (key) {
          case 'LEFT':
            return this.$set(this.selectedCell, 'field', (field > 0) ? field - 1 : field)
          case 'TOP':
            return this.$set(this.selectedCell, 'row', (row > 0) ? row - 1 : row)
          case 'RIGHT':
            return this.$set(this.selectedCell, 'field', (field < fieldsLast) ? field + 1 : field)
          case 'BOTTOM':
            return this.$set(this.selectedCell, 'row', (row < rowLast) ? row + 1 : row)
        }
      }
    },
    pad (index) {
      return index < 10 ? '0' + index : index.toString()
    },
    parseInfo () {
      this.info.split(this.expressions.breakLine).filter(item => this.expressions.infoFilter.test(item)).forEach(item => {
        let parts = item.split(this.expressions.tabSymbol)
        let [ number, id, rank, name ] = parts
        this.personnel.push({ number, id, rank, name })
      })
    },
    parseOrder () {
      let plain = this.order.replace(this.expressions.orderBorders, '')
      let matches = plain.match(this.expressions.orderFilter)
      let order = 1
      matches.forEach(match => {
        let id = lodash.first(this.expressions.orderId.exec(match))
        let periods = lodash.last(match.split(':')).split(';').filter(item => item.length)
        periods.forEach(period => {
          let date = lodash.first(this.expressions.orderDate.exec(period)).split('.')
          let percent = this.getNumber(lodash.first(this.expressions.orderPercent.exec(period)))
          let value = percent / 2
          let month = date[1]
          let year = date[2]
          let index = lodash.findIndex(this.items, { id, year })
          if (index !== -1) {
            let current = lodash.get(this.items[index], month, 0)
            lodash.set(this.items[index], month, current + value)
          } else {
            let { name, number, rank } = lodash.find(this.personnel, { id }) || {}
            this.items.push({ order: order++, rank, name, number, id, year, [month]: value })
          }
        })
      })
    },
    selectCell (data) {
      this.$set(this.selectedCell, 'row', data.index)
      this.$set(this.selectedCell, 'field', this.getFieldIndex(data.field.key))
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.cell {
  cursor: pointer;
  padding: 4px;

  &_selected {
    background: rgba(247, 161, 31, 0.411);
    outline: 1px solid rgb(247, 160, 31);
  }
}
</style>