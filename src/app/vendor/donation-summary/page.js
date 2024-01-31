"use client"

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";

import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Donation Summary',
    },
  },
};

const colorsList = [
  "rgba(255, 99, 132, 0.2)",
];

const DonationSummary = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  const [data,setData] = useState([])

  const getDonationData = async () => {

    let tempArr = []
    let tempLabelList = []
    let tempQtyList = []

    const q = query(
      collection(db, "donations"),
      where("vendor", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
      tempArr.push({name:doc.data()["name"],amount:doc.data()["amount"]});
    })

    console.log(tempArr)
    const mergedArr = mergeObjects(tempArr);

    mergedArr.forEach((item)=>{
      tempLabelList.push(item.name)
      tempQtyList.push(item.amount)
    })

    renderChart(tempLabelList,tempQtyList);
  }

  const getSpecificDonationData = async (start,end) => {
    let tempArr = [];
    let tempLabelList = [];
    let tempQtyList = [];

    const q = query(
      collection(db, "donations"),
      where("vendor", "==", user.uid), where("createdAt",">=",start),where("createdAt","<=",end)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
      tempArr.push({ name: doc.data()["name"], amount: doc.data()["amount"] });
    });

    console.log(tempArr);
    const mergedArr = mergeObjects(tempArr);

    mergedArr.forEach((item) => {
      tempLabelList.push(item.name);
      tempQtyList.push(item.amount);
    });

    renderChart(tempLabelList, tempQtyList);
  };

  const mergeObjects = (arr) => {
    const result = [];
    const objMap = {};

    arr.forEach((item) => {
      const { name, amount } = item;

      if (objMap[name] === undefined) {
        objMap[name] = { name, amount };
        result.push(objMap[name]);
      } else {
        objMap[name].amount += amount;
      }
    });

    return result;
  };

  const renderChart = (label,qt) => {
    console.log(label)
    let tempData = {
      labels: label,
      datasets: [
        {
          label: "Number of Donations",
          data: qt,
          backgroundColor: colorsList.slice(0,label.length),
        },
      ],
    };

    setData(tempData);
  }

  const check = () => {
    const startDate = new Date(document.getElementById("start").value)
    const endDate = new Date(document.getElementById("end").value);
    getSpecificDonationData(startDate,endDate);
  }

  useEffect(() => {
    if (
      user == null &&
      window.localStorage.getItem("session_user") !== "vendor"
    ) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    getDonationData();
  },[])

  return (
    <div className="mt-24 flex flex-col items-center">
      <div className="flex flex-col gap-y-4">
        <div>
          <label htmlFor="start">Start date:</label>

          <input type="date" id="start" />
        </div>
        <div>
          <label htmlFor="end">End date:</label>

          <input type="date" id="end" />
        </div>
      </div>

      <button className="btn btn-sm bg-main-clr text-white my-2" onClick={check}>
        Check
      </button>

      {data.labels && <Bar options={options} data={data} />}
    </div>
  );
  
};

export default DonationSummary;
