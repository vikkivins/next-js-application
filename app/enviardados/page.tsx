"use client";
import Link from "next/link";
import { useEnviarDados } from "./useEnviarDados";
import styles from "./formularioDados.module.css";
import Image from "next/image";
import { useState } from "react";

export default function FormularioDados() {
  const {
    formData,
    estados,
    showSuccess,
    handleChange,
    handleSubmit,
    handleNovosDados,
    formatDate,
    isFormValid,
    dateError,
    apiResponse
  } = useEnviarDados();

  const [showJson, setShowJson] = useState(false);

  if (showSuccess) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.headerContent}>
            <Image
                src="/Covid19.png"
                alt="Consulta de dados Covid 19"
                width={250}
                height={130}
                priority
                className={styles.logo}
              />
          </div>

          <div className={styles.successCard}>
            <h2 className={styles.successTitle}>
              Dados enviados com sucesso
            </h2>

            <div className={styles.successContent}>
              <p><strong>Estado:</strong> {formData.estado || "{ valor }"}</p>
              <p><strong>Data:</strong> {formatDate(formData.data) || "{ valor }"}</p>
              <p><strong>Nº de casos:</strong> {formData.numCasos || "{ valor }"}</p>
              <p><strong>Nº confirmados:</strong> {formData.numConfirmados || "{ valor }"}</p>
              <p><strong>Nº Mortos:</strong> {formData.numMortos || "{ valor }"}</p>
              <p><strong>Nº Recuperados:</strong> {formData.numRecuperados || "{ valor }"}</p>
            </div>

            <button
              onClick={() => setShowJson(prev => !prev)}
              className={`${styles.button} ${styles.buttonOutline}`}
            >
              {showJson ? "Ocultar JSON" : "Ver resposta em JSON"}
            </button>

            {showJson && apiResponse && (
              <pre className={styles.jsonBox}>
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            )}


          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={handleNovosDados}
              className={`${styles.button} ${styles.buttonOutline}`}
            >
              Enviar novos dados
            </button>
            <Link href="/">
              <button
                className={`${styles.button} ${styles.buttonOutline}`}
              >
                Voltar ao início
              </button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
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

        <p className={styles.descriptionText}>
          Colabore com a contagem de casos de COVID19 no Brasil preenchendo o formulário abaixo.
        </p>

        <div className={styles.formContainer}>
          <div className={styles.formSection}>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Estado:</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Selecione um estado do Brasil...</option>
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Data:</label>
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  min="2019-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  className={`${styles.input} ${dateError ? styles.inputError : ""}`}
                />
              {dateError && (
                <span className={styles.errorText}>
                  {dateError}
                </span>
              )}
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Nº de casos:</label>
                <input
                  type="text"
                  name="numCasos"
                  value={formData.numCasos}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Nº Confirmados:</label>
                <input
                  type="text"
                  name="numConfirmados"
                  value={formData.numConfirmados}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Nº Mortos:</label>
                <input
                  type="text"
                  name="numMortos"
                  value={formData.numMortos}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Recuperados:</label>
                <input
                  type="text"
                  name="numRecuperados"
                  value={formData.numRecuperados}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`${styles.button} ${
                isFormValid() ? styles.buttonPrimary : styles.buttonDisabled
              }`}
            >
              Enviar
            </button>

            <Link href="/">
              <button
                className={`${styles.button} ${styles.buttonSecondary}`}
              >
                Cancelar e voltar
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
