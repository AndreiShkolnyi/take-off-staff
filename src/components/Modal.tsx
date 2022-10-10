import React from "react";

interface ModalProps {
  children: React.ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="absolute w-[700px] h-fit border-2 shadow-2xl bg-white top-[50px] py-2 px-5">
      {children}
    </div>
  );
};
