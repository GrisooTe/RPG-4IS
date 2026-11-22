# Os Quatro Ís — site oficial do projeto (versão inicial)

Uma edição web editorial e minimalista, pensada para GitHub Pages. Sem backend, sem biblioteca externa e sem necessidade de compilar.

## O que funciona

- Página inicial responsiva e apresentação do projeto.
- Biblioteca de assuntos com navegação e busca local (a busca alcança o índice, **não** o texto do PDF).
- Páginas editoriais sobre temas do sistema, claramente identificadas como **não normativas**.
- Leitor do PDF oficial, ativado assim que o arquivo correto for incluído.
- Alternância entre temas claro e escuro, navegação em celular e acesso por teclado.

## Importante: o PDF é a fonte oficial

Este pacote **não inclui** `Os_Quatro_Is_Livro_de_Regras_v2_2.pdf` porque o arquivo não estava disponível para a montagem. Não foram inventados cálculos, tabelas, atributos ou procedimentos para preencher as lacunas.

Para habilitar a leitura do livro:

1. Abra a pasta `assets`.
2. Coloque nela uma cópia do PDF oficial com o nome exato `Os_Quatro_Is_Livro_de_Regras_v2_2.pdf`.
3. Faça o upload e publique. A aba **Livro de regras → PDF oficial** identificará automaticamente a presença do PDF.
4. Se o livro mudar de nome/versão, ajuste `PDF_PATH` no início de `app.js`.

Os tópicos 01–07 são **ordenação editorial do site**, não páginas ou capítulos oficiais. Antes de transcrever regras e numerar subitens (2A, 2B etc.), confira o conteúdo no PDF original.

## Publicação no GitHub Pages

Na conta GitHub `GrisooTe`:

1. Crie um repositório público chamado `os-quatro-is` (ou o nome de sua preferência) em https://github.com/new.
2. Extraia o ZIP e envie **os arquivos e pastas de dentro da pasta** para a raiz do repositório; o `index.html` precisa ficar diretamente na raiz, não em uma subpasta.
3. Abra **Settings → Pages → Build and deployment**.
4. Em **Source**, escolha **Deploy from a branch**; em **Branch**, selecione `main` e `/(root)`; clique em **Save**.
5. Quando o GitHub publicar, o endereço esperado será `https://grisooTe.github.io/os-quatro-is/` (o endereço efetivo é mostrado em Settings → Pages).

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
- `app.js` — rotas, biblioteca e busca.
- `assets/favicon.svg` — ícone do projeto.
- `assets/LEIA-ME.txt` — instruções para o PDF.
- `.nojekyll` — compatibilidade com publicação direta no GitHub Pages.

## Próximo passo editorial

Integrar o PDF oficial e transcrever seus capítulos com correspondência fiel às versões publicadas, incluindo o sumário e as subdivisões, sem divergir do livro original.

© Autor de Os Quatro Ís. Material do RPG e sua documentação reservados ao titular dos direitos. Nenhuma licença de reutilização é concedida por este pacote.