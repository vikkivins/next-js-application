"use client";

import { useEffect, useState } from "react";
import { getCountries, getCovidDataByCountry } from "../../services/covid";

type CovidCountryData = {
  casos: number;
  mortes: number;
  recuperados: number;
  pais: string;
};

export function useMundoData() {
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [covidData, setCovidData] = useState<CovidCountryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadCountries() {
      const data = await getCountries();

      if (!Array.isArray(data)) {
        setCountries([]);
        return;
      }

      const list = data.map((item: any) => item.country);
      setCountries(list);
    }

    loadCountries();
  }, []);

  async function handleSearch() {
    if (!selectedCountry) return;

    setLoading(true);
    setNoDataMessage(null);

    try {
      const data = await getCovidDataByCountry(selectedCountry);

      if (!data || Object.keys(data).length === 0) {
        setCovidData(null);
        setNoDataMessage("Não existe relatório para esse país.");
        return;
      }

      setCovidData({
        casos: data.confirmed,
        mortes: data.deaths,
        recuperados: data.recovered,
        pais: data.country,
      });
    } catch {
      setCovidData(null);
      setNoDataMessage("Erro ao consultar os dados.");
    } finally {
      setLoading(false);
    }
  }

  return {
    countries,
    selectedCountry,
    setSelectedCountry,
    covidData,
    loading,
    noDataMessage,
    handleSearch,
  };
}
