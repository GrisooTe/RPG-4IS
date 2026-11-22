# Os Quatro Ís — site oficial do projeto (v1.9)

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

## Biblioteca de personagens e painel de sessão (site v1.7)

- `personagens.html`: acervo com múltiplas fichas do mesmo navegador, seleção e acesso a cada ficha em sessão.
- `personagem.html`: formulário oficial de criação (continua com 9 etapas). Ao concluir, registra ou atualiza a ficha na biblioteca; pode reabrir pelo link **Editar dados de criação**.
- `fichas-store.js`: armazenamento local versionado; importa ficha única (`{character,...}`), faz backup de toda a biblioteca (`{records:[...]}`) e migra a ficha antiga concluída quando encontrada.
- `personagens.js` e `personagens.css`: painel de sessão com PV, Tensão, Determinação, Preparação, Ferimentos Graves, Prestígio, Dívida, Suspeita, Evolução, inventário, vínculos, dias/sessões, notas arquivadas e registro dos ajustes.

### Regras e limites

Os recursos respeitam o Manual do Participante 3.0.1. A interface não substitui testes narrativos e exige confirmação para ações que dependem do narrador. A ficha só registra o que o grupo decidiu. A rolagem acadêmica continua única na criação.

### Privacidade e cópias de segurança

Todos os dados permanecem no `localStorage` do navegador, sem transmissão ao GitHub e sem login. Os jogadores devem usar **Baixar backup de todas** e **Importar fichas** ao trocar de dispositivo ou limpar os dados do navegador. Importar gera registros adicionais, não substitui automaticamente os existentes. O PDF oficial permanece intacto.

## Versão 1.8 — estabilidade e backups

- Atualizações da ficha de sessão alteram os recursos no local, **sem reconstruir toda a página**. A rolagem do navegador, o foco dos botões e o campo de notas são preservados.
- **Desfazer último ajuste** funciona durante a sessão; ao alterar as notas ou trocar de personagem, o histórico de desfazer é limpo para evitar sobrescrever texto posterior.
- A biblioteca avisa quando as fichas foram alteradas desde o último backup gerado. O backup continua sendo um arquivo local, e o usuário deve confirmar que o navegador o salvou.
- A importação valida todas as fichas antes de qualquer gravação, preserva os IDs originais e **ignora duplicatas** por ID ou identidade da criação; ela nunca substitui registros já existentes. Indica quantas fichas foram importadas e quantas foram ignoradas.
- Para **outro estudante**, é necessário iniciar uma ficha nova e realizar a própria rolagem acadêmica. Uma cópia de segurança não é uma nova criação; o botão antigo de duplicação foi retirado.
- Alertas aparecem sem deslocar o conteúdo; controles em dispositivos móveis foram ampliados.
- Manual oficial 3.0.1 e suas regras **não foram alterados**.


## Ferramentas de rolagem — site v1.9

Na página **Minhas fichas**, cada estudante tem um rolador integrado em **Teste e Acerto Gradual**. O motor `rolagens-core.js` implementa o capítulo 3 e os exemplos 03A–03C, além do dano gradual do capítulo 5. Os dados usam a geração aleatória criptográfica do navegador; a rolagem e as repetições são registradas no histórico e salvas no backup JSON da ficha.

- Atributo define dados (1–7); 5–6 = sucesso; dificuldade 1–4. Teste oposto e defesa precisam de valores acordados na mesa.
- Especialização pertinente, confirmada pelo narrador, permite **uma repetição de um único dado sem sucesso**.
- Após falhar, pode Pressionar a Sorte **uma vez** e repetir até dois dados sem sucesso; +1 Tensão imediato, inclusive se falhar. A opção não está disponível com Tensão 6.
- Auxílio (0–2) exige testes prévios dos aliados; Preparação e Determinação podem ser gastas antes da rolagem. Penalidades de Tensão e FG são aplicadas quando o usuário marca que a situação se enquadra nas regras.
- Ataque usa Ímpeto e compara sucessos com a defesa; sem reação, defesa 0. A calculadora permite visualizar proteção corporal (−1 PV, custo de Integridade) e Determinação do defensor (−2 PV). **Não altera o defensor automaticamente**: PV, FG e integridade são anotados em sua ficha após decisão na mesa.
- Cada ficha guarda somente o último teste ativo por sessão e o histórico resumido das rolagens. Iniciar nova sessão limpa o teste ativo; o histórico permanece.

O PDF oficial 3.0.1 continua inalterado e é a fonte definitiva em caso de divergência.

## Identidade visual RPG 2.0

Tema tático escuro inspirado em interfaces de arquivo, códice e dossiê de campanha; detalhes fluorescentes, contraste forte, tipografia utilitária e opção de tema claro. As modificações visuais usam `visual-rpg.css`, separado da lógica de fichas e rolagens. O PDF oficial 3.0.1 permanece inalterado.


## Identidade 2.1 — Arquivo da Ascensão

Redesign completo da identidade de Os Quatro Ís, misturando arquivo institucional distópico e códice tecnopolítico. O site usa um brasão fictício original, uma página inicial de terminal/documento, módulos de acesso, registros de participantes, formulário de dossiê e codex sobre papel.

**Arquivos novos:** `arquivo-ascensao.css`, `archive-theme.js`, `assets/selo-ascensao.svg` e um novo `assets/favicon.svg`. O tema claro continua disponível pelo botão Contraste. A versão 2.0 (`visual-rpg.css`) foi substituída visualmente e não é mais carregada.

O sistema de criação e rolagens permanece nas implementações anteriores (`personagem.js`, `personagens.js`, `fichas-store.js`, `rolagens-core.js`). As fichas locais não são apagadas pela troca visual. O PDF oficial 3.0.1 **não foi alterado**. O leitor incorporado passou a aparecer também dentro das páginas dos capítulos.

## Versão 2.2 — apresentação documental

- Entrada transformada em índice de consulta (sem hero publicitária, slogans ou cartões comerciais).
- Tipografia mais moderada e capitalização natural nos títulos.
- Biblioteca e criação com nomes funcionais e hierarquia de documento.
- `documental-v22.css` é uma camada visual isolada, aplicada após o tema 2.1.
- PDF oficial 3.0.1 e scripts de armazenamento, criação e rolagens preservados.


## Design 2.3 — Grade modular de consulta

Uma atualização exclusivamente de apresentação. A entrada organiza consultas, fichas e o manual em uma grade de arquivo com tipografia utilitária, preto, cinza técnico e laranja usado como sinalização. O desenho gráfico é feito em CSS, sem imagens ou dependências externas. Não existem textos de marketing ou métricas fictícias. O livro oficial 3.0.1, as regras e os dados dos personagens não foram alterados.