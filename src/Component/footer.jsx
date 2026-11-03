
import { Link } from "react-router-dom";

export const Footer = () => {
  const footerSections = [
{
  title: "MakeupMuse",
  links: [
    { name: "Beauty Begins With You", path: "#" },
    { name: "Express Your True Colors", path: "#" },
    { name: "Your Beauty, Your Rules", path: "#" },
    { name: "Unleash Your Inner Glow", path: "#" },
  ],
},
    {
      title: "CATEGORIES",
      links: [
        { name: "Lips", path: "/products/lipstick" },
        { name: "Eyes", path: "/products/kajal" },
        { name: "Face", path: "/products/foundation" },
        { name: "Nails", path: "/products/nail-polish" },
        { name: "Skin", path: "/products/cleanser" },
        { name: "Gifting", path: "/products/combo" },
      ],
    },
    {
      title: "QUICK LINKS",
      links: [
       
        { name: "Offers", path: "/products/all-offers" },
        { name: "Under ₹249", path: "/products/all-products" },
        { name: "My Cart", path: "/cart" },
        { name: "Login",path:"/login"}
        
      ],
    },
  ];

  return (
    <footer className="bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8  text-center">
          <div>
            <Link to="/">
            <h2 className="text-3xl font-extrabold tracking-wider">
              MakeupMuse
            </h2>
            </Link>

            <p className="text-sm text-gray-400 mt-2 leading-6">
              Bold makeup. Unapologetic beauty.
            </p>

            <h3 className="text-xs font-semibold tracking-widest mt-5 mb-3">
              FOLLOW US
            </h3>
            <div className="flex items-center justify-center gap-4 text-center">
  <a
    href="https://www.instagram.com/trysugar/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="flex h-8 w-8 items-center justify-center text-xl transition hover:text-gray-400"
  >
    ◎
  </a>

  <a
    href="https://www.facebook.com/trySUGAR/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="flex h-8 w-8 items-center justify-center text-lg font-bold transition hover:text-gray-400"
  >
    f
  </a>

  <a
    href="https://www.youtube.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="flex h-8 w-8 items-center justify-center text-lg transition hover:text-gray-400"
  >
    ▶
  </a>

  <a
    href="https://x.com/trysugar"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="X"
    className="flex h-8 w-8 items-center justify-center text-lg font-bold transition hover:text-gray-400"
  >
    𝕏
  </a>
</div>
          </div>

      
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-l font-bold tracking-widest text-center mb-4">
                {section.title}
              </h3>

              <ul className="space-y-2 text-center">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-base text-gray-400  hover:text-white transition "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-5 text-center">
          <p className="text-xs text-gray-500">
            © 2026 MakeupMuse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};