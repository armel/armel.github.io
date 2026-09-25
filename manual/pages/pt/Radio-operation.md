# Operação de rádio

Esta página cobre a operação do dia-a-dia do transceptor: comutação entre VFO e modo de memória, leitura da barra de status, compreensão das restrições TX e gerenciamento do comportamento de sono.

Para recursos relacionados à digitalização, veja [Varredura](./Scanning). Para visualização e manutenção ao vivo baseada no navegador, consulte [UV Studio](./UV-Studio). Para cópia de rádio para rádio, ver [AirCopy](./AirCopy). Para RescueOps, o Modo de Resume, o jogo embutido, e o procedimento de desbloqueio TX orientado à pesquisa, veja [Características avançadas](./Advanced-features).

> [!WARNING]
> Não utilize Quansheng CPS. Ele substitui configurações personalizadas.

## Nesta página

* [Operação & configuração básica](#basic-operation--configuration)
* [Barra de estado](#status-bar)
* [Exibição, tipo e calibração da bateria](#battery-display-type-and-calibration)
* [Sobre os menus `F Lock` e `TXLock`](#about-the-f-lock-and-txlock-menus)
* [Protetor de ecrã e tempo limite da retroiluminação](#screen-saver-and-backlight-timeout)
* [Sobre o menu SetOff](#about-the-setoff-menu)
* [1750 Hz tone burst para acesso repetidor](#1750-hz-tone-burst-for-repeater-access)
* [ Páginas relacionadas](#related-pages)

> [!TIP]
> Controlos rápidos comuns:
> - Quansheng CPS sobrescrito configurações personalizadas
> - a frequência está fora do plano `F Lock` seleccionado
> - `TXLock` ainda é `ON`
> - `AM` ou `USB` está selecionado em vez de `FM`
>
> Veja [Resolução de problemas](./Troubleshooting) para a versão curta.

## & Configuração básica da operação

O monitor de rádio é dividido em um VFO superior e um VFO inferior. Você pode alterar a seleção superior/inferior pressionando `F` + `2 A/B` (ou pressionando `2 A/B`).

Cada VFO pode operar independentemente no modo de frequência ou no modo de canal. Para alternar os modos, selecione o VFO desejado e pressione `F` + `3 VFO/MR` (ou longo-pressão `3 VFO/MR`).

![DW](https://github.com/user-attachments/assets/a6edbe0e-3ec3-4e08-98e4-b6d0036d0444)

No `frequency mode`, você digita manualmente a frequência com o teclado. Você também pode alterar diferentes opções para esse VFO no menu (os primeiros 13 itens do menu). Uma vez que o VFO é configurado, as configurações podem ser salvas em um canal de memória, entrando no menu `ChSave` e escolhendo o canal de memória alvo.

No `channel mode`, você pode alternar entre canais de memória salvos. Os canais de memória podem ser adicionados manualmente como mencionado acima ou programados de um computador com o driver `CHIRP` fornecido com cada liberação de firmware. Veja [Programação com CHIRP](./Programming-with-CHIRP) para o fluxo de trabalho dedicado F4HWN.

Para verificação de frequência, varredura de memória, `ScnRng` e DCS / CTCSS, veja [Varredura](./Scanning).

## Barra de status

No topo da tela, na primeira linha, está a barra de status. Mostra muita informação. Aqui estão alguns exemplos:

| Captura de tela do &nbsp; o &nbsp; Quansheng&nbsp; K5&nbsp; execução do &nbsp; o &nbsp; F4HWN&nbsp; firmware                | Designação das mercadorias |
| --- | --- |
|![1](https://github.com/user-attachments/assets/bc36b81f-0c7e-4c30-ae0d-80a4144437bf) | DWR significa RxMode é definido como DUAL RX RESPOND, OP significa PTT é definido como ONEPUSH, o ícone F significa que a tecla `F` foi pressionada, e você vê a tensão da bateria. |
|![2](https://github.com/user-attachments/assets/fa08eaac-3f68-42b4-a991-27bc2ce15d44) | PS significa que o Power Save está ativado, DW significa que o RxMode está definido como PRINCIPAL TX / DUAL RX, VX significa que o VOX está ativado, CL significa que o PTT está definido como CLASSIC, o ícone de bloqueio significa que o teclado está bloqueado, e você vê a tensão da bateria. |
|![3](https://github.com/user-attachments/assets/d385e1ce-94cb-4593-9828-5397259ff779) | PS significa que o Power Save está ativado, MO significa que RxMode está definido como PRINCIPAL SOMENTE, OP significa PTT está definido como ONEPUSH, e você vê a porcentagem de bateria. |
|![4](https://github.com/user-attachments/assets/c202db4e-c77d-4033-a42a-d770415126eb) | MO significa que RxMode é definido como PRINCIPAL SOMENTE, OP significa PTT é definido como ONEPUSH, o ícone Luz significa que o controle manual da luz de fundo é ativado, e você vê a porcentagem da bateria. |
|![5](https://github.com/user-attachments/assets/53ecb27a-9442-43b5-819b-4cbb042ca593) | O temporizador RX à esquerda indica quanto tempo tem sido desde que você recebeu um sinal, OP significa que o PTT é definido como ONEPUSH, o ícone Luz significa que o controle manual da luz de fundo é ativado e você vê a porcentagem da bateria. |
|![6](https://github.com/user-attachments/assets/d8fa4c00-81bc-4593-a4f1-96a54ffdf744) | O pequeno `PMR` em vídeo reverso e `><` significa que você está atualmente lista de digitalização `PMR`, CL significa PTT é definido como CLASSIC, o ícone Luz significa que o controle manual da luz de fundo está ativado, e você vê a porcentagem de bateria. |
|![7](https://github.com/user-attachments/assets/5abe40a1-4092-449b-b5e1-7074d5111d86) | O ícone `ALL` e `><` significam que você está atualmente escaneando todos os canais listados, OP significa que o PTT está definido como ONEPUSH, o ícone Light significa que o controle manual Backlight está ativado, e você vê a porcentagem de bateria. |

> [!NOTE]
> Sobre `RxMode`, `MO` significa SOMENTE PRINCIPAL, `DW` significa PRINCIPAL TX / DUAL RX, `DWR` significa DUAL RX RESPOND, e `XB` significa CRUSS BAND.

## Exibição, tipo e calibração da bateria

O firmware separa três coisas relacionadas à bateria diferentes:

* a tensão medida da bateria
* a percentagem de bateria estimada
* o comportamento de dormir / economia de energia

Para informações da bateria na tela:

* `BatTxt` adiciona `VOLTAGE` ou `PERCENT` à barra de status, ou o esconde com `NONE`
* `SysInf` mostra a tensão da bateria corrigida, a porcentagem de bateria estimada e a versão de firmware

Para que a porcentagem da bateria faça sentido, dois itens do menu oculto importam:

* `BatCal` calibra a tensão da bateria exibida
* `BatTyp` seleciona a curva de descarga usada para estimativa da porcentagem da bateria

Diferença importante:

* `BatCal` altera a leitura de tensão
* `BatTyp` altera o cálculo `%`, não a tensão medida em si

As opções `BatTyp` atuais são:

* `1600mAh K5`
* `2200mAh K5`
* `3500mAh K5`
* `1400mAh K1`
* `2500mAh K1`

Como em qualquer estimativa baseada em tensão, a porcentagem de bateria é apenas aproximada. Depende do perfil da bateria selecionada, da condição da bateria e da carga atual.

### Calibrar a tensão da bateria com um multímetro

1. Certifique-se de que o rádio não está carregando através do `USB-C`.
1. Deixe o rádio ficar parado por um momento. Não calibrar durante a transmissão.
1. Meça a tensão da bateria com um multímetro nos contatos da bateria na parte de trás do rádio / bateria.
1. Abra o menu oculto e vá para `BatCal`.
1. Ajuste `BatCal` até que a tensão mostrada pelo rádio corresponda ao multímetro o mais próximo possível.
1. Confirme com `M`.

> [!TIP]
> Se a tensão estiver correta, mas a porcentagem ainda parecer errada, `BatCal` provavelmente está bem e `BatTyp` é a configuração para revisar.

## Sobre os menus `F Lock` e `TXLock`

No passado, havia alguns planos de banda no menu `F Lock` para atender várias solicitações: PMR 446, FRS/GMRS/MURS, etc. No entanto, adicionar novas opções `F Lock` sempre tomou um monte de memória: novas opções no menu `F Lock`, armazenar frequências (para especialistas, estes são `uint32_t` cada vez, por isso eles são muito que consomem memória), etc.

Agora, deve-se reconhecer que era complicado, senão impossível, oferecer planos de banda que pudessem cobrir e atender todas as expectativas. Há demasiadas variações de um país para outro. Além disso, nada está planejado para combinar múltiplos planos de frequência do menu `F Lock`. Por exemplo, abrindo as bandas PMR 446 e LPD. Em resumo, `F Lock` é muito limitado e não escalável.

Aqui está a solução:

1. Selecione o plano de banda mais adequado no menu `F Lock`. Por exemplo, se tiver um indicativo de chamada e viver na Europa, selecione CE HAM. Se você não tem um sinal de chamada e é apenas um SWL, selecione DISABLE ALL, que é mais seguro.
1. Se você ainda quiser transmitir em um canal de memória que não está aberto pelo plano da banda, vá para o menu `TXLock` e escolha `OFF`. Isso cria uma exceção e permite a transmissão nesse canal.

Em poucas palavras:

* se a frequência estiver dentro do plano de banda selecionado no `F Lock`, você pode transmitir
* Se a frequência estiver fora do plano de banda seleccionado no `F Lock`:
  * você só pode transmitir se `TXLock` for `OFF`
  * você não pode transmitir se `TXLock` for `ON`

Se um canal de memória ou VFO estiver fora do plano de banda selecionado e `TXLock` for `ON`, haverá um pequeno cadeado à esquerda do nome.

Para o procedimento `UNLOCK ALL` orientado à pesquisa, consulte [Características avançadas](./Advanced-features#tx-on-all-bands).

## Protetor de tela e tempo- limite de luz traseira

Compila com suporte protetor de tela adicionar o menu `SetSav`.

O `SetSav` funciona em conjunto com o `BLTime`: quando o rádio está inativo e o tempo- limite de luz expira, o protetor de tela pode substituir a tela normal em vez de simplesmente deixar a tela inalterada.

Os modos disponíveis são:

* `OFF`: nenhum protetor de tela
* `LOGO`: mostrar o logotipo de inicialização personalizado como uma tela ociosa
* `LOGO+`: mostrar o logotipo de inicialização personalizado com um efeito de rolagem
* `MATRIX`: mostrar uma tela ociosa animada de matriz

Os modos de logotipo usam o mesmo logotipo `128x64` carregado com [UV Studio](./UV-Studio#boot-logo).

O protetor de tela é suspenso intencionalmente durante o trabalho de rádio ativo: RX, TX, PTT, BEAM, e varredura FM ativa. Ele pode exibir na tela de rádio principal e tela de transmissão FM quando o rádio está ocioso. Pressionar uma tecla desperta o ecrã normal.

Se o `BLTime` estiver configurado para um valor de estilo sempre desligado ou sempre ligado em vez de uma duração cronometrada, o `SetSav` não assume a exibição.

## Sobre o menu Desligar

O menu `SetOff` permite que você configure um tempo limite antes de seu rádio entrar no modo de sono. Este atraso pode ser definido entre 1 minuto e 2 horas. Se `SetOff` é `OFF`, o modo de sono está desativado.

Por exemplo, se você definir o atraso para 5 minutos e durante este tempo há:

* sem recepção
* sem transmissão
* sem botão pressionar

então seu rádio entrará automaticamente no modo de sono. Você será notificado 10 segundos antes com uma tela piscando.

Note que o modo de sono será ativado mesmo que você esteja escaneando, desde que nenhuma recepção ocorra.

FoxHunt e Beacon são exceções deliberadas: enquanto qualquer aplicação estiver ativa, o rádio ignora `SetOff` até que você o deixe explicitamente. O tempo-limite normal ainda funciona. Ver [FoxHunt](./Fox-Hunt) e [Beacon](./Beacon).

Uma vez em modo de sono:

* o ecrã está completamente desligado
* o LED vermelho na base da antena pisca
* o módulo BK4819 entra em modo de sono profundo e acorda periodicamente a cada:
  * 2 segundos se `BatSav` estiver definido para `1:1`
  * 4 segundos se `BatSav` estiver definido para `1:2`
  * 6 segundos se `BatSav` estiver definido para `1:3`
  * 8 segundos se `BatSav` estiver definido como `1:4`
  * 10 segundos se `BatSav` estiver definido para `1:5`

Para sair do modo de sono, basta:

* receber um sinal durante a fase de despertar periódica BK4819
* iniciar uma transmissão pressionando o botão PTT
* ou pressione qualquer outro botão

Como exemplo, testei o modo de sono em dois rádios K5(8) com baterias calibradas e totalmente carregadas, usando as mesmas configurações, frequências, modo (`DWR`) e `BatSav` definido para `1:5`. A única diferença foi que um rádio tinha o modo de sono ativado enquanto o outro não. Após 36 horas de operação, o rádio sem modo de sono tinha apenas 20% de bateria restante, enquanto o com modo de sono ainda tinha 60% de bateria.

## Tone burst de 1750 Hz para acesso repetidor

Quando `PTT` é pressionado, o tom de 1750 Hz pode ser ativado pressionando [`Side button 2️⃣`](./Button-functions#side-button-2%EF%B8%8F%E2%83%A3).

## Páginas relacionadas

* [Primeiros passos](./Getting-started)
* [UV Studio](./UV-Studio)
* [Programação com CHIRP](./Programming-with-CHIRP)
* [Varredura](./Scanning)
* [Menu](./Menu)
* [Funções dos botões](./Button-functions)
* [Características avançadas](./Advanced-features)
* [Resolução de problemas](./Troubleshooting)
