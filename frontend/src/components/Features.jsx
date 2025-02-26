import { motion } from "framer-motion";

const featuresData = [
    {
        title: "Fast Performance",
        description: "Lightning-fast loading times and smooth interactions for the best user experience.",
        icon: "⚡"
    },
    {
        title: "Secure & Reliable",
        description: "Enterprise-grade security with 99.9% uptime guarantee for peace of mind.",
        icon: "🔒"
    },
    {
        title: "24/7 Support",
        description: "Round-the-clock expert support to help you whenever you need it.",
        icon: "🌟"
    }
];

const Features = () => {
    return (
        <section className="py-24 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-center relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-purple-500 opacity-10 blur-3xl"></div>

            <motion.div
                className="max-w-6xl mx-auto px-6 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-5xl font-extrabold text-white mb-12 drop-shadow-lg">
                    Why Choose Us
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {featuresData.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="p-8 rounded-xl bg-gray-900 shadow-xl border-2 border-transparent hover:border-purple-500 hover:scale-105 transition-transform duration-300 relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <div className="absolute inset-0 bg-purple-500 opacity-10 blur-xl rounded-lg"></div>
                            <motion.div
                                className="text-5xl mb-4 text-purple-400"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Features;