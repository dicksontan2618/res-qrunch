"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const VendorMenu = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [menuItems, setMenuItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (
      user == null &&
      window.localStorage.getItem("session_user") != "vendor"
    ) {
      router.push("/");
    }
  }, [user]);

  useEffect(()=>{

    async function initVendorMenuItems(vendor) {
      const q = query(
        collection(db, "menuItems"),
        where("vendor", "==", vendor.email)
      );
      const querySnapshot = await getDocs(q);
      const menu_items = querySnapshot.docs.map((doc) =>
        Object.assign(doc.data(), { id: doc.id })
      );

      if (!querySnapshot.empty) {
        setIsEmpty(false);
        setMenuItems(menu_items);
      } else {
        setIsEmpty(true);
      }
    }

    initVendorMenuItems(user);
  },[]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[80%] mt-12 mb-24 gap-y-8 justify-center items-center">
        {!isEmpty && menuItems.map(menuItem=>{
          return (
            <Link href={`/vendor/menu/${menuItem.id}`} key={menuItem.id} className="w-full">
              <div className="card w-full bg-white text-black shadow-xl">
                <img className="object-cover" src={menuItem.img} />
                <div className="card-body">
                  <h2 className="card-title text-2xl font-bold">
                    {menuItem.name}
                  </h2>
                  <p className="font-semibold">RM {menuItem.price}</p>
                  <p className="font-semibold">Quantity: {menuItem.quantity}</p>
                  <div className="card-actions justify-end mt-4">
                    {menuItem.ingredients.map((ingredient) => {
                      return (
                        <div className="badge badge-outline">{ingredient}</div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        <p className={isEmpty ? "block text-2xl font-bold text-black":"hidden"}>No Items !</p>
      </div>
    </div>
  );
};

export default VendorMenu;
