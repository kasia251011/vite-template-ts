import { Button, Form, notification } from "antd";
import { FormProvider, useForm } from "react-hook-form";

import { useAppDispatch } from "@/redux/hooks";
import { setAuthToken } from "@/redux/slice/auth";
import { useNavigate } from "react-router-dom";
import PATHS from "@/router/paths";
import { useActivateAccountMutation } from "@/redux/api/authApi";
import { ActivateAccountFormSchema, UserBase } from "@/types/user";
import EmailInput from "@/components/user/inputs/EmailInput";
import PasswordInput from "@/components/user/inputs/PasswordInput";
import ConfirmPasswordInput from "../inputs/ConfirmPasswordInput";
import { useEffect } from "react";
import PhoneNumberInput from "../inputs/PhoneNumberInput";

interface ActivateAccountFormProps {
  accountData: Omit<UserBase, "role">;
  activateToken: string;
}

const ActivateAccountForm = ({
  accountData,
  activateToken,
}: ActivateAccountFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activateAccount] = useActivateAccountMutation();

  const formMethods = useForm<ActivateAccountFormSchema>({
    defaultValues: {
      name: accountData.name,
      surname: accountData.surname,
      phone: accountData.phone,
      email: accountData.email,
    },
  });

  const onSubmit = ({
    password,
    phone,
    confirmPassword,
  }: ActivateAccountFormSchema) => {
    if (password !== confirmPassword) {
      formMethods.setError("confirmPassword", {
        message: "Hasła nie są takie same",
      });
      return;
    }

    activateAccount({ password, phone, activateToken: activateToken })
      .unwrap()
      .then(({ accessToken }) => {
        dispatch(setAuthToken(accessToken ?? ""));
        navigate(PATHS.HOME);
      })
      .catch((error) => {
        notification.error({
          message: "Nie udało się aktywować konta",
          description: error.data?.message,
        });
      });
  };

  useEffect(() => {
    formMethods.reset(accountData);
  }, [accountData, formMethods]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full">
          <EmailInput disabled={true} size="large" />
          <PhoneNumberInput size="large" />
          <PasswordInput validate size="large" />
          <ConfirmPasswordInput size="large" />
          <Form.Item>
            <Button
              className="w-full"
              type="primary"
              size="large"
              htmlType="submit"
            >
              Aktywuj konto
            </Button>
          </Form.Item>
        </div>
      </form>
    </FormProvider>
  );
};

export default ActivateAccountForm;
