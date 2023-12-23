import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div>
      {orders.map(order => (
        <div key={order.id} className="order-container">
          <h3>Order #{order.id}</h3>
          <p>Messages from Customer: {order.message}</p>
          <ul>
            {order.items.map((itemName, index) => (
              <li key={index}>{itemName}</li>
            ))}
          </ul>
        </div>
      ))}
      <style jsx>{`
        .order-container {
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default OrderList;
