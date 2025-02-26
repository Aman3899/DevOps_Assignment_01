// Services.jsx
import Navbar from '../components/Navbar';

const Services = () => {
    const services = [
        {
            title: "Web Development",
            description: "Custom websites and web applications built with cutting-edge technologies",
            features: ["Responsive Design", "SEO Optimization", "Performance Focused"]
        },
        {
            title: "Mobile Development",
            description: "Native and cross-platform mobile applications for iOS and Android",
            features: ["Native Performance", "Cross-Platform", "User-Friendly UI"]
        },
        {
            title: "Cloud Solutions",
            description: "Scalable cloud infrastructure and deployment solutions",
            features: ["AWS Integration", "Cloud Security", "24/7 Support"]
        }
    ];

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center py-10 bg-gray-900">
                <div className="w-full max-w-6xl bg-gray-800 rounded-lg p-8 m-4">
                    <h1 className="text-4xl font-bold text-purple-500 mb-6">Our Services</h1>

                    <p className="text-gray-300 mb-12 text-lg">
                        We offer a comprehensive range of digital solutions to help your business succeed
                        in the modern technological landscape.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg p-6 hover:transform hover:scale-105 transition-transform">
                                <h2 className="text-2xl font-semibold text-purple-400 mb-4">{service.title}</h2>
                                <p className="text-gray-300 mb-6">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="text-gray-400 flex items-center">
                                            <span className="mr-2">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 bg-gray-700 rounded-lg p-8">
                        <h2 className="text-2xl font-semibold text-purple-400 mb-4">Why Choose Us?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Expert Team</h3>
                                <p className="text-gray-300">
                                    Our team of seasoned professionals brings years of industry experience
                                    to every project.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Custom Solutions</h3>
                                <p className="text-gray-300">
                                    We develop tailored solutions that perfectly match your business needs
                                    and objectives.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;