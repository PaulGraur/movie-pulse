"use client";

import React, { FC, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/navigation";
import Image from "next/image";
import Logo from "@/images/Logo.png";
import Close from "@/images/close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  animationType?: "fade" | "slide" | "scale" | "rotate";
}

const lgBreakpoint = 1440;

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  animationType = "fade",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (window.innerWidth > lgBreakpoint) {
        onClose();
      }
    };

    window.addEventListener("resize", handleResize);

    if (window.innerWidth > lgBreakpoint) {
      onClose();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-snow p-6 w-full h-full max-h-full overflow-auto relative"
            variants={
              {
                fade: {
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                },
                slide: {
                  hidden: { y: "-100vh", opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                },
                scale: {
                  hidden: { scale: 0 },
                  visible: { scale: 1 },
                },
                rotate: {
                  hidden: { rotateX: -90, opacity: 0 },
                  visible: { rotateX: 0, opacity: 1 },
                },
              }[animationType]
            }
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container flex justify-between items-center ">
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </Link>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="xl:hidden px-0 hover:bg-transparent bg-snow"
              >
                <Image src={Close} alt="Close" width={60} height={60} />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
