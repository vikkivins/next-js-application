"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentPage = pathname.includes("/brasil") 
    ? "brasil" 
    : pathname.includes("/mundo") 
    ? "mundo"
    : pathname.includes("/enviardados")
    ? "enviardados"
    : "home";

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const renderLinks = (isMobile = false) => {
    if (currentPage === "home") return null;

    const linkClass = isMobile ? styles.sidebarLink : styles.link;
    
    return (
      <>
        {currentPage === "brasil" && (
          <>
            <Link href="/enviardados" className={linkClass} onClick={closeMenu}>
              Enviar Dados
            </Link>
            <Link href="/mundo/default" className={linkClass} onClick={closeMenu}>
              Mundo
            </Link>
            <Link href="/" className={linkClass} onClick={closeMenu}>
              Home
            </Link>
          </>
        )}
        
        {currentPage === "mundo" && (
          <>
            <Link href="/enviardados" className={linkClass} onClick={closeMenu}>
              Enviar Dados
            </Link>
            <Link href="/brasil/default" className={linkClass} onClick={closeMenu}>
              Brasil
            </Link>
            <Link href="/" className={linkClass} onClick={closeMenu}>
              Home
            </Link>
          </>
        )}

        {currentPage === "enviardados" && (
          <>
            <Link href="/brasil/default" className={linkClass} onClick={closeMenu}>
              Brasil
            </Link>
            <Link href="/mundo/default" className={linkClass} onClick={closeMenu}>
              Mundo
            </Link>
            <Link href="/" className={linkClass} onClick={closeMenu}>
              Home
            </Link>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.content}>
            {/* Logo */}
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/prosesmt.png"
                alt="Consulta de dados Covid 19"
                width={180}
                height={90}
                priority
                className={styles.logo}
              />
            </Link>

            {/* Desktop Nav Links */}
            {currentPage !== "home" && (
              <div className={styles.navLinks}>
                {renderLinks()}
              </div>
            )}

            {/* Mobile Menu Button */}
            {currentPage !== "home" && (
              <button 
                className={`${styles.menuButton} ${isOpen ? styles.open : ''}`}
                onClick={toggleMenu}
                aria-label="Menu"
              >
                <span className={styles.menuBar}></span>
                <span className={styles.menuBar}></span>
                <span className={styles.menuBar}></span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarLinks}>
          {renderLinks(true)}
        </div>
      </div>

      {/* Overlay */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={closeMenu}
      />
    </>
  );
}