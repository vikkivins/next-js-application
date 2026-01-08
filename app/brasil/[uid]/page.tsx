"use client";

import { useBrasilData } from "./useBrasilData";
import styles from "./brasilData.module.css";
import { formatNumber, formatDate } from "../../components/utils/formatNumber";


export default function BrasilData() {
  const {
    regions,
    covidData,
    selectedRegion,
    setSelectedRegion,
    selectedDate,
    setSelectedDate,
    loading,
    noDataMessage,
    handleSearch,
  } = useBrasilData();

  return (
    <div className={styles.container}>
      <div className={styles.blurContainer}>
        <main className={styles.main}>

          <p className={styles.descriptionText}>
            Consulte os dados de Covid19 abaixo, selecionando estado e período desejados.
          </p>

          {/* Filters */}
          <div className={styles.filtersContainer}>
            {/* Região */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Região:</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className={styles.select}
              >
                <option value="">Selecione uma região do Brasil...</option>
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Período */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Período:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>

            {/* Botão de ação */}
            <button
              onClick={handleSearch}
              disabled={!selectedRegion || !selectedDate}
              className={`${styles.searchButton} ${
                selectedRegion && selectedDate
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
                Situação do COVID19 na região{" "}
                <span className={styles.statusTextBold}>{covidData.regiao}</span> no período{" "}
                <span className={styles.statusTextBold}>{formatDate(covidData.periodo)}</span>
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
            {/* Casos Confirmados */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.iconCircle} ${styles.iconCircleRed}`}>
                  <svg className={`${styles.icon} ${styles.iconBell}`} fill="currentColor" viewBox="0 0 20 20">
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
                  <svg className={`${styles.icon} ${styles.iconCross}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 1h4v8h7v4h-7v10h-4V13H3V9h7V1z"/>
                  </svg>
                </div>
                <span className={styles.statLabel}>Mortes</span>
              </div>
              <p className={styles.statValue}>
                {formatNumber(covidData?.mortes)}
              </p>
            </div>

            {/* Suspeitas */}
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.iconCircle} ${styles.iconCircleYellow}`}>
                  <span className={`${styles.icon} ${styles.iconQuestion}`}>?</span>
                </div>
                <span className={styles.statLabel}>Suspeitas</span>
              </div>
              <p className={styles.statValue}>
                {formatNumber(covidData?.suspeitas)}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}