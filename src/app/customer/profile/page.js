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

// Create a functional component for the Profile Page

const ProfilePage = () => {

  const { user } = useAuthContext();
  const router = useRouter();
  const storage = getStorage();

  const [username, setUsername]= useState("");
  const [imgUrl, setImgUrl] = useState(null);

  async function initCustomerProfile() {
    const docRef = doc(db, "customers", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if(docSnap.data()["username"])
      {
        setUsername(docSnap.data()["username"]);
        setImgUrl(docSnap.data()["profile_pic"]);
      }
      else{
        setUsername("Username");
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
            onClick={() => document.getElementById("form_modal_image").showModal()}
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
                Change Username
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

      <div className="profile-button-section mt-12">
        <Link href="/favourites">
          <button>Favourites</button>
        </Link>
        <Link href="/address">
          <button>Address</button>
        </Link>
        <Link href="/bank-card">
          <button>Bank Card</button>
        </Link>
      </div>

      <div className="profile-subsection">
        {/* Language Option */}
        <div id="language-selection">
          <label htmlFor="language">Language:</label>
          <select id="language">
            <option value="english">English</option>
            <option value="chinese">Chinese</option>
            {/* Add more language options as needed */}
          </select>
        </div>

        <Link href="/help">
          <button>Help (FAQ)</button>
        </Link>

        {/* For a toggle button effect, you might want to use a label and an input element */}
        <label htmlFor="light-mode">
          <button>
            Light Mode: <input type="checkbox" id="light-mode" />
          </button>
        </label>
      </div>
      <button className="btn btn-active" onClick={handleLogout}>
        <p className="text-lg font-bold">Logout</p>
      </button>
    </div>
  );
};

export default ProfilePage;
