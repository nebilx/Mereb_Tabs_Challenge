import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// const tabs = [
//     {
//         id: 1,
//         tabTitle: 'Tab 1',
//         title: 'Title 1',
//         content: 'In sint do non adipisicing incididunt excepteur sit. Voluptate esse aliqua pariatur dolor ex occaecat sunt eu. Pariatur ullamco id dolore sint proident sint nostrud nisi sit id est. Duis et excepteur cupidatat sint nisi dolore qui irure qui in id excepteur irure laboris. Pariatur mollit duis cupidatat nisi Lorem non et in dolor aliquip ea sint aute. Dolore aute duis laboris exercitation occaecat sunt. Enim veniam Lorem do ipsum aliqua qui eu ipsum consectetur ex dolore ea ipsum.'
//     },
//     {
//         id: 2,
//         tabTitle: 'Tab 2',
//         title: 'Title 2',
//         content: 'Non aliquip fugiat velit ad officia Lorem tempor cillum incididunt elit proident mollit. Reprehenderit qui nisi ut occaecat minim velit deserunt occaecat quis magna mollit. Veniam proident consectetur sunt mollit est magna Lorem voluptate enim cupidatat consequat. Et pariatur aliquip commodo nisi deserunt exercitation enim officia voluptate in nisi. Eu ea esse qui est ea pariatur nostrud non elit irure. Ad exercitation Lorem exercitation ipsum eiusmod ea duis ad mollit veniam aliquip veniam. Lorem pariatur elit ea duis.'
//     },
//     {
//         id: 3,
//         tabTitle: 'Tab 3',
//         title: 'Title 3',
//         content: 'Deserunt et elit elit ad dolor magna. Nisi amet consectetur Lorem eiusmod dolore adipisicing do reprehenderit. Voluptate consequat magna nostrud in officia labore. Minim excepteur consectetur quis nostrud nisi magna duis sunt sint qui. Fugiat ea reprehenderit eiusmod proident officia. Consequat labore qui velit Lorem consectetur incididunt ut nisi.'
//     },
//     {
//         id: 4,
//         tabTitle: 'Tab 4',
//         title: 'Title 4',
//         content: 'Minim in dolor do fugiat laborum duis labore consectetur. Amet ut sint ipsum dolor ad nostrud commodo sunt veniam enim aliquip nulla sint ullamco. Do cupidatat et quis laborum esse est commodo. Commodo sunt consectetur do consequat minim occaecat id magna ullamco consequat irure.'
//     }
// ];

const fetchTabData = async () => {
  const response = await fetch("https://loripsum.net/api/10/short");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.text();
};

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [1, 2, 3, 4];

  const { data, error, isLoading } = useQuery({
    queryKey: ["tabData", selectedTab],
    queryFn: fetchTabData,
    cacheTime: 1000 * 60 * 10,
  });

  return (
    <div className="container">
      <div className="tab">
        {tabs.map((tab, index) => (
          <span
            key={index}
            onClick={() => setSelectedTab(index)}
            className={selectedTab === index ? "active-tab" : ""}
          >
            Tab {tab}
          </span>
        ))}
      </div>

      <div className="content">
        <h3>Title {tabs[selectedTab]}</h3>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading data: {error.message}</p>
        ) : (
          <p>{data || "No content available"}</p>
        )}
      </div>
    </div>
  );
};

export default Tabs;
