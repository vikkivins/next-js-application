import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          Consulta de Dados Covid19 - Copyright © {currentYear} - Todos os Direitos Reservados.
        </p>
      </div>
    </footer>
  );
}