import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./pages/ProductDetail";
import React, { useState, useEffect, useRef } from "react";
import productsData from "./data/products.json";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

function AnimatedRoutes() {
  const location = useLocation();
  const [products] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("hepsi");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 100) {
        setShowFilterBar(false);
      } else {
        setShowFilterBar(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              className="min-h-screen bg-yellow-50 pt-12 px-6"
            >
              <h1 className="text-5xl font-extrabold text-yellow-800 text-center mb-10 tracking-tight">
                Lina Gold Vitrini
              </h1>
              <div className="border-t border-yellow-300 w-full max-w-5xl mx-auto mb-8"></div>


              {/* Sabit olmayan filtre barı */}
              <div className="sticky top-0 z-20 overflow-hidden">
                <motion.div
                  animate={{ y: showFilterBar ? 0 : "-100%" }}
                  transition={{ duration: 0.4 }}
                  className="bg-yellow-50 px-4 py-4 shadow"
                >
                  <div className="flex flex-wrap justify-center gap-4 mb-4">
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

                  <div className="flex justify-center mb-4">
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

                  <div className="flex justify-center">
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
                </motion.div>
              </div>

              {/* Ürün kartları */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-10">
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

              {/* İletişim Bölümü */}
              <div className="mt-20 text-center border-t border-yellow-300 pt-12 pb-12">
                <h2 className="text-3xl font-bold text-yellow-800 mb-4">
                  Bize Ulaşın
                </h2>
                <p className="text-gray-700 mb-6">
                  Sorularınız veya siparişleriniz için bizimle iletişime
                  geçebilirsiniz.
                </p>

                <div className="flex justify-center gap-6 text-yellow-700 text-xl mb-6 flex-wrap">
                  <a
                    href="https://wa.me/905551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-green-600 transition"
                    title="WhatsApp'tan yaz"
                  >
                    <FaWhatsapp className="text-green-500 text-2xl" />
                    WhatsApp
                  </a>
                  <a
                    href="https://instagram.com/linagold"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-pink-600 transition"
                    title="Instagram sayfamız"
                  >
                    <FaInstagram className="text-pink-500 text-2xl" />
                    Instagram
                  </a>
                </div>

                <div className="text-gray-800 text-base">
                  <p className="font-semibold">Mağaza Adresimiz:</p>
                  <p className="mt-1">
                    Atatürk Caddesi No:45, Manavgat / Antalya
                  </p>
                </div>
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
