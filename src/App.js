import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./pages/ProductDetail";
import React, { useState } from "react";
import productsData from "./data/products.json";
import { AnimatePresence, motion } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  const [products] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("hepsi");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  let filteredProducts = products
    .filter((item) =>
      selectedCategory === "hepsi" ? true : item.category === selectedCategory
    )
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (sortOrder === "asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="min-h-screen bg-yellow-50 py-12 px-6"
            >
              <h1 className="text-5xl font-extrabold text-yellow-800 text-center mb-10 tracking-tight">
                Lina Gold Vitrini
              </h1>

              {/* Kategori filtreleme */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {["hepsi", "küpe", "kolye", "yüzük"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium shadow transition duration-300 ${
                      selectedCategory === cat
                        ? "bg-yellow-700 text-white"
                        : "bg-white border border-yellow-700 text-yellow-700 hover:bg-yellow-100"
                    }`}
                  >
                    {cat[0].toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Arama kutusu */}
              <div className="flex justify-center mb-6">
                <div className="relative w-72">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-700">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-yellow-700 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Sıralama menüsü */}
              <div className="flex justify-center mb-10">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-4 py-2 border border-yellow-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-700"
                >
                  <option value="">Fiyata Göre Sırala</option>
                  <option value="asc">Artan</option>
                  <option value="desc">Azalan</option>
                </select>
              </div>

              {/* Ürün kartları */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredProducts.map((product) => (
  <Link
    key={product.id}
    to={`/product/${product.id}`}
    className="hover:scale-105 transition-transform duration-300"
  >
    <ProductCard
      title={product.title}
      images={product.images}
      price={product.price}
      oldPrice={product.oldPrice}
      discount={product.discount}
    />
  </Link>
))}

              </div>
            </motion.div>
          }
        />
        <Route
          path="/product/:id"
          element={
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <ProductDetail />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
