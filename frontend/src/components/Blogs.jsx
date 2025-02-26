import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Blog from './Blog';
import { api_base_url } from '../helper';

const Blogs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBlogs = async () => {
    try {
      const response = await fetch(api_base_url + "/getBlogs", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: localStorage.getItem("token")
        })
      });
      const responseData = await response.json();

      if (responseData.success) {
        setData(responseData.blogs);
      } else {
        setError(responseData.msg);
      }
    } catch (err) {
      setError("Failed to fetch blogs: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 px-6 md:px-12 lg:px-24 py-12">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" />
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-100" />
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-6 md:px-12 lg:px-24 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Latest Blogs</h1>
        <div className="h-1 w-24 bg-purple-500 rounded"></div>
      </motion.div>

      {error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4 text-red-500"
        >
          {error}
        </motion.div>
      ) : data && data.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.map((item, index) => (
            <Blog key={item._id || index} data={item} index={index} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-500 text-xl">No blogs found</div>
          <button
            onClick={getBlogs}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Refresh
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Blogs;