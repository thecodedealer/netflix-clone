import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  const isLogin = pathname === "/login";

  return (
    <header className="px-52 py-8 flex items-center justify-between">
      <Image src="/logo--netflix.svg" alt="Logo" width={150} height={50} />

      <Button variant={"brand-primary"}>
        <Link href={isLogin ? "/register" : "/login"}>
          {isLogin ? "Create an Account" : "Sign In"}
        </Link>
      </Button>
    </header>
  );
}

export default Header;
