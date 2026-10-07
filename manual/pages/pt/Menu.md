# Operação do menu

O menu pode ser acessado com o botão `M`  (breve imprensa) .

> [!NOTE]
> A navegação usa `UP` / `DOWN` em UV-K5, ou `LEFT` / `RIGHT` em UV-K1. O layout ativo segue a opção de menu oculto `SetNav`.

Introduzido em Fusion `v5.9.0`, o navegador de categoria é usado durante as edições oficiais `v6.0.0` e `v6.1.0`. Selecione uma categoria com `UP` / `DOWN`, então pressione `M` para abrir sua lista de itens. O item selecionado é exibido no lado esquerdo da tela e seu valor atual é mostrado à direita.

Para encontrar um item de menu, navegue por sua categoria ou selecione `All` para usar o menu plano original. Você também pode inserir o número de menu **global** da tela de categoria; por exemplo, digite `52` para acessar `SysInf`. A entrada de número directo muda para `All`. Fusion `v5.9.0` usa `01` para `77`; `v6.0.0` multiboot-capaz adiciona `SetCfg` e estende a lista completa para `78`.

Uma vez que o item de menu desejado é realçado, pressionando o botão `M` entra nesse item de menu.

Uma vez selecionado o item do menu, pressionar os botões de seta `UP` e `DOWN` ajusta a configuração desse item. Para confirmar a seleção, pressione o botão `M`. Para cancelar a seleção, pressione `EXIT`.

De uma lista de itens, pressione `EXIT` para retornar ao navegador de categoria. Pressione `EXIT` novamente para deixar o menu e voltar para a tela de rádio.

