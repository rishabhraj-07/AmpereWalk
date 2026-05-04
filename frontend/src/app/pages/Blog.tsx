import { motion } from "motion/react";
import { Calendar, User, ArrowRight, Zap, Leaf, TrendingUp } from "lucide-react";

export function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Wearable Energy Technology",
      excerpt: "Exploring how piezoelectric technology is revolutionizing personal energy generation and what it means for the future.",
      author: "AmpereWalk Team",
      date: "April 5, 2026",
      category: "Technology",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-aw-navy",
    },
    {
      id: 2,
      title: "Solving Energy Poverty Through Innovation",
      excerpt: "How AmpereWalk's technology provides sustainable energy access to underserved communities around the world.",
      author: "Impact Team",
      date: "March 28, 2026",
      category: "Impact",
      icon: <Leaf className="w-5 h-5" />,
      color: "bg-aw-green",
    },
    {
      id: 3,
      title: "Our Journey: From Prototype to Market",
      excerpt: "Behind the scenes look at AmpereWalk's development journey, from initial concept to award-winning product.",
      author: "Founders",
      date: "March 15, 2026",
      category: "Company",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-aw-teal",
    },
    {
      id: 4,
      title: "Understanding Piezoelectric Energy Harvesting",
      excerpt: "A deep dive into the science behind converting mechanical pressure into electrical energy.",
      author: "Engineering Team",
      date: "February 22, 2026",
      category: "Technology",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-aw-navy",
    },
    {
      id: 5,
      title: "Sustainability in Smart Footwear Manufacturing",
      excerpt: "How we're building eco-friendly products that reduce electronic waste and carbon emissions.",
      author: "Sustainability Lead",
      date: "February 10, 2026",
      category: "Sustainability",
      icon: <Leaf className="w-5 h-5" />,
      color: "bg-aw-green",
    },
    {
      id: 6,
      title: "The $177B Wearable Tech Market Opportunity",
      excerpt: "Analyzing market trends and AmpereWalk's position in the rapidly growing wearable technology sector.",
      author: "Market Research",
      date: "January 30, 2026",
      category: "Industry",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-aw-teal",
    },
  ];

  const categories = ["All", "Technology", "Impact", "Company", "Sustainability", "Industry"];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-aw-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-aw-green">AmpereWalk</span> Blog
            </h1>
            <p className="text-xl text-aw-lime max-w-3xl mx-auto">
              Insights on energy innovation, sustainability, and the future of wearable technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-aw-mid-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-5 py-2 rounded-full transition-colors ${
                  index === 0
                    ? "bg-aw-green text-white"
                    : "bg-aw-light-gray text-aw-dark-gray hover:bg-aw-mid-gray"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-aw-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
              >
                <div className={`${post.color} p-6 flex items-center justify-center h-48`}>
                  <div className="text-white text-6xl opacity-20">
                    {post.icon}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`${post.color} text-white text-xs px-3 py-1 rounded-full`}>
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-aw-navy mb-3 group-hover:text-aw-green transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-aw-dark-gray mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-aw-dark-gray mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <button className="text-aw-green hover:text-aw-navy transition-colors flex items-center gap-2 group-hover:gap-3">
                    Read More
                    <ArrowRight className="w-4 h-4 transition-all" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-aw-navy text-white rounded-lg hover:bg-aw-green transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-aw-green text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Subscribe to our newsletter for the latest insights and updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-aw-navy focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-aw-green rounded-lg hover:bg-aw-light-gray transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
