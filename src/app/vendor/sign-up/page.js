"use client";

import { useState } from "react";
import signUp from "@/auth/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

function vendorSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleSignUpForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Some error occured. Please try again.",
      });
      return router.push("/vendor/sign-up");
    }

    return router.push("/vendor/home");
  };

  const handleCheck = () => {
    setTermsAgreed(!termsAgreed);
  }

  return (
    <div className="bg-main-clr h-screen flex justify-center items-center">
      <div className="card w-[80%] bg-white shadow-xl p-8">
        <h1 className="text-xl font-bold mb-4 text-gray-800">Vendor Sign Up</h1>
        <form onSubmit={handleSignUpForm} className="form">
          <div className="w-full my-1">
            <label htmlFor="email" className="text-gray-800 font-semibold">
              <p>Email</p>
              <input
                className="bg-white border rounded-md p-2 text-sm"
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="vendor@gmail.com"
              />
            </label>
          </div>
          <div className="my-1">
            <label htmlFor="password" className="text-gray-800 font-semibold">
              <p>Password</p>
              <input
                className="bg-white border rounded-md p-2 text-sm"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-ghost text-black bg-white border-black border-1 mt-2"
            disabled={!termsAgreed}
          >
            Sign up
          </button>
        </form>
        <div className="flex mt-4 gap-x-4">
          <input
            type="checkbox"
            className="checkbox"
            checked={termsAgreed}
            onChange={handleCheck}
          />
          <p className="text-gray-800 text-sm">
            I agree with the{" "}
            <span
              className="underline"
              onClick={() => document.getElementById("modal").showModal()}
            >
              Terms & Conditions
            </span>
          </p>
        </div>
        <div className="text-center text-gray-800 mt-6">
          <p>
            Have an account?{" "}
            <Link href="./sign-in">
              <span className="text-main-clr">Sign In</span>
            </Link>
          </p>
          <Link href="../customer/sign-in">
            <p className="underline">Are you a customer?</p>
          </Link>
        </div>
      </div>
      <dialog id="modal" className="modal">
        <div className="modal-box h-1/2 overflow-scroll">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-ghost absolute right-4 top-4">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl mb-3">Terms & Conditions</h3>
          <ol>
            <li className="my-2">
              <h4 className="text-lg font-bold">1.0 Introduction</h4>
              <p>
                By participating as a vendor in our food delivery app, you agree
                to adhere to the following terms and conditions: These terms are
                designed to ensure a fair and ethical marketplace while
                promoting sustainability and the reduction of food waste.
              </p>
            </li>
            <li className="my-2">
              <h4 className="text-lg font-bold">2.0 Surplus Food Pricing</h4>
              <p>
                As a vendor, you commit to selling surplus food items through
                our platform at a price lower than the current market rate. This
                initiative aligns with our mission to reduce food waste and make
                quality food more accessible to a wider audience. You understand
                that this commitment is vital for fostering a community of
                conscious consumers and contributes to the core values of our
                platform.
              </p>
            </li>
            <li className="my-2">
              <h4 className="text-lg font-bold">3.0 Food Safety and Quality</h4>
              <p>
                You acknowledge the importance of maintaining high standards of
                food safety and quality. All surplus items listed on the app
                must meet the required health and safety regulations. It is your
                responsibility to provide accurate and detailed information
                about the listed food items, including ingredients and
                allergens, to ensure the well-being of our customers.
              </p>
            </li>
            <li className="my-2">
              <h4 className="text-lg font-bold">
                4.0 Transparent Communication
              </h4>
              <p>
                Open and transparent communication is crucial for the success of
                our platform. You agree to promptly update the app with the
                availability of surplus items and inform customers about any
                changes in pricing, availability, or other relevant details.
                Clear and honest communication builds trust and credibility with
                our user base.
              </p>
            </li>
            <li className="my-2">
              <h4 className="text-lg font-bold">5.0 Order Fulfilment</h4>
              <p>
                Upon receiving an order through the app, you commit to
                fulfilling it within the stipulated timeframe. Timely order
                fulfilment is essential for providing a positive user experience
                and maintaining the efficiency of our platform.
              </p>
            </li>
            <li className="my-2">
              <h4 className="text-lg font-bold">
                6.0 Compliance with Laws and Regulations
              </h4>
              <p>
                You agree to comply with all relevant local, state, and federal
                laws and regulations related to food preparation, handling, and
                delivery. This includes obtaining and maintaining all necessary
                licences and certifications required for operating as a food
                vendor.
              </p>
            </li>
            <li className="my-2">
              <h4 className="text-lg font-bold">
                7.0 Collaboration with Food Banks or Charities
              </h4>
              <p>
                While not mandatory, we encourage vendors to participate in our
                food donation program. This involves donating surplus items to
                local food banks or charities, contributing to our collective
                effort to combat hunger and food insecurity.
              </p>
            </li>
            <li className="my-2">
              <h4 className="text-lg font-bold">
                8.0 Termination of Partnership
              </h4>
              <p>
                We reserve the right to terminate our partnership with any
                vendor found to be in violation of these terms and conditions.
                Such violations may include, but are not limited to, pricing
                discrepancies, food safety issues, or a breach of applicable
                laws and regulations.
              </p>
            </li>
            <li className="my-2">
              <h4 className="text-lg font-bold">9.0 Modification of Terms</h4>
              <p>
                We retain the right to modify these terms and conditions.
                Vendors will be notified in advance of any changes, and
                continued participation implies acceptance of the revised terms.
              </p>
            </li>
            <li className="my-2">
              <h4 className="text-lg font-bold">Final Words</h4>
              <p>
                By proceeding as a vendor on ResQrunch, you acknowledge that you
                have read, understood, and agreed to abide by these terms and
                conditions. Your commitment to these principles is fundamental
                to the success of our shared mission to reduce food waste,
                combat hunger, and create a more sustainable and
                ethical food ecosystem.
              </p>
            </li>
          </ol>
        </div>
      </dialog>
    </div>
  );
}

export default vendorSignUp;
