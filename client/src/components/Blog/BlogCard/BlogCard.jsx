import { Link } from "react-router-dom";
import { domain } from "../../../config";
import css from "./BlogCard.module.css";

const BlogCard = ({ title, pathImg, path }) => {
  return (
    <div className={css.newsCard}>
      <Link to={path}>
        <div className={css.imgSection}>
          <div
            style={{
              backgroundImage: `url('${domain}/static/BlogImages/${pathImg}')`,
            }}
          ></div>
        </div>
        <div className={css.titleContainer}>
          <p className={css.title}>{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