![Menu](https://github.com/user-attachments/assets/e12cd5c2-c1ad-441d-819f-b90c047c2f7a)

## Navegador de menu categorizado

A tela da categoria Fusion mostra a categoria anterior, atual e próxima à esquerda. O lado direito mostra quantos itens a categoria destacada contém.

| Categoria | Itens Fusion | Índice |
| --- | ---: | --- |
| `Channels` | 21 em v6 | passo de frequência, potência, tons, deslocamento, largura de banda, canal e configurações de memória, além de `SetCfg` |
| `Scan` | 6 | lista de varredura, canais de prioridade, modo de retomada e motor de varredura |
| `Keys` | 10 | atalhos programáveis, bloqueio de teclado, modo PTT e canal de chamada |
| `Power` | 4 | poupança/display de bateria, tempo- limite de inatividade e protetor de tela |
| `Display` | 11 | exibição do canal, tela de inicialização, retroiluminação e configurações de UI |
| `Timers` | 4 | Tempo- limite TX, configurações de tempo- limite EOT e RX/TX |
| `Audio` | 5 | microfone, bip de teclado, volume e perfis de áudio RX |
| `Radio` | 6 | squelch, STE, roger beep, modo VOX e RX |
| `DTMF` | 5 | códigos up/down, tom lateral, pré-carregamento e decodificador ao vivo |
| `Service` | 6 | menus de inicialização ocultos; somente visíveis após o gesto de inicialização do menu oculto |
| `All` | 72 normalmente em v6, 78 com Serviço | ordem plana original e numeração global |

O contador de itens dentro de uma categoria filtrada é local para essa categoria. Use o `All`, ou digite um número da tela de categoria, quando quiser os números globais listados abaixo.

O firmware lembra a última categoria selecionada e o último item destacado em cada categoria para a sessão atual. Estas posições de navegação não são gravadas através de uma reinicialização.

## Dicas rápidas

* no `All`, os primeiros 13 itens são as principais configurações de canal VFO ao vivo
* `ScList`, `ScPri`, `PriCh1`, `PriCh2` e `ScnRev` são os itens relacionados com a varredura de chaves
* `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` e `M Long` controlam atalhos personalizáveis
* o menu oculto só está disponível na inicialização com `PTT` + `SIDE BUTTON 1️⃣`

## Menu principal

O número na frente de cada item do menu descrição é o ** menu número do item ** que pode ser usado para a seleção rápida.
1. `Step` - passo da frequência (em kHz), os botões `UP` e `DOWN` mudam de frequência por este valor, também você só pode definir uma frequência que é múltipla de metade deste valor.
1. `Power` - potência de saída de rádio (baixa 1 / baixa 2 / baixa 3 / baixa 4 / baixa 5 / média / alta / usuário). Note que o poder do usuário pode ser sintonizado através do menu `SetPower`.
1. `RxDCS` - receptor Digital-codificado Squelch. Se activar isto, o squelch só irá desbloquear se este código estiver a ser recebido. Você pode iniciar uma varredura DCS/CTCSS enquanto estiver neste menu pressionando o botão `* SCAN`.
1. `RxCTCS` - Sistema de Esquema de Tom Contínuo receptor. O Squelch só desbloqueará se este código for recebido. Você pode iniciar uma varredura DCS/CTCSS enquanto estiver neste menu pressionando o botão `* SCAN`.
1. `TxDCS` - transmissor Digital-Coded Squelch, rádio irá enviar o código dado durante a transmissão
1. `TxCTCS` - transmissor Continuum Tone-Coded Squench System, rádio irá enviar o código dado durante a transmissão

   No submenus `RxDCS`, `TxDCS`, `RxCTCS` e `TxCTCS`, o emblema superior direito mostra a entrada selecionada e seu índice homólogo:

   * para CTCSS: `NN/HH`, onde `NN` é a posição na lista completa de 50 tons e `HH` é o número de tom homologado. `--` significa que o tom selecionado é um dos tons extra, não-homologados.
   * Para DCS: `NNN/HH`, onde `NNN` é a posição na lista completa de DCS e `HH` é o número de DCS homologado. `--` significa que a entrada DCS selecionada não está na lista homologada PMR446.
   * `OFF` é exibido como `00/00` para CTCSS e `000/00` para DCS.
   * Os valores de DSC que terminam em `N` são códigos normais; os valores que terminam em `I` são códigos invertidos. Os itens de DCS invertidos são mostrados na lista completa, mas eles não recebem um índice homólogo e, portanto, mostram `--`.

1. `TxODir` - direção de deslocamento de frequência do transmissor
1. `TxOffs` - valor de deslocamento de frequência do transmissor
1. `W/N` - largura de banda usada pelo transceptor
   * WIDE - `25 kHz`
   * NARROW - `12.5 kHz`
1. `BusyCL` - bloqueio de canal ocupado, bloqueia rádio de transmissão quando o sinal está sendo recebido
1. `Compnd` - compander (compressor / expansor), permite que sinais com uma grande faixa dinâmica sejam transmitidos sobre instalações que têm uma capacidade de alcance dinâmico menor, melhora a qualidade de áudio, ambos os rádios devem usar esta opção
1. `Mode` - modo de demodulação, padrão é FM, AM / USB pode ser usado apenas para ouvir
1. `TXLock` - habilitar ou desativar o modo de transmissão do canal (se não for coberto pelo plano `F Lock`)
1. `ChList` - selecione a lista de varredura do canal de memória
1. `ChSave` - gravar a configuração actual num canal de memória
1. `ChDele` - apagar o canal de memória
1. `ChName` - modificar o nome do canal de memória
   * Usar os botões `UP` e `DOWN` para selecionar um canal para editar
   * Pressione o botão `M` novamente para inserir o modo de edição do nome
   * Use as teclas de número em modo multi-tap para editar o caractere atual, como em celulares antigos
     * pressione a mesma tecla novamente para percorrer as letras e número atribuídos a ela (`2` = `a`, `b`, `c`, `2`, etc.)
     * longo- pressione uma tecla de número para inserir o número correspondente diretamente
     * curto- pressione `F` para alternar entre minúsculas e maiúsculas (`abc` / `ABC`)
     * `F` de impressão longa para entrar em `#`
     * curto- pressione `* SCAN` para inserir `-`, ou longo- pressione-o para inserir `*`
     * curto- pressione `0` para inserir um espaço, então pressione novamente para inserir `0`
   * Você ainda pode usar os botões `UP` e `DOWN` para percorrer manualmente os caracteres disponíveis
   * Pressione o botão `M` para mover para a próxima posição de caracteres
   * Repita acima de dois passos até chegar ao fim
   * Quando "Claro?" aparecer, pressione o botão `M` para salvar, ou Sair para cancelar
   * Pressione o `EXIT` para mover para trás um caractere; da posição do primeiro caracter, ele sai da edição do nome
   * Pressione `EXIT` para cancelar a edição e voltar ao menu principal.
1. `ScList` - seleciona a lista de varredura utilizada para a digitalização do canal: `01` para `24`, `ALL`, e, começando com `v6.1.0`, `MIX`.
   * `MIX` combina uma seleção salva de listas numeradas sem alterar a lista atribuída a cada canal.
   * Selecione `MIX` e pressione `M` para abrir seu editor.
   * Use as teclas de navegação ou digite `01` para `24` para selecionar uma lista e, em seguida, pressione `M` para comutá-la.
   * Pressione `EXIT` para salvar. Pelo menos uma lista deve permanecer selecionada.
   * Veja [MIX scan list](./Scanning#mix-scan-list-v610) para o comportamento completo.
1. `ScPri` - ativa/desativa o suporte de canais de prioridade durante a digitalização.
1. `PriCh1` - define o canal de prioridade 1
1. `PriCh2` - define o canal de prioridade 2
1. `ScnRev` - modo de recuperação de varredura
   * CARRIER - após o sinal desaparecer, pare por [250 milissegundos a 20 segundos] antes de retomar a digitalização
   * STOP - após receber um sinal, pare o scan
   * TEMPO - retomando a digitalização após [5 segundos a 2 minutos] pausa
1. `F1Shrt` - Função de imprensa curta `SIDE BUTTON 1️⃣`
1. `F1Long` - Função de imprensa `SIDE BUTTON 1️⃣` longa
1. `F2Shrt` - Função de imprensa curta `SIDE BUTTON 2️⃣`
1. `F2Long` - Função de imprensa `SIDE BUTTON 2️⃣` longa
1. `M Long` - botão `M` função de pressão longa
1. `KeyLck` - opção de bloqueio automático do teclado (OFF ou 15 segundos a 10 minutos antes do bloqueio automático do teclado)
1. `TxTOut` - limite máximo de tempo de transmissão
1. `BatSav` - opção de economia de bateria, uma taxa entre tempo ativo e tempo de sono (OFF, 1:1 a 1:5)
1. `BatTxt` - valor adicional da bateria na barra de estado (`NONE`, `VOLTAGE` ou `PERCENT`)
1. `Mic` - sensibilidade do microfone
1. `MicBar` - barra de microfone que aparece durante a transmissão 
1. `ChDisp` - estilo de exibição de canais
1. `POnMsg` - modo de exibição inicial
   * `ALL`: mostre as informações de boas-vindas, tensão e firmware/versão configuradas
   * `SOUND`: mantenha o comportamento de som de inicialização normal sem tela de boas-vindas
   * `MESSAGE`: mostrar apenas a mensagem de boas- vindas configurada
   * `VOLTAGE`: mostrar a tensão da bateria e porcentagem estimada
   * `LOGO`: mostrar o logótipo de arranque 128x64 personalizado carregado com [UV Studio](./UV-Studio#boot-logo)
   * `NONE`: saltar a tela inicial
1. `BLTime` - duração da luz de fundo
1. `BLMin` - brilho mínimo da luz de fundo, quando a luz de fundo da tela se desligar, ela vai diminuir para este valor
1. `BLMax` - brilho máximo de retroiluminação, quando a retroiluminação da tela se ligar, ficará brilhante para este valor
1. `BLTxRx` - ativação de retroiluminação em TX ou RX
1. `Beep` - teclado pressionar o som bip
1. `Roger` - sinal de recepção no final da transmissão
1. `STE` - eliminador de cauda squelch, elimina o ruído no final de uma transmissão
1. `RP STE` - eliminador da cauda do squelch do repetidor
1. `1 Call` - canal de chamada de uma chave; permite- lhe mudar rapidamente para esse canal com o botão `9 Call`
1. `UPCode` - Código DTMF que é enviado no início da transmissão
1. `DWCode` - Código DTMF que é enviado no final de uma transmissão
1. `PTT ID` - define se `UPCode` e/ou `DWCode` devem ser transmitidos
1. `D ST` - Interruptor de tom lateral DTMF; permite- lhe ouvir tons transmitidos através da coluna de rádio
1. `D Prel` - Tempo de pré- carga DTMF
1. `D Live` - exibe códigos DTMF recebidos pelo rádio no meio da tela
1. `VOX` - Nível de sensibilidade TX ativado por voz
1. `SysInf` - informação do sistema. No F4HWN atual compila este item é paginado: digite-o com `M`, em seguida, use `UP` / `DOWN` para mover entre páginas.
   * identidade: autor de firmware, versão e edição
   * `BUILD`: data de compilação, tempo de compilação e identificador de commit
   * `BATTERY`: tensão medida da bateria, porcentagem estimada da bateria e tipo/perfil selecionado da bateria
   * `MEMORY`: uso de FLASH e SRAM, quando a página de memória está habilitada na compilação
   * `CODE` / `WIKI`: Códigos QR para links de projeto, quando páginas de código QR estão habilitadas na compilação
1. `RxMode` - define como a frequência superior e inferior é usada
   * PRINCIPAL SOMENTE - transmite e escuta sempre na frequência principal (`MO`)
   * DUAL RX RESPOND - escuta ambas as frequências, se o sinal é recebido na frequência secundária ele trava para ele por alguns segundos para que você possa responder à chamada (`DWR`)
   * CRUSS BAND - sempre transmite no primário e escuta na frequência secundária (`XB`)
   * PRINCIPAL TX DUAL RX - sempre transmite no primário, escuta ambos (`DW`)
1. `Sql` - nível de sensibilidade ao squelch
1. `SetPwr` - conjuntos de energia do usuário
   * LOW 1 (< ~ 20 mW)
   * LOW 2 (~125 mW)
   * LOW 3 (~250 mW)
   * LOW 4 (~500 mW, limite superior abaixo da faixa PMR...)
   * 5 (~1 W)
   * MID (~2 W)
   * ALTO (~5 W)
1. `SetPTT` - define o uso do PTT
   * CLASSIC
   * ONEPUSH
1. `SetTOT` - define alerta TOT
   * OFF
   * SOM
   * VISUAL
   * TODOS ( VISUAL + SOND )
1. `SetEOT` - define alerta EOT (útil para pausas entre 2 transmissões)
   * OFF
   * SOM
   * VISUAL
   * TODOS ( VISUAL + SOND )
1. `SetCtr` - define contraste LCD
1. `SetInv` - define LCD invertido (melhor para visão noturna)
1. `SetLck` - seleciona o que está desativado enquanto o bloqueio do teclado está ativo
   * `KEYS`: bloqueie o teclado frontal; as ações de atalho programáveis e `PTT` permanecem disponíveis
   * `KEYS + ACTIONS`: também bloquear as ações programáveis atribuídas aos dois botões laterais e `M Long`; `PTT` permanece disponível
   * `KEYS + PTT`: também bloquear `PTT` para evitar a transmissão acidental; ações de atalho programáveis permanecem disponíveis
   * `KEYS + ACTIONS + PTT`: bloqueie o teclado frontal, ações de atalho programáveis e `PTT`

   Em cada modo, pressione `F #` para desbloquear o rádio. Veja [Funções Button](./Button-functions#keypad-lock-and-setlck) para detalhes.
1. `SetMet` - conjuntos S-Meter design
   * CLASSIC
   * TINY (como no Yaesu FT4 ou FT-65, por exemplo)
1. `SetGUI` - conjuntos de design GUI
   * CLASSIC (fonte maior, menos informação mostrada)
   * TINY (fonte menor, mais informações mostradas)
1. `SetRxA` – define o perfil de áudio RX para a modulação atual

   Perfis `FM`:

   - `FLAT`: Ganho de saída mais baixo (BK4829-seguro). Mais neutro, melhor para ambientes silenciosos.
   - `CLEAN`: Perfil balanceado padrão. Áudio confortável com ganho moderado.
   - `MID`: Ganho maior do que LIMPEZA sem a agressividade do BOOST.
   - `BOOST`: Perfil de voz para sinais fracos / ambientes barulhentos. Maior ganho, mais áudio "presente".
   - `MAX`: Ganho máximo de saída (pode distorcer em sinais fortes ou alto-falantes pequenos). Melhor adequado para um alto-falante externo.

   Perfis `AM`:

   - `SHARP`: filtro IF estreito com baixo ganho. Mais seletiva, com melhor rejeição do canal adjacente. Pode soar mais severo ou um pouco distorcido em sinais fortes, mas permanece claro.
   - `STOCK`: Pretendia ficar o mais perto possível do comportamento do firmware de estoque.
   - `OPEN`: maior filtro de IF com maior ganho. Mais aberto e agradável em sinais fracos, mas algumas recepções podem soar um pouco abafado, especialmente ATC.
1. `SetTmr` - define se os timers RX e TX são exibidos
1. `SetOff` - define o atraso antes do transceptor entrar em sono profundo (OFF ou 1 minuto para 2 horas)
1. `SetNFM` - define FM estreito para Estreito ou Estreito
1. `SetVol` - define o ganho de volume de áudio para a saída de alto-falante fina
1. `SetKey` - define a chave para ativar o modo RescueOps ao iniciar o transceptor
1. `SetScn` - define o [modo do motor de varredura](./Scanning#scan-engine-mode-normal-vs-fast).
   * `NORMAL`: usa o caminho padrão da varredura.
   * `FAST`: usa o caminho mais recente de digitalização rápida. O firmware pré-verifica várias frequências/canais com RSSI antes de fazer a configuração de recepção completa, salta lotes silenciosos mais rápido, refina candidatos próximos em passos finos, e usa um pequeno cão de guarda para retomar se o loop de varredura para.
1. `SetSav` - define o [salvador de tela](./Radio-operation#screen-saver-and-backlight-timeout) usado após o tempo- limite de luz traseira, quando ativado na compilação.
   * `OFF`: nenhum protetor de tela
   * `LOGO`: mostrar o logotipo de inicialização personalizado como uma tela ociosa
   * `LOGO+`: mostrar o logotipo de inicialização personalizado com um efeito de rolagem
   * `MATRIX`: mostrar uma tela ociosa animada de matriz

   O `SetSav` está ativo apenas quando o `BLTime` usa uma duração cronometrada da luz de fundo. É suspenso durante a varredura RX, TX, PTT, BEAM e FM ativa.
1. `SetCfg` - seleciona o banco de configuração usado pelo firmware em execução em builds `v6.0.0` com capacidade Multiboot.
   * `CFG M`: Banco principal de configuração
   * `CFG 1` para `CFG 4`: bancos de configuração associados com slots de firmware 1 a 4

   Pressione `M` duas vezes para confirmar um banco diferente. O rádio reinicia assim que o banco é mapeado antes de quaisquer canais ou configurações são carregados. O slot de firmware não muda. Confirmar que o banco já está em uso é um no-op. Ver [Multiboot e Multiconfig](./Multiboot-and-Multiconfig#using-setcfg).

## Menu oculto

O menu oculto é ativado segurando `PTT` + `SIDE BUTTON 1️⃣` enquanto liga o rádio, em seguida, liberando todas as teclas.

73. `F Lock` - define o plano de banda de frequência TX.
    * DEFAULT+ (137-174, 400-470) - permite TX em bandas padrão, mais opções `Tx 200`, `Tx 350`, `Tx 500`
    * FCC HAM (144-148, 420-450)
    * CA HAM (144-148, 430-450)
    * CE HAM (144-146, 430-440)
    * GB HAM (144-148, 430-440)
    * (137-174, 400-430)
    * (137-174, 400-438)
    * PMR 446
    * GMRS FRS MURS
    * TODOS DISÁVEIS - desativa TX em todas as frequências
    * Unlock ALL - permite TX em todas as bandas. Ele tem um bloqueio adicional; veja [como ligá-lo](./Advanced-features#tx-on-all-bands).
74. `350 En` - habilita o RX no `350 MHz`
75. `BatCal` - calibração da tensão da bateria. Compare a tensão exibida com um multímetro e ajuste-a até combinarem o mais próximo possível
76. `BatTyp` - tipo de bateria / curva de descarga utilizada para o cálculo da percentagem de bateria. Afeta `%`, não a tensão medida em si
77. `SetNav` - configura o tipo de navegação (UP/DOWN para UV-K5, esquerda/direita para UV-K1)
78. `Reset` - reinicia as configurações de rádio
   * VFO - remove apenas as configurações do canal
   * ALL - reinicia tudo (configurações de canal e rádio)

Na tela de menu categorizada, estes seis itens aparecem na categoria `Service`. Eles também são anexados ao `All`, onde uma compilação `v6.0.0` com capacidade para multiboot passa por `78/78`. No `v5.9.0`, que não tem `SetCfg`, as entradas ocultas retêm os números `72` para `77`.

## Páginas relacionadas

* [Primeiros passos](./Getting-started)
* [UV Studio](./UV-Studio)
* [Operação de rádio](./Radio-operation)
* [Varredura](./Scanning)
* [Funções dos botões](./Button-functions)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [Características avançadas](./Advanced-features)
* [Resolução de problemas](./Troubleshooting)
