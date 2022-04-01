import { uniqueId } from "lodash";
import { useEffect } from "react";
import { useState, cloneElement, Children } from "react";
import css from "./Carousel.module.css";

const Carousel = ({ children }) => {
  const [offset, setOffset] = useState(0);
  const [id, setId] = useState("");
  useEffect(() => {
    setId(uniqueId());
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (offset < -100 * (Children.count(children) - 2)) return setOffset(0);
      return setOffset((prev) => prev - 100);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [offset, children]);

  return (
    <div className={css.carousel}>
      <div className={css.slides}>
        {Children.map(children, (child, index) => {
          if (index === 0) {
            return cloneElement(child, {
              style: { marginLeft: `${offset}%` },
            });
          }
          return child;
        })}
      </div>
      <div className={css.hide}>
        {Children.map(children, (child, index) => (
          <input
            onClick={() => setOffset(-100 * index)}
            type="radio"
            id={id + index}
          />
        ))}
      </div>
      <div className={css.switchContainer}>
        {Children.map(children, (child, index) => (
          <label htmlFor={id + index} className={css.switch} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
