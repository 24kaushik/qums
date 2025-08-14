import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// Importing Fonts
import {
  FaBars,
  FaBook,
  FaDoorOpen,
  FaHouse,
  FaHouseChimney,
  FaMoneyBill,
  FaPenClip,
  FaXmark
} from "react-icons/fa6";

const BottomBar = () => {
  const [isChecked, setIsChecked] = useState<boolean | null>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isChecked !== null) {
      if (barsRef.current) {
        barsRef.current.classList.toggle("rotate-180");
        barsRef.current.classList.toggle("opacity-0");
      }
      if (crossRef.current) {
        crossRef.current.classList.toggle("rotate-180");
        crossRef.current.classList.toggle("opacity-100");
      }
      if (menuRef.current) {
        menuRef.current.classList.toggle("opacity-0");
        menuRef.current.classList.toggle("w-0");
        menuRef.current.classList.toggle("w-[22rem]");
      }
      if (createRef.current) {
        createRef.current.classList.toggle("translate-y-20");
        createRef.current.classList.toggle("opacity-0");
      }
    }
  }, [isChecked]);

  return (
    <div className="fixed z-40 bottom-5 left-1/2 transform -translate-x-1/2 cursor-pointer text-primary">
      <label htmlFor="bars">
        <div className="relative z-10 h-[4.3rem] aspect-square bg-white shadow drop-shadow-md rounded-full flex items-center justify-center cursor-pointer">
          <div ref={barsRef} className="text-3xl transition-all duration-200">
            <FaBars />
          </div>
          <div
            ref={crossRef}
            className="text-4xl opacity-0 absolute left-1/2 transform -translate-x-1/2  transition-all duration-200"
          >
            <FaXmark />
          </div>
          <input
            className="hidden"
            type="checkbox"
            name="bars"
            id="bars"
            onClick={(e) =>
              setIsChecked((e.target as HTMLInputElement).checked)
            }
          />
        </div>
      </label>
      <div
        ref={menuRef}
        className="absolute top-1/2 h-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9] transition-all rounded-full bg-white shadow drop-shadow-md flex items-center justify-between opacity-0 duration-200 w-0 overflow-hidden "
      >
        <div className="flex mx-7 space-x-5 -mb-1">
          <Link to="/home">
            <div className="flex flex-col items-center justify-center">
              <FaHouse className="text-2xl" />
              <p className="text-sm">Home</p>
            </div>
          </Link>
          <div className="flex flex-col items-center justify-center">
            <FaBook className="text-2xl" />
            <p className="text-sm">Acad.</p>
          </div>
        </div>
        <div className="flex mx-7 space-x-5 -mb-1">
          <div className="flex flex-col items-center justify-center">
            <FaMoneyBill className="text-2xl" />
            <p className="text-sm">Fee</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <FaDoorOpen className="text-2xl" />
            <p className="text-sm">Log Out</p>
          </div>
        </div>
      </div>
      <div
        ref={createRef}
        className="absolute z-[9] -top-36 left-1/2 transform -translate-x-1/2 text-center  flex flex-col space-y-3 p-2 overflow-hidden transition-all duration-200 opacity-0 translate-y-20"
      >
        <div className="bg-white shadow drop-shadow-md rounded-full aspect-square w-14 flex flex-col items-center justify-center">
          <FaPenClip className="text-xl mt-1" />
          <p className="text-sm">Exam</p>
        </div>
        <div className="bg-white shadow drop-shadow-md rounded-full aspect-square w-14 flex flex-col items-center justify-center">
          <FaHouseChimney className="text-xl mt-1" />
          <p className="text-sm -mt-1">Hostel</p>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;

// rotate-180 opacity-0
