import React, { useEffect, useState } from "react";
import { authService } from "fBase";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false); //아주 맨처음에는 firebase로딩전에 값을 가져오기때문에 늘 로그아웃상태임.
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        // setUserObj(user);

        //firebase언어를 react 언어로 연결시켜줌.
        //더 작은 object로 만들어서 리액트 판단을 쉽게 만들어줌.
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        //setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []); //컴포넌트 처음 마운트될때 시작
  const refreshUser = () => {
    const user = authService.currentUser; //더 작은 object로 만들어서 리액트 판단을 쉽게 만들어줌.
    //setUserObj(Object.assign({}, user)); // 사본을 원본으로 같이 만듬. 리액트는 {}오 ! 새로운 오브젝트잖아? 하고 새로 랜더링함. 이상한 오류많이남.
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    }); //react.js의 userinfo를 firebase의 userinfo로 업데이트.
  };
  return (
    <>
      {init ? (
        //<AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "initalizing..."
      )}
      {/* <footer>&copy {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
