# BioSCOFF

Uma bio page moderna com visual cinematografico, efeitos 3D, fundo animado, links sociais e player de musica.

## Visao geral

Este projeto foi pensado para funcionar como uma pagina de apresentacao pessoal com mais impacto visual do que uma bio tradicional. A interface usa um estilo glassmorphism com atmosfera espacial, profundidade nos cards, animacoes suaves e um player integrado para deixar a experiencia mais imersiva.

## Destaques

- Fundo animado com estrelas e nebulas
- Cards com efeito 3D e resposta ao mouse
- Links sociais com estilo premium
- Player de musica com playlist e barra de progresso
- Estrutura simples em HTML, CSS e JavaScript puro
- Layout responsivo para desktop e mobile

## Estrutura do projeto

```text
BioSCOFF/
|-- index.html
|-- style.css
|-- script.js
`-- .gitignore
```

## Personalizacao

As principais alteracoes podem ser feitas no topo de `script.js`.

No objeto `profile` voce pode trocar:

- nome
- bio
- badge
- avatar
- capa
- links de redes sociais
- tags e textos dos cards

No array `tracks` voce pode trocar:

- titulos
- artistas
- links das musicas
- paleta visual de cada faixa

## Como usar

1. Clone o repositorio:

```bash
git clone https://github.com/scoffyt/BioSCOFF.git
```

2. Entre na pasta:

```bash
cd BioSCOFF
```

3. Abra o `index.html` no navegador.

Se quiser editar, basta abrir os arquivos no seu editor favorito e atualizar os dados da bio conforme seu estilo.

## Stack

- HTML5
- CSS3
- JavaScript Vanilla

## Ideias para proximos upgrades

- Integracao com Spotify
- Avatar e banner personalizados
- Loader de entrada
- Tema alternativo claro/escuro
- Publicacao com GitHub Pages

## Licenca

Este projeto esta livre para uso e personalizacao.
