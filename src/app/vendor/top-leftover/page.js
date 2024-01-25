"use client"

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContextVendor";
import { useRouter } from "next/navigation";

import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const colorsList = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(73, 12, 212, 0.2)",
  "rgba(175, 2, 81, 0.2)",
  "rgba(23, 31, 92, 0.2)",
  "rgba(46, 123, 166, 0.2)",
  "rgba(35, 222, 1777, 0.2)",
  "rgba(91, 129, 188, 0.2)",
  "rgba(88, 113, 199, 0.2)",
  "rgba(66, 211, 200, 0.2)",
  "rgba(23, 19, 201, 0.2)",
  "rgba(22, 92, 122, 0.2)",
  "rgba(70, 12, 222, 0.2)",
];

const LeftoverSummary = () => {

  const { user } = useAuthContext();
  const router = useRouter();

  const [data,setData] = useState([])
  const [maxLeftover, setMaxLeftover] = useState([])

  const getVendorLeftovers = async () => {

    let tempLabelList = []
    let tempQtyList = []

    let tempMaxIndex = 0

    const q = query(
      collection(db, "menuItems"),
      where("vendor", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
      tempLabelList.push(doc.data()["name"])
      tempQtyList.push(Number(doc.data()["ori_quantity"]))
    })

    tempMaxIndex = tempQtyList.indexOf(Math.max(...tempQtyList));
    setMaxLeftover(tempLabelList[tempMaxIndex]);

    renderChart(tempLabelList,tempQtyList);
  }

  const renderChart = (label,qt) => {
    let tempData = {
      labels: label,
      datasets: [
        {
          label: "Number of Leftovers",
          data: qt,
          backgroundColor: colorsList.slice(0,label.length),
          borderWidth: 1,
        },
      ],
    };

    setData(tempData);
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
    getVendorLeftovers();
  },[])

  return (
    <div className="mt-24 flex flex-col justify-center">
      {data.labels && <Pie data={data} />}
      <p className="text-center font-bold mt-8">Max Leftover Item is: {maxLeftover}</p>
    </div>
  );
};

export default LeftoverSummary;
