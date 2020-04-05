import Form from '@/views/Form'
import Table from '@/views/Table'

export default [{
  component: Form,
  name: 'form',
  path: '/'
}, {
  component: Table,
  meta: { exportIcon: true },
  name: 'table',
  path: '/table'
}]