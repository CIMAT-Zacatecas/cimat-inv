import { ROLES } from "@/constants/Roles";

const getRoleName = (roleId: number) => {
  switch (roleId) {
    case ROLES.ADMIN:
      return "Administrador";
    case ROLES.RESEARCHER:
      return "Investigador";
    case ROLES.USER:
      return "Alumno";
    default:
      return "Desconocido";
  }
};

export { getRoleName };
