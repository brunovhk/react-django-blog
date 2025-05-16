import { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  author_username: string;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get('posts/')
      .then(res => setPosts(res.data.results || res.data))
      .catch(() => alert('Failed to load posts'));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>By {post.author_username}</p>
        </div>
      ))}
    </div>
  );
}
