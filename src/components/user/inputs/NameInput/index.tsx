import { UserName } from "@/types/user";
import { Form, Input, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const NameInput = (inputProps: InputProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext<UserName>();

  return (
    <Form.Item
      label="Imię"
      validateStatus={errors.name ? "error" : ""}
      layout="vertical"
      help={errors.name ? errors.name.message : ""}
      required>
      <Controller
        control={control}
        name="name"
        rules={{
          required: "To pole jest wymagane",
          maxLength: { value: 50, message: "Imię nie może przekraczać 50 znaków" }
        }}
        render={({ field }) => <Input {...field} {...inputProps} />}
      />
    </Form.Item>
  );
};

export default NameInput;
