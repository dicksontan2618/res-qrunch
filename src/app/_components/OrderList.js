import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div className='flex flex-col gap-y-4'>
      {orders.length &&
        orders.map((order) => (
          <div key={order.id}>
              <p>{order.formattedCreatedAt}</p>
              <div
                className="w-full flex gap-x-4 shadow-md h-36 items-center p-4"
              >
                <img
                  src={order.img}
                  className="w-[100px] h-[100px] object-cover rounded-md ml-4"
                ></img>
                <div className="w-[50%]">
                  <div className="text-gray-800">
                    <p className="font-bold text-lg">{order.name}</p>
                    <p className="font-medium text-gray-500">
                      Customer: {order.customer_name}
                    </p>
                    <p className="font-bold">Amount : {order.amount}</p>
                  </div>
                </div>
              </div>
          </div>
        ))}
      {!orders.length && (
        <p className={"block text-2xl font-bold text-black"}>No Orders !</p>
      )}
    </div>
  );
};

export default OrderList;
