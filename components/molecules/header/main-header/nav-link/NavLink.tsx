"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import classes from "./nav-link.module.css";

export interface INavLinkProps {
  href: string;
  children: ReactNode;
}

export default function NavLink({ href, children }: INavLinkProps) {
  const path = usePathname();

  const isRouteActive = (): string => {
    return path.startsWith(href)
      ? `${classes.link} ${classes.active}`
      : classes.link;
  };

  return (
    <Link href={href} className={isRouteActive()}>
      {children}
    </Link>
  );
}
