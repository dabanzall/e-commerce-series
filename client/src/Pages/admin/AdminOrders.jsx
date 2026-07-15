import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import AdminLayout from './AdminLayout'
import { Button, Badge } from '../../components'
import { api } from '../../services'

const statusColors = {
  pending: "yellow",
  processing: "blue",
  shipped: "purple",
  delivered: "green",
  cancelled: "red",
}

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"]

function AdminOrders() {
  const queryClient = useQueryClient()
  const [selectedOrder, setSelectedOrder] = useState(null)

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await api.get('/orders/all')
      return res.data
    }
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await api.patch(`/orders/${id}/status`, { status })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-orders'])
      toast.success('Order status updated! ✅')
      setSelectedOrder(null)
    },
    onError: () => toast.error('Failed to update order status')
  })

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">Manage customer orders</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Order ID</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Customer</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Items</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Total</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders?.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">#{order.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800 text-sm">{order.user?.name}</p>
                    <p className="text-gray-400 text-xs">{order.user?.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{order.items?.length} items</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-blue-600">${order.total.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge color={statusColors[order.status]}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {selectedOrder === order.id ? (
                      <div className="flex flex-col gap-2">
                        <select
                          defaultValue={order.status}
                          onChange={(e) => updateStatusMutation.mutate({ id: order.id, status: e.target.value })}
                          className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => setSelectedOrder(null)}
                          className="text-xs text-gray-400 hover:text-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <Button size="sm" variant="secondary" onClick={() => setSelectedOrder(order.id)}>
                        Update Status
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No orders yet</h3>
              <p className="text-gray-400 text-sm">Orders will appear here once customers start buying</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminOrders