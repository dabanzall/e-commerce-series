import AdminLayout from './AdminLayout'


const stats = [
  { label: "Total Orders", value: "0", icon: "🛒", color: "bg-blue-50 text-blue-600" },
  { label: "Total Products", value: "0", icon: "📦", color: "bg-green-50 text-green-600" },
  { label: "Total Users", value: "0", icon: "👥", color: "bg-purple-50 text-purple-600" },
  { label: "Total Revenue", value: "$0", icon: "💰", color: "bg-yellow-50 text-yellow-600" },
]

function Dashboard() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-3xl font-black text-gray-900">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Coming soon */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="text-5xl mb-4">📈</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Revenue chart coming soon</h3>
        <p className="text-gray-400 text-sm">Will be connected to real data in Episode 22</p>
      </div>

    </AdminLayout>
  )
}

export default Dashboard