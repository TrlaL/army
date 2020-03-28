export const TABLE_FIELDS = [{
  key: 'order',
  label: '№'
}, {
  key: 'id',
  label: 'ID'
}, {
  key: 'rank',
  label: 'Звание'
}, {
  key: 'name',
  label: 'Ф.И.О.'
}, {
  key: 'number',
  label: 'Табельник'
}, {
  key: 'year',
  label: 'Год'
}]

export const MONTHS = [
  'Январь', 'Февраль', 'Март',
  'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь',
  'Октябрь', 'Ноябрь', 'Декабрь'
]

export const REGULAR_EXPRESSIONS = {
  breakLine: /\n/,
  infoFilter: /^([0-9]+?)\t([А-Я]{1,2}-[0-9]{6})/i,
  notNumber: /\D/,
  orderBorders: /[\r\n]+за/gm,
  orderDate: /([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{4})/,
  orderFilter: /^.+([А-Я]{1,2}-[0-9]{6}).+:(.+)$/gmi,
  orderId: /[А-Я]{1,2}-[0-9]{6}/i,
  orderPercent: /[0-9]{1,3}\s?%/,
  tabSymbol: /\t/
}

export const KEY_CODES = {
  37: 'LEFT',
  38: 'TOP',
  39: 'RIGHT',
  40: 'BOTTOM'
}