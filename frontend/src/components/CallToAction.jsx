import { motion } from "framer-motion";


const CallToAction = () => {
    return (
        <section className="py-24 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-center relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-purple-500 opacity-10 blur-3xl"></div>

            <motion.div
                className="max-w-4xl mx-auto px-6 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
                    Ready to Get Started?
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                    Join thousands of satisfied customers who have transformed their business with us.
                </p>
                <div className="flex justify-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-purple-700 transition-all duration-300"
                    >
                        Get Started 🚀
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 border-purple-600 text-purple-400 px-8 py-3 rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-lg"
                    >
                        Learn More
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
};

export default CallToAction;