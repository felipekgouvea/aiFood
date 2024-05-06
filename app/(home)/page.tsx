import CategoryList from "../_components/category/category-list";
import Header from "../_components/header/page";
import Search from "../_components/search/page";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-6 px-5 py-6">
        <Header />
        <Search />
        <CategoryList />
      </div>
    </>
  );
};

export default Home;
