import React from 'react'
import Image from 'next/image'
import {useSelector} from "react-redux"

function FooterConsulModal({response}) {
  const lang = useSelector(state => state.intex.market.lang)

  return (
    <div className='flex flex-col items-center relative text-black w-72 min_md:w-consul md:w-modalWidth px-10 md:px-8 py-12 md:py-16'> 
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
            </> : <>
                Error
            </> 
        }
    </div>
  )
}

export default FooterConsulModal