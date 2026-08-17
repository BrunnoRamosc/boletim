const elementoHora = document.getElementById("hora-atualizacao");

const agora = new Date();
const horas = agora.getHours().toString().padStart(2, "0");
const minutos = agora.getMinutes().toString().padStart(2, "0")

elementoHora.textContent = `às ${horas}:${minutos}`;

const noticias = [
    {
     categoria: "Tecnologia",
     titulo: "Título da primeira notícia vai aqui",
     resumo: "Um resumo curto explicando do que se trata essa notícia",
     link: "#"

    },
    {
    categoria: "Economia",
    titulo: "Título da segunda notícia vai aqui",
    resumo: "Outro resumo curto de exemplo.",
    link: "#"
  },
  {
    categoria: "Esportes",
    titulo: "Título da terceira notícia vai aqui",
    resumo: "Mais um resumo de teste, pra confirmar que o loop funciona.",
    link: "#"
  }
];    

const container = document.getElementById("lista-noticias");

noticias.forEach(function (noticia) {
  container.innerHTML += `
    <article class="noticia">
      <p class="categoria">${noticia.categoria}</p>
      <h2>${noticia.titulo}</h2>
      <p class="resumo">${noticia.resumo}</p>
      <a href="${noticia.link}">Leia mais →</a>
    </article>
  `;
});
