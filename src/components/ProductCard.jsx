import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ title, images, price, oldPrice, label }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef(null);
  const touchStartX = useRef(0);

  // Fare hareketi
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const widthPerImage = rect.width / images.length;
    const index = Math.min(images.length - 1, Math.floor(x / widthPerImage));
    setCurrentImageIndex(index);
  };

  // Dokunmatik başlangıç
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Dokunmatik hareket
  const handleTouchMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const widthPerImage = rect.width / images.length;
    const index = Math.min(images.length - 1, Math.floor(x / widthPerImage));
    setCurrentImageIndex(index);
  };

  // Fare veya dokunmatik çıkışı
  const handleLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
    >
      <div className="relative h-[576px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentImageIndex]}
            src={images[currentImageIndex]}
            alt={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }} // Geçiş süresi burada ayarlanır
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Label etiketi */}
  {label && (
          <div className="absolute bottom-0 left-0 bg-yellow-700 text-white text-sm px-3 py-1 rounded-tr-xl">
            {label}
          </div>
        )}




        {/* Dot göstergeleri */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-yellow-700 border-yellow-700"
                  : "bg-white border-yellow-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Ürün bilgileri */}
      <div className="p-4">
        <h2 className="text-sm font-medium text-gray-800 line-clamp-2">
          {title}
        </h2>
        <div className="mt-2">
          <p className="text-yellow-600 text-lg font-bold">
            ₺{price.toLocaleString()}
          </p>
          {oldPrice && (
            <p className="text-gray-500 line-through text-sm">
              ₺{oldPrice.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
