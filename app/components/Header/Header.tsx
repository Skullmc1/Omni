"use client";
import { useEffect, useState } from "react";
import HeaderInitial from "./HeaderInitial";
import HeaderSticky from "./HeaderSticky";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled ? <HeaderSticky /> : <HeaderInitial />;
}
