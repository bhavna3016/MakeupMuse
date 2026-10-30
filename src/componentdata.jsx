import { Announcement } from "./Component/announcement";
import { Home } from "./Screen/home";
import { Product } from "./Screen/Products";
import { Routes, Route } from "react-router-dom";
import { bannerData } from "./Screen/CategoryData/bannerdata";
import { Cart } from "./Screen/cart";
import { Signup } from "./Screen/LoginSignup/signup2";
import { Login } from "./Screen/LoginSignup/login2";
import { GlobalSearch } from "./Screen/GobalSearch/globalsearch";
import { Checkout } from "./Screen/checkout";
import { useAuth } from "./Component/authContext";
import { Navigate, useLocation } from "react-router-dom";
import { cleanserData,moisturizerData,sunscreenData,} from "./Screen/CategoryData/skin";
import { offersData, under249Data,} from "./Screen/CategoryData/offerAnd249";
import {  makeupKitData, comboData,} from "./Screen/CategoryData/gift";
import {blushData,concealerData,foundationData,} from "./Screen/CategoryData/face";
import { nailPolishData } from "./Screen/CategoryData/naildata";
import {lipstickData,lipLinerData,} from "./Screen/CategoryData/lipData";
import { eyelinerData,eyeshadowData,mascaraData,kajalData,} from "./Screen/CategoryData/eyedata";

export const Components=()=>{

  const ProtectedCheckout = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Checkout />;
};

  return (
    <>

      <Announcement />   
      <Routes>
      <Route path="/search" element={<GlobalSearch />} />

        <Route
          path="/checkout" element={<ProtectedCheckout />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
       
        <Route path="/" element={<Home />} />
        <Route
          path="/products/lipstick"
          element={
            <Product
              title="LIPSTICKS"
              products={lipstickData}
              banner={bannerData.Lipstick?.image}
            />
          }
        />


        <Route
          path="/products/lip-liner"
          element={
            <Product
              title="LIP LINERS"
              products={lipLinerData}
              banner={bannerData.LipLiner?.image}
            />
          }
        />

        <Route
          path="/products/kajal"
          element={
            <Product
              title="KAJAL"
              products={kajalData}
              banner={bannerData.Kajal?.image}
            />
          }
        />

        <Route
          path="/products/eyeliner"
          element={
            <Product
              title="EYELINERS"
              products={eyelinerData}
              banner={bannerData.Eyeliner?.image}
            />
          }
        />

        <Route
          path="products/mascara"
          element={
            <Product
              title="MASCARA"
              products={mascaraData}
              banner={bannerData.Mascara?.image}
            />
          }
        />

        <Route
          path="products/eyeshadow"
          element={
            <Product
              title="EYESHADOW"
              products={eyeshadowData}
              banner={bannerData.Eyeshadow?.image}
            />
          }
        />

    
        <Route
          path="products/foundation"
          element={
            <Product
              title="FOUNDATION"
              products={foundationData}
              banner={bannerData.Foundation?.image}
            />
          }
        />

        <Route
          path="products/concealer"
          element={
            <Product
              title="CONCEALER"
              products={concealerData}
              banner={bannerData.Concealer?.image}
            />
          }
        />

        <Route
          path="products/blush"
          element={
            <Product
              title="BLUSH"
              products={blushData}
              banner={bannerData.Blush?.image}
            />
          }
        />

        <Route
          path="products/Nail-polish"
          element={
            <Product
              title="NAIL POLISH"
              products={nailPolishData}
              banner={bannerData.NailPolish?.image}
            />
          }
        />

        <Route
          path="products/cleanser"
          element={
            <Product
              title="CLEANSERS"
              products={cleanserData}
              banner={bannerData.Cleanser?.image}
            />
          }
        />

        <Route
          path="products/moisturizer"
          element={
            <Product
              title="MOISTURIZERS"
              products={moisturizerData}
              banner={bannerData.Moisturizer?.image}
            />
          }
        />

        <Route
          path="products/sunscreen"
          element={
            <Product
              title="SUNSCREEN"
              products={sunscreenData}
              banner={bannerData.Sunscreen?.image}
            />
          }
        />

        <Route
          path="products/combo"
          element={
            <Product
              title="BEAUTY COMBOS"
              products={comboData}
              banner={bannerData.Combo?.image}
            />
          }
        />

        <Route
          path="products/Makeup-kit"
          element={
            <Product
              title="MAKEUP KITS"
              products={makeupKitData}
              banner={bannerData.MakeupKit?.image}
            />
          }
        />

        <Route
          path="products/All-products"
          element={
            <Product
              title="BEAUTY UNDER ₹249"
              products={under249Data}
              banner={bannerData.UNDER249STORE?.image}
            />
          }
        />
        <Route
          path="products/All-offers"
          element={
            <Product
              title="SPECIAL OFFERS"
              products={offersData}
              banner={bannerData.OFFERS?.image}
            />
          }
        />

        <Route path="/cart" element={<Cart />} />
      </Routes>
      
    </>
  );
}


