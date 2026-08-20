const elementoHora = document.getElementById("hora-atualizacao");

const agora = new Date();
const horas = agora.getHours().toString().padStart(2, "0");
const minutos = agora.getMinutes().toString().padStart(2, "0")

elementoHora.textContent = `às ${horas}:${minutos}`;

const container = document.getElementById("lista-noticias");

fetch("noticias.json")
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
    dados.itens.forEach(function (noticia) {
      container.innerHTML += `
        <article class="noticia">
          <p class="categoria">${noticia.categoria}</p>
          <h2>${noticia.titulo}</h2>
          <p class="resumo">${noticia.resumo}</p>
          <a href="${noticia.link}">Leia mais →</a>
        </article>
      `;
    });
  })
  .catch(function (erro) {
    console.error("Não foi possível carregar as notícias:", erro);
  });