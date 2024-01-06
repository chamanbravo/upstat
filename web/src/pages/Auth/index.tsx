/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
// import RedirectOnAuthSuccess from "@/components/RedirectOnAuthSuccess";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function index() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    // <RedirectOnAuthSuccess>
    <div className="mt-4 px-4 flex justify-center items-center  md:h-[100vh] md:mt-0 md:px-0">
      {isLogin ? (
        <LoginForm onSignUpURLClick={() => setIsLogin(false)} />
      ) : (
        <RegisterForm
          onLoginURLClick={() => setIsLogin(true)}
          onRegister={() => setIsLogin(true)}
        />
      )}
    </div>
    // </RedirectOnAuthSuccess>
  );
}
