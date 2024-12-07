"use client";

import { useRouter } from 'next/navigation';
import React, { useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiEdit, FiShoppingCart, FiLayers, FiUsers, FiShield, FiCheckCircle, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { MdOutlineAutoAwesomeMotion } from 'react-icons/md';

type MenuItem = {
  id: string;
  menuOption: string;
  icon: React.ReactNode;
};

type AccountType = {
  buyer: MenuItem[];
  seller: MenuItem[];
  adminSeller: MenuItem[];
  superAdmin: MenuItem[];
};

interface ProfileDropDownProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProfileDropDown({ isOpen, onClose }: ProfileDropDownProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const typeOfAccount: AccountType = {
    buyer: [
      { id: "edit", menuOption: "Edit", icon: <FiEdit /> },
    ],
    seller: [
      { id: "sellerEdit", menuOption: "Edit", icon: <FiEdit /> },
      { id: "cart", menuOption: "Client Cart", icon: <FiShoppingCart /> },
      { id: "holdStone", menuOption: "Client Hold", icon: <FiLayers /> },
      { id: "clientList", menuOption: "Client List", icon: <FiUsers /> },
    ],
    adminSeller: [
      { id: "adminSellerEdit", menuOption: "Edit", icon: <FiEdit /> },
      { id: "kycPending", menuOption: "Kyc Pending", icon: <FiShield /> },
      { id: "cart", menuOption: 'Client Cart', icon: <FiShoppingCart /> },
      { id: "holdStone", menuOption: "Client Hold", icon: <FiLayers /> },
      { id: "clientList", menuOption: "Client List", icon: <FiUsers /> },
      { id: "memoList", menuOption: "Memo List", icon: <MdOutlineAutoAwesomeMotion /> },
    ],
    superAdmin: [
      { id: "superAdminEdit", menuOption: "Edit", icon: <FiEdit /> },
      { id: "kycPending", menuOption: "Kyc Pending", icon: <FiShield /> },
      { id: "approvalLogin", menuOption: "Login Approval", icon: <FiCheckCircle /> },
      { id: "cart", menuOption: "Client Cart", icon: <FiShoppingCart /> },
      { id: "holdStone", menuOption: "Client Hold", icon: <FiLayers /> },
      { id: "clientList", menuOption: "Client List", icon: <FiUsers /> },
      { id: "memoList", menuOption: "Memo List", icon: <MdOutlineAutoAwesomeMotion /> },
      { id: "adminSeller", menuOption: "Admin Seller", icon: <FiUserPlus /> },
    ],
  };

  const userRole: string = localStorage.getItem("userType") || "";
 
  const handleLogout = () => {
    localStorage.removeItem("Token");
    router.push("/");
  };

  const handleOptionClickable = (id: string) => {
    switch (id) {
      case 'edit':
        router.push(`/profile/${userRole}`);
        break;
      case 'cart':
        router.push('/client-cart-list');
        break;
      case 'holdStone':
         router.push(`/client-hold-list?action=${false}`)
        break;
      case 'clientList':
        router.push('/client-list');
        break;
      case 'kycPending':
        router.push('/kyc-pending');
        break;
      case 'sellerEdit':
        router.push(`/profile/${userRole}`);
        break;
      case 'adminSellerEdit':
        router.push(`/profile/${userRole}`);
        break;
      case 'superAdminEdit':
        router.push(`/profile/${userRole}`);
        break;
      case 'approvalLogin':
        router.push('/approve-login');
        break;
      case 'adminSeller':
        router.push('/admin-seller');
        break;
        case 'memoList':
         router.push(`/client-memo-list?action=${false}`)
        break;
      case 'assignSeller':
        router.push('/assign-seller');
        break;
      default:
        toast.error('Unknown menu option');
        break;
    }
    onClose();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div ref={dropdownRef} className="text-xs  dropdown-menu w-36 absolute rounded-xl text-white shadow-lg mt-2 top-[8px] bg-custom-gradient z-50">
          {userRole === "BUYER" && typeOfAccount.buyer.map((item) => (
            <div key={item.id} onClick={() => handleOptionClickable(item.id)} className="p-2 hover:bg-white hover:text-blue-600 text-center">
              <div className='flex items-center gap-2'>
                <span>{item.icon}</span>
                {item.menuOption}
              </div>
            </div>
          ))}
          {userRole === "SELLER" && typeOfAccount.seller.map((item) => (
            <div key={item.id} onClick={() => handleOptionClickable(item.id)} className="p-2 hover:bg-white hover:text-blue-600 text-center">
              <div className='flex items-center gap-2'>
                <span>{item.icon}</span>
                {item.menuOption}
              </div>
            </div>
          ))}
          {userRole === "SELLERADMIN" && typeOfAccount.adminSeller.map((item) => (
            <div key={item.id} onClick={() => handleOptionClickable(item.id)} className="p-2 hover:bg-white hover:text-blue-600 text-center">
              <div className='flex items-center gap-2'>
                <span>{item.icon}</span>
                {item.menuOption}
              </div>
            </div>
          ))}
          {userRole === "SUPERADMIN" && typeOfAccount.superAdmin.map((item) => (
            <div key={item.id} onClick={() => handleOptionClickable(item.id)} className="p-2 hover:bg-white hover:text-blue-600 text-center">
              <div className='flex items-center gap-2'>
                <span>{item.icon}</span>
                {item.menuOption}
              </div>
            </div>
          ))}
          <div onClick={handleLogout} className="p-2 hover:bg-white hover:text-blue-600 text-center">
            <div className='flex items-center gap-2'>
              <span><FiLogOut /></span>
              Logout
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileDropDown;
