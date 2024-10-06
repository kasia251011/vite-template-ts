import LoginForm from "@/components/user/LoginForm";
import Logo from "@/assets/logo-ipsum.svg";

const LoginPage = () => {
  return (
    <div className="flex h-dvh justify-center items-center bg-blue-100">
      <div className="max-w-[400px] w-full bg-white p-7 rounded-lg border-slate-200">
        <div className="flex flex-col items-center text-center">
          <img src={Logo} alt="logo" className="w-20 mb-4" />
          <h1 className="text-center mb-2 text-xl font-bold ">
            Witaj w naszej aplikacji!
          </h1>
          <p className="mb-12 text-slate-700 text-sm">
            Zaloguj się aby móc skorzystać z naszych usług.
          </p>
        </div>
        <LoginForm />
        <div className="flex flex-col mt-10 text-xs text-center">
          <p className=" ">Nie możesz się zalogować? </p>
          <a href="" className="text-blue-600">
            Skontaktuj się z administratorem
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
