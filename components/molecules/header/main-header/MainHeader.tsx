import Link from "next/link";
import Image from "next/image";

import MainHeaderBackground from "./MainHeaderBackground";
import logoImg from "@/public/assets/logo.png";
import classes from "./main-header.module.css";
import NavLink from "./nav-link/NavLink";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
     
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image
            src={logoImg}
            alt="A plate with food on it"
            quality={100}
            priority
          />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
