import { IBabysitterUser, IParentUser } from "./LoginInterfaces";

export const formatUser = (data: IParentUser | IBabysitterUser) => {
  const { email, role } = data;
  if (role === "parents") {
    const { parent_id: id, parent_name: name } = data as IParentUser;
    return { id, email, name, role };
  } else {
    const { babysitter_id: id, babysitter_name: name } =
      data as IBabysitterUser;
    return { id, email, name, role };
  }
};
