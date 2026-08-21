import feedparser
import json
from datetime import datetime
from bs4 import BeautifulSoup

fontes = [
    {"nome": "G1", "url": "https://g1.globo.com/rss/g1/", "categoria": "Geral"},
    {"nome": "BBC Brasil", "url": "https://www.bbc.com/portuguese/index.xml", "categoria": "Geral"},
    {"nome": "Agência Brasil", "url": "https://agenciabrasil.ebc.com.br/rss.xml", "categoria": "Geral"},
]

todas_noticias = []

cabecalhos = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
}

for fonte in fontes:
    feed = feedparser.parse(fonte["url"], request_headers=cabecalhos)

    print(f"--- {fonte['nome']} ---")
    print("status:", feed.get("status", "sem status"))
    print("bozo (teve erro?):", feed.bozo)
    print("quantidade de entradas:", len(feed.entries))

    for entrada in feed.entries[:10]:
        resumo_bruto = entrada.get("summary", "")
        resumo_limpo = BeautifulSoup(resumo_bruto, "html.parser").get_text().strip()

        noticia = {
            "categoria": fonte["categoria"],
            "titulo": entrada.get("title", "Sem título"),
            "resumo": resumo_limpo[:200],
            "link": entrada.get("link", "#"),
            "fonte": fonte["nome"],
        }
        todas_noticias.append(noticia)

print(f"Total de notícias coletadas: {len(todas_noticias)}")

saida = {
    "atualizadoEm": datetime.now().isoformat(),
    "itens": todas_noticias,
}

caminho_arquivo = "../noticias.json"

with open(caminho_arquivo, "w", encoding="utf-8") as arquivo:
    json.dump(saida, arquivo, ensure_ascii=False, indent=2)

print(f"Arquivo salvo em: {caminho_arquivo}")