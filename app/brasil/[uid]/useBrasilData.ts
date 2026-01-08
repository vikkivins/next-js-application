"use client";

import { useEffect, useState } from "react";
import { getCovidDataByStateAndDate, getCovidDataByCountry, getStates } from "../../services/covid";

type Region = {
  label: string; // nome do estado
  value: string; // sigla (SP, RJ, etc)
};

type CovidData = {
  casos: number;
  mortes: number;
  suspeitas: number;
  regiao: string;
  periodo: string;
};

export function useBrasilData() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [covidData, setCovidData] = useState<CovidData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadStates() {
      const data = await getStates();
      const states = data.map((item: any) => ({
      label: item.state,
      value: item.uf, 
    }));

    setRegions([
      { label: "Brasil", value: "BR" },
      ...states, ]);
  }

    loadStates();
  }, []);

  async function handleSearch() {
    if (!selectedRegion || !selectedDate) return;

    setLoading(true);
    setNoDataMessage(null);

    try {
      if (selectedRegion === "BR") {
        const data = await getCovidDataByCountry("brazil");

        if(!data || Object.keys(data).length === 0) {
          setCovidData(null);
          setNoDataMessage("Não existe relatório para essa data.");
          return;
        }

        setCovidData({
          casos: data.cases,
          mortes: data.deaths,
          suspeitas: data.suspects,
          regiao: "Brasil",
          periodo: selectedDate,
        });

        return;
      }

      const data = await getCovidDataByStateAndDate(
        selectedRegion,
        selectedDate
      );

      if (!data || Object.keys(data).length === 0) {
        setCovidData(null);
        setNoDataMessage("Não existe relatório para essa data.");
        return;
      }

      setCovidData({
        casos: data.cases,
        mortes: data.deaths,
        suspeitas: data.suspects,
        regiao: data.uf,
        periodo: selectedDate,
      });
    } catch {
      setCovidData(null);
      setNoDataMessage("Erro ao consultar os dados.");
    } finally {
      setLoading(false);
    }
  }

  return {
    regions,
    covidData,
    selectedRegion,
    setSelectedRegion,
    selectedDate,
    setSelectedDate,
    loading,
    noDataMessage,
    handleSearch,
  };
}