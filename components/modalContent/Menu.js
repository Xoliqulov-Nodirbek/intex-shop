import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

const phone_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
  >
    <path
      d="M23.9671 18.5029L21.4709 16.0068C21.0191 15.5553 20.4533 15.2348 19.8337 15.0797C19.2141 14.9245 18.564 14.9404 17.9528 15.1257C17.3415 15.3109 16.792 15.6587 16.3629 16.1317C15.9337 16.6048 15.641 17.1854 15.516 17.8118C11.3997 17.0421 7.39619 13.0551 7.147 9.49156C7.84679 9.36283 8.49082 9.02414 8.99345 8.52052C9.65523 7.85867 10.027 6.96105 10.027 6.0251C10.027 5.08915 9.65523 4.19154 8.99345 3.52968L6.49796 1.03354C5.83608 0.371772 4.93844 0 4.00247 0C3.0665 0 2.16886 0.371772 1.50698 1.03354C-5.98019 8.52052 16.4799 30.98 23.9671 23.4931C24.6285 22.8311 25 21.9337 25 20.998C25 20.0623 24.6285 19.1648 23.9671 18.5029Z"
      fill="white"
    />
  </svg>
);
const telegram_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="27"
    height="25"
    viewBox="0 0 27 25"
    fill="none"
  >
    <path
      d="M26.7418 3.13253C26.7418 3.13247 26.7417 3.13246 26.7417 3.13252L22.6946 23.2932C22.3891 24.7159 21.5931 25.0701 20.4618 24.4002L17.6422 22.2055C15.734 20.7201 13.0157 20.8998 11.3197 22.6234C10.7814 23.192 10.1244 22.5995 10.1767 21.8183L10.4053 18.3978C10.4814 17.2596 10.9814 16.1912 11.8066 15.4035L21.9523 5.71934C22.4494 5.25186 21.844 4.99181 21.1802 5.4603L11.106 12.1614C8.54653 13.8638 5.34629 14.2946 2.42779 13.3294L0.968658 12.8468C-0.354193 12.4107 -0.378141 11.4495 1.24453 10.7786L25.0357 1.09617C26.1372 0.660102 27.1008 1.35507 26.7419 3.13253C26.7418 3.13259 26.7418 3.13259 26.7418 3.13253Z"
      fill="#009398"
    />
  </svg>
);
const instagram_icon = (
  <Image
    src={"/insta_icon.png"}
    alt=""
    width={1}
    height={1}
    layout="responsive"
    objectFit="contain"
  />
);

function Menu({ setIsMenuOpen }) {
  const baseInfo = useSelector((state) => state.intex.market.baseInfo);
  const categories = useSelector((state) => state.intex.market.categories);
  const lang = useSelector((state) => state.intex.market.lang);

  return (
    <div className="flex flex-col h-full justify-between pb-4 min_sm:pb-12">
      <div className="text-2xl font-semibold text-white text-center mt-5">
        INTEX-SHOP.UZ
      </div>
      <div className="px-6 flex flex-col justify-center h-60">
        {categories.map((category) => {
          return (
            <span
              onClick={() => setIsMenuOpen(false)}
              key={category.id}
              className="bg-white w-full rounded-xl text-center text-lg font-bold mb-4 min_sm:mb-7 drop-shadow-lg text-green-main "
            >
              <a
                className="whitespace-nowrap inline-block w-full h-full py-2 min_sm:py-3.5"
                href={`#${category.name_uz}`}
              >
                {category[`name_${lang.toLowerCase()}`]}
              </a>
            </span>
          );
        })}
      </div>
      <div className="px-6">
        <div className="w-full shadow-xl rounded-xl text-center text-xl text-white font-bold mb-4 min_sm:mb-7 bg-green-recommend">
          <a
            href={`tel:${baseInfo.phone_number}`}
            className="flex items-center py-1.5 min_sm:py-3.5 pl-10"
          >
            <span className="mr-4">{phone_icon}</span>
            <span className="mb-1">
              {lang === "RU" ? "Позвонить" : "Qo'ng'iroq"}
            </span>
          </a>
        </div>
        <div className="bg-white shadow-xl w-full rounded-xl text-center text-xl font-bold mb-4 min_sm:mb-7 text-green-main ">
          <a
            href={baseInfo.telegram_link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center py-1.5 min_sm:py-3.5 pl-10"
          >
            <span className="mr-4">{telegram_icon}</span>
            <span className="mb-1">
              {lang === "RU" ? "Телеграм" : "Telegram"}
            </span>
          </a>
        </div>
        <div className="bg-white shadow-xl w-full rounded-xl text-center text-xl text-green-main font-bold">
          <a
            href={baseInfo.instagram_link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center py-0.5 min_sm:py-2 pl-9"
          >
            <span className="mr-2.5 w-10 h-10">{instagram_icon}</span>
            <span className="mb-1">
              {lang === "RU" ? "Инстаграм" : "Instagram"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Menu;
