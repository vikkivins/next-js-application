import { NextResponse } from "next/server";

const BASE_URL = "https://covid19-brazil-api.now.sh/api/report/v1";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const uf = searchParams.get("uf");
  const date = searchParams.get("date");
  const type = searchParams.get("type");
  const country = searchParams.get("country");

  try {
  // Lista os estados, mesmo sem parâmetros
  if (!date && !type && !country) {
    const response = await fetch(BASE_URL);
    const json = await response.json();
    return NextResponse.json(json.data);
  }

  // Lista os países, mesmo sem parâmetros
  if (type === "countries"){
    const response = await fetch(`${BASE_URL}/countries`);
    const json = await response.json();
    return NextResponse.json(json.data ?? null);
  }

  // Pega os dados de acordo com o país selecionado
  if (country){
    const response = await fetch(`${BASE_URL}/${country}`);
    const json = await response.json();
    return NextResponse.json(json.data ?? null);
  }

  // Pega os dados de acordo com a data e o estado selecionados
  if (date) {
    const response = await fetch(`${BASE_URL}/brazil/${date}`);
    const json = await response.json();

    let data = json.data;
    // Filtra por UF específica se precisar
    if (uf) {
      data = data.find(
        (item:any) => item.uf.toLowerCase() === uf.toLowerCase()
      );
    }

    return NextResponse.json(data ?? null);

  }

    return NextResponse.json(null);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar dados do COVID" },
      { status: 500 }
    );
  }
}

// Código parecido com o de services, mas a diferença é que esse aqui se comunica diretamente com a API.
// Serve pra não expor a URL da API diretamente no cliente