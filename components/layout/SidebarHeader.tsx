import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import SignOutButton from "../auth/SignOut";
import LoginButton from "../auth/LoginButton";
import { cookies } from "next/headers";
import { getCurrentUser } from "../../util/getCurrentUser";


async function SidebarHeader() {
  const nextCookies = cookies();
  const cookie = nextCookies.get("token")?.value;
  const userData = cookie && (await getCurrentUser(cookie));
  if (userData) {
    return (
      <div className="w-full bg-darkest">
        <Link href={"/"}>
          <h2 className="font-bold text-3xl text-white text-center my-6 hidden md:block">
            Ravely<span className="text-red">.</span>
          </h2>
          <Image
            src={Logo}
            alt="Ravly Logo"
            className="rounded-md w-14 md:hidden my-6 "
          />
        </Link>
        <h2>{userData.email}</h2>
        <SignOutButton />
      </div>
    );
  }
  return (
    <div className="w-full bg-blue-500">
      <Link href={"/"}>
        <h2 className="font-bold text-3xl text-white text-center my-6 hidden md:block">
          Ravely<span className="text-red">.</span>
        </h2>
        <Image
          src={Logo}
          alt="Ravly Logo"
          className="rounded-md w-14 md:hidden my-6 "
        />
      </Link>
      <LoginButton />
      <SignOutButton />
    </div>
  );
}

export default SidebarHeader;
