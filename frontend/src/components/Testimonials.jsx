import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "The best service we've ever received. The team went above and beyond our expectations.",
        author: "Sarah Johnson",
        role: "CEO, TechCorp",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        quote: "Incredible attention to detail and outstanding customer support. Highly recommended!",
        author: "Mike Thompson",
        role: "Director, StartupX",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        quote: "They transformed our business with their innovative solutions. A game-changer for us.",
        author: "Lisa Chen",
        role: "Founder, InnovateCo",
        image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-center text-5xl font-extrabold text-white mb-12">
                    What Our Clients Say 💬
                </h2>
                <div className="grid md:grid-cols-3 gap-10">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index} 
                            className="relative p-8 rounded-xl bg-gray-900 shadow-2xl hover:scale-105 transition-transform duration-300 text-center"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                        >
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 border-4 border-purple-500 rounded-full overflow-hidden shadow-lg">
                                <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover"/>
                            </div>
                            <p className="text-gray-300 mt-12 mb-6 text-lg italic">
                                {testimonial.quote}
                            </p>
                            <div>
                                <p className="text-white font-semibold text-xl">{testimonial.author}</p>
                                <p className="text-purple-400 text-sm">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;