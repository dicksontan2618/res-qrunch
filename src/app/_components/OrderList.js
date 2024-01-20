import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div>
      {orders.length &&
        orders.map((order) => (
          <div
            className="w-full flex gap-x-4 shadow-md h-36 items-center p-4"
            key={order.id}
          >
            <img
              src={order.img}
              className="w-[100px] h-[100px] object-cover rounded-md ml-4"
            ></img>
            <div className="w-[50%]">
              <div className="text-gray-800">
                <p className="font-bold text-lg">{order.name}</p>
                <p className="font-medium text-gray-500">{order.vendor_name}</p>
                <p className="font-bold text-lg">RM {order.price}</p>
                <p className="">Amount : {order.amount}</p>
              </div>
            </div>
          </div>
        ))}
      {!orders.length && (
        <p
          className={"block text-2xl font-bold text-black"}
        >
          No Orders !
        </p>
      )}
    </div>
  );
};

export default OrderList;
