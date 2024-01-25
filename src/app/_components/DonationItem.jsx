import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

function DonationItem({item, limit}) {

    const [counter,setCounter] = useState(0);
    const [donationCart, setDonationCart] = useState(JSON.parse(window.localStorage.getItem("donation"))||[]);

    const increment = () => {
        setDonationCart(JSON.parse(window.localStorage.getItem("donation")));
        if (counter < limit) {
            setCounter((prevCounter) => prevCounter + 1);

            let tempItem = { ...item, amount: counter + 1 };

            if (donationCart.some((obj) => obj.id === item.id)) {
                setDonationCart((prevCart) =>
                    prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, amount: counter + 1 } : cartItem
                    )
                );
            } else {
                setDonationCart((prevCart) => [...prevCart, tempItem]);
            }
            setDonationCart((updatedCart) => {
                window.localStorage.setItem("donation", JSON.stringify(updatedCart));
                return updatedCart;
            });
        }
    };

    const decrement = () => {
        setDonationCart(JSON.parse(window.localStorage.getItem("donation")));
        if(counter > 0){
            setCounter((prevCounter) => prevCounter - 1);
            if(counter - 1 == 0){
                setDonationCart((prevCart) =>
                    prevCart.filter((cartItem) => cartItem.id != item.id)
                );
            }
            else{
                if (donationCart.some((obj) => obj.id === item.id)) {
                    setDonationCart((prevCart) =>
                        prevCart.map((cartItem) =>
                        cartItem.id === item.id ? { ...cartItem, amount: counter - 1 } : cartItem
                        )
                    );
                } 
            }
            setDonationCart((updatedCart) => {
                    window.localStorage.setItem("donation", JSON.stringify(updatedCart));
                    return updatedCart;
                });
        }
        else{
            setCounter((prevCounter) => prevCounter);
        }
    }

    return (
        <div className="w-full flex gap-x-4 shadow-md h-36 items-center">
            <img
                src={item.img}
                className="w-[100px] h-[100px] object-cover rounded-md ml-4"
            ></img>
            <div className="w-[50%]">
                <div className="text-gray-800">
                <p className="font-bold text-lg">{item.name}</p>
                <p className="font-bold text-lg">RM {((Number(item.sellingPrice)/2).toFixed(2)).toString()}</p>
                </div>
                <div className="flex justify-center items-center gap-x-2 mt-2">
                <button className="btn btn-sm btn-circle btn-outline" onClick={decrement}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <p>{counter}</p>
                <button className="btn btn-sm btn-circle btn-outline" onClick={increment}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                </div>
            </div>
        </div>
    )
}

export default DonationItem