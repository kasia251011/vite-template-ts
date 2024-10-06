import { UserPhone } from "@/types/user";
import { Form, Input, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const PhoneNumberInput = (inputProps: InputProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext<UserPhone>();

  return (
    <Form.Item
      label="Numer telefonu"
      validateStatus={errors.phone ? "error" : ""}
      layout="vertical"
      help={errors.phone ? errors.phone.message : ""}>
      <Controller
        control={control}
        name="phone"
        rules={{
          maxLength: {
            value: 9,
            message: "Numer telefonu nie może może zawierać więcj niż 9 cyfr"
          },
          minLength: { value: 7, message: "Numer nie może może zawierać mniej niż 7 cyfr" }
        }}
        render={({ field }) => <Input {...field} {...inputProps} />}
      />
    </Form.Item>
  );
};

export default PhoneNumberInput;
