"use client";

import { useMundoData } from "./useMundoData";
import styles from "./mundoData.module.css";
import { formatNumber } from "../../components/utils/formatNumber";


export default function MundoData() {
  const {
    countries,
    selectedCountry,
    setSelectedCountry,
    covidData,
    loading,
    noDataMessage,
    handleSearch,
  } = useMundoData();

  return (
    <div className={styles.container}>
      <div className={styles.blurContainer}>
        <main className={styles.main}>

          <p className={styles.descriptionText}>
            Consulte os dados de Covid19 abaixo, selecionando o país desejado.
          </p>

          {/* Filtro */}
          <div className={styles.filterGroup}>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className={styles.select}
            >
              <option value="">Selecione um país...</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              disabled={!selectedCountry}
              className={`${styles.searchButton} ${
                selectedCountry
                  ? styles.searchButtonActive
                  : styles.searchButtonDisabled
              }`}
            >
              {loading ? "Consultando..." : "Consultar dados"}
            </button>

            </div>

          {/* Status info */}
          <div className={styles.statusContainer}>
            {covidData && (
              <p className={styles.statusText}>
                Situação do COVID19 em{" "}
                <span className={styles.statusTextBold}>{covidData.pais}</span>
              </p>
            )}

            {!covidData && noDataMessage && (
              <p className={styles.warningText}>
                ⚠️ {noDataMessage}
              </p>
            )}
          </div>

          {/* Statistics Cards */}
          <div className={styles.statsContainer}>
            {/* Casos */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.iconCircle} ${styles.iconCircleRed}`}>
                  <svg
                    className={`${styles.icon} ${styles.iconBell}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <span className={styles.statLabel}>Casos</span>
              </div>
              <p className={styles.statValue}>
                {formatNumber(covidData?.casos)}
              </p>
            </div>

            {/* Mortes */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.iconCircle} ${styles.iconCircleBlack}`}>
                  <svg
                    className={`${styles.icon} ${styles.iconCross}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 1h4v8h7v4h-7v10h-4V13H3V9h7V1z" />
                  </svg>
                </div>
                <span className={styles.statLabel}>Mortes</span>
              </div>
              <p className={styles.statValue}>
                {formatNumber(covidData?.mortes)}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}