import { useState } from 'react';
import { motion } from 'framer-motion';
import InnerPageHero from '../components/ui/InnerPageHero';
import FilterTabs from '../components/sections/products/FilterTabs';
import ProductGrid from '../components/sections/products/ProductGrid';
import ProductModal from '../components/sections/products/ProductModal';

export default function Products() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <InnerPageHero eyebrow="OUR PRODUCTS" title="Smart Devices" subtitle="Premium smart home devices designed for seamless integration." breadcrumb="Products" />
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <ProductGrid activeTab={activeTab} onProductClick={setSelectedProduct} />
        </div>
      </section>
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </motion.main>
  );
}
