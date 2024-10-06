import { UserEmail } from "@/types/user";
import { Form, Input, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { UserOutlined } from "@ant-design/icons";
interface EmailInputProps extends InputProps {
  minimal?: boolean;
}

const EmailInput = ({ minimal, ...inputProps }: EmailInputProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext<UserEmail>();

  return (
    <Form.Item
      label={!minimal ? "Adres email" : undefined}
      validateStatus={errors.email ? "error" : ""}
      layout="vertical"
      help={errors.email ? errors.email.message : ""}
      required>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "To pole jest wymagane",
          maxLength: { value: 50, message: "Email nie może przekraczać 50 znaków" },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Nieprawidłowy adres email"
          }
        }}
        render={({ field }) => (
          <Input
            {...field}
            {...inputProps}
            prefix={minimal ? <UserOutlined /> : undefined}
            placeholder={minimal ? "Adres email" : undefined}
          />
        )}
      />
    </Form.Item>
  );
};

export default EmailInput;
