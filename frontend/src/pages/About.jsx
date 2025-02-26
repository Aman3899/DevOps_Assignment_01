// About.jsx
import Navbar from '../components/Navbar';

const About = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center py-28 bg-gray-900">
                <div className="w-full max-w-4xl bg-gray-800 rounded-lg p-8 m-4">
                    <h1 className="text-4xl font-bold text-purple-500 mb-6">About Us</h1>

                    <div className="space-y-6">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">Our Story</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Founded in 2020, we&apos;ve been at the forefront of digital innovation,
                                creating solutions that transform how businesses operate in the digital age.
                                Our team of dedicated professionals brings together decades of combined experience.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We strive to deliver exceptional digital solutions that empower businesses
                                to thrive in an increasingly connected world. Our commitment to innovation
                                and excellence drives everything we do.
                            </p>
                        </section>

                        <section className="grid md:grid-cols-3 gap-6">
                            <div className="bg-gray-700 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-purple-400 mb-3">Innovation</h3>
                                <p className="text-gray-300">Pushing boundaries with cutting-edge solutions</p>
                            </div>
                            <div className="bg-gray-700 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-purple-400 mb-3">Quality</h3>
                                <p className="text-gray-300">Delivering excellence in every project</p>
                            </div>
                            <div className="bg-gray-700 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-purple-400 mb-3">Integrity</h3>
                                <p className="text-gray-300">Building trust through transparent practices</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;