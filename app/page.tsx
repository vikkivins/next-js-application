import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.blurContainer}>
        <main className={styles.main}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.logoWrapper}>
              <Image
                src="/Covid19.png"
                alt="Consulta de dados Covid 19"
                width={250}
                height={130}
                priority
                className={styles.logo}
              />
            </div>
          </div>
          
          <p className={styles.description}>
            Selecione a região da consulta de dados
          </p>

          <div className={styles.buttonGroup}>
            <Link href="/brasil/default">
              <button className={`${styles.button} ${styles.buttonPrimary}`}>
                BRASIL
              </button>
            </Link>
            <Link href="/mundo/default">
              <button className={`${styles.button} ${styles.buttonPrimary}`}>
                MUNDO
              </button>
            </Link>
          </div>

          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <span className={styles.dividerText}>ou</span>
            <div className={styles.dividerLine}></div>
          </div>

          <Link href="/enviardados">
            <button className={`${styles.button} ${styles.buttonSecondary}`}>
              Enviar novos dados
            </button>
          </Link>
        </main>
      </div>
    </div>
  );
}