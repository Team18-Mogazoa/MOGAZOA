'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Searchbar from './Searchbar';
import Link from 'next/link';
import Sidemenu from '@/Components/HomeComponents/Sidemenu';

function ClientNavigationBar() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchClicked(!isSearchClicked);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const { target } = event;
      if (!target.closest('.search')) {
        setIsSearchClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="flex items-center justify-between w-full h-[70px] bg-bgblack px-[20px] min-w-[375px] md:hidden">
        <Image
          src="/icons/menu-icon.svg"
          onClick={handleMenuClick}
          className="cursor-pointer"
          alt="메뉴이미지"
          width={24}
          height={24}
        />
        {!isSearchClicked && (
          <>
            <Link href="/">
              <Image src="/icons/large-logo-icon.svg" alt="로고이미지" width={112} height={16} />
            </Link>
            <Image
              src="/icons/search-icon.svg"
              alt="검색이미지"
              width={24}
              height={24}
              onClick={handleSearchClick}
              className="cursor-pointer"
            />
          </>
        )}
        {isSearchClicked && <Searchbar />}
      </nav>
      {isMenuOpen && <Sidemenu isMenuClick={isMenuOpen} onSelectCategory={(category) => console.log(category)} />}
    </div>
  );
}

export default ClientNavigationBar;
