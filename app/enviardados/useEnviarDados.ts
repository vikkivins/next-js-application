"use client";

import { useState } from "react";

export function useEnviarDados() {
  const [formData, setFormData] = useState({
    estado: "",
    data: "",
    numCasos: "",
    numConfirmados: "",
    numMortos: "",
    numRecuperados: ""
  });

  const [apiResponse, setApiResponse] = useState<any>(null);

  const [dateError, setDateError] = useState<string | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  
  const estados = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins"
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === "data") {
      if (!isDateValid(value)) {
        setDateError("Data inválida. Selecione uma data entre 2019 e hoje.");
      } else {
        setDateError(null);
      }
    }
  };

  const handleSubmit = () => {
    const response = buildApiResponse();
    setApiResponse(response);
    setShowSuccess(true);
  };

  const handleNovosDados = () => {
    setFormData({
      estado: "",
      data: "",
      numCasos: "",
      numConfirmados: "",
      numMortos: "",
      numRecuperados: ""
    });
    setApiResponse(null);
    setShowSuccess(false);
  };

  const isDateValid = (date: string) => {
    if (!date) return false;

    const selectedDate = new Date(date);
    const minDate = new Date("2019-01-01");
    const today = new Date();
    // Removendo hr pra evitar bugs
    selectedDate.setHours(0, 0, 0, 0);
    minDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selectedDate >= minDate && selectedDate <= today;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const isFormValid = () => {
    return (
      formData.estado !== "" &&
      isDateValid(formData.data) &&
      formData.data !== "" &&
      formData.numCasos !== "" &&
      formData.numConfirmados !== "" &&
      formData.numMortos !== "" &&
      formData.numRecuperados !== ""
    );
  };

  const buildApiResponse = () => {
    return {
      uid: Math.floor(Math.random() * 1000), // simulado
      uf: formData.estado.slice(0, 2).toUpperCase(),
      state: formData.estado,
      cases: Number(formData.numCasos),
      deaths: Number(formData.numMortos),
      suspects: 0,
      refuses: Number(formData.numRecuperados),
      datetime: new Date(formData.data).toISOString(),
    };
  };


  return {
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
  };
}
