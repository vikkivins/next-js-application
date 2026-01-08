// Lista todos os estados
export async function getStates() {
  const res = await fetch("/api/covid");
  return res.json();
}

// Pega os dados de acordo com a data e o estado selecionados
export async function getCovidDataByStateAndDate(
  uf: string,
  date: string
) {
  const formattedDate = date.replaceAll("-", "");
  const res = await fetch(
    `/api/covid?uf=${uf}&date=${formattedDate}`
  );
  return res.json();
}

// Lista de todos os países
export async function getCountries() {
  const res = await fetch("/api/covid?type=countries");
  return res.json();
}

// Dados de acordo com o país selecionado
export async function getCovidDataByCountry(country: string) {
  const res = await fetch(`/api/covid?country=${country}`);
  return res.json();
}




// Código parecido com o route, mas a diferença é que esse aqui se comunica com o cliente.
// Serve pra não expor a URL da API diretamente no cliente