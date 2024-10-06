import Logo from "@/assets/logo-ipsum.svg";
import ActivateAccountForm from "@/components/user/ActivateAccountForm";
import PATHS from "@/router/paths";
import { ActivateTokenPayload } from "@/types/user";
import { Button } from "antd";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useSearchParams } from "react-router-dom";

const TOKEN_EXPIRED = {
  title: "Link aktywacyjny wygasł",
  desc: "Skontaktuj się z administratorem w celu ponownego wysłania linku aktywacyjnego",
};

const WELCOME_MESSAGE = (fullName?: string) => {
  return {
    title: "Witaj w naszej aplikacji, " + fullName,
    desc: "Zostałeś przekierowany do strony aktywującej konto. Sprawdź czy wpisane dane są poprawne.",
  };
};

const ActivateAccountPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activateToken = searchParams.get("activateToken");
  const userData = jwtDecode<ActivateTokenPayload>(activateToken ?? "");

  return (
    <div className="flex h-dvh justify-center items-center bg-blue-100">
      <div className="max-w-[600px] w-full bg-white py-7 px-16 rounded-lg border-slate-200 flex flex-col ">
        <div className="flex flex-col items-center text-center">
          <img src={Logo} alt="logo" className="w-20 mb-4" />
          <h1 className="text-center mb-2 text-xl font-bold ">
            {userData
              ? WELCOME_MESSAGE(`${userData.name} ${userData.surname}`).title
              : TOKEN_EXPIRED.title}
          </h1>
          <p className="mb-6 text-slate-700 text-sm">
            {userData ? WELCOME_MESSAGE().desc : TOKEN_EXPIRED.desc}
          </p>
        </div>
        {userData && activateToken && (
          <ActivateAccountForm
            accountData={userData}
            activateToken={activateToken}
          />
        )}
        <div className=" flex flex-col text-xs text-center">
          <p className=" ">Masz już konto? </p>
          <Button
            type="link"
            size="small"
            className="text-xs"
            onClick={() => navigate(PATHS.LOGIN)}
          >
            Zaloguj się
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccountPage;
