import { motion } from "framer-motion";

const Newsletter = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-center relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-purple-500 opacity-10 blur-3xl"></div>

            <motion.div
                className="max-w-3xl mx-auto px-6 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                    Stay updated with our latest news, updates, and exclusive offers.
                </p>

                <motion.form
                    className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <motion.input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500 transition-all duration-300"
                        whileFocus={{ scale: 1.05, borderColor: "#a855f7" }}
                    />
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300"
                    >
                        Subscribe 🚀
                    </motion.button>
                </motion.form>
            </motion.div>
        </section>
    );
};

export default Newsletter;