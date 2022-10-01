import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  changeLang,
  saveCategories,
  saveBaseInfo,
} from "../store/siteDataReducer";
import { AnimatePresence } from "framer-motion";
import Menu from "./modalContent/Menu";
import MenuModal from "./MenuMadal";
import axios from "axios";
import Link from "next/link";

const menu_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 22 18"
    fill="none"
  >
    <rect width="22" height="2" rx="1" fill="white" />
    <rect y="16" width="22" height="2" rx="1" fill="white" />
    <rect y="8" width="22" height="2" rx="1" fill="white" />
  </svg>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = useSelector((state) => state.intex.market.lang);
  const categories = useSelector((state) => state.intex.market.categories);
  const baseInfo = useSelector((state) => state.intex.market.baseInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    let bodyTag = document.querySelector("body");
    if (isMenuOpen) {
      bodyTag.classList.add("overflow-y-hidden");
      bodyTag.classList.add("h-screen");
      bodyTag.classList.add("p-0");
      bodyTag.classList.add("m-0");
    } else {
      bodyTag.classList.remove("overflow-y-hidden");
      bodyTag.classList.remove("h-screen");
      bodyTag.classList.remove("p-0");
      bodyTag.classList.remove("m-0");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    async function getCategory() {
      try {
        const { data } = await axios({
          method: "GET",
          url: "https://market-index.herokuapp.com/api/home/category",
        });
        dispatch(saveCategories(data.data));
      } catch (e) {
        // return e
        console.log(e);
      }
    }

    async function getBaseInfo() {
      try {
        const { data } = await axios({
          method: "GET",
          url: "https://market-index.herokuapp.com/api/home/site",
        });
        dispatch(saveBaseInfo(data.data[0]));
      } catch (e) {
        console.log(e);
      }
    }

    getCategory();
    getBaseInfo();
  }, [dispatch]);

  // let prevScrollpos = window.pageYOffset;
  // window.onscroll = function() {
  //   let currentScrollPos = window.pageYOffset;

  //   if ((prevScrollpos < currentScrollPos) && (currentScrollPos > 80)) {
  //     document.getElementById("navbar").style.top = "-80px";
  //   } else {
  //     document.getElementById("navbar").style.top = "0";
  //   }

  //   prevScrollpos = currentScrollPos;
  // }

  return (
    <>
      <div
        id="navbar"
        className="h-12 min_md:h-16 min_lg:h-20 w-screen px-2 min_md:px-4 duration-500 min_lg:px-5 sm:px-10 xl:px-16 flex justify-between items-center fixed z-10 shadow-dropShadow bg-green-main"
      >
        <div className="text-lg min_md:text-xl font-bold text-white whitespace-nowrap sm:text-2xl drop-shadow-textShadow">
          <Link href="/">
            <a>INTEX-SHOP.UZ</a>
          </Link>
        </div>
        <div
          className={`${styles.categoryScroll} hidden xl:flex overflow-x-auto items-center text-xl text-white`}
        >
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className={`${styles.category} py-1 px-4 rounded-md hover:cursor-pointer font-semibold`}
              >
                <a className="whitespace-nowrap" href={`#${category.name_uz}`}>
                  {category[`name_${lang.toLowerCase()}`]}
                </a>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end items-center sm:ml-7">
          <span className="hover:cursor-pointer hidden xl:inline-block">
            <Link href={`tel:${baseInfo.phone_number}`}>
              <a className="text-white text-md font-semibold">
                {baseInfo.phone_number}
              </a>
            </Link>
          </span>
          <div className="flex items-center ml-5 justify-between hover:cursor-pointer">
            <span className="w-6 h-6 inline-block xl:hidden sm:w-8 sm:h-8 shadow-xl rounded-xl">
              <a
                href={`tel:${baseInfo.phone_number}`}
                className="inline-block w-full hover:scale-110 h-full duration-200"
                rel="noreferrer"
              >
                <Image
                  className="hover:cursor-pointer"
                  alt="telegram"
                  src="/phone_icon.png"
                  width={30}
                  height={30}
                  priority={true}
                  layout="responsive"
                  objectFit="contain"
                />
              </a>
            </span>

            <span className="w-6 h-6 ml-1.5 min_lg:ml-3 sm:w-8 sm:h-8 shadow-xl rounded-xl hover:scale-110 duration-200">
              <a
                href={baseInfo.telegram_link}
                className="w-full h-full inline-block"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  className="hover:cursor-pointer"
                  alt="telegram"
                  src="/telegramicon.png"
                  width={30}
                  height={30}
                  layout="responsive"
                  objectFit="cover"
                  priority={true}
                />
              </a>
            </span>

            <span className="hidden sm:inline-block w-6 h-6 ml-2.5 sm:w-8 sm:h-8 shadow-xl rounded-xl duration-200 hover:scale-110">
              <a
                href={baseInfo.instagram_link}
                className="inline-block w-full h-full"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  className="hover:cursor-pointer"
                  alt="telegram"
                  src="/instagramicon.png"
                  width={30}
                  height={30}
                  layout="responsive"
                  objectFit="cover"
                  priority={true}
                />
              </a>
            </span>
            <div
              onClick={() => dispatch(changeLang(lang === "UZ" ? "RU" : "UZ"))}
              className="shadow-xl rounded bg-white hover:cursor-pointer text-center text-sm sm:text-lg ml-1.5 min_lg:ml-3 pt-0.5 font-bold w-6 h-6 sm:w-8 hover:scale-110 duration-200 sm:h-8 text-green-main"
            >
              {lang === "UZ" ? "RU" : "UZ"}
            </div>

            <div
              onClick={() => setIsMenuOpen(true)}
              className="ml-4 min_lg:ml-5 sm:mr-5 hover:cursor-pointer xl:hidden w-6 h-6 sm:w-8 sm:h-8"
            >
              {menu_icon}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto pt-12 min_md:pt-16 min_lg:pt-20 ">
        <Image
          layout="responsive"
          height={2}
          width={4}
          objectFit="cover"
          src="/fon_img.jpg"
          alt="Bu yerda rasm bor edi!"
          priority={true}
        />
      </div>
      <AnimatePresence>
        {isMenuOpen ? (
          <MenuModal setModal={setIsMenuOpen}>
            <Menu setIsMenuOpen={setIsMenuOpen} />
          </MenuModal>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Header;
