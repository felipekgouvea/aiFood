import Image from "next/image";
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
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas."
          width={0}
          height={0}
          sizes="100vh"
          quality={100}
          className="h-auto w-full object-contain"
        />
      </div>
    </>
  );
};

export default Home;
