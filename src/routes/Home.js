import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  console.log(userObj);
  const [nweets, setNweets] = useState([]);
  //구식의 방법
  //   const getNweets = async () => {
  //     const dbNweets = await dbService.collection("nweets").get();
  //     dbNweets.forEach((document) => {
  //       const nweetObject = {
  //         ...document.data(),
  //         id: document.id,
  //       };
  //       setNweets((prev) => [nweetObject, ...prev]);
  //     });
  //   };
  useEffect(() => {
    //getNweets();
    dbService.collection("nweets").onSnapshot((snapshot) => {
      //re render하지 않기 때문에 foreach방법보다 좋다.(더빠름)
      //snapshop을 사용하기 떄문에 실시간이 됨. => 어떻게? effect의 배열이 없는데..
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
