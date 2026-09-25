# Funções do botão

Os botões podem desencadear funções de duas maneiras:

1. pressione o botão `F #` primeiro, depois o botão alvo (escrito abaixo como `F+`)
2. pressione o botão de destino diretamente

Em muitos casos, a longa imprensa duplica a ação `F+`, mas alguns botões têm um comportamento de longa impressão diferente.

## Avisos rápidos

* `F+` significa: pressione `F #`, em seguida, pressione o botão de destino
* as etiquetas de navegação podem ser `UP` / `DOWN` ou `LEFT` / `RIGHT`, dependendo do modelo e `SetNav`
* os atalhos programáveis estão listados em [Funções personalizadas](#custom-button-functions)
* introduzido em Fusion `v5.9.0` e disponível nas edições v6 atuais, pressionando `F` e em seguida ** segurando** um botão lateral abre o [seletor de ação lateral](#side-key-action-picker)

## Teclado frontal

### `M`
* curto- imprensa - inserir menu
* curta pressão enquanto canal / frequência de digitalização - último canal encontrado é preservado na tela
* pressão longa durante a varredura de canais — exclui temporariamente um canal de memória (não funciona com `* SCAN ALL`)
* longa imprensa - programável pelo usuário no menu: `M Long`
### `EXIT`
* curto - sai do menu/função atual, apaga um dígito em uma caixa de entrada
* Long Press - apaga todas as entradas, sai da caixa de entrada DTMF, sai do modo monitor, sai do `ScnRng`
### `UP` e `DOWN`
* subir e descer em menus, frequência, configurações e outras listas
* `F+` - aumenta ou diminui o valor Squelch.
### `1 BAND`
* `F+`
  * em ** modo de frequência** - comuta bandas de frequência `1` para `7`; há também banda `7+` para frequências acima de `1 GHz`
  * em modo ** canal** - configurações de canal são copiadas para modo frequência
* longa imprensa
  * em ** modo de rádio normal** - mesmo
  * em modo de transmissão **FM** - ciclos das faixas de frequência de transmissão FM; veja [Receptor de rádio FM](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range)
### `2 A/B`
* `F+` - alterna VFO principal superior/inferior (marcado por `►`)
* longa imprensa - mesmo
### `3 VFO/MR`
* `F+` - interruptores entre o modo de frequência e o modo de canal
* longa imprensa - mesmo
### `4 FC`
* `F+` - liga a frequência e modo de cópia CTCSS. Comece a transmitir com o outro rádio e a frequência e o código CTCSS serão detectados. Você pode salvar essas configurações com o botão `M`
* longa imprensa - mesmo
### `5 NOAA`
* `F+` - liga o analisador de espectro
* longa imprensa
   * em ** modo de canal** - ciclos o canal de memória selecionado através de sua atribuição de lista de varredura: `OFF`, `1` para `24`, em seguida, `ALL`
   * em modo **frequência** - ativa a função [scan range](./Scanning#scan-frequency-range-function)
### `6 H/M/L`
* `F+` - ativa os níveis de potência do canal atual
* longa imprensa - mesmo
### `7 VOX`
* `F+`
  * na edição `Labs` - abre o lançador [overlay-app](./Overlay-apps)
  * em builds com o jogo residente e nenhum carregador de sobreposição-app - inicia Breakout
* longa pressão - liga/desliga o modo VOX quando o VOX estiver activo
### `8 R`
* `F+` - permite o gerenciamento manual de retroiluminação e liga ou desliga a retroiluminação
* longa imprensa - liga o modo inverso para canais que têm um conjunto de deslocamento de frequência. Substitui a frequência TX pela frequência RX
### `9 Call`
* `F+` - desabilita o gerenciamento manual de retroiluminação
* longa imprensa - muda o canal atual para o canal `1-Call` definido no rádio.
### `0 FM`
* `F+` - liga rádio FM
* longa imprensa - mesmo
### `* SCAN`
* curto - entra no modo de entrada DTMF
* `F+` - liga o scanner DCS / CTCSS para a frequência atual
* longa imprensa
   * no modo **canal** - liga o scanner do canal
   * em ** modo de frequência** - liga o scanner de frequência (pode usar o recurso [scan range](./Scanning#scan-frequency-range-function))
* enquanto a varredura de memória está em andamento, `F+` ou longo-pressão `* SCAN` muda para a próxima lista de varredura válida não vazia
### `F # 🗝`
* imprensa curta - comuta o modificador de função `F+`
* longa imprensa - liga ou desliga o teclado; o menu `SetLck` seleciona se o bloqueio também cobre ações de atalho programáveis e/ou `PTT`

### Fechamento do teclado e SetLck

O bloqueio do teclado sempre desativa o teclado frontal, exceto que o `F #` de longa pressão permanece disponível para desbloquear o rádio. O menu `SetLck` estende o bloqueio para outros controles:

* `KEYS`: os dois atalhos de botões laterais, `M Long` e `PTT` permanecem disponíveis
* `KEYS + ACTIONS`: os atalhos programáveis atribuídos ao `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` e `M Long` também estão desativados; `PTT` permanece disponível
* `KEYS + PTT`: `PTT` também está desativado para evitar transmissão acidental; atalhos programáveis permanecem disponíveis
* `KEYS + ACTIONS + PTT`: o teclado frontal, atalhos programáveis e `PTT` estão todos desativados

## Botões laterais

### `PTT`
* Botão "Push-To-Talk". Existem 2 modos: CLASSIC e ONEPUSH (ver menu `SetPTT`)
  * CLASSIC - PTT funciona como de costume. Pressione o PTT para começar a transmitir e liberá-lo para parar.
  * ONEPUSH - PTT funciona como um interruptor. Pressione o PTT para começar a transmitir, e solte-o sempre que quiser. A transmissão ainda está activa. Pressione o PTT novamente quando quiser, então solte-o para parar de transmitir. Funciona como no OpenGD77 (se você sabe).

* quando este botão é usado para parar a digitalização do canal/frequência, o último canal encontrado é preservado na tela
* realizada em conjunto com `Side button 2️⃣`, transmite o tom `1750 Hz`
* mantido em conjunto com qualquer um dos botões do teclado frontal transmite códigos DTMF

### `Side button 1️⃣`
* curto - programável pelo usuário no menu: `F1Shrt`
* longa imprensa - programável pelo usuário no menu: `F1Long`
* `F` então pressione curto - aumenta o valor do passo no modo VFO
* `F` então segure - abre o seletor de ação da tecla lateral

### `Side button 2️⃣`
* curto - programável pelo usuário no menu: `F2Shrt`
* longa imprensa - programável pelo usuário no menu: `F2Long`
* este botão também pode ser usado para enviar o tom `1750 Hz` segurando-o junto com o botão `PTT`
* `F` então pressione curto - diminui o valor do passo no modo VFO
* `F` então segure - abre o seletor de ação da tecla lateral

### Selector de acção de teclas laterais

O seletor de ação executa um atalho disponível sem alterar as funções salvas em `F1Shrt`, `F1Long`, `F2Shrt` ou `F2Long`.

Do ecrã normal:

1. Pressione `F` de forma que o indicador `F` apareça.
1. Segure o botão lateral 1 o botão lateral ou 2 o botão lateral até que o coletor abra.
1. Use `UP` / `DOWN` para destacar uma ação.
1. Pressione `M` para executá-lo imediatamente.

A tela mostra a ação anterior, selecionada e seguinte. `EXIT` ou `F` cancela sem executar nada. Pressionar o `PTT` fecha o coletor e continua com o manuseio normal do PTT, para que ele não bloqueie uma transmissão urgente.

O seletor também fecha automaticamente após aproximadamente cinco segundos, quando a recepção começa, se o teclado fica bloqueado, ou quando outra tela toma conta. Cada botão lateral se lembra de sua última ação de seleção destacada para a sessão atual; as seleções reiniciam quando o rádio reinicia.

O seletor lista as mesmas ações compiladas documentadas abaixo, exceto `NONE`. Restrições de ação normais ainda se aplicam: uma ação que não está disponível no estado de rádio atual é recusada com o bip de erro usual.

## Microfone externo
### `PTT`
* Botão "Push-To-Talk".
* O `PTT do microfone externo` funciona de forma diferente do botão lateral interno `PTT`.

> [!NOTE]
> Em algumas revisões de hardware, o microfone externo `PTT` se comporta de forma diferente:
> - ao pressionar o PTT, o TX espera até não ser recebido nenhum sinal RX ( observado com revisão rádio PCB V1.4 e OK com V1.6 ). Isto funciona bem com o `PTT` interno
> - um tom DTMF (`key press`) ou 1750 Hz (`function button`) pode ser cortado em um segundo. Isto funciona bem com o `PTT` interno

## Funções personalizadas do botão
Cinco ações de atalho podem ser personalizadas no menu:
* `F1Shrt` - botão do lado 1', pressione curto
* `F1Long` - botão do lado 1, pressione longo
* `F2Shrt` - botão do lado 2, pressione curto
* `F2Long` - botão do lado 2, pressione longo
* `M Long` - botão de menu, pressione

Funções disponíveis:
* NENHUMA - nenhuma ação
* FLASH LUZ - mudar para a próxima função lanterna: Ligar / Desligar
* PODER - alternar a potência de saída de rádio entre [LOW 1 / Low 2 / Low 3 / Low 4 / Low 5 / MID / ALTO]
* MONITOR - modo do monitor de interruptor ligado / desligado
* SCAN - iniciar canais/escaneamento de frequência
* VOX - função de activação da voz ligado / desligado
* Radio FM - ligar / desligar o rádio FM
* `1750 Hz` - enviar a explosão de tom `1750 Hz`
* BLOQUEAR KEYPAD - bloquear / desbloquear o teclado
* VFO A VFO B - mudar VFO principal para superior/inferior
* VFO MEM - alterar o modo de VFO atual, modo de frequência ou modo de canal de memória
* MODE - mude para o próximo modo de demodulação entre [FM / AM / USB]
* RX MODE - alternar o modo de exibição entre [DW / DWR / XB / MO]
* PRINCIPAL SOMENTE - alternar modo de exibição entre [DW / DWR / XB] e MO
* PTT - interruptor modo PTT CLASSIC / ONEPUSH
* WIDE NARROW - interruptor entre WIDE e NARROW
* MUTE - volume de falantes mudos
* RxA - mude o perfil de áudio RX para a modulação atual: em `FM`, `FLAT` / `CLEAN` / `MID` / `BOOST` / `MAX`; em `AM`, `SHARP` / `STOCK` / `OPEN`
* PODER ALTO - mude temporariamente para a potência máxima do `5 W`
* REMOVER OFFSET - remova temporariamente o deslocamento de um canal de memória, se presente
* BEAM - abre o modo de transferência BEAM, quando ativado na compilação. BEAM pode enviar as configurações atuais do canal VFO/memory para outro rádio ou receber configurações de outro rádio.
* FOX HUNT - abre o aplicativo de busca de direção somente de recebimento, quando residente ou disponível como um aplicativo Labs instalado.
* BEACON - abre o aplicativo Morse beacon independente, quando residente ou disponível como um aplicativo Labs instalado.
* RF LOG - abre o log de histórico RX/TX, quando habilitado na compilação. O log mostra sessões recentes de recepção, monitoramento e transmissão armazenadas em flash externo.

### Acção BEAM

Atribuir `BEAM` a um dos atalhos personalizáveis (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`), então acionar esse atalho para abrir o modo BEAM.

No modo BEAM:

* `UP` / `DOWN` alterna entre `BEAM TX` e `BEAM RX`
* O `M` inicia a operação seleccionada
* `EXIT` deixa o modo BEAM

`BEAM TX` envia a configuração atual do VFO ou do canal de memória. O pacote inclui a frequência RX, offset TX, configurações RX/TX DCS ou CTCSS, modulação, largura de banda, potência de saída, atribuição de lista de varredura, compander, configurações relacionadas ao DTMF quando habilitado, e o nome do canal.

`BEAM RX` espera por um pacote BEAM de outro rádio. Quando um pacote válido é recebido, o rádio o salva no primeiro canal de memória livre. Se a memória estiver cheia, o estado mostra `MEM FULL`. Pressionando `EXIT` após um sucesso receber switches para o canal recém-salvado; caso contrário, ele restaura o estado anterior VFO / canal.

### FOX HUNT ação

Atribuir `FOX HUNT` a um dos atalhos personalizáveis (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`), então acionar esse atalho para abrir FoxHunt no VFO selecionado.

No modo Fox Hunt:

* O `1` alterna entre a escadaria do S-meter e o gráfico recente da história do sinal
* Ciclos `2` entre sinal sonoro silencioso, estilo Geiger, e áudio recebido-estação
* Ciclos `3` através de `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` e `BYP+`
* `UP` / `DOWN` altera diretamente a atenuação do receptor
* `M` redefine as referências de pico, mínimo e tendência de sinal
* segurando `F` por aproximadamente 0,5 segundos trava ou desbloqueia os controles FoxHunt; as setas de atenuação permanecem disponíveis enquanto travadas
* `EXIT` deixa FoxHunt

Veja [FoxHunt](./Fox-Hunt) para as leituras de tela, ganhar configurações, controles e orientação de direção.

### Acção BEACON

Atribuir `BEACON` a um dos atalhos personalizáveis, em seguida, acionar esse atalho para iniciar a aplicação Beacon independente. Beacon inicia sua primeira transmissão imediatamente.

Chaves `1`, `2`, `3` e `4` ajustar a janela TX, intervalo silencioso, identificador de raposa, e modo de chaveamento (`TONE` / `CARR`). Segurando `F` por aproximadamente 0,5 segundos trava ou desbloqueia todos os controles Beacon, inclusive durante uma transmissão ativa. `M` pára a transmissão atual e inicia um novo intervalo de inatividade; `EXIT` pára com segurança e deixa Beacon.

Veja [Beacon](./Beacon) para identificação, cronometragem, proteção de transmissão, configurações salvas e informações de segurança.

### Acção RF LOG

Atribuir `RF LOG` a um dos atalhos personalizáveis (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`), em seguida, acionar esse atalho para abrir o histórico RX/TX log.

Os registros de log recebem, monitoram e transmitem sessões em flash externo. Cada linha de tráfego mostra:

* o nome do canal, quando a entrada vem de um canal de memória; caso contrário, a frequência
* se a entrada foi `RX` ou `TX`
* um novo crachá de índice
* um crachá de detalhe que pode mostrar duração, sinal/potência ou tensão da bateria

Na tela `RF LOG`:

* `UP` / `DOWN` rola através do log, entradas mais recentes primeiro
* `F` + `UP` salta para a nova entrada
* `F` + `DOWN` salta para a entrada mais antiga visível
* uma pressão curta em `M` alterna o filtro: `ALL`, `RX`, `TX`
* curto-pressão `* SCAN` ciclos o emblema de detalhe: duração, RX S-meter / nível de potência TX, menor tensão da bateria durante a sessão
* long-press `M` pede confirmação de limpeza de log; long-press `M` novamente em `CLEAR LOG / SURE?` limpa o log
* `EXIT` deixa a tela de registro, ou cancela a confirmação clara

O rádio mantém até 512 entradas de tráfego visíveis na visualização de log. As linhas do separador de sessão marcam o rádio reiniciado quando o filtro `ALL` estiver ativo.

## Páginas relacionadas

* [Primeiros passos](./Getting-started)
* [Menu](./Menu)
* [Operação de rádio](./Radio-operation)
* [Varredura](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [Características avançadas](./Advanced-features)
* [Aplicações overlay](./Overlay-apps)
* [Sobreposição de aplicações](./Overlay-applications)
* [Resolução de problemas](./Troubleshooting)
