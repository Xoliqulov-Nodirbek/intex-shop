import { motion } from 'framer-motion'
import React from 'react'

const exit_icon = <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32" fill="none"><rect x="2.66431" y="6.10352e-05" width="41.4454" height="3.76776" rx="1.88388" transform="rotate(45 2.66431 6.10352e-05)" fill="#B9B9B9"/><rect y="29.3063" width="41.4454" height="3.76776" rx="1.88388" transform="rotate(-45 0 29.3063)" fill="#B9B9B9"/></svg>

function Modal(props) {
    const setModal = props.setModal
  return (
    <>
        <motion.div 
            onClick={() => setModal("")}
            initial={{
               opacity: 0
              }}
            animate={{
               opacity: 1
              }}
            exit={{
               opacity: 0
            }}
            className="fixed h-screen w-screen z-10 top-0 left-0 bg-blacker-02 backdrop-blur-sm" 
        >
        </motion.div>
        <motion.div 
            initial={{
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0.6,
              }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                transition: {
                    duration: 0.2,
                }
              }}
            exit={{
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0.4,
                transition: {
                    duration: 0.1,
                }
              }}
            className="fixed w-fit h-fit z-10 bg-lighter-01 m-auto inset-0 rounded-2xl"
        >
            <motion.div
                initial={{
                    
                }}
                animate={{
                    
                }}
                className="relative"
            >
                <span onClick={() => setModal("")} className='absolute top-4 right-4 z-20 w-6 h-6 rounded-full hover:bg-gray-200 p-1 xl:w-8 xl:h-8 hover:cursor-pointer'>{exit_icon}</span>
                {props.children}
            </motion.div>
        </motion.div>
    </>
  )
}

export default Modal