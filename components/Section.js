import React, {useEffect} from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Modal from './Modal'
import { useState } from 'react'
import Order from './modalContent/Order'
import {AnimatePresence} from "framer-motion"
import AOS from 'aos';
import 'aos/dist/aos.css'; 


function Section({category}) {
    const lang = useSelector(state => state.intex.market.lang)
    const products = useSelector(state => state.intex.market.products)
    const [product, setProduct] = useState("")

    useEffect(() => {
        AOS.init();
    }, [])

    useEffect(() => {
        let bodyTag = document.querySelector("body")
        if(product){
            bodyTag.classList.add("overflow-y-hidden")
            bodyTag.classList.add("h-screen")
            bodyTag.classList.add("p-0")
            bodyTag.classList.add("m-0")
        } else{
            bodyTag.classList.remove("overflow-y-hidden")
            bodyTag.classList.remove("h-screen")
            bodyTag.classList.remove("p-0")
            bodyTag.classList.remove("m-0")
        }
    }, [product])

  return (
    <>
        <div className='relative text-center text-2xl sm:text-4xl md:text-5xl text-white font-bold py-1.5 sm:py-5 h-12 sm:h-24 mb-1 sm:mb-20 bg-green-main shadow-categoryShadow '>
            <div id={category.name_uz} className="w-full absolute -top-12 min_md:-top-20 min_lg:-top-20 duration-300"></div>
            {category[`name_${lang.toLowerCase()}`]}
        </div>
        <div className='flex justify-center flex-wrap h-auto my-4 sm:mb-20 mx-auto bg-gray-bg max-w-[1500px]'>
            {
                products.map(product => {
                    if(product.category_id !== category.id){
                        return;
                    } 
                    return( 
                        <div data-aos="fade-up" key={product.id} className="relative overflow-hidden pt-7 min_md:pt-12 pl-4 pr-4 pb-5 min_md:pb-7 m-4 sm:m-5 bg-white rounded-cardRadius shadow-cardShadow w-64 min_md:w-cardWidth">
                            {
                                product.status_id === 1 ? <div className='absolute top-0 left-0 text-white font-semibold text-xs min_md:text-sm pb-0.5 px-4 rounded-labelRadius shadow-labelShadow bg-green-recommend ' >{product[`status_${lang.toLowerCase()}`]}</div> 
                              : product.status_id === 2 ? <div className='absolute top-0 left-0 text-white font-semibold text-xs min_md:text-sm pb-0.5 px-4 rounded-labelRadius shadow-labelShadow bg-yellow-btn ' >{product[`status_${lang.toLowerCase()}`]}</div> 
                              : product.status_id === 3 ? <div className='absolute top-0 left-0 text-white font-semibold text-xs min_md:text-sm pb-0.5 px-4 rounded-labelRadius shadow-labelShadow bg-red-500 '>{product[`status_${lang.toLowerCase()}`]}</div> 
                              : null
                            }
                            <div className='font-bold text-xs min_md:text-xl text-center text-green-main' >{product[`frame_${lang.toLowerCase()}`]}</div>
                            <Image
                                src={product.image }
                                alt="product"
                                width={11}
                                height={5}
                                layout="responsive" 
                                objectFit='cover'
                            />
                            <div className='flex justify-between mt-4 items-end relative pl-4'>
                                <div className='w-full'>
                                    <span className='text-[10px] min_md:text-xs text-gray-400 relative font-light'>
                                        <span className='absolute h-[1px] w-full bg-red-500 rotate-6 mt-4 min_md:mt-3.5'></span>
                                        {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {lang === "RU" ? "сум" : `so'm`}
                                    </span>
                                    <div className='text-xs min_md:text-base font-bold -mt-1.5 text-black'>{product.sale_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {lang === "RU" ? "сум" : `so'm`}</div>
                                </div>
                                <span onClick={() => setProduct(product)} className={`absolute hover:opacity-70 bottom-0 right-0 px-4 pt-1 pb-1.5 rounded-btnRadius font-semibold mr-4 min_md:mr-5 hover:cursor-pointer text-black text-[10px] min_md:text-xs shadow-btnShadow bg-yellow-btn  ${product.status_id === 3 ? "hidden" : ""}`} >
                                    { lang === "RU" ? "Заказать" : "Buyurtma"}
                                </span>
                            </div>
                        </div> 
                    )
                })
            }
        </div>
        <AnimatePresence>
            {
                product ? <Modal setModal={setProduct}>
                            <Order product={product}/>
                          </Modal>
                        : null
            }
        </AnimatePresence>
       
       
    </>
  )
}

export default Section