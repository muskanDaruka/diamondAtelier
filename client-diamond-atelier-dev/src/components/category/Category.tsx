import React from "react";
import Style from "../../Style/Category.module.css";
import Image from "next/image";
import category1 from "../../components/images/category/category1.png";
import category2 from "../../components/images/category/category2.png";
import category3 from "../../components/images/category/category3.png";
import category4 from "../../components/images/category/category4.png";
import category5 from "../../components/images/category/category5.png";
import category6 from "../../components/images/category/category6.png";
import { useRouter } from "next/navigation";

const Category = () => {
    const router = useRouter();
    return (
        <div className="h-screen">
            <div className="m-4 text-center font-bold text-2xl md:text-3xl lg:text-4xl">
                DIAMOND ATELIER
            </div>
            <hr className="my-4" />
            <div className={`text-center ${Style.heightFix}`}>
                <h3 className="font-bold text-xl md:text-2xl lg:text-3xl">
                    SELECT CATEGORY
                </h3>
                <span className="block mt-2 text-sm md:text-base lg:text-lg">
                    CVD + HPHT LAB GROWN DIAMONDS
                </span>
            </div>
            <div className={`flex items-center ${Style.heightFix}`}>
                <div className="container mx-auto px-8 sm:px-16 lg:px-32">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-5">
                        <div
                            className={`${Style.hover} ${Style.BtnBorder} border relative border-gray-400 p-4 mx-3 mt-20 bg-gray-100 cursor-pointer`}
                            onClick={() => router.push("/certified-stone")}
                        >
                            <Image
                                height="100"
                                width="100"
                                className={`${Style.borderHover} absolute left-1/2 transform -translate-x-1/2 -top-16 rounded-full border bg-light border-4`}
                                src={category1}
                                alt="CERTIFIED STONE"
                            />
                            <div className="text-xl font-bold mt-4 text-center font-serif">
                                CERTIFIED STONE
                            </div>
                            <div className={`text-center ${Style.textSize} font-bold font-serif`}>
                                IGI & GIA
                            </div>
                        </div>
                        <div
                            className={`${Style.hover} ${Style.BtnBorder} border relative border-gray-400 p-4 mx-3 mt-20 bg-gray-100 cursor-pointer`}
                            onClick={() => router.push("/color-stone/certified-stone")}
                        >
                            <Image
                                height="100"
                                width="100"
                                className={`${Style.borderHover} absolute left-1/2 transform -translate-x-1/2 -top-16 rounded-full border bg-light border-4`}
                                src={category5}
                                alt="COLOR STONE"
                            />
                            <div className="text-xl font-bold mt-4 text-center font-serif">
                                COLOR STONE
                            </div>
                            <div className={`text-center ${Style.textSize} font-bold font-serif`}>
                                MELEES + CERTIFIED
                            </div>
                        </div>
                        <div
                            className={`${Style.hover} ${Style.BtnBorder} border relative border-gray-400 p-4 mx-3 mt-20 bg-gray-100 cursor-pointer`}
                            onClick={() => router.push("/fancy-layouts")}
                        >
                            <Image
                                height="100"
                                width="100"
                                className={`${Style.borderHover} absolute left-1/2 transform -translate-x-1/2 -top-16 rounded-full border bg-light border-4`}
                                src={category4}
                                alt="FANCY LAYOUTS"
                            />
                            <div className="text-xl font-bold mt-4 text-center font-serif">
                                FANCY LAYOUTS
                            </div>
                            <div className={`text-center ${Style.textSize} font-bold font-serif`}>
                                0.10 MM TOLERANCE
                            </div>
                            {/* <div className="text-center mt-1 bg-[#fff] rounded-md ">
                                <span className="mx-auto  my-3  text-red-500 text-sm">Comming Soon</span>
                            </div> */}
                        </div>
                        <div
                            className={`${Style.hover} ${Style.BtnBorder} border relative border-gray-400 p-4 mx-3 mt-20 bg-gray-100 cursor-pointer`}
                            onClick={() => router.push("/melee-pointers")}
                        >
                            <Image
                                height="100"
                                width="100"
                                className={`${Style.borderHover} absolute left-1/2 transform -translate-x-1/2 -top-16 rounded-full border bg-light border-4`}
                                src={category2}
                                alt="MELEE + POINTERS"
                            />
                            <div className="text-xl font-bold mt-4 text-center font-serif">
                                MELEE + POINTERS
                            </div>
                            <div className={`text-center ${Style.textSize} font-bold font-serif`}>
                                0.001 TO 0.49 CT | ROUND (0.80 - 4.90 MM)
                            </div>
                            {/* <div className="text-center mt-1 bg-[#fff] rounded-md ">
                                <span className="mx-auto  my-3  text-red-500 text-sm">Comming Soon</span>
                            </div> */}
                        </div>
                        <div
                            className={`${Style.hover} ${Style.BtnBorder} border relative border-gray-400 p-4 mx-3 mt-20 bg-gray-100 cursor-pointer`}
                            onClick={() => router.push("/non-certified")}
                        >
                            <Image
                                height="100"
                                width="100"
                                className={`${Style.borderHover} absolute left-1/2 transform -translate-x-1/2 -top-16 rounded-full border bg-light border-4`}
                                src={category6}
                                alt="NON CERTIFIED"
                            />
                            <div className="text-xl font-bold mt-4 text-center font-serif">
                                NON CERTIFIED
                            </div>
                            <div className={`text-center ${Style.textSize} font-bold font-serif`}>
                                ALL SHAPES | 0.50 CT+
                            </div>
                            {/* <div className="mt-1 text-center bg-[#fff] rounded-md ">
                                <span className="mx-auto  my-3  text-red-500 text-sm">Comming Soon</span>
                            </div> */}
                        </div>
                        <div
                            className={`${Style.hover} ${Style.BtnBorder} border relative border-gray-400 p-4 mx-3 mt-20 bg-gray-100 cursor-pointer`}
                            onClick={() => router.push("/exotic-shapes")}
                        >
                            <Image
                                height="100"
                                width="100"
                                className={`${Style.borderHover} absolute left-1/2 transform -translate-x-1/2 -top-16 rounded-full border bg-light border-4`}
                                src={category3}
                                alt="EXOTIC SHAPES"
                            />
                            <div className="text-xl font-bold mt-4 text-center font-serif">
                                EXOTIC SHAPES
                            </div>
                            <div className={`text-center ${Style.textSize} font-bold font-serif`}>
                                MATCHING PAIR | SIDE STONE | 100+ SHAPES
                            </div>
                            {/* <div className="text-center mt-1 bg-[#fff] rounded-md ">
                                <span className="mx-auto  my-3  text-red-500 text-sm">Comming Soon</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;

