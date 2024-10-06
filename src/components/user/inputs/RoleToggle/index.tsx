import UserRoleChip from "@/components/common/UserRoleChip";
import { UserRole } from "@/types/user";
import { useFormContext } from "react-hook-form";

const RoleToggle = ({ role }: { role: Omit<UserRole, "admin"> }) => {
  const { setValue, watch } = useFormContext();
  const activeRole = watch("role");

  return (
    <UserRoleChip
      role={role as UserRole}
      active={role === activeRole}
      minimal={false}
      onClick={() => {
        setValue("role", role);
      }}
    />
  );
};

export default RoleToggle;
