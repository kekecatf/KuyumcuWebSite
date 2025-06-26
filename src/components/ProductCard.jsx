import { motion } from "framer-motion";

const ProductCard = ({ image, title, price, label }) => {
  return (
    <motion.div
      className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-72 object-cover transition duration-300 group-hover:brightness-90"
        />
        {label && (
          <div className="absolute bottom-0 left-0 bg-yellow-700 text-white text-sm px-3 py-1 rounded-tr-xl">
            {label}
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
        <p className="text-yellow-700 text-xl font-bold mt-2">
          ₺{price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
