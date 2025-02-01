'use client'
import React from 'react';
import BlogCard from './BlogCard';
import { Article } from '@/utils/types';


interface BlogListProps {
  blogs: Article[];
  title: string;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, title }) => {
  return (
    <div>
      <span className='text-xl font-medium border-l-8 border-blue-500 pl-2.5'>{title}</span>
      <div className='flex flex-row gap-5'>
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} main={false} type='default' />
        ))}
      </div>
    </div>
  );
};

export default BlogList;