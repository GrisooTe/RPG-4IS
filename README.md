# Os Quatro Ís — site oficial do projeto (versão inicial)

Uma edição web editorial e minimalista, pensada para GitHub Pages. Sem backend, sem biblioteca externa e sem necessidade de compilar.

## O que funciona

- Página inicial responsiva e apresentação do projeto.
- Biblioteca de assuntos com navegação e busca local (a busca alcança o índice, **não** o texto do PDF).
- Páginas editoriais sobre temas do sistema, claramente identificadas como **não normativas**.
- Leitor do PDF oficial, ativado assim que o arquivo correto for incluído.
- Alternância entre temas claro e escuro, navegação em celular e acesso por teclado.

## Manual oficial — v3.0.1 (42 páginas)

O PDF **Os_Quatro_Is_Livro_de_Regras_v3_0_1_Sumario_Corrigido.pdf** está incluído integralmente em `assets/` e é a fonte normativa. O conteúdo do site foi atualizado para espelhar o sumário do documento original, inclusive as seções 02A, 02B, 03A, 03B, 03C, 05A, 06A e 07A. As notas e resumos editoriais não substituem o texto completo das regras.

A pesquisa do site também consulta o texto extraído de todas as 42 páginas por meio de `rules-search.js` e oferece links para abrir a página do PDF; não substitui a leitura do original.

## Publicação no GitHub Pages

Na conta GitHub `GrisooTe`:

1. Use o repositório já conectado [RPG-4IS](https://github.com/GrisooTe/RPG-4IS).
2. Extraia o ZIP e envie **os arquivos e pastas de dentro da pasta** para a raiz do repositório; o `index.html` precisa ficar diretamente na raiz, não em uma subpasta.
3. Abra **Settings → Pages → Build and deployment**.
4. Em **Source**, escolha **Deploy from a branch**; em **Branch**, selecione `main` e `/(root)`; clique em **Save**.
5. Quando o GitHub publicar, o endereço esperado será `https://grisoote.github.io/RPG-4IS/` (o endereço efetivo é mostrado em Settings → Pages).

Documentação: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

> O GitHub Pages hospeda arquivos estáticos. A versão atual não oferece contas, fichas salvas na nuvem ou campanhas compartilhadas. O tema escuro é salvo **somente no navegador**.

## Prévia local

Abra um terminal na pasta do projeto e execute:

```bash
python -m http.server 8000
```

Depois abra http://localhost:8000. O servidor local é recomendado para verificar a presença do PDF corretamente.

## Arquivos

- `index.html` — estrutura HTML e metadados.
- `styles.css` — identidade visual e responsividade.
- `app.js` — rotas, índice do sumário e busca.
- `rules-search.js` — índice de pesquisa textual extraído do PDF original.
- `assets/Os_Quatro_Is_Livro_de_Regras_v3_0_1_Sumario_Corrigido.pdf` — livro de regras oficial na íntegra.
- `assets/favicon.svg` — ícone do projeto.
- `assets/LEIA-ME.txt` — instruções para o PDF.
- `.nojekyll` — compatibilidade com publicação direta no GitHub Pages.

## Próximo passo editorial

Revisar a experiência de leitura e acrescentar futuras ferramentas interativas sem alterar o texto oficial do manual.

© Autor de Os Quatro Ís. Material do RPG e sua documentação reservados ao titular dos direitos. Nenhuma licença de reutilização é concedida por este pacote.

## Ficha interativa de criação de personagens (v1.0)

Acesse `personagem.html` no GitHub Pages. A ferramenta segue os capítulos 02, 02A e 02B do manual oficial 3.0.1, calcula atributos e recursos iniciais, registra uma única rolagem acadêmica e salva localmente o rascunho. É possível exportar JSON e imprimir ou salvar a ficha em PDF pelo navegador. Não requer login nem altera o PDF oficial.
