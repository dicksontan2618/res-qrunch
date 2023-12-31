"use client";

// Import necessary libraries
import { useEffect } from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


// Create a functional component for the Profile Page

const PaymentPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null && window.localStorage.getItem("session_user") != "user") {
      router.push("/");
    } else {
    }
  }, [user]);

  return (
    <div className="w-full">
      <div className="w-[90%] m-auto mt-8">
        <p className="text-gray-800 font-bold">Select a Payment Method</p>
        <div className="flex my-8 justify-between">
          <button className="border">
            <img src="/payment-img-1.webp"></img>
          </button>
          <button className="border">
            <img src="/payment-img-2.webp"></img>
          </button>
          <button className="border">
            <img src="/payment-img-3.webp"></img>
          </button>
        </div>
        <div>
          <p className="text-gray-800 font-semibold">Card Number</p>
          <input
            type="text"
            placeholder="Number"
            className="input input-bordered w-full bg-white text-gray-500 mt-2"
          />
        </div>
        <div className="flex justify-between mt-6">
          <div className="w-[40%]">
            <p className="text-gray-800 font-semibold">Expiration Date</p>
            <input
              type="text"
              placeholder="MM/YY"
              className="input input-bordered w-full bg-white text-gray-500 mt-2"
            />
          </div>
          <div className="w-[40%]">
            <p className="text-gray-800 font-semibold">Security Code</p>
            <input
              type="text"
              placeholder="###"
              className="input input-bordered w-full bg-white text-gray-500 mt-2"
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="btn btn-ghost btn-wide bg-main-clr text-white font-bold"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Order Now
          </button>
        </div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box flex flex-col items-center bg-white gap-y-4">
            <FontAwesomeIcon
              icon={faCheck}
              size="2xl"
              style={{ color: "#ff5c5c" }}
            />
            <h3 className="font-bold text-gray-800 text-lg text-center">
              Your order placement is successful.
            </h3>
            <p className="text-gray-800 text-center">
              You can view your order in "Orders" section
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <Link href="/customer/home">
                  <button className="btn btn-ghost bg-main-clr text-white font-semibold">
                    Back to Homepage
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default PaymentPage;
