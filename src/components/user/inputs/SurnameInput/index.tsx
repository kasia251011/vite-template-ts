import { UserSurname } from "@/types/user";
import { Form, Input, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const SurnameInput = (inputProps: InputProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext<UserSurname>();

  return (
    <Form.Item
      label="Nazwisko"
      validateStatus={errors.surname ? "error" : ""}
      layout="vertical"
      help={errors.surname ? errors.surname.message : ""}
      required>
      <Controller
        control={control}
        name="surname"
        rules={{
          required: "To pole jest wymagane",
          maxLength: { value: 50, message: "Nazwisko nie może przekraczać 50 znaków" }
        }}
        render={({ field }) => <Input {...field} {...inputProps} />}
      />
    </Form.Item>
  );
};

export default SurnameInput;
