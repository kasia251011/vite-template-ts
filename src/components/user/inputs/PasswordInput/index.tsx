import { ActivateAccountSchema } from "@/types/user";
import { Form, Input, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { LockOutlined } from "@ant-design/icons";

const formatValidation = {
  maxLength: { value: 100, message: "Hasło nie może przekraczać 100 znaków" },
  minLength: { value: 8, message: "Hasło musi mieć co najmniej 8 znaków" },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    message:
      "Hasło musi zawierać co najmniej jedną małą literę, jedną dużą literę, jedną cyfrę i jeden znak specjalny"
  }
};

interface PasswordInputProps extends InputProps {
  validate?: boolean;
  minimal?: boolean;
}

const PasswordInput = ({ minimal, validate, ...inputProps }: PasswordInputProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext<Pick<ActivateAccountSchema, "password">>();

  return (
    <Form.Item
      label={!minimal ? "Hasło" : undefined}
      validateStatus={errors.password ? "error" : ""}
      layout="vertical"
      help={errors.password ? errors.password.message : ""}
      required>
      <Controller
        control={control}
        name="password"
        rules={{
          required: "To pole jest wymagane",
          ...(validate ? formatValidation : {})
        }}
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            {...inputProps}
            prefix={minimal ? <LockOutlined /> : undefined}
            placeholder={minimal ? "Hasło" : undefined}
          />
        )}
      />
    </Form.Item>
  );
};

export default PasswordInput;
