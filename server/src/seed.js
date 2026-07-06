const prisma = require('./prisma')

async function main() {
  // Create categories
  const electronics = await prisma.category.create({ data: { name: 'Electronics' } })
  const clothing = await prisma.category.create({ data: { name: 'Clothing' } })
  const books = await prisma.category.create({ data: { name: 'Books' } })
  const home = await prisma.category.create({ data: { name: 'Home' } })

  // Create products
  await prisma.product.createMany({
    data: [
      { name: 'Wireless Headphones', description: 'High quality wireless headphones', price: 99.99, stock: 50, categoryId: electronics.id },
      { name: 'Smartphone', description: 'Latest smartphone model', price: 699.99, stock: 30, categoryId: electronics.id },
      { name: 'Running Shoes', description: 'Comfortable running shoes', price: 79.99, stock: 100, categoryId: clothing.id },
      { name: 'T-Shirt', description: 'Cotton t-shirt', price: 19.99, stock: 200, categoryId: clothing.id },
      { name: 'JavaScript Book', description: 'Learn JavaScript from scratch', price: 39.99, stock: 75, categoryId: books.id },
      { name: 'Coffee Maker', description: 'Automatic coffee maker', price: 49.99, stock: 40, categoryId: home.id },
    ]
  })

  console.log('Database seeded successfully! ✅')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())