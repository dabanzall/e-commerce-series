import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import AdminLayout from './AdminLayout'
import { Button, Badge, Input } from '../../components'
import { api } from '../../services'

function AdminProducts() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    image: '',
  })

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const res = await api.get('/products')
      return res.data
    }
  })

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/products', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products'])
      toast.success('Product created! ✅')
      resetForm()
    },
    onError: () => toast.error('Failed to create product')
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/products/${id}`, data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products'])
      toast.success('Product updated! ✅')
      resetForm()
    },
    onError: () => toast.error('Failed to update product')
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/products/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products'])
      toast.success('Product deleted! ✅')
    },
    onError: () => toast.error('Failed to delete product')
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    const data = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      categoryId: parseInt(form.categoryId),
    }
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      image: product.image || '',
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id)
    }
  }

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', stock: '', categoryId: '', image: '' })
    setEditingProduct(null)
    setShowForm(false)
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product catalog</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Product'}
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Product Name" name="name" placeholder="Wireless Headphones" value={form.name} onChange={handleChange} />
            <Input label="Price ($)" name="price" type="number" placeholder="99.99" value={form.price} onChange={handleChange} />
            <Input label="Stock" name="stock" type="number" placeholder="50" value={form.stock} onChange={handleChange} />
            <Input label="Category ID" name="categoryId" type="number" placeholder="1" value={form.categoryId} onChange={handleChange} />
            <Input label="Image URL" name="image" placeholder="https://..." value={form.image} onChange={handleChange} />
            <Input label="Description" name="description" placeholder="Product description..." value={form.description} onChange={handleChange} />
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={handleSubmit}>
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
            <Button variant="secondary" onClick={resetForm}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Products Table */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Product</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Price</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Stock</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Category</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        ) : '📦'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                        <p className="text-gray-400 text-xs truncate max-w-xs">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-blue-600">${product.price}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge color={product.stock > 10 ? "green" : product.stock > 0 ? "yellow" : "red"}>
                      {product.stock} left
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{product.category?.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleEdit(product)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminProducts