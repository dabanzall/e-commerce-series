function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-blue-600 font-bold text-lg">ShopZone</p>
        <p className="text-gray-400 text-sm">
          © 2026 ShopZone. Built by Daban & Anya.
        </p>
        <div className="flex gap-4 text-sm text-gray-400">
          <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer