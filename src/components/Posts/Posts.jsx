import { memo, useState, useEffect } from "react";
import Container from "../Container/Container";
import axios from "axios";
import "./Posts.scss";
import { OrbitProgress } from "react-loading-indicators";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { API } from "../../utils";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  const getPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API}posts?limit=10`);
      setPosts(response.data.posts);
    } catch (error) {
      setError(error.message);
      console.log(error);
      setExpanded({});
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="posts">
      <Container>
        {loading && (
          <div className="loading">
            <OrbitProgress color="#315acc" size="medium" text="" />
          </div>
        )}

        <h2 className="posts-title">Posts</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">
                {expanded[post.id]
                  ? post.body
                  : post.body.length > 100
                  ? post.body.slice(0, 100) + "..."
                  : post.body}
                <button
                  className="read-more-btn"
                  onClick={() => toggleExpand(post.id)}>
                  {expanded[post.id] ? "Show Less" : "Read More"}
                </button>
              </p>

              <div className="post-footer">
                <span>
                  <FaRegThumbsUp /> {post.reactions.likes}
                </span>
                <span>
                  <FaRegThumbsDown />
                  {post.reactions.dislikes}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default memo(Posts);
