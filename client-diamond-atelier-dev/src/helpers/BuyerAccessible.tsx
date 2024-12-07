"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import coming_soon from "@/components/images/error/coming_soon.jpg";
 

export default function BuyerAccessible({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setUserRole(localStorage.getItem("userType"));
    console.log(pathname,"pathname")
  }, []);

  const isRestrictedPath = useMemo(() => {
    const allowedPaths = [
      "/certified-stone",
      "/certifiedResult",
      "/color-stone/certified-stone",
      "/color-result/cs-colorResult",
      "/",
      "/category",
      "/cart",
      "/hold-stone"
    ];
    return userRole === "BUYER" && !allowedPaths.includes(pathname) && 
                          !pathname.startsWith("/color-result/cs-colorResult") 
                         && !pathname.startsWith("/certifiedResult") && !pathname.startsWith("/profile");
  }, [userRole, pathname]);


  if (isRestrictedPath) {
    return (
      <div className="h-screen w-full flex justify-center items-center relative">
        <Image
          className="h-full w-full object-cover"
          src={coming_soon}
          alt="Coming Soon"
        />
        <div className="absolute top-0 mt-10">
          <button
            type="button"
            className="font-serif font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-7 py-1"
            onClick={router.back}
          >
            Back to Previous Page
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
