# Sobreposição de pedidos

Esta página descreve os onze aplicativos atualmente disponíveis para a edição `Labs`: o que eles fazem e como controlá-los. Para informações de instalação, compatibilidade e desenvolvedor, consulte [Aplicações overlay](./Overlay-apps).

> [!NOTE]
> As teclas de navegação dependem do rádio e da configuração `SetNav`: `UP` / `DOWN` em UV-K5, ou `LEFT` / `RIGHT` em UV-K1. Nas tabelas abaixo, `UP/LEFT` e `DOWN/RIGHT` referem-se a estas chaves equivalentes.

## Iniciando uma aplicação

1. Instale um arquivo `.app` compatível com [UV Studio](./UV-Studio#apps-labs).
1. Na tela de rádio normal, pressione `F` e `7 VOX`.
1. Selecione uma aplicação instalada com `UP/LEFT` ou `DOWN/RIGHT`.
1. Pressione `M` para lançá-lo.

Na maioria das aplicações, `EXIT` fecha a aplicação e retorna para o lançador ou tela de rádio normal. Algumas aplicações de rádio também podem ser atribuídas diretamente a uma chave programável através do seletor de ação normal.

## Resumo do pedido

| Aplicação | Objecto |
| --- | --- |
| `Broadcast FM` | Receptor FM de transmissão completo com VFO, memórias e varredura de estação |
| `FoxHunt` | Ajuda para detectar sinais e direcionamentos com histórico, atenuação e orientação de áudio |
| `Beacon` | Repetindo o farol Morse ao estilo ARDF usando o VFO de transmissão selecionado |
| `Beam` | Transfer um canal de configuração entre rádios compatíveis no ar |
| `Breakout` | Jogo de partir tijolos |
| `Tetris` | Jogo em bloco com pontuação, níveis e uma melhor pontuação salva |
| `Cube3D` | Visualizador de forma 3D animado |
| `Plasma` | Padrões democenados animados |
| `Snake` | Jogo clássico de cobra baseado em grade com uma melhor pontuação salva |
| `Rapid Roll` | Jogo de plataformas em que uma bola deve continuar a descer, evitando obstáculos |
| `Space Impact` | Jogo de tiro espacial com deslocamento lateral, disparo automático, mísseis e chefes |

## Broadcast FM

`Broadcast FM` é um receptor de transmissão BK1080 completo. Ele fornece modos de frequência e memória, quatro bandas de transmissão, busca manual, descoberta automática da estação e 48 memórias FM compartilhadas com o rádio FM residente.

Enquanto esta aplicação está em execução, as funções normais BK4819 recebem e dual-watch são suspensas. Alterações nas memórias FM são comprometidas com segurança quando a aplicação sai.

| Chave | Acção |
| --- | --- |
| `0`–`9` | Introduza uma frequência no modo VFO ou um número de memória de dois dígitos no modo MR/save |
| `UP/LEFT` ou `DOWN/RIGHT` | Ajuste um passo no modo VFO; selecione a estação armazenada anterior/próxima no modo MR; escolha um slot de gravação; mude a direção de busca durante a digitalização |
| `*` | Iniciar a procura manual; parar uma pesquisa activa |
| `F`, então `*` ou manter `*` | Iniciar a digitalização automática e reconstruir a lista de memória FM |
| `M` no modo VFO | Abrir o `SAVE?`; pressione o `M` novamente para salvar no espaço selecionado |
| `M` em modo MR | Abrir o `DEL?`; carregue novamente no `M` para apagar a memória seleccionada |
| `F`, então `1` ou manter `1` | Selecione a próxima faixa de transmissão |
| `F`, então `3` ou manter `3` | Mudar entre os modos VFO e MR |
| `F`, então `0` ou manter `0` | Sair da aplicação |
| `EXIT` | Apagar o último dígito introduzido, cancelar um prompt de salvamento/eliminação ou sair |

> [!WARNING]
> A digitalização automática limpa e reconstrói a lista de memória FM antes de armazenar as estações que encontra.

## FoxHunt

`FoxHunt` ajuda a localizar um transmissor usando o VFO recebido selecionado. Mostra a força do sinal corrigida em dBm, um S-meter ao estilo IARU, níveis máximos e mínimos, informações de tendência e um gráfico de barras ou histórico de sinal. A atenuação selecionável estende o alcance útil perto de um transmissor forte.

| Chave | Acção |
| --- | --- |
| `1` | Alterna entre o gráfico de barras e o histórico de sinais |
| `2` | Selecione o próximo modo de áudio: desligado, bips de força ou áudio de estação contínua |
| `3` | Aumentar a atenuação |
| `F`, então `2` | Selecione o modo de áudio anterior |
| `F`, então `3` | Diminuir a atenuação |
| `UP/LEFT` ou `DOWN/RIGHT` | Aumentar/diminuir a atenuação diretamente |
| `M` | Reinicie os valores de referência de pico, mínimo e tendência |
| Manter o `F` | Bloquear ou desbloquear o teclado da aplicação |
| `EXIT` | Sair enquanto o teclado está desbloqueado |

O gráfico, modo de áudio e configuração de atenuação são salvos para o próximo lançamento. As duas chaves de navegação permanecem disponíveis enquanto o teclado da aplicação está bloqueado.

## Beacon

`Beacon` transmite repetidamente um identificador Morse estilo ARDF na transmissão VFO selecionada. Alterna entre uma janela de transmissão configurável e um período inativo. Os identificadores disponíveis são `MOE`, `MOI`, `MOS`, `MOH`, `MO5`, `MO` e `CALL`; `CALL` envia o indicativo de chamada configurado seguido pelo `MOE`.

| Chave | Acção |
| --- | --- |
| `1` | Aumente a duração da transmissão em passos de 5 segundos (`5`–`60` segundos) |
| `2` | Aumentar a duração de inatividade em passos de 5 segundos (`5`–`240` segundos) |
| `3` | Selecione o próximo identificador |
| `4` | Alternar o teclado `TONE` / `CARR` |
| `F`, então `1` / `2` / `3` / `4` | Alterar a configuração correspondente na direcção inversa |
| `M` durante a transmissão | Parar a janela de transmissão atual e iniciar o período de inatividade |
| `M` enquanto estiver ocioso | Reiniciar a contagem regressiva completa |
| Manter o `F` | Bloquear ou desbloquear todos os controles da aplicação |
| `EXIT` | Pare com segurança e saia enquanto os controles estão desbloqueados |

A primeira transmissão começa imediatamente. Duração, tempo inativo, identificador e modo de chave são salvos para o próximo lançamento. Se o firmware residente recusar a transmissão, o aplicativo exibe `TX OFF` e não transmite.

> [!WARNING]
> O Beacon transmite automaticamente. Verifique o VFO selecionado, frequência, potência, antena, sinal de chamada, ciclo de serviço e regulamentos locais antes de lançá-lo.

## Beam

`Beam` transfere o VFO selecionado ou configuração de canal de memória entre rádios compatíveis. O rádio de envio transmite os dados do canal pelo ar; o rádio receptor armazena um pacote válido na primeira memória livre.

| Chave | Acção |
| --- | --- |
| `UP/LEFT` ou `DOWN/RIGHT` | Alternar entre os modos de transmissão (`BEAM TX`) e receber (`BEAM RX`); também interromper uma operação de recepção ativa |
| `M` no modo TX | Enviar a configuração do canal seleccionado |
| `M` no modo RX | Iniciar a espera por um pacote Beam |
| `EXIT` | Parar de receber ou sair da aplicação |

O display relata `SENT`, `RECEIVED`, `MEM FULL` ou `ERROR`, conforme apropriado. Apenas um canal recebido é autorizado por lançamento; sair e reabrir Beam antes de receber outro.

## Breakout

`Breakout` é um jogo compacto de quebra de tijolos com 18 tijolos, cinco bolas de partida, pontuação e rastreamento de nível. Limpar a parede começa no próximo nível e premia uma bola extra.

| Chave | Acção |
| --- | --- |
| `4` ou `UP/LEFT` | Mover a pá para a esquerda |
| `0` ou `DOWN/RIGHT` | Mover a pá para a direita |
| `M` | Pausa ou retomar; após `GAME OVER`, inicie o novo jogo preparado |
| `EXIT` | Sair da aplicação |

O progresso do jogo não é mantido após sair da aplicação.

## Tetris

`Tetris` usa um 16 × 16 bem visível, uma bolsa de sete peças embaralhada, peça fantasma, pré-visualização próxima, pontuação, linhas e níveis. A melhor pontuação é salva entre os lançamentos.

| Chave | Acção |
| --- | --- |
| `4` ou `UP/LEFT` | Mover para a esquerda |
| `6` ou `DOWN/RIGHT` | Mover para a direita |
| `M` ou `2` | Rodar a peça |
| `8` | Queda suave |
| `*` ou `0` | Queda difícil |
| `F` | Pausar ou retomar |
| `M`, `*` ou `0` após o fim do jogo | Iniciar um novo jogo |
| `EXIT` | Sair da aplicação |

Movimento e queda suave repetir enquanto suas chaves são mantidas.

## Cube3D

`Cube3D` renderiza formas rotativas sólidas ou de estrutura de arame. Estão disponíveis oito formas: cubo, octaedro, tetraedro, diamante, icosaedro, cuboctaedro, prisma hexagonal e gema pentagonal.

| Chave | Acção |
| --- | --- |
| `UP/LEFT` ou `DOWN/RIGHT` | Aumentar/diminuir a velocidade de rotação (`1`–`16`) |
| `1`–`8` | Selecione uma forma diretamente |
| `*` | Selecione a forma seguinte |
| `F` | Alternar a imagem/ renderização sólida |
| `M` | Pausar ou retomar |
| `EXIT` | Sair da aplicação |

## Plasma

`Plasma` exibe padrões animados estilo demoscene em tela cheia com bandas ou renderização pontilhada.

| Chave | Acção |
| --- | --- |
| `UP/LEFT` ou `DOWN/RIGHT` | Aumentar/diminuir a velocidade de animação (`1`–`8`) |
| `1`–`5` | Selecione um padrão e desabilite o ciclismo automático |
| `*` | Alternar as bandas/ renderização assimétrica |
| `F` | Activar ou desactivar o ciclo automático de padrões |
| `M` | Pausar ou retomar |
| `EXIT` | Sair da aplicação |

## Snake

`Snake` é um clássico jogo de estilo Nokia jogado em uma grade `31 × 13`. Coma o alimento para crescer a cobra e marcar pontos `10`. Bater na fronteira ou o próprio corpo da cobra acaba com o jogo. A melhor pontuação é salva entre os lançamentos.

| Chave | Acção |
| --- | --- |
| `2` ou `3` | Subir |
| `4` ou `5` | Mover para a esquerda |
| `6` ou `0` | Mover para a direita |
| `8` ou `9` | Mover para baixo |
| `F` | Pausar ou retomar |
| `M`, `*` ou `0` após o fim do jogo | Iniciar um novo jogo |
| `EXIT` | Sair da aplicação |

Segurar uma tecla de direção repete-a. A aplicação recusa uma inversão imediata no próprio corpo da cobra. Se o protetor de tela ativa durante um jogo, Snake pausa e retoma após o despertar.

## Rapid Roll

`Rapid Roll` é um jogo de plataformas em que estas sobem em direção a um teto com espinhos. Mova a bola lateralmente e faça-a descer de uma plataforma segura para a seguinte. As plataformas com espinhos, o teto e a parte inferior da tela custam uma vida; a partir do nível 3 surgem plataformas que se desfazem. Os corações concedem `50` pontos e recuperam uma vida, até ao máximo de cinco.

| Chave | Acção |
| --- | --- |
| `4` ou `UP/LEFT` | Rolar à esquerda |
| `6` ou `DOWN/RIGHT` | Rolar para a direita |
| `F` | Pausar ou retomar |
| `M` após o fim do jogo | Iniciar um novo jogo |
| `EXIT` | Sair da aplicação |

O jogo começa com três vidas e fica mais rápido à medida que o nível aumenta. As plataformas seguras tornam-se mais estreitas nos níveis superiores. O progresso não é mantido depois de sair da aplicação. Se o protetor de tela for ativado durante uma partida, Rapid Roll pausa e continua quando o rádio desperta.

## Space Impact

`Space Impact` é um jogo de tiro espacial com deslocamento lateral. A nave dispara automaticamente a arma principal, deixando os controles livres para o movimento vertical. As ondas inimigas usam vários padrões de movimento e ataque; no fim de cada nível aparece um chefe com uma barra de energia visível.

| Chave | Acção |
| --- | --- |
| `2` ou `UP/LEFT` | Mover a nave para cima |
| `8` ou `DOWN/RIGHT` | Mover a nave para baixo |
| `5` ou `M` | Lançar um míssil penetrante |
| `F` | Pausar ou retomar |
| `M` após o fim do jogo | Iniciar um novo jogo |
| `EXIT` | Sair da aplicação |

O jogo começa com três vidas e três mísseis. A arma principal dispara automaticamente. A cada 16 inimigos eliminados, recebe-se outro míssil, até ao máximo de nove. Derrotar um chefe concede uma vida extra e um míssil quando os respetivos limites ainda não foram atingidos. O progresso não é mantido depois de sair da aplicação. Se o protetor de tela for ativado durante uma partida, Space Impact pausa e continua quando o rádio desperta.

## Páginas relacionadas

* [Aplicações overlay](./Overlay-apps)
* [UV Studio](./UV-Studio#apps-labs)
* [Funções dos botões](./Button-functions)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [Receptor de rádio de transmissão FM](./FM-broadcast-radio-receiver)
