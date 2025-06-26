import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import products from "../data/products.json";
import Scroll360Viewer from "../components/Scroll360Viewer";
import { useRef } from "react";
import { FiArrowLeft } from "react-icons/fi"; // ← bunu dosyanın en üstüne ekle

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const pageTransition = {
  duration: 0.5,
  ease: "easeInOut",
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  const descriptionRef = useRef(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-2xl">
        Ürün bulunamadı.
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="bg-yellow-50"
    >
      {/* Hero Bölüm */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${product.image})` }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-xl text-white text-center">
          <h1 className="text-5xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl">₺{product.price.toLocaleString()}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 bg-yellow-700 text-white px-5 py-2 rounded-full shadow-md hover:bg-yellow-800 transition"
        >
          <FiArrowLeft className="text-xl" />
          <span className="font-medium">Geri</span>
        </button>
      </section>
      {/* Aşağı Kaydırın İfadesi */}
<div className="absolute bottom-6 inset-x-0 flex justify-center animate-bounce">
  <div className="flex flex-col items-center text-white text-sm">
    <span className="bg-black bg-opacity-40 px-3 py-1 rounded-full text-xs sm:text-sm">
      aşağı kaydırın
    </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mt-1 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</div>




      {/* Ürün Açıklaması */}
      <motion.section
        ref={descriptionRef}
        className="max-w-4xl mx-auto px-4 py-12 md:py-20 mt-12 md:mt-0"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-4">
          Ürün Açıklaması
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          {product.description}
        </p>
      </motion.section>

      {/* 360 Ürün Görünümü */}
      <Scroll360Viewer folderPath={`/360/${product.folder}`} totalFrames={36} />

      {/* Teknik Detaylar */}
      <motion.section
        className="bg-white py-20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-3xl font-bold text-yellow-800">Detaylar</h2>
          <ul className="text-gray-700 list-disc list-inside text-lg">
            <li>Materyal: 14 Ayar Altın</li>
            <li>Ağırlık: ~2.5g</li>
            <li>Kategori: {product.category}</li>
            <li>
              Stok: {product.stock > 0 ? `${product.stock} adet` : "Stokta yok"}
            </li>
          </ul>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ProductDetail;
