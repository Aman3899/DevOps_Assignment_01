// Contact.jsx
import Navbar from '../components/Navbar';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center py-2 bg-gray-900">
                <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-8 m-4">
                    <h1 className="text-4xl font-bold text-purple-500 mb-6">Contact Us</h1>

                    <div className="mb-8">
                        <p className="text-gray-300 mb-4">
                            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">Email</h3>
                                <p className="text-gray-300">m.amanullah0830@gmail.com</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">Phone</h3>
                                <p className="text-gray-300">+92 309 1297936</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-gray-300 block mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-700 rounded-lg text-white"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-300 block mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 bg-gray-700 rounded-lg text-white"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-300 block mb-2">Message</label>
                            <textarea
                                className="w-full p-3 bg-gray-700 rounded-lg text-white h-32"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Contact;