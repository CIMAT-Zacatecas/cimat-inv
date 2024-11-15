import { ROLES } from "@/constants/Roles";

const getRoleName = (roleId: number) => {
  switch (roleId) {
    case ROLES.ADMIN:
      return "Administrador";
    case ROLES.USER:
      return "Usuario";
    default:
      return "Desconocido";
  }
};

export { getRoleName };
