# Resolução de Problemas

Esta página reúne as situações mais comuns “algo está errado” já cobertas em outros lugares no wiki, para que você possa encontrar o cheque certo rapidamente.

## Posso receber, mas não posso transmitir

Verifique primeiro estes pontos:

1. Certifique-se de que `Mode` está configurado para `FM`.
1. Verifique o plano `F Lock` selecionado.
1. Se a frequência estiver fora desse plano, verifique se `TXLock` está definido para `OFF`.
1. Procure um pequeno cadeado ao lado do canal ou nome VFO.

Lembretes importantes:

* `AM` e `USB` são apenas para ouvir
* `UNLOCK ALL` ainda tem um procedimento de desbloqueio adicional

Veja também: [Operação de rádio](./Radio-operation#about-the-f-lock-and-txlock-menus) e [Características avançadas](./Advanced-features#tx-on-all-bands).

## Minhas configurações personalizadas desapareceram ou mudaram inesperadamente

Não utilize Quansheng CPS. Ele substitui configurações personalizadas.

Use o driver `CHIRP` fornecido com cada liberação de firmware, ou outra ferramenta de programação compatível.

Veja também: [Programação com CHIRP](./Programming-with-CHIRP), [Primeiros passos](./Getting-started), e [Operação de rádio](./Radio-operation#basic-operation--configuration).

## Meu logotipo de inicialização personalizado não mostra

Verifique estes pontos:

1. certifique-se de que sua compilação de firmware inclui suporte ao logotipo
1. enviar o logotipo com [UV Studio](./UV-Studio#boot-logo) enquanto o rádio é iniciado normalmente
1. abrir o menu `POnMsg` e selecionar `LOGO`
1. reiniciar o rádio após alterar a configuração

Se o logotipo parecer muito escuro, muito claro ou invertido, faça o upload novamente do UV Studio e ajuste `Threshold` ou `Invert colors` antes de escrevê-lo no rádio.

## Mudei a configuração do canal de memória, mas não ficou gravado

Algumas alterações específicas do canal afetam apenas a cópia temporária atual desse canal de memória.

Se você mudar uma configuração por canal, como `Step`, `Power` ou outro parâmetro de canal e quiser mantê-lo permanentemente, salve o canal novamente com `ChSave` para gravar as configurações atualizadas de volta para esse slot de memória.

Caso contrário, a mudança é apenas temporária e pode desaparecer quando você mudar de canal, mudar de modo, ou reiniciar o rádio.

Ver também: [Operação de rádio](./Radio-operation#basic-operation--configuration) e [Menu](./Menu#main-menu).

## A análise de memória não encontra nada

Verifique estes pontos:

1. Certifique-se de que está em `channel mode`, não em `frequency mode`.
1. Certifique-se de que o canal é atribuído a uma lista de verificação com `ScList` ou por `5 NOAA` de longa pressão.
1. Certifique-se de que a lista de verificação ativa atualmente não está vazia.
1. Se necessário, mude para outra lista de digitalização válida durante a digitalização.

O firmware suporta listas de digitalização `24` mais `ALL`. Se a lista solicitada estiver vazia ou inválida, o rádio salta para a próxima lista válida não vazia.

Veja também: [Varredura](./Scanning#memory-channels-scanning) e [Funções dos botões](./Button-functions#front-keypad).

## Não consigo sintonizar a estação de transmissão FM que quero

Você pode simplesmente estar usando o intervalo de transmissão FM errado.

Enquanto a recepção de transmissão FM é ativa, longo-pressão `1 BAND` para ciclo através das faixas de FM disponíveis:

* `87.5` para `108 MHz`
* `76` para `108 MHz`
* `76` para `90 MHz`
* `64` para `76 MHz`

O intervalo atualmente selecionado é mostrado na parte inferior esquerda da tela FM, por exemplo `87.5-108M`.

Afinação direta, varredura manual, varredura automática e memórias FM só funcionam dentro do intervalo atualmente selecionado.

Ver também: [Recetor de rádio de transmissão FM](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range).

## Radiodifusão FM continua parando

Este é geralmente o comportamento esperado.

Durante a recepção FM de transmissão, o VFO ativo ainda tem prioridade. Se a atividade é recebida no VFO ativo, o rádio muda temporariamente de volta para a recepção VFO, então retorna para transmitir FM quando essa recepção termina.

Ver também: [Recetor de rádio de transmissão FM](./FM-broadcast-radio-receiver).

## Recepção AM soa muito dura, distorcida, ou muito abafada

Tente mudar o perfil `SetRxA` enquanto o rádio está no modo `AM`.

Em `AM`, `SetRxA` e o ciclo de ação chave `RxA` entre:

* `SHARP`: mais estreito e mais seletivo, com melhor rejeição do canal adjacente
* `STOCK`: mais próximo do comportamento do firmware de stock
* `OPEN`: maior e mais aberto, muitas vezes mais agradável em sinais fracos

Se uma recepção AM soa muito dura em `SHARP`, tente `STOCK` ou `OPEN`. Se soa muito suave ou muito largo em `OPEN`, tente `SHARP`.

Ver também: [Menu](./Menu#main-menu) e [funções de button](./Button-functions#custom-button-functions).

## Só ouço alguns canais VHF aeronáuticos quando abro o monitor em `AM 8.33 kHz`

Isto muitas vezes não é um problema de sensibilidade. É geralmente uma confusão entre o `channel designator` (às vezes chamado `channel number` ou `published channel`) e a frequência de operação.

Alguns documentos aeronáuticos, sites ou aplicativos publicam o `channel designator`, que parece uma frequência normal, mas nem sempre é a frequência operacional. Os rádios VHF aeronáuticos de capacidade 8.33 dedicados traduzem esse designador de canal publicado automaticamente. Este firmware também executa essa correção quando você digita o valor diretamente no rádio, mas o `CHIRP` armazena o valor que você inseriu como uma frequência operacional.

### Processo 1: Paris-Orly

Para **Paris-Orly (LFPO)**, a documentação **SIA** realmente publica **ATIS ORLY 126.505 (FR)**, com **131.355 (EN)** para o serviço de língua inglesa.

A tabela de correspondência **[ICAO](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** mostra que o designador de canal **126.505** publicado corresponde ao operacional frequência **126,5000 MHz**. Por outras palavras:

* **Serviço:** ATIS ORLY (FR)
* ** Designador do canal:** 126.505
* ** Frequência operacional:** 126.5000 MHz

Diferença importante:

* se você inserir `126.5050` diretamente no rádio, o firmware corrige-o para a frequência de operação correspondente, aqui `126.5000 MHz`
* se você inserir `126.5050` no `CHIRP`, esse valor exato é armazenado e usado como-is, então o erro de ajuste permanece

### Processo 2: Bruxelas

Para **Brussels-National (EBBR)**, o designador de canal de 8.33 publicado para **Brussels Ground (South)** é **121.880** nas listas consultadas.

A tabela de correspondência **[ICAO](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** mostra que o designador de canais ** 121.880** publicado corresponde ao operador frequência **121,8750 MHz**. Por outras palavras:

* **Serviço:** Terra de Bruxelas (Sul)
* ** Designador de canais:** 121.880
* ** Frequência operacional:** 121.8750 MHz

Diferença importante:

* se você inserir `121.8800` diretamente no rádio, o firmware corrige-o para a frequência de operação correspondente, aqui `121.8750 MHz`
* se você inserir `121.8800` no `CHIRP`, esse valor exato é armazenado e usado como-is, então o erro de ajuste permanece

Em suma, se a frequência inserida no `CHIRP` é o ** designador de canais** em vez da frequência operacional, forçando o monitor aberto no `AM 8.33 kHz` pode parecer restaurar a recepção, mas o problema real é que o designador de canal publicado foi interpretado como a frequência operacional.

Se um serviço programado a partir de um designador de canal só se tornar audível quando você abrir o monitor em `AM 8.33 kHz`, tente a frequência de operação correspondente primeiro, especialmente quando o valor publicado terminar com `...005`, `...010`, `...255`, `...505`, `...755`, ou designadores de canais semelhantes de estilo 8.33.

Ver também: 

[Ofcom: compreensão 8.33 kHz frequências e números de canais](https://www.ofcom.org.uk/siteassets/resources/documents/manage-your-licence/aeronautical/guidance/understanding-8.33khz-frequencies-and-their-specific-channel-number.pdf?v=323879).

Pare de culpar o seu rádio ou firmware. Assista a este vídeo no meu canal Youtube:
[Frequências de Aviação e MONITOR: Canal de frequência (o erro que muda tudo)!](https://www.youtube.com/watch?v=Dpf3QzkDdaQ).

## Percentagem de bateria ou tensão parece errada

Verifique estes pontos:

1. certifique-se de que o rádio não está carregando através de `USB-C` enquanto você verifica
1. usar `BatTxt = VOLTAGE` ou abrir `SysInf`
1. certifique-se de que `BatTyp` corresponde à bateria que você está usando
1. comparar a tensão exibida com um multímetro
1. se necessário, reajustar `BatCal`

Lembrete importante:

* `BatCal` afeta a leitura de tensão
* `BatTyp` afeta a estimativa percentual da bateria

Ver também: [Operação de rádio](./Radio-operation#battery-display-type-and-calibration) e [Menu](./Menu#hidden-menu).

## O microfone externo PTT se comporta de forma diferente

Este é um comportamento conhecido em algumas revisões de hardware.

As diferenças documentadas incluem:

* TX pode esperar até RX é claro antes de transmitir
* Os tons DTMF ou o tom de 1750 Hz podem ser cortados rapidamente

O lado interno `PTT` não mostra esses problemas nos casos documentados.

Veja também: [Funções Button](./Button-functions#external-microphone).

## O rádio vai dormir inesperadamente.

Verifique estes menus:

* `SetOff`: sono profundo após um período de inatividade
* `BatSav`: relação ativo/sono durante a operação normal

Se `SetOff` não é `OFF`, o rádio pode entrar no modo de sono após a inatividade, mesmo durante a digitalização, desde que nenhuma recepção ocorra.

FoxHunt e Beacon ignoram intencionalmente `SetOff`. Se o rádio permanecer acordado em qualquer aplicação, deixe-o com `EXIT` antes de diagnosticar o temporizador de inatividade. Desde `v6.0.0`, eles são aplicações independentes.

Veja também: [Operação de rádio](./Radio-operation#about-the-setoff-menu).

## A navegação parece mover-se na direcção errada

Se a navegação do menu ou alguns controles parecerem se mover na direção errada, verifique primeiro o item do menu oculto `SetNav`.

Este firmware não pode detectar de forma confiável se está rodando em um `UV-K1` ou em um `UV-K5`. Por causa disso, o estilo de navegação teve que ser exposto como uma configuração de menu.

O `SetNav` permite- lhe escolher entre:

* `LEFT / RIGHT / UV-K1`
* `UP / DOWN / UV-K5(8)`

Isso não muda o próprio recurso. Ele só altera o estilo de navegação usado pelo firmware, e, portanto, como os controles devem ser lidos em seu rádio.

Veja também: [Primeiros passos](./Getting-started#model-differences) e [Menu](./Menu#hidden-menu).

## Botões não fazem o que eu espero

Verifique estas possibilidades:

1. o bloqueio do teclado pode estar activo
1. `SetLck` também pode bloquear as ações do botão lateral programável / `M Long`, o `PTT`, ou ambos
1. Modo RescueOps desativa a maioria das prensas longas e combinações de teclas `F`
1. algumas ações diferem entre `F+` e longa imprensa
1. `F` seguido de um pequeno botão lateral ajusta Passo, enquanto `F` seguido de segurar esse botão lateral abre o seletor de ação nas edições atuais v6

Veja também: [Funções de button](./Button-functions), [FoxHunt](./Fox-Hunt), [Beacon](./Beacon) e [Características avançadas](./Advanced-features#rescueops).

## Compreender Power e SetPwr: potência TX por canal e global

O menu Power determina a potência de transmissão utilizada pelo canal atual ou VFO. Os valores disponíveis são LOW1 a LOW5, MID, HIGH, ou USUÁRIO. Esta configuração é, portanto, armazenada localmente, numa base por canal.

O menu SetPwr não seleciona diretamente a potência para um canal específico. Ele só define qual nível de potência real é atribuído ao modo USUÁRIO, escolhendo de LOW1 a LOW5, MID, ou ALTO. Esta configuração é global para todo o rádio.

Como resultado, todos os canais cuja configuração Power está definida para USER usarão automaticamente o valor atualmente definido no SetPwr.

Este mecanismo permite alterar o poder efetivo de vários canais configurados para USUÁRIO de uma só vez, sem ter que editar cada canal individualmente.

## Para onde ir a seguir

* [Primeiros passos](./Getting-started)
* [Programação com CHIRP](./Programming-with-CHIRP)
* [UV Studio](./UV-Studio)
* [Operação de rádio](./Radio-operation)
* [Varredura](./Scanning)
* [Características avançadas](./Advanced-features)
* [Menu](./Menu)
* [Funções dos botões](./Button-functions)
