import AdminLayout from './AdminLayout'

function AdminOrders() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">Manage customer orders</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Orders management coming in Episode 22</h3>
        <p className="text-gray-400 text-sm">You will be able to view and update orders here</p>
      </div>
    </AdminLayout>
  )
}

export default AdminOrders