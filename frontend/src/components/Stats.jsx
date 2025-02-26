import { motion } from "framer-motion";

const statsData = [
    { number: "500+", label: "Happy Clients" },
    { number: "1000+", label: "Successful Projects" },
    { number: "50+", label: "Countries Served" },
    { number: "99%", label: "Customer Satisfaction" }
];

const Stats = () => {
    return (
        <section className="py-28 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] relative overflow-hidden">
            {/* Background Particles */}
            <div className="absolute inset-0 bg-stars opacity-10"></div>

            <div className="max-w-6xl mx-auto px-6 relative">
                <motion.h2 
                    className="text-center text-5xl font-extrabold text-white mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Our Achievements 🚀
                </motion.h2>

                <div className="grid md:grid-cols-4 gap-10 text-center">
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="p-8 rounded-lg bg-gray-900 shadow-2xl hover:scale-105 transition-transform duration-300 relative border-2 border-transparent hover:border-purple-500"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <div className="absolute inset-0 bg-purple-500 opacity-10 blur-xl rounded-lg"></div>
                            <h3 className="text-5xl font-extrabold text-purple-400 mb-3 drop-shadow-md">
                                {stat.number}
                            </h3>
                            <p className="text-gray-300 text-lg font-semibold tracking-wide">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;