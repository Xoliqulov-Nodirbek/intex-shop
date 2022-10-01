import { https } from '../../axios'
import React, { useState } from 'react'
import Image from 'next/image'
import {useSelector} from "react-redux"
import { Formik } from 'formik';
import styles from "../../styles/Home.module.css"

function Consultation() {
    const lang = useSelector(state => state.intex.market.lang)
    const [response, setResponse] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const createConsul = async () => {
        setIsLoading(true)
        try{
            await https({
                method: 'post',
                url: `/api/home/consultation`,
                data: {
                    name,
                    phoneNumber,
                }
            })
            setResponse(true)
        } catch(e){
            console.log(e)
            setResponse(false)
          }
        setIsLoading(false)
    }

    const onfocusPhoneNumber = () => {
        if (phoneNumber === "") {
          setPhoneNumber(`+998 `);
        } else {
          setPhoneNumber(phoneNumber);
        }
    };

    const CantrolPhoneNumber = (number) => {
        if(number === ""){
            setPhoneNumber("")
        }

        const num = number.split(" ").join("").split("").pop()
        let success = false
        let dfdf = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+"]
        for (let i = 0; i < dfdf.length; i++){
            if(dfdf[i] === num) {
                success = true
            }
        }
        if(!success){
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

        setPhoneNumber(newNumber)
    }

  return (
    <div className='flex flex-col items-center relative text-black w-72 min_md:w-consul max-h-screen overflow-y-auto md:w-modalWidth px-10 md:px-8 py-12 md:py-16'> 
        {
            response === true ? <>
                <div className='flex flex-col items-center w-full'>
                    <div className="w-28 h-28 xl:w-60 xl:h-60 mb-10">
                        <Image 
                            src="/true_icon.png"
                            alt=""
                            objectFit="contain"
                            layout="responsive"                    
                            width={1}
                            height={1}
                        />
                    </div>
                    
                    <div className='text-4xl xl:text-6xl font-bold mb-6'>{lang === "RU" ? "Спасибо!" : "Rahmat!"}</div>
                    <div className='text-lg text-center xl:text-2xl'>{lang === "RU" ? "Ваш заказ успешно оформлен. Мь свяжемся с вами в ближайшее время." : "Buyurtmangiz muvaffaqiyatli joylashtirildi. Tez orada siz bilan bog'lanamiz."}</div>
                </div>
            </> :
            response === false ? <>
                Error
            </> : 
            <>
                <div 
                    className='w-20 md:w-28 h-24 md:h-32'
                >   
                    <Image
                        src={"/dispetcher.png"}
                        alt=''
                        width={12}
                        height={13}
                        layout="responsive"
                        objectFit="contain"
                    />
                </div>
                <div className='text-xl md:text-3xl text-center font-semibold mb-5  md:mb-7'>{lang === "RU" ? "Получить консультацию" : "Maslahat olish"}</div>
                <div className='w-full flex flex-col'>
                <Formik
                    initialValues={{ name: '', phoneNumber: ''}}
                    validate={() => {
                      const errors = {};
                      if (!name) {
                          errors.name = lang === "RU" ? "Заполни поле!" : "Maydonni to'ldiring!";
                      } else if (name.length < 4) {
                        errors.name = lang === "RU" ? "Напиши свое полное имя!" : "To'liq ismingizni yozing!";
                      }
                      if (!phoneNumber) {
                          errors.phoneNumber = lang === "RU" ? "Заполни поле!" : "Maydonni to'ldiring!";
                      } else if (phoneNumber.length < 17) {
                        errors.phoneNumber = lang === "RU" ? "Напиши свой полный номер!" : "To'liq raqamingizni yozing!";
                      }

                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        createConsul()
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
                        <form onSubmit={handleSubmit}>
                        <div className="relative">
                            <input  
                                value={name}
                                onChange={(e) => {setName(e.target.value); handleChange}}
                                onBlur={handleBlur}
                                type="text"
                                name="name"
                                autoComplete="off"
                                aria-label={lang === "RU" ? "Ваше имя":"Ismingiz"}
                                required
                                className={`peer bg-white outline-none drop-shadow-lg rounded-2xl w-full h-11 md:h-14 p-5 text-xl md:text-2xl mb-3 md:mb-5 border-x border-b-2 ${errors.name && touched.name ? "border-red-500" : "border-transparent"}`} 
                                style={{"boxShadow": "0px 0px 14px 0px rgba(0, 0, 0, 0.05)"}}/>
                            <span className='absolute top-2 md:top-2.5 left-6 text-base md:text-2xl font-bold pointer-events-none text-gray-400 peer-focus:text-green-brand peer-valid:text-green-brand duration-150 peer-focus:text-xs md:peer-focus:text-base peer-valid:text-xs md:peer-valid:text-base peer-focus:-translate-y-4 md:peer-focus:-translate-y-6 peer-valid:-translate-y-4 md:peer-valid:-translate-y-6 peer-focus:-translate-x-3 peer-valid:-translate-x-3'>{lang === "RU" ? "Ваше имя":"Ismingiz"}</span>
                            <span className={`absolute text-xs md:text-base -translate-y-3.5 md:-translate-y-6 left-2 text-red-500 ${errors.name && touched.name  ? "block" : "hidden"}`}>{errors.name && touched.name && errors.name}</span>
                        </div>
                        <div className="relative mt-3 w-full">
                            <input 
                                value={phoneNumber}
                                onChange={(e) => {CantrolPhoneNumber(e.target.value); handleChange}}
                                onFocus={() => onfocusPhoneNumber()}
                                onBlur={handleBlur}
                                aria-label={lang === "RU" ? "Ваш номер":"Raqamingiz"}
                                name="phoneNumber"
                                type="text"
                                autoComplete="off"
                                maxLength={17}
                                required
                                className={`peer bg-white outline-none drop-shadow-lg rounded-2xl w-full h-11 md:h-14 p-5 text-xl md:text-2xl border-x border-b-2 ${errors.phoneNumber && touched.phoneNumber ? "border-red-500" : "border-transparent"}`} 
                                style={{"boxShadow": "0px 0px 14px 0px rgba(0, 0, 0, 0.05)"}}/>
                            <span className='absolute top-2 md:top-2.5 left-6 text-base md:text-2xl font-bold pointer-events-none text-gray-400 peer-focus:text-green-brand peer-valid:text-green-brand duration-150 peer-focus:text-xs md:peer-focus:text-base peer-valid:text-xs md:peer-valid:text-base peer-focus:-translate-y-4 md:peer-focus:-translate-y-6 peer-valid:-translate-y-4 md:peer-valid:-translate-y-6 peer-focus:-translate-x-3 peer-valid:-translate-x-3'>{lang === "RU" ? "Ваш номер":"Raqamingiz"}</span>    
                            <span className={`absolute text-xs md:text-base -translate-y-0.5 left-2 text-red-500 ${errors.phoneNumber && touched.phoneNumber  ? "block" : "hidden"}`}>{errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}</span>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="font-semibold text-lg md:text-2xl hover:opacity-60 active:opacity-100 hover:cursor-pointer text-center py-1 pb-1.5 md:pb-2 md:px-5 px-5 rounded-xl flex mt-8 mx-auto" style={{"background" : "rgba(255, 230, 0, 1)"}}>
                          {
                            isLoading ? <div className={styles.loadingiospinnerellipsiszon7txr7fkp}>
                                          <div className={styles.ldiopn062kit6cr}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                          </div>
                                        </div> 
                                      : <> { lang === "RU" ? "Заказать" : "Buyurtmalash"} </>
                          }
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
            </>
        }
    </div>
  )
}

export default Consultation