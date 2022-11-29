import { User } from "firebase/auth";
export type stripeRole = "premium" | "basic" | "premium4k"  | null;

export const getUserRole = async (user: User) => {
  if (!user) {
    return null;
  }
  const {
    claims: { stripeRole },
  } = await user.getIdTokenResult();
  return stripeRole as stripeRole;
};
