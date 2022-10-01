import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { https } from "../axios";
import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import FooterConsulModal from "./modalContent/FooterConsulModal";
import { Formik } from "formik";
import styles from "../styles/Home.module.css";

const oclock_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 34 34"
    fill="none"
  >
    <g clipPath="url(#clip0_978_75)">
      <path
        d="M17 0C7.61016 0 0 7.61016 0 17C0 26.3898 7.61016 34 17 34C26.3898 34 34 26.3898 34 17C34 7.61016 26.3898 0 17 0ZM17 31.1645C9.17734 31.1645 2.83555 24.8227 2.83555 17C2.83555 9.17734 9.17734 2.83555 17 2.83555C24.8227 2.83555 31.1645 9.17734 31.1645 17C31.1645 24.8227 24.8227 31.1645 17 31.1645ZM18.4145 5.66445H15.5789V17L21.9539 23.375L24.0789 21.25L18.4145 15.5855V5.66445Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_978_75">
        <rect width="34" height="34" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

function Footer() {
  const baseInfo = useSelector((state) => state.intex.market.baseInfo);
  const lang = useSelector((state) => state.intex.market.lang);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createConsul = async () => {
    setIsLoading(true);
    try {
      await https({
        method: "post",
        url: `/api/home/consultation`,
        data: {
          name,
          phoneNumber,
        },
      });

      setResponse(true);
      setName("");
      setPhoneNumber("");
    } catch (e) {
      console.log(e);
      setResponse(false);
    }
    setIsLoading(false);
  };

  const onfocusPhoneNumber = () => {
    if (phoneNumber === "") {
      setPhoneNumber(`+998 `);
    } else {
      setPhoneNumber(phoneNumber);
    }
  };

  const CantrolPhoneNumber = (number) => {
    if (number === "") {
      setPhoneNumber("");
    }

    const num = number.split(" ").join("").split("").pop();
    let success = false;
    let dfdf = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+"];
    for (let i = 0; i < dfdf.length; i++) {
      if (dfdf[i] === num) {
        success = true;
      }
    }
    if (!success) {
      return;
    }

    let arrNumber = number.split(" ").join("").split("");

    if (arrNumber.length < 5) {
      setPhoneNumber(number);
      return;
    }

    let justBaseNumber = [];

    if (arrNumber.slice(0, 4).join("") === "+998") {
      justBaseNumber = arrNumber.slice(4, arrNumber.length);
    } else if (arrNumber.slice(0, 3).join("") === "+99") {
      justBaseNumber = arrNumber.slice(3, arrNumber.length);
    } else if (arrNumber.slice(0, 2).join("") === "+9") {
      justBaseNumber = arrNumber.slice(2, arrNumber.length);
    } else if (arrNumber.slice(0, 1).join("") === "+") {
      justBaseNumber = arrNumber.slice(1, arrNumber.length);
    } else {
      justBaseNumber = arrNumber.slice(0, arrNumber.length);
    }

    let newNumber = `+998 `;

    for (let i = 0; i < justBaseNumber.length; i++) {
      if (i === 2 || i === 5 || i === 7) {
        newNumber += ` ${justBaseNumber[i]}`;
      } else {
        newNumber += `${justBaseNumber[i]}`;
      }
    }

    setPhoneNumber(newNumber);
  };

  useEffect(() => {
    let bodyTag = document.querySelector("body");
    if (response) {
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
  }, [response]);

  return (
    <div className="py-3 bg-green-main">
      <div className="mx-auto flex flex-wrap items-start justify-center lg:justify-between px-5 max-w-1120">
        <div className="flex flex-col items-center w-full sm:w-80 mx-0 min_md:mx-5 min_lg:mx-20 sm:mx-32 md:mx-52 lg:mx-0 mb-10 lg:mb-0">
          <h2 className="leading-7 mb-4 text-xl sm:text-2xl text-center mx-5 font-semibold text-white">
            {lang === "RU"
              ? "Получить бесплатную консультацию"
              : "Bepul konsultatsiya olish"}
          </h2>
          <Formik
            initialValues={{ name: "", phoneNumber: "" }}
            validate={() => {
              const errors = {};
              if (!name) {
                errors.name =
                  lang === "RU" ? "Заполни поле!" : "Maydonni to'ldiring!";
              } else if (name.length < 4) {
                errors.name =
                  lang === "RU"
                    ? "Напиши свое полное имя!"
                    : "To'liq ismingizni yozing!";
              }
              if (!phoneNumber) {
                errors.phoneNumber =
                  lang === "RU" ? "Заполни поле!" : "Maydonni to'ldiring!";
              } else if (phoneNumber.length < 17) {
                errors.phoneNumber =
                  lang === "RU"
                    ? "Напиши свой полный номер!"
                    : "To'liq raqamingizni yozing!";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              createConsul();
              setSubmitting(false);
            }}
          >
            {({
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} className="w-full text-black">
                <div className="relative mb-6">
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      handleChange;
                    }}
                    onBlur={handleBlur}
                    type="text"
                    autoComplete="off"
                    aria-label={lang === "RU" ? "Ваше имя" : "Ismingiz"}
                    name="name"
                    required
                    className={`peer bg-white outline-none rounded-lg w-full h-10 px-3 text-lg xl:text-xl border-x border-b-2 ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                  />
                  <span className="absolute top-2.5 md:top-1 left-3 text-base md:text-xl font-semibold pointer-events-none text-gray-400 peer-focus:text-green-brand peer-valid:text-green-brand duration-150 peer-focus:text-xs peer-valid:text-xs peer-focus:-translate-y-4 md:peer-focus:-translate-y-2.5 peer-valid:-translate-y-4 md:peer-valid:-translate-y-2.5 peer-focus:-translate-x-2 peer-valid:-translate-x-2 bg-white px-1 rounded-sm leading-none">
                    {lang === "RU" ? "Ваше имя" : "Ismingiz"}
                  </span>
                  <span
                    className={`absolute text-xs -translate-y-0.5 md:-translate-y-0.5 left-2 text-red-500 ${
                      errors.name && touched.name ? "block" : "hidden"
                    }`}
                  >
                    {errors.name && touched.name && errors.name}
                  </span>
                </div>
                <div className="relative">
                  <input
                    value={phoneNumber}
                    onChange={(e) => {
                      CantrolPhoneNumber(e.target.value);
                      handleChange;
                    }}
                    onFocus={() => onfocusPhoneNumber()}
                    onBlur={handleBlur}
                    name="phoneNumber"
                    type="text"
                    autoComplete="off"
                    aria-label={lang === "RU" ? "Ваш номер" : "Raqamingiz"}
                    maxLength={17}
                    required
                    className={`peer outline-none bg-white rounded-lg w-full h-10 px-3 text-lg xl:text-xl border-x border-b-2 ${
                      errors.phoneNumber && touched.phoneNumber
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                  />
                  <span className="absolute top-2.5 md:top-1 left-3 text-base md:text-xl font-semibold pointer-events-none text-gray-400 peer-focus:text-green-brand peer-valid:text-green-brand duration-150 peer-focus:text-xs peer-valid:text-xs peer-focus:-translate-y-4 md:peer-focus:-translate-y-2.5 peer-valid:-translate-y-4 md:peer-valid:-translate-y-2.5 peer-focus:-translate-x-2 peer-valid:-translate-x-2 bg-white px-1 rounded-sm leading-none">
                    {lang === "RU" ? "Ваш номер" : "Raqamingiz"}
                  </span>
                  <span
                    className={`absolute text-xs -translate-y-0.5  md:-translate-y-0.5 left-2 text-red-500 ${
                      errors.phoneNumber && touched.phoneNumber
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    {errors.phoneNumber &&
                      touched.phoneNumber &&
                      errors.phoneNumber}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hover:opacity-90 h-9 pt-2 min_sm:pt-1.5 px-5 sm:px-10 font-semibold text-xs min_sm:text-sm hover:cursor-pointer text-center py-1 flex mt-8 mx-auto bg-yellow-btn rounded-oformit shadow-dropShadow"
                >
                  {isLoading ? (
                    <div className={styles.loadingiospinnerellipsiszon7txr7fkp}>
                      <div className={styles.ldiopn062kit6cr}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {" "}
                      {lang === "RU"
                        ? "Хочу проконсультироваться"
                        : "Konsultatsiya olish"}{" "}
                    </>
                  )}
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div className="w-1/2 md:w-64 text-white text-xl">
          <span className="flex items-center font-semibold text-base sm:text-xl text-white">
            <span className="mr-3">{oclock_icon}</span>{" "}
            <span>{lang === "RU" ? "Рабочее время" : "Ish vaqti"}</span>
          </span>
          <span className="font-semibold text-xs sm:text-xl leading-3">
            {baseInfo[`work_time_${lang.toLowerCase()}`]}
          </span>
          <div className="sm:mt-3">
            <a
              href={`tel:${baseInfo.phone_number}`}
              className="inline-block w-10 min_lg:w-14 h-10 min_lg:h-14 mr-1 hover:scale-125 duration-200"
            >
              <Image
                className="hover:cursor-pointer"
                src="/phone.png"
                alt="phone"
                width={60}
                height={60}
                layout={"responsive"}
                objectFit={"continue"}
              />
            </a>
            <a
              href={baseInfo.telegram_link}
              className="inline-block w-10 min_lg:w-14 h-10 min_lg:h-14 mt-1.5 mr-1 hover:scale-125 duration-200"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="hover:cursor-pointer"
                alt="telegram"
                src="/telegram.png"
                width={60}
                height={60}
                layout={"responsive"}
                objectFit={"continue"}
              />
            </a>
            <a
              href={baseInfo.instagram_link}
              className="inline-block w-10 min_lg:w-14 h-10 min_lg:h-14 mt-1.5 hover:scale-125 duration-200"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="hover:cursor-pointer"
                alt="instagram"
                src="/instagram.png"
                width={60}
                height={60}
                layout={"responsive"}
                objectFit={"continue"}
              />
            </a>
          </div>
        </div>
        <div className="w-1/2 lg:w-64 ml-0 md:ml-20 lg:ml-0 pl-3 text-xs sm:text-xl text-white font-semibold">
          <div>Intex-market.uz</div>
          <Link
            href={`tel:${baseInfo.phone_number}`}
            className="hover:cursor-pointer"
          >
            <a className="inline-block text-white text-md font-semibold mb-3">
              {baseInfo.phone_number}
            </a>
          </Link>
          <div>{baseInfo[`address_${lang.toLowerCase()}`]}</div>
          <div className="font-semibold sm:text-sm mt-5">
            Разработано в Support Solutions. Все права защищены.
          </div>
        </div>
      </div>
      <AnimatePresence>
        {response !== "" ? (
          <Modal setModal={setResponse}>
            <FooterConsulModal response={response} />
          </Modal>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default Footer;
