import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./cartContext";
import { useAuth } from "./authContext";

import {
  Search,
  ShoppingBag,
  UserRound,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const categories = [
  { name: "LIPS", items: ["Lipstick", "Lip-Liner"] },
  { name: "EYES", items: ["Kajal", "Eyeliner", "Mascara", "Eyeshadow"] },
  { name: "FACE", items: ["Foundation", "Concealer", "Blush"] },
  { name: "NAILS", items: ["Nail-Polish"] },
  { name: "SKIN", items: ["Cleanser", "Moisturizer", "Sunscreen"] },
  { name: "GIFTING", items: ["Combo", "Makeup-Kit"] },
  { name: "UNDER 249 STORE", items: ["All-Products"] },
  { name: "OFFERS", items: ["All-Offers"] },
];

export const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState(null);

  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const activeMenu = categories.find(
    (category) => category.name === activeCategory
  );

  const handleUserClick = () => {
    if (!user) {
      setShowUserMenu(false);
      navigate("/login");
    } else {
      setShowUserMenu((previous) => !previous);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileCategory(null);
  };

  const getCategoryPath = (item) =>
    `/products/${item.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <header className="relative z-50 w-full bg-white text-black">
      <div className="border-b border-gray-200">
        <div className="mx-auto flex min-h-[72px] max-w-[1800px] items-center justify-between gap-2 px-3 sm:min-h-[84px] sm:gap-4 sm:px-6 lg:min-h-[98px] lg:px-14">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex min-w-0 shrink items-center gap-2"
            aria-label="MakeupMuse home"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-2xl font-bold text-white sm:h-11 sm:w-11 sm:text-3xl">
              M
            </span>

            <span className="truncate text-base font-semibold tracking-[1px] sm:text-xl sm:tracking-[2px] md:text-2xl lg:text-[27px] lg:tracking-[3px]">
              MakeupMuse
            </span>
          </Link>

          <nav
            className="hidden h-[98px] flex-1 items-center justify-center gap-3 xl:flex 2xl:gap-6"
            onMouseLeave={() => setActiveCategory(null)}
          >
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onMouseEnter={() => setActiveCategory(category.name)}
                onClick={() =>
                  setActiveCategory((current) =>
                    current === category.name ? null : category.name
                  )
                }
                className={`h-full whitespace-nowrap border-b-2 text-sm font-semibold tracking-wider transition-colors 2xl:text-base 2xl:tracking-[2px] ${
                  activeCategory === category.name
                    ? "border-black text-black"
                    : "border-transparent text-black hover:text-gray-500"
                }`}
                aria-expanded={activeCategory === category.name}
              >
                {category.name}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
           <Link
  to="/search"
  aria-label="Search products"
  className="transition-colors hover:text-gray-500"
>
  <Search size={27} strokeWidth={1.6} />
</Link>

            <div className="relative">
              <button
                type="button"
                onClick={handleUserClick}
                aria-label={user ? "Account menu" : "Login"}
                aria-expanded={showUserMenu}
                className="flex items-center gap-2 transition-colors hover:text-gray-500"
              >
                <UserRound
                  size={22}
                  strokeWidth={1.6}
                  className="sm:h-6 sm:w-6"
                />

                {user && (
                  <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
                    {user.name}
                  </span>
                )}
              </button>

              {user && showUserMenu && (
                <div className="absolute right-0 top-full z-[70] mt-3 w-48 border border-gray-200 bg-white py-2 shadow-lg sm:w-52">
                  <div className="truncate border-b border-gray-100 px-4 py-3 text-sm text-gray-600">
                    {user.name}
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-gray-100"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                  <div className="truncate border-t border-gray-100 px-4 py-3 text-xs text-gray-500">
                  {user.email}
                </div>

                </div>
              )}
            </div>

            <Link
              to="/cart"
              aria-label={`Shopping bag, ${cartCount} items`}
              className="relative transition-colors hover:text-gray-500"
            >
              <ShoppingBag
                size={23}
                strokeWidth={1.6}
                className="sm:h-7 sm:w-7"
              />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => {
                setMobileMenuOpen((previous) => !previous);
                setMobileCategory(null);
                setActiveCategory(null);
              }}
              className="flex items-center justify-center xl:hidden"
            >
              {mobileMenuOpen ? (
                <X size={25} strokeWidth={1.7} />
              ) : (
                <Menu size={25} strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>
      </div>

      {activeMenu && (
        <div
          className="absolute left-0 top-full hidden w-full border-b border-gray-200 bg-white shadow-lg xl:block"
          onMouseEnter={() => setActiveCategory(activeMenu.name)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <div className="mx-auto max-w-7xl px-10 py-8">
            <h3 className="mb-6 text-sm font-bold tracking-wider">
              SHOP {activeMenu.name}
            </h3>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
              {activeMenu.items.map((item) => (
                <Link
                  key={item}
                  to={getCategoryPath(item)}
                  onClick={() => setActiveCategory(null)}
                  className="text-sm text-gray-600 transition-colors hover:text-black"
                >
                  {item.replaceAll("-", " ")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="absolute left-0 top-full z-[60] max-h-[calc(100dvh-72px)] w-full overflow-y-auto border-b border-gray-200 bg-white shadow-lg xl:hidden">
          <div className="border-b border-gray-100 px-4 py-3 sm:px-6">
            {user ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <UserRound size={20} />
                  <span className="truncate text-sm font-medium">
                    {user.name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex shrink-0 items-center gap-2 text-sm text-gray-600 hover:text-black"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  navigate("/login");
                }}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <UserRound size={19} />
                Login / Sign Up
              </button>
            )}
          </div>

          <nav className="py-2">
            {categories.map((category) => (
              <div key={category.name} className="border-b border-gray-100">
                <button
                  type="button"
                  onClick={() =>
                    setMobileCategory((current) =>
                      current === category.name ? null : category.name
                    )
                  }
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold tracking-wider sm:px-6"
                  aria-expanded={mobileCategory === category.name}
                >
                  <span>{category.name}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform ${
                      mobileCategory === category.name ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileCategory === category.name && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-gray-50 px-5 py-3 sm:px-7">
                    {category.items.map((item) => (
                      <Link
                        key={item}
                        to={getCategoryPath(item)}
                        onClick={closeMobileMenu}
                        className="py-2 text-sm text-gray-600 hover:text-black"
                      >
                        {item.replaceAll("-", " ")}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};