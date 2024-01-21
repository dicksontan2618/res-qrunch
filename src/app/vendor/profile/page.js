"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Link from "next/link";
import Swal from "sweetalert2";

const VendorProfile = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const storage= getStorage();

  const [vendorName, setVendorName] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");
  const [imgUrl, setImgUrl] = useState(null);

  // function to initialize vendor profile
  async function initVendorProfile (vendor) {
    const docRef = doc(db, "vendors", vendor.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      if(docSnap.data()["username"] && docSnap.data()["address"] && docSnap.data()["profile_pic"]){
        setVendorName(docSnap.data()["username"]);
        setVendorAddress(docSnap.data()["address"]);
        setImgUrl(docSnap.data()["profile_pic"]);
      }
      else{
        setVendorName("No data");
        setVendorAddress("No data");
      }
    }
  }

  // function that invoked when user submit edit profile form
  const handleEditProfileForm = async (event) => {

    event.preventDefault();

    await setDoc(doc(db, "vendors", user.uid), {
      username: vendorName,
      address: vendorAddress,
    },{merge: true});

    Swal.fire({
      title: "Edit Success!",
      text: "Profile Details Edited Successfully!",
      icon: "success",
    });

  };

  const handleProfileImage = async (event) => {

    event.preventDefault();
    const file = event.target[0]?.files[0];

    if(!file){
      console.log("Error");
    }
    else{
      const vendorProfilePicRef = ref(storage, `vendors/profile/${user.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(vendorProfilePicRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setImgUrl(downloadURL);
            await setDoc(doc(db, "vendors", user.uid), {
              profile_pic : downloadURL,
            },{merge: true});
            Swal.fire({
              title: "Upload Success!",
              text: "Profile Picture Uploaded Successfully!",
              icon: "success",
            });
          });
        }
      );
    }
  }

  // function invoked when user logout 
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
      window.localStorage.getItem("session_user") != "vendor"
    ) {
      router.push("/");
    }
    else{
      initVendorProfile(user);
    }
  }, [user]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[80%] gap-y-8">
        <div className="mt-8 flex flex-col">
          <div className="avatar self-center mb-4">
            <div className="w-36 rounded-full">
              <img src={imgUrl} />
            </div>
          </div>
          <form className="form" onSubmit={handleProfileImage}>
            <input type="file" accept="image/*" />
            <button type="submit" className="btn btn-sm bg-white mt-2 border-1">
              Upload
            </button>
          </form>
        </div>
        <div>
          <form onSubmit={handleEditProfileForm} className="form">
            <div className="w-full my-1">
              <label className="text-gray-800 font-semibold">
                <p>Name</p>
                <input
                  type="text"
                  onChange={(e) => setVendorName(e.target.value)}
                  placeholder={vendorName}
                  className="input input-bordered w-full max-w-xs bg-white"
                />
              </label>
            </div>
            <div className="w-full my-1">
              <label className="text-gray-800 font-semibold">
                <p>Address</p>
                <textarea
                  onChange={(e) => setVendorAddress(e.target.value)}
                  className="textarea textarea-bordered bg-white"
                  placeholder={vendorAddress}
                ></textarea>
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 text-black font-bold rounded-xl border-2 border-gray-800 p-2"
            >
              Edit Profile
            </button>
          </form>
        </div>
        <div className="divider divider-error"></div>
        <Link href="/vendor/donation-claim">Claimed Donations</Link>
        <div className="divider divider-error"></div>
        <button className="btn btn-active mb-24" onClick={handleLogout}>
          <p className="text-lg font-bold">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default VendorProfile;