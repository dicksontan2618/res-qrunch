"use client"

// Import necessary libraries
import {useEffect, useState} from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "@/context/AuthContextUser";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Swal from 'sweetalert2';

// Create a functional component for the Profile Page

const ProfilePage = () => {

  const { user } = useAuthContext();
  const router = useRouter();
  const storage = getStorage();

  const [username, setUsername]= useState("");
  const [address, setAddress] = useState("");
  const [imgUrl, setImgUrl] = useState(null);

  async function initCustomerProfile() {
    const docRef = doc(db, "customers", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setImgUrl(docSnap.data()["profile_pic"]);
      if (docSnap.data()["username"] && docSnap.data()["address"]) {
        setUsername(docSnap.data()["username"]);
        setAddress(docSnap.data()["address"]);
      } else {
        if (docSnap.data()["username"])
        {
          setUsername(docSnap.data()["username"]);
          setAddress("Address");
        }
        if (docSnap.data()["address"]) {
          setUsername("Username");
          setAddress(docSnap.data()["address"]);
        }
      }
    }
  }

  const handleEditProfileForm = async (event) => {
    event.preventDefault();

    await setDoc(
      doc(db, "customers", user.uid),
      {
        username: username,
      },
      { merge: true }
    );

    Swal.fire({
      title: "Edit Success!",
      text: "Profile Name Edited Successfully!",
      icon: "success",
    });
  };

  const handleEditAddressForm = async (event) => {
    event.preventDefault();

    await setDoc(
      doc(db, "customers", user.uid),
      {
        address: address,
      },
      { merge: true }
    );

    Swal.fire({
      title: "Edit Success!",
      text: "Address Edited Successfully!",
      icon: "success",
    });
  };

  const handleProfileImage = async (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];

    if (!file) {
      console.log("Error");
    } else {
      const customerProfilePicRef = ref(
        storage,
        `customers/profile/${user.uid}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(customerProfilePicRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setImgUrl(downloadURL);
            await setDoc(
              doc(db, "customers", user.uid),
              {
                profile_pic: downloadURL,
              },
              { merge: true }
            );
            Swal.fire({
              title: "Upload Success!",
              text: "Profile Picture Uploaded Successfully!",
              icon: "success",
            });
          });
        }
      );
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
        window.localStorage.removeItem("session_user");
        window.localStorage.removeItem("shoppingCart");
        window.localStorage.removeItem("curLoc");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    if (
      user == null &&
      window.localStorage.getItem("session_user") != "user"
    ) {
      router.push("/");
    } else {
      initCustomerProfile();
    }
  }, [user]);


  return (
    <div className="w-full">
      {/* User Profile Section */}
      <div className="profile-section w-[85%] m-auto mt-8 flex items-center gap-x-8">
        {/* Profile Picture */}
        <div className="avatar">
          <div
            className="w-24 rounded-full"
            onClick={() =>
              document.getElementById("form_modal_image").showModal()
            }
          >
            <img src={imgUrl} />
          </div>
        </div>
        <dialog id="form_modal_image" className="modal">
          <div className="modal-box bg-white">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-gray-800">Upload Image</h3>
            <form className="mt-4" onSubmit={handleProfileImage}>
              <input type="file" accept="image/*" />
              <button
                type="submit"
                className="btn btn-sm bg-white mt-2 border-1"
              >
                Upload
              </button>
            </form>
          </div>
        </dialog>

        {/* Username */}
        <div className="flex items-center">
          <p className="font-semibold text-gray-800 text-xl">{username}</p>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById("form_modal").showModal()}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <dialog id="form_modal" className="modal">
            <div className="modal-box bg-white">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg text-gray-800">
                Add/Change Username
              </h3>
              <form className="mt-4" onSubmit={handleEditProfileForm}>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="New Username"
                  className="input input-bordered w-full max-w-xs bg-white"
                />
                <button
                  type="submit"
                  className="mt-4 text-black font-bold rounded-xl border-2 border-gray-800 p-2"
                >
                  Update
                </button>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      {/* Address */}
      <div className="w-[85%] m-auto mt-8">
        <p className="font-semibold text-gray-800 text-xl mb-2">Address : </p>
        <textarea
          className="textarea textarea-bordered bg-white text-gray-800"
          placeholder={address}
        ></textarea>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-ghost"
          onClick={() => document.getElementById("form_modal_addr").showModal()}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <dialog id="form_modal_addr" className="modal">
          <div className="modal-box bg-white">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-gray-800">
              Add/Change Address
            </h3>
            <form className="mt-4" onSubmit={handleEditAddressForm}>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="New Address"
                className="input input-bordered w-full max-w-xs bg-white"
              />
              <button
                type="submit"
                className="mt-4 text-black font-bold rounded-xl border-2 border-gray-800 p-2"
              >
                Update
              </button>
            </form>
          </div>
        </dialog>
      </div>

      <div className="profile-subsection">
        <Link href="/customer/redeem">
          <button>Points Shop</button>
        </Link>
        <Link href="/customer/orders">
          <button>My Orders</button>
        </Link>
      </div>

      <div className="flex justify-center items-center mt-8">
        <button
          className="btn btn-ghost btn-wide bg-main-clr text-white font-semibold"
          onClick={handleLogout}
        >
          <p className="text-lg font-bold">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
