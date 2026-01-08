export function formatNumber(value?: number) {
  if (value === undefined || value === null) return "--";

  return new Intl.NumberFormat("pt-BR").format(value);
}

export function formatDate(date?: string) {
  if (!date) return "--";

  // espera YYYY-MM-DD
  const [year, month, day] = date.split("-");

  return `${day}-${month}-${year}`;
}


