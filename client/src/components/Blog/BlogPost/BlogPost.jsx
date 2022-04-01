import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { domain } from "../../../config";
import { getOneBlogPost } from "../../../redux/blog/blogActions";
import Spinner from "../../Custom/Spinner/Spinner";
import css from "./BlogPost.module.css";

const BlogPost = () => {
  const { path } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.blog);
  const { title, body, date, pathImg } = post;
  const formattedDate = new Date(date).toLocaleDateString();

  useEffect(() => {
    dispatch(getOneBlogPost(path));
  }, [dispatch, path]);

  return (
    <>
      {isLoading ? (
        <div className={css.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={css.container}>
          <div>
            <h2>{title}</h2>
            <p>{formattedDate}</p>
          </div>

          <div className={css.imgSection}>
            <div
              style={{
                backgroundImage: `url('${domain}/static/BlogImages/${pathImg}')`,
              }}
            ></div>
          </div>
          <div className={css.mainContent}>{body}</div>
        </div>
      )}
    </>
  );
};

export default BlogPost;
