# Termômetro Urbano — Proposta de direção visual (etapa 1)

## Conceito
"Prancha de observatório": cada página funciona como uma folha de atlas científico impressa — papel quente, grade cartográfica visível, coordenadas nas margens, legendas numeradas. Nada de cartões flutuantes, gradientes ou vidro.

## Paleta (oklch)
- Carvão `#1F1D1B` — texto, linhas de grade, mapas em traço
- Papel quente `#F2EBDD` — fundo principal; variação `#E7DECB` para faixas
- Terracota `#B4532A` — calor, destaque, alertas (escala térmica)
- Verde vegetal `#4F6B3A` — vegetação, índices positivos
- Apoio: ocre `#D9A441` (calor intermediário), cinza grafite `#6B655C` (texto secundário)
- Escala térmica dos mapas: verde → papel → ocre → terracota → carvão-avermelhado (divergente, legível para daltonismo verificado)

## Tipografia
- Títulos: **Fraunces** (serifada editorial, eixo óptico, itálico expressivo para chamadas)
- Texto corrido: **Source Serif 4** em parágrafos longos? Não — **IBM Plex Sans** para leitura e interface
- Dados, coordenadas, legendas, rótulos: **IBM Plex Mono** em caixa-alta espaçada
- Hierarquia: título de página 72–120px; seção 40px; rótulos mono 11–12px

## Navegação
- Barra superior fina como cabeçalho de prancha: logotipo à esquerda ("Termômetro Urbano" + marca de termômetro em traço), links numerados em mono: `01 Observatório · 02 Metodologia · 03 Laboratório de IA · 04 Impacto e ESG`
- Coordenada fixa de São Paulo (23°33′S 46°38′O) no canto direito
- Mobile: menu em painel de tela cheia com a mesma lista numerada
- Rodapé como "colofão": fontes, aviso de projeto educacional e dados simulados

## Página inicial — composição
1. **Abertura**: grade cartográfica de fundo; título grande em Fraunces ("A cidade não esquenta por igual."); à direita, mapa estilizado de São Paulo em traço com manchas térmicas em terracota. Selo mono: "PROJETO EDUCACIONAL · DADOS SIMULADOS".
2. **O problema**: texto editorial em duas colunas com nota de margem (o que é ilha de calor), sem números inventados — apenas conceitos e referências a fontes públicas (INMET, IBGE, MapBiomas) como indicação de onde os dados viriam.
3. **Perfil térmico**: corte transversal ilustrativo (centro denso → periferia arborizada) com eixo de temperatura rotulado como "ilustrativo".
4. **Entrada do observatório**: faixa em carvão com miniatura do mapa e índice das 4 seções numeradas, cada uma com uma linha de descrição.
5. **Colofão**.

## Tratamento dos mapas
- Base em traço fino carvão (limites de distritos), sem satélite
- Preenchimento por hachuras e cor da escala térmica; vegetação em pontilhado verde
- Sempre: escala gráfica, seta norte, legenda numerada, linha "Fonte:" e etiqueta "Dados simulados" quando aplicável
- Marcas de registro e coordenadas nas bordas

## Próximo passo
Após sua validação, implemento a página inicial e a navegação com essa identidade; as demais páginas ficam para as etapas seguintes.
