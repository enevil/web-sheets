import css from "./Searcher.module.css";
import SearchItem from "./SearchItem/SearchItem";
import Input from "../../Custom/SearchInput/SearchInput";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchPerson } from "../../../redux/calendar/calendarActions";
import { withAuth } from "../../hoc/withAuth";
import { Navigate } from "react-router-dom";

const Searcher = () => {
  const [valSearch, setValSearch] = useState("");
  const dispatch = useDispatch();
  const { searcherPersons } = useSelector((state) => state.calendar);
  const { personId } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(updateSearchPerson(valSearch));
  }, [valSearch, dispatch]);

  if (personId) return <Navigate to={`/user/calendar/${personId}`} />;

  return (
    <section className="defaultContainer">
      <div className={css.searchbar}>
        <Input onInput={setValSearch} value={valSearch} />
      </div>
      <div id="datalist" className={css.datalist}>
        {searcherPersons.map((item) => {
          return <SearchItem {...item} key={item._id} />;
        })}
      </div>
    </section>
  );
};

export default withAuth(Searcher);
