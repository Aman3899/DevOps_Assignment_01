import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { api_base_url } from '../helper';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const SingleBlog = () => {
  const [data, setData] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { blogId } = useParams();

  const getBlog = async () => {
    try {
      const response = await fetch(api_base_url + "/getBlog", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          blogId: blogId,
          token: localStorage.getItem("token")
        })
      });
      const result = await response.json();
      
      if (result.success) {
        setData(result.blog);
        setImage(result.blog.image);
      } else {
        setError(result.msg);
      }
    } catch (err) {
      setError("Failed to fetch blog: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, [blogId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" />
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-100" />
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-6 text-red-500">
            {error}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-900 px-6 md:px-12 lg:px-24 py-12"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-8 mb-12"
          >
            <div className="lg:w-2/5">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  className="w-full h-full object-cover"
                  src={`http://localhost:3000/uploads/${image}`}
                  alt={data?.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=Blog+Image';
                  }}
                />
              </div>
            </div>

            <div className="lg:w-3/5">
              <div className="space-y-4">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-white"
                >
                  {data?.title}
                </motion.h1>

                <div className="flex items-center space-x-4 text-gray-400">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(data?.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {data?.readTime && (
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {data.readTime} min read
                    </span>
                  )}
                </div>

                <div className="prose prose-lg prose-invert">
                  <h2 className="text-xl font-semibold text-purple-400 mt-6">Description</h2>
                  <p className="text-gray-300">
                    {data?.desc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
              {data ? parse(data.content) : ""}
            </div>
          </motion.div>

          {data?.tags && (
            <div className="mt-8 flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-purple-500 bg-opacity-20 text-purple-400 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SingleBlog;