import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { Hash, ExternalLink, Calendar } from "lucide-react";
import React from "react";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  url: string;
};

// Sample blog posts - these can be fetched from an API later
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable Web Applications with MERN",
    excerpt:
      "A comprehensive guide to building production-ready applications using MongoDB, Express, React, and Node.js.",
    date: "March 15, 2025",
    readTime: "8 min read",
    category: "Backend",
    url: "https://hashnode.com/@lalitgujjar",
  },
  {
    id: 2,
    title: "React Performance Optimization Techniques",
    excerpt:
      "Learn advanced techniques to optimize React applications for better performance and user experience.",
    date: "March 10, 2025",
    readTime: "10 min read",
    category: "Frontend",
    url: "https://hashnode.com/@lalitgujjar",
  },
  {
    id: 3,
    title: "Understanding REST APIs and Best Practices",
    excerpt:
      "Deep dive into REST API design, error handling, versioning, and industry best practices.",
    date: "March 5, 2025",
    readTime: "12 min read",
    category: "API Design",
    url: "https://hashnode.com/@lalitgujjar",
  },
  {
    id: 4,
    title: "Database Optimization: SQL vs NoSQL",
    excerpt:
      "Comparing SQL and NoSQL databases, when to use each, and optimization techniques for both.",
    date: "February 28, 2025",
    readTime: "9 min read",
    category: "Database",
    url: "https://hashnode.com/@lalitgujjar",
  },
  {
    id: 5,
    title: "JWT Authentication in Node.js",
    excerpt:
      "Implementing secure JWT-based authentication with refresh tokens and best security practices.",
    date: "February 20, 2025",
    readTime: "7 min read",
    category: "Security",
    url: "https://hashnode.com/@lalitgujjar",
  },
  {
    id: 6,
    title: "Mastering Git: Advanced Commands & Workflows",
    excerpt:
      "Learn advanced Git techniques for better version control and team collaboration.",
    date: "February 15, 2025",
    readTime: "11 min read",
    category: "DevTools",
    url: "https://hashnode.com/@lalitgujjar",
  },
];

const categoryColors: Record<string, string> = {
  Backend: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  Frontend:
    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  "API Design":
    "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  Database:
    "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  Security: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400",
  DevTools:
    "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
};

export function Blogs() {
  return (
    <Section className="container mx-auto max-w-5xl scroll-mt-32 px-6 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
        <Hash className="w-8 h-8 text-pink-500" />
        Latest Blog Posts
      </h2>
      <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
        Thoughts, tutorials, and insights on web development, system design, and
        software engineering.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <Card
              delay={index * 0.05}
              className="group h-full flex flex-col justify-between hover:border-pink-200 dark:hover:border-pink-800/50"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                      categoryColors[post.category] || categoryColors["Backend"]
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-pink-500 transition-colors" />
              </div>
            </Card>
          </a>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://hashnode.com/@lalitgujjar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Read More Articles
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </Section>
  );
}
