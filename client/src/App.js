import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LayoutSecondary from "./LayoutSecondary";
import LayoutMain from "./LayoutMain";
import Profile from "./components/Profile/Profile";
import Searcher from "./components/SearchCalendar/Searcher/Searcher";
import PersonCalendar from "./components/SearchCalendar/PersonCalendar/PersonCalendar";
import AuthorizationForm from "./components/Authorization/AuthorizationForm";
import Blog from "./components/Blog/Blog";
import BlogPost from "./components/Blog/BlogPost/BlogPost";
import About from "./components/About/About";
import Statistic from "./components/Statistic/Statistic";
import Settings from "./components/Settings/Settings";
import AddPost from "./components/Blog/AddPost/AddPost";
import RecipesBook from "./components/Recipes/RecipesBook/RecipesBook";
import AddRecipeForm from "./components/Recipes/AddRecipeForm/AddRecipeForm";
import OneRecipe from "./components/Recipes/OneRecipe/OneRecipe";
import UpdateRecipeForm from "./components/Recipes/UdpateRecipeForm/UpdateRecipeForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<Navigate to="/blog" />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:path" element={<BlogPost />} />
          <Route path="blog/add" element={<AddPost />} />
          <Route path="about" element={<About />} />
          <Route path="user" element={<LayoutSecondary />}>
            <Route index element={<Profile />} />
            <Route path=":id" element={<Profile />} />
            <Route path="statistic" element={<Statistic />} />
            <Route path="recipes" element={<RecipesBook />} />
            <Route path="recipes/add" element={<AddRecipeForm />} />
            <Route path="recipes/:id" element={<OneRecipe />} />
            <Route path="recipes/:id/edit" element={<UpdateRecipeForm />} />
            <Route path="calendar" element={<Searcher />} />
            <Route path="calendar/:person_id" element={<PersonCalendar />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="login" element={<AuthorizationForm />} />
      </Routes>
    </>
  );
}

export default App;
