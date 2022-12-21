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
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []); //컴포넌트 처음 마운트될때 시작
  return (
    <>
      {init ? (
        //<AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "initalizing..."
      )}
      <footer>&copy {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
