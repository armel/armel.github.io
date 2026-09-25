# Analisador de espectro

## Espectro Varrer o ecrã

Pressione `F` + `5 NOAA` para ligar o analisador **Spectrum.
A frequência atual de memória ou VFO será a frequência ** center ** da varredura do espectro.

![Spectrum Analyzer 1](https://github.com/user-attachments/assets/a445dca8-f7e9-4053-bbc9-9d373b03ed2c)

![Spectrum Analyzer 2](https://github.com/user-attachments/assets/01504dbf-e67b-45d3-9c56-b8ebb6b06e05)

O analisador de espectro também pode ser usado com [**ScnRng** modo](./Scanning#scan-frequency-range-function).

> [!NOTE]
> A navegação usa `UP` / `DOWN` em UV-K5, ou `LEFT` / `RIGHT` em UV-K1. O layout ativo segue `SetNav`.

> [!NOTE]
> - `PTT` abre a monitorização detalhada da última frequência recebida
> - com `ScnRng`, a lista negra é limitada a 15 frequências

> [!IMPORTANT]
> **O analisador de espectro não se comporta de forma idêntica em todo o hardware de rádio.**
> Os rádios **V1 / V2** são construídos em torno do receptor **BK4819**, enquanto o
> **V3 (K5v3)** usa o **BK4829**. Estes são chips de receptor diferentes, com um
> Estágios de ganho LNA/PGA, comportamento AGC e escala RSSI.
>
> Como resultado:
> - o piso ** ruidoso**, o absoluto **dBm / S-meter** leituras e os valores **`LNAs` / `LNA` / `PGA`** não são ** directamente comparáveis ** entre um V1/V2 e um V3 — uma configuração de nível ou ganho que parece "direita" num V2 não tem razão para significar a mesma coisa em um V3;
> - o analisador de espectro foi ** significativamente retrabalhado** para suportar ambas as plataformas, portanto não espere que um V3 reproduza, valor por valor, o que você observou em um V1/V2 mais antigo;
> - um piso de ruído alto ou instável é impulsionado em grande parte pela front-end do receptor e pelo ambiente RF local, não por um bug no analisador. Quando **AUTO** não puder estabelecer-se no chão local, mude para **MANUAL** e defina o gatilho você mesmo — é exatamente para isso que serve o modo MANUAL.

### Modos de desencadeamento: AUTO vs MANUAL

Pressione `M` para alternar entre **AUTO** e **MANUAL** modos de disparo. O indicador superior esquerdo mostra o modo ativo:

- **`A:NORM`** / **`A:WEAK`** / **`A:STRG`** — Modo AUTO. O nível do gatilho squelch rastreia o piso de ruído medido utilizando um perfil de sensibilidade:
  - `WEAK` — +12 dB acima do piso de ruído (menos sensíveis, menos aberturas falsas)
  - `NORM` – +8 dB (padrão)
  - `STRG` – +5 dB (mais sensível)
  
  Uma seta de direção é anexada ao rótulo para mostrar a direção de varredura atual:
  - `>` — varredura indo para a esquerda → direita
  - `<` — varredura indo para a direita → esquerda
  
  Exemplo: `A:NORM>` significa AUTO / Sensibilidade normal, varrendo para a direita.

- **`M <rssi>/<trig>`** — Modo MANUAL. Você define o nível do gatilho squelch com `*` / `F`, e a escala vertical (`dbMax`) com `3` / `9`. O gatilho muda em passos previsíveis do `1 dB`.

Mantenha `M` pressionado para **repor as definições padrão do analisador de espectro**.

### Salvando configurações ao sair

Ao sair da tela **Varredura do espectro** com `EXIT`, o analisador guarda as definições persistentes na memória Flash. Na próxima abertura, esses valores serão restaurados:

- passo de frequência entre barras (`1` / `7`)
- número de barras / canais (`4`)
- largura de banda do receptor usada enquanto monitora um sinal (`6`)
- modo de disparo, **AUTO** ou **MANUAL** (`M` curto)
- Perfil de sensibilidade AUTO, **WEAK** / **NORM** / **STRG** (`3` / `9` no modo AUTO)
- nível de gatilho squelch (`*` / `F`) — restaurado no modo **MANUAL**; em **AUTO** o gatilho é recomputado do chão de ruído cada vez que você abre o analisador

Esta persistência foi expandida após `v5.4.0`: compilações antigas salvaram apenas o passo de digitalização, a contagem de barras e a largura de banda do receptor. Nas compilações atuais, iniciar o analisador de espectro do modo `ScnRng` não mais substitui a etapa de digitalização salva ou preferência de contagem de barras; o intervalo de varredura ativa ainda define o intervalo de varredura.

A escala vertical (`dbMax`, `3` / `9` em MANUAL) é **não** persistiu: é reiniciada para a janela de exibição padrão cada vez que o analisador é aberto. A frequência/janela de varredura atual, o passo de rolagem `UP` / `DOWN`, tipo de modulação, backlight alternar, lista negra temporária e ajustes de registro de monitoramento de detalhes (`LNAs`, `LNA`, `PGA`) também não são salvos por esta ação `EXIT`. Se você estiver na tela **Detail Monitor**, `EXIT` retorna à tela de varredura; pressione `EXIT` novamente de lá para salvar e deixar o analisador.

Compilações atuais também melhoram o arredondamento de frequência `8.33 kHz` em fluxos de trabalho de bandscope/espectro, então as frequências exibidas e afinadas permanecem alinhadas de forma mais previsível nas etapas do estilo aviação.

### Funções do botão

| Chave | Função |
| --- | --- |
| `1` / `7` | Aumentar / diminuir a frequência passo entre barras |
| `2` / `8` | Aumentar / diminuir o passo de frequência usado ao rolar com `UP` / `DOWN` |
| `3` / `9` | Em MANUAL: ajustar `dbMax` (escala vertical) · Em AUTO: perfil de sensibilidade ao ciclo (`WEAK` ↔ `NORM` ↔ `STRG`) |
| `4` | Alterna o número de barras (canais) no gráfico |
| `5` | Frequência de entrada para a frequência de varredura mais baixa (valor em **MHz**, `*` = ponto decimal) |
| `6` | Alternar a largura de banda do receptor |
| `0` | Alternar o tipo de modulação (FM / AM / USB) |
| `*` / `F` | Aumentar / diminuir o nível de gatilho do squelch em passos `1 dB` — faz efeito em **MANUAL**; em **AUTO** o auto-tracker substitui-o na próxima varredura |
| `M` curto | Alternar o modo de disparo AUTO / MANUAL |
| `M` longo | Reiniciar o analisador de espectro como padrão |
| `UP` / `DOWN` no UV- K5, ou `LEFT` / `RIGHT` no UV-K1 | Mover a janela de varredura para cima / para baixo na frequência · **Durante RX**: parar a recepção e retomar a varredura na direção escolhida |
| `Side button 1️⃣` | Excluir a frequência atual da varredura do espectro |
| `Side button 2️⃣` | Alternar a luz de fundo |
| `PTT` | Mudar para ** monitorização detalhada ** da última frequência recebida |
| `EXIT` | Salvar configurações de espectro persistentes, em seguida, voltar para a tela / função anterior |

> [!TIP]
> A varredura alterna direção em cada ciclo completo para reduzir o viés direcional. O indicador `<` / `>` ao lado do `A:xxxx` permite- lhe ver de relance qual metade da varredura está ativa atualmente.

> [!NOTE]
> No modo MANUAL, a curva do espectro é desenhada sem suavização cosmética. Isso faz picos estreitos se alinhar mais de perto com o RSSI cru usado pelo detector de squelch.

## Monitor de Detalhe
![LNA](https://github.com/user-attachments/assets/635b7049-4f80-42ba-99e8-ea5295708fab)

### Funções do botão
* `M` - percorre os parâmetros exibidos na parte inferior da tela, que podem ser ajustados com os botões `UP` e `DOWN`
   * LNAs - Amplificador de baixo ruído curto
   * LNA - Amplificador de Baixo Ruído
   * PGA - amplificador de ganho programável
* `Side button 1️⃣` - comutar ** modo monitor** (força o squelch abrir para que você possa ouvir a frequência sintonizada continuamente)
* `EXIT` - sai para a tela anterior do analisador de espectro

> [!NOTE]
> `LNAs` / `LNA` / `PGA` são ** valores de diagnóstico ao vivo**, não configurações salvas. Eles são conduzidos pelo AGC do receptor e não são persistidos na saída. Seus passos disponíveis e seu significado diferem entre o **BK4819** (V1/V2) e o **BK4829** (V3), então eles não podem ser comparados valor para o valor entre plataformas.

## Páginas relacionadas

* [Primeiros passos](./Getting-started)
* [Varredura](./Scanning)
* [Funções dos botões](./Button-functions)
* [Operação de rádio](./Radio-operation)
* [Resolução de problemas](./Troubleshooting)
