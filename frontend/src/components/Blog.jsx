import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Blog = ({ data }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/blog/${data._id}`)}
      className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          src={`http://localhost:3000/uploads/${data.image}`}
          alt={data.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Blog+Image';
          }}
        />
        {data.category && (
          <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
            {data.category}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400 text-sm">
            {formatDate(data.createdAt || new Date())}
          </span>
          {data.readTime && (
            <span className="text-gray-400 text-sm">
              {data.readTime} min read
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 hover:text-purple-500 transition-colors">
          {truncateText(data.title, 60)}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {data.desc}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
          {data.author && (
            <div className="flex items-center">
              <img
                src={data.author.avatar || 'https://via.placeholder.com/40?text=A'}
                alt={data.author.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm text-gray-300">
                {data.author.name}
              </span>
            </div>
          )}

          <div className="flex items-center gap-4 text-gray-400 text-sm">
            {data.likes !== undefined && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {data.likes}
              </span>
            )}
            {data.comments !== undefined && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {data.comments}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

Blog.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    readTime: PropTypes.number,
    desc: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    likes: PropTypes.number,
    comments: PropTypes.number,
  }).isRequired,
};

export default Blog;