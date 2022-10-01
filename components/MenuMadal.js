import { motion } from 'framer-motion'
import React from 'react'

function MenuModal(props) {
    const setModal = props.setModal
  return (
    <>
        <motion.div 
            onClick={() => setModal(false)}
            initial={{
               opacity: 0
              }}
            animate={{
               opacity: 1
              }}
            exit={{
               opacity: 0
            }}
            className="fixed h-screen w-screen z-10 top-0 left-0 bg-blacker-02 backdrop-blur-sm">
        </motion.div>
        <motion.div 
            initial={{
                x: -300,
                y: 0,
              }}
            animate={{
                x: 0,
                transition: {
                    duration: 0.3,
                }
              }}
            exit={{ 
                x: -300,
                transition: {
                    duration: 0.2,
                }
              }}
            className="fixed top-0 left-0 z-10 h-screen w-72 bg-green-main" 
        >
            <motion.div
                initial={{
                    
                }}
                animate={{
                    
                }}
                className="relative w-full h-full"
            >
                {props.children}
            </motion.div>
        </motion.div>
    </>
  )
}

export default MenuModal