export const TABLE_FIELDS = [
  { key: 'order', label: '№' },
  { key: 'id', label: 'ID' },
  { key: 'rank', label: 'Звание' },
  { key: 'name', label: 'Ф.И.О.' },
  { key: 'number', label: 'Табельник' },
  { key: 'year', label: 'Год' },
  { key: 'january', label: 'Январь' },
  { key: 'february', label: 'Февраль' },
  { key: 'march', label: 'Март' },
  { key: 'april', label: 'Апрель' },
  { key: 'may', label: 'Май' },
  { key: 'june', label: 'Июнь' },
  { key: 'july', label: 'Июль' },
  { key: 'august', label: 'Август' },
  { key: 'september', label: 'Сентябрь' },
  { key: 'october', label: 'Октябрь' },
  { key: 'november', label: 'Ноябрь' },
  { key: 'december', label: 'Декабрь' }
]

export const MONTHS = [
  'january', 'february', 'march',
  'april', 'may', 'june',
  'july', 'august', 'september',
  'october', 'november', 'december'
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