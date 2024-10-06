import { FormProvider, useForm } from "react-hook-form";

import { useAppDispatch } from "@/redux/hooks";
import { setAuthToken } from "@/redux/slice/auth";
import { useNavigate } from "react-router-dom";
import PATHS from "@/router/paths";
import { useLoginMutation } from "@/redux/api/authApi";
import { LoginSchema } from "@/types/user";
import EmailInput from "@/components/user/inputs/EmailInput";
import PasswordInput from "@/components/user/inputs/PasswordInput";
import { Alert, Button } from "antd";
import { useState } from "react";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const formMethods = useForm<LoginSchema>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = ({ email, password }: LoginSchema) => {
    login({ email, password })
      .unwrap()
      .then(({ accessToken }) => {
        dispatch(setAuthToken(accessToken ?? ""));
        navigate(PATHS.HOME);
      })
      .catch((error) => {
        setErrorMessage(error.data.message);
      });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full">
          <EmailInput size="large" minimal={true} />
          <PasswordInput minimal size="large" />
          {errorMessage && (
            <Alert
              message="Błąd w logowaniu"
              description={errorMessage}
              type="error"
              className="mb-4"
            />
          )}
          <Button type="primary" htmlType="submit" size="large">
            Zaloguj się
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
