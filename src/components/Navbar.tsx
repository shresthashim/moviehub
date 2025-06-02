import NavbarItem from "@/components/NavbarItem";

const Navbar = () => {
  return (
    <div className='overflow-x-auto whitespace-nowrap scrollbar-hide dark:bg-gray-600 bg-amber-100 p-3 sm:justify-center flex space-x-3 sm:space-x-6'>
      <NavbarItem title='Trending' param='fetchTrending' />
      <NavbarItem title='Top Rated' param='fetchTopRated' />
      <NavbarItem title='Popular' param='fetchPopular' />
      <NavbarItem title='Now Playing' param='fetchNowPlaying' />
    </div>
  );
};

export default Navbar;
