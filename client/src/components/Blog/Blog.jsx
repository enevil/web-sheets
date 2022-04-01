import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllBlogPosts } from "../../redux/blog/blogActions";
import css from "./Blog.module.css";
import BlogCard from "./BlogCard/BlogCard";
import Spinner from "../Custom/Spinner/Spinner";

const Blog = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogPosts());
  }, [dispatch]);

  return (
    <>
      <div className={css.container}>
        <div className={css.newsHeader}>
          <h1>НОВОСТИ</h1>
        </div>
        {isLoading ? (
          <div className={css.spinner}>
            <Spinner />
          </div>
        ) : (
          <section className={css.cardSection}>
            {posts.map((item) => {
              const { _id, title, pathImg, path } = item;
              return (
                <BlogCard
                  key={_id}
                  title={title}
                  pathImg={pathImg}
                  path={path}
                />
              );
            })}
          </section>
        )}
      </div>
    </>
  );
};

export default Blog;
