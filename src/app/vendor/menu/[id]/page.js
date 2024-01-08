"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";

import { db } from "@/utils/firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const VendorMenuItem = ({params}) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const storage = getStorage();
  const id = params.id;

  const [foodName, setFoodName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleMenuItemImage = async (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];

    if (!file) {
      console.log("Error");
    } else {
      const menuItemPicRef = ref(
        storage,
        `menu_items/${id}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(menuItemPicRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
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
            await setDoc(
              doc(db, "menuItems", id),
              {
                img: downloadURL,
              },
              { merge: true }
            );
          });
        }
      );
    }
  };

  const handleClick = () => {
    setIngredients([...ingredients, { ingredient: "", amount: "" }]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...ingredients];
    onchangeVal[i][name] = value;
    setIngredients(onchangeVal);
  };

  const handleDelete = (i) => {
    const deleteVal = [...ingredients];
    deleteVal.splice(i, 1);
    setIngredients(deleteVal);
  };

  const handleMenuItemForm = async (event) => {
    event.preventDefault();

    await setDoc(
      doc(db, "menuItems", id),
      {
        name: foodName,
        price: price,
        quantity: quantity,
        ingredients: ingredients,
      },
      { merge: true }
    );

    router.push("/vendor/menu");
  };

  const deleteItem = async (event) => {
    event.preventDefault();

    await deleteDoc(doc(db, "menuItems", id));

    router.push("/vendor/menu");
  };

  useEffect(() => {
    if (
      user == null &&
      window.localStorage.getItem("session_user") != "vendor"
    ) {
      router.push("/");
    }
  }, [user]);

  useEffect(()=>{
     async function initVendorMenuItem() {
       const docRef = doc(db, "menuItems", id);
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
        setFoodName(docSnap.data()["name"]);
        setIngredients(docSnap.data()["ingredients"]);
        setImgUrl(docSnap.data()["img"]);
        setPrice(docSnap.data()["price"]);
        setQuantity(docSnap.data()["quantity"]);
       }
     }

     initVendorMenuItem();
     
  },[]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[80%] gap-y-8 mb-24">
        <div className="mt-8 flex flex-col">
          <div className="card bg-base-100 shadow-xl image-full">
            <figure>
              <img src={imgUrl} />
            </figure>
          </div>
          <form className="form" onSubmit={handleMenuItemImage}>
            <input type="file" className="file-input w-full" accept="image/*" />
            <button type="submit" className="btn btn-sm bg-white mt-2 border-1">
              Upload
            </button>
          </form>
        </div>
        <div>
          <form onSubmit={handleMenuItemForm} className="form">
            <div className="w-full my-1">
              <label className="text-gray-800 font-semibold">
                <p>Food Name</p>
                <input
                  type="text"
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder={foodName}
                  className="input input-bordered w-full max-w-xs bg-white"
                />
              </label>
            </div>
            <div className="w-full my-1">
              <label className="text-gray-800 font-semibold">
                <p>Ingredients</p>
                {ingredients.map((val, i) => (
                  <div className="flex justify-start gap-x-2" key={i}>
                    <input
                      name="ingredient"
                      value={val.ingredient}
                      onChange={(e) => handleChange(e, i)}
                      className="input input-bordered w-full max-w-xs bg-white"
                      type="text"
                      placeholder="Ingredient"
                    />
                    <input
                      name="amount"
                      value={val.amount}
                      onChange={(e) => handleChange(e, i)}
                      className="input input-bordered w-full max-w-xs bg-white"
                      type="text"
                      placeholder="Amount"
                    />
                    <button onClick={() => handleDelete(i)} type="button">
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleClick}
                  type="button"
                  className="mt-2 btn btn-ghost bg-main-clr text-white"
                >
                  Add
                </button>
              </label>
            </div>
            <div className="w-full my-1">
              <label className="text-gray-800 font-semibold">
                <p>Price (RM)</p>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  className="input input-bordered w-full max-w-xs bg-white"
                  placeholder={price}
                ></input>
              </label>
            </div>
            <div className="w-full my-1">
              <label className="text-gray-800 font-semibold">
                <p>Quantity</p>
                <input
                  onChange={(e) => setQuantity(e.target.value)}
                  className="input input-bordered w-full max-w-xs bg-white"
                  placeholder={quantity}
                ></input>
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 text-black font-bold rounded-xl border-2 border-gray-800 p-2"
            >
              Update Item
            </button>
          </form>
          <button
            className="mt-4 btn btn-error p-2 rounded-xl"
            onClick={deleteItem}
          >
            <p className="text-white">Delete Item</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorMenuItem;