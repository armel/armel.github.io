# Alterações recentes

Esta página resume a última versão estável do `v6.1.0` e as principais alterações visíveis pelo usuário nas versões anteriores.

Para o arquivo oficial de lançamento, veja a página [GitHub releases](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases).

## v6.1.0 destaques

`v6.1.0` é a última versão estável. Concentra-se na transferência de dados mais rápida e segura, no novo modo `MIX` scan-list, na manutenção Labs expandida através do UV Studio e em várias correções de confiabilidade.

### Pacote de libertação

Baixe firmware e os arquivos que acompanham a partir da página de lançamento [v6.1.0](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases/tag/v6.1.0). A versão fornece as quatro edições oficiais - `Fusion`, `FieldOps`, `Transfer` e `Labs` - além do driver CHIRP compartilhado. Escolha a edição por capacidade em vez de tratar Fusion como um pacote contendo cada recurso especializado.

### Actualização a partir de v6.0.0

1. Com o firmware antigo ainda instalado, baixe o rádio usando seu driver CHIRP correspondente e salve essa imagem. Exportar opcionalmente as linhas do canal de memória para CSV.
1. Faça backup da calibração específica do dispositivo do rádio com [UV Studio](./UV-Studio#calibration).
1. Flash a edição `v6.1.0` escolhida. Execute uma restauração de fábrica apenas se as instruções de lançamento ou o caminho de migração de sua versão instalada explicitamente exigir.
1. Carregue o driver `v6.1.0` CHIRP dedicado e baixe uma nova imagem do rádio atualizado.
1. Copie as linhas do canal antigo para essa imagem fresca em vez de carregar a imagem de configuração antiga completa.
1. Em Labs, selecione `v6.1.0` no catálogo de aplicativos versão do UV Studio. Substitua qualquer aplicativo de sobreposição que o carregador relate como incompatível.
1. Antes de usar AirCopy, atualize ambos os rádios para firmware `v6.1.0` compatível; seu protocolo de rádio otimizado não é compatível com o fio com versões anteriores.

Para uma cópia de segurança adicional após instalar o `v6.1.0` Labs, o UV Studio pode guardar toda a memória Flash externa. Consulte [Escolher a cópia de segurança ou cópia correta](./UV-Studio#choosing-the-right-backup-or-copy).

### Desempenho AirCopy e clonagem de cabos

O protocolo `v6.1.0` AirCopy envia até três blocos `64-byte` em um quadro FSK, reduzindo a sobrecarga de volta e fazendo transferências de rádio aproximadamente duas vezes mais rápido. Ele compara hashes CRC32 em grupos de até blocos `24` e envia apenas blocos que diferem no alvo.

A edição `Transfer` também adiciona `CABLE COPY` sobre UART e uma seleção `Flash 2M` exclusiva para clonar Flash externo, excluindo o setor de calibração específico do dispositivo. Seleções de remetentes e receptores são validadas antes de os dados serem escritos.

Este é um novo protocolo: ambos os rádios devem executar o mesmo firmware compatível. Ver [AirCopy](./AirCopy#v610-improvements).

### Lista de verificação MIX

O novo modo `MIX` verifica uma seleção salva de listas `01` para `24` como um conjunto combinado. Selecione `MIX` no `ScList`, pressione `M` para abrir o editor, alternar as listas com `M` e salvar com `EXIT`. O editor exibe o número de listas selecionadas, e pelo menos uma lista deve permanecer habilitada.

Durante uma varredura de memória ativa, digitando `25` seleciona `MIX`; `00` continua a selecionar `ALL`. Ver [Varredura](./Scanning#mix-scan-list-v610).

### UV Studio v1.6.0

UV Studio `v1.6.0` adiciona backup completo `2 MiB` externo-Flash e restauração para Labs. A restauração preserva o setor de calibração específico do dispositivo, ignora setores `4 KiB` idênticos usando CRC32 quando suportado, verifica cada setor escrito e reinicia o rádio quando terminado.

Uma nova recuperação guiada de software de fábrica verifica imagens empacotadas por tamanho e SHA-256, restaura uma imagem externa-Flash reconstruída enquanto preserva a calibração, em seguida, solicita para o modo DPU e instala o firmware correspondente UV-K1 ou UV-K5 V3 estoque. A interface também agrupa operações de calibração e boot-logo em visualizações de backup/restore mais claras ou download/upload.

Estas ferramentas externas-Flash requerem `v6.1.0` Labs. Ver [UV Studio](./UV-Studio#version-status), [external-Flash backup e restauração](./UV-Studio#external-flash-backup-and-restore-v160), e [recuperação de software de fábrica](./UV-Studio#factory-software-restoration-v160).

### Outras alterações v6.1.0

A versão também acrescenta os jogos overlay [`Snake`](./Overlay-applications#snake), [`Rapid Roll`](./Overlay-applications#rapid-roll) e [`Space Impact`](./Overlay-applications#space-impact). Inclui ainda correções para o RF Log entre bancos de configuração, o armazenamento das aplicações overlay, a calibração por varredura e o tratamento do fim do squelch DCS.

## v6.0.0 destaques

`v6.0.0` foi lançado em 10 de setembro de 2026. Ele introduziu quatro edições oficiais, Multiboot e Multiconfig, a plataforma Labs overlay-app, AirCopy confiável, e aplicações independentes FoxHunt e Beacon.

### Quatro edições oficiais

| Edição | Utilização prevista | Características adicionais |
| --- | --- | --- |
| `Fusion` | utilização diária | edição de referência equilibrada; recomendada para a maioria dos usuários |
| `FieldOps` | trabalho de campo e de primeira resposta | RescueOps, FoxHunt residente e Beacon residente |
| `Transfer` | Transferência de dados rádio-radio | AirCopy e Beam residente |
| `Labs` | experimentação | RescueOps, AirCopy e aplicativos de sobreposição, incluindo FoxHunt, Beacon e Beam |

Fusion `v6.0.0` não inclui mais as características especializadas v5.x AirCopy, Beam, RescueOps, Fox Hunt / Beacon, ou Breakout. Escolha a edição especializada apropriada quando uma dessas capacidades for necessária.

### Aplicações independentes FoxHunt e Beacon

A ação `FOX HUNT / BEACON` foi dividida antes do lançamento `v6.0.0`. `FOX HUNT` e `BEACON` são ações programáveis separadas, aplicativos residentes separados em FieldOps e aplicativos de sobreposição separados em Labs.

Ver [FoxHunt](./Fox-Hunt) e [Beacon](./Beacon).

### Multiboot

Edições compatíveis podem armazenar quatro imagens adicionais de firmware F4HWN em Flash externo. Mantenha `M` (`MENU`) por si só enquanto liga o rádio para abrir o seletor de inicialização, validar as imagens armazenadas e restaurar `Main` ou slot `1` para `4`.

O firmware protege automaticamente a imagem normalmente flashada como `Main`, verifica o CRC completo de um slot antes de apagar o Flash interno e registra seu estado ativo redundantemente. A visão `Firmware Slots` do UV Studio instala, verifica, nomes e apaga os quatro slots de usuário enquanto o rádio está em modo normal.

Somente imagens `v6.0.0` ou F4HWN mais recentes com capacidade para multiboot devem ser instaladas nesses slots. Ver [Multiboot e Multiconfig](./Multiboot-and-Multiconfig).

### Multiconfig e SetCfg

Cada slot de firmware seleciona um banco de configuração separado por padrão. Canais de memória, nomes de canais, VFOs, listas de varredura e configurações de rádio, portanto, permanecem isolados ao alternar edições. Calibração, logotipo de inicialização, slots de firmware/app, estado Multiboot e log RF permanecem compartilhados.

O novo menu `SetCfg` pode deliberadamente emparelhar o firmware em execução com outro banco. `SysInf` mostra emblemas `SLOT` e `CFG` independentes, e UV Studio pode redefinir a configuração de um slot de usuário sem apagar seu firmware.

Ver [Multiboot e Multiconfig](./Multiboot-and-Multiconfig#multiconfig-one-configuration-bank-per-slot) e [Menu](./Menu).

### AirCopy confiável com agradecimentos

O Air Copy aguarda um reconhecimento depois de cada quarteirão. O receptor verifica o pacote antes de escrevê-lo e pode solicitar um reenviar; o remetente retorna blocos perdidos, danificados ou não reconhecidos até três vezes. Blocos duplicados são reconhecidos com segurança, então uma ACK perdida não dessincroniza mais a transferência.

Uma nova escolha `All (Mem+Set)` transfere todos os oito bancos de 128 canais e Configurações em uma execução contínua. A tela relata o progresso do `TX`/`RX` mais contagens de erro.

Ver [AirCopy](./AirCopy#reliable-protocol-in-v600).

### Sobreposição de aplicativos em Labs

A edição experimental `Labs` pode instalar pequenos programas `.app` em Flash externo e executá-los a partir de uma sobreposição `4 KiB` RAM. UV Studio's `Apps` view, marcado `Labs only`, instala, verifica, listas e remove aplicativos; `F + 7` abre o lançador on-radio.

O carregador valida o formato do aplicativo, compatibilidade ABI/API, recursos necessários, endereço RAM, tamanho e código CRC antes da execução. Os aplicativos disponíveis incluem ferramentas de rádio como Broadcast FM, FoxHunt, Beacon e Beam, além de Breakout, Tetris, Cube3D e Plasma.

Veja [Aplicações overlay](./Overlay-apps) para instalação e compatibilidade, e [Referência das aplicações](./Overlay-applications) para a finalidade e controles de cada aplicativo.

### Modo de teclado Beacon (TONE / CARR)

Beacon ganha uma configuração de modo de teclado na tecla `4`. `TONE` (padrão) é o comportamento anterior — uma operadora de FM contínua com o tom `1000 Hz` chaveado para cada elemento Morse (MCW / F2A). `CARR` interrompe o porta-aviões em si para cada elemento, reproduzindo o padrão interrompido pelo portador que muitas raposas ARDF usam no campo: o sinal desaparece entre elementos, tornando a direção mais difícil e deixando um receptor AM simples copiá-lo. A configuração é salva e incluída em transferências AirCopy, e está disponível tanto no residente e sobreposição Beacon. Ver [Beacon](./Beacon#timing-and-keying).

## v5.9.0 destaques

Essas alterações foram desenvolvidas após `v5.8.0` e lançadas em `v5.9.0`.

### Navegador de menu categorizado

O desenvolvimento Fusion constrói o menu numa tela de categoria em vez de mostrar imediatamente a lista plana original. As categorias disponíveis são `Channels`, `Scan`, `Keys`, `Power`, `Display`, `Timers`, `Audio`, `Radio` e `DTMF`. A inicialização do menu oculto também adiciona uma categoria `Service`.

A categoria `All` mantém a ordem plana-menu original e numeração global. Introduzir um número de menu diretamente da tela de categoria também muda para `All`, para que atalhos de menu numerados existentes continuem a funcionar. O firmware recorda a última categoria selecionada e o último item usado em cada categoria para a sessão atual.

Ver [Menu](./Menu#categorized-menu-browser).

### Selector de acção de teclas laterais

Depois de pressionar `F`, segure cada botão lateral para abrir um seletor de ação temporário. Use `UP` / `DOWN` no UV-K5, ou `LEFT` / `RIGHT` no UV-K1, para procurar as ações de atalho compiladas disponíveis e pressione `M` para executar a ação selecionada. `EXIT` ou `F` cancela o seletor; pressionando `PTT` fecha-o e continua com o manuseio normal da transmissão.

O coletor fecha automaticamente após aproximadamente cinco segundos ou quando a recepção começa. Cada botão lateral lembra sua última seleção do coletor até o rádio reiniciar. Uma impressora `F` + botão lateral normal mantém o seu comportamento de Step-up / Step-down existente.

Veja [Funções de button](./Button-functions#side-key-action-picker).

### Melhorias Fox Hunt / Beacon

Fox Hunt adiciona dois passos mais profundos após as configurações originais `ATT 0`, `ATT 6`, `ATT 15` e `ATT 27`. Eles são mostrados como `BYP` e `BYP+`; esses nomes descrevem modos de close-range convenientes, não um bypass de hardware literal. As teclas de navegação (`UP` / `DOWN` em UV-K5, ou `LEFT` / `RIGHT` em UV-K1) agora mudam a atenuação diretamente.

Após uma mudança de ganho, o firmware brevemente permite que o detector RSSI se estabeleça e, em seguida, reinicia o pico, mínimo, tendência e referências de história de sinal. Isso evita picos obsoletos e saltos artificiais ao se mover entre intervalos de ganho.

Segurando `F` por aproximadamente 0,5 segundos alterna um bloqueio de teclado temporário compartilhado pela Fox Hunt e Beacon. Na Fox Hunt, as chaves de navegação permanecem disponíveis para atenuação enquanto bloqueadas. Em Beacon, todos os controles normais são bloqueados até que o mesmo longo pressione desbloqueia o teclado, inclusive durante uma transmissão ativa.

Fox Hunt e Beacon agora ambos ignoram o temporizador normal de inatividade `SetOff` e permanecem ativos até que explicitamente saiam. Seu tempo de luz traseira comum e atualizações da bateria continuam a operar.

Ver [Fox Hunt e Beacon](./Fox-Hunt-and-Beacon).

### Corrigições de varredura e transmissão FM

Durante a digitalização de memória, alterar a lista de varredura ativa temporariamente mantém a varredura retomada enquanto o nome da lista de varredura é realmente exibido. Isso mantém o medidor de progresso oculto e a posição de varredura sincronizada. As varreduras de frequência e alcance não são pausadas porque não mostram a sobreposição do nome.

Uma estação de transmissão FM ativa agora ignora um sinal de entrada detectado no canal de rádio principal, então a varredura FM não é interrompida. A escuta FM normal ainda produz a recepção do canal principal como antes.

Ver [Varredura](./Scanning#changing-the-scan-list-during-scan) e [FM broadcast receiver](./FM-broadcast-radio-receiver#scanning-for-stations-from-fm-vfo).

## v5.8.0 destaques

Essas alterações são baseadas em commits após a tag `v5.7.0` no `feature_update_v5`.

### Caça à Raposa / Beacon

Fusion compila adiciona uma ação `FOX HUNT / BEACON` programável com dois modos complementares:

* Fox Hunt fornece um display `dBm` calibrado, leituras de S-meter e pico, uma tendência de sinal de um segundo, atenuação selecionável, estilo Geiger ou áudio de estação recebida, e uma escolha entre um bitola de escadas e uma história de sinal de aproximadamente 18 segundos.
* Beacon usa o ativo TX VFO para transmitir um identificador ARDF ou `<CALLSIGN> MOE` em Morse, com janelas `5` para `60-second` TX ajustável e intervalos `5` para `240-second` silencioso.

Beacon toma seu sinal de chamada de CHIRP `Message Line 1` e começa sua primeira transmissão imediatamente quando selecionado. Antes de cada explosão, o firmware verifica o bloqueio de frequência TX aplicável, por-VFO `TXLock`, estado da bateria e restrição de modulação.

A atenuação, bitola, modo de áudio e intervalo Beacon são salvos em flash externo e estão incluídos nas transferências do Air Copy `Settings`.

Veja o histórico [Fox Hunt / Beacon compatibility page](./Fox-Hunt-and-Beacon). Para firmware atual, use as páginas separadas [FoxHunt](./Fox-Hunt) e [Beacon](./Beacon).

## v5.7.0 destaques

Essas alterações são baseadas em commits após a tag `v5.6.1` no `feature_update_v5`.

### UV Studio


Ele fornece espelhamento de tela ao vivo e controle de teclado não-TX, visualização e análise de log RF compatível, exportação de CSV de log RF, flashing de firmware, backup/restore de calibração e gerenciamento personalizado de log de inicialização. Ele é executado localmente através do `Web Serial` sem uma instalação, servidor ou conta.


### Registo RF

Compila com registro RX/TX adicionar uma ação de atalho `RF LOG` programável.

Os registros de log RF recebem, monitoram e transmitem sessões em flash externo, então os mostra em uma visão de histórico mais recente. Cada entrada pode mostrar o nome ou frequência do canal, direção RX/TX, duração, nível de potência RX S ou TX, e menor tensão da bateria observada durante a sessão.

O ecrã de registo suporta:

* Filtros `ALL`, `RX` e `TX`
* até 512 entradas de tráfego visíveis
* atalhos mais recentes e mais antigos com `F` mais as teclas de navegação (`UP` / `DOWN` em UV-K5, ou `LEFT` / `RIGHT` em UV-K1)
* um fluxo de confirmação claro antes de apagar o log

Veja [Características avançadas](./Advanced-features#rf-log) e [Funções Button](./Button-functions#rf-log-action).

### Exclusões do ScanRange

`ScnRng` agora pode manter até `64` frequências temporariamente excluídas, em vez de `32`.

Como antes, a lista é circular, não é escrita na memória, e é limpa quando o rádio reinicia ou quando a identidade do intervalo muda.

Ver [Varredura](./Scanning#excluding-frequencies-in-scnrng).

### Âmbito de bloqueio SetLck

`SetLck` agora tem quatro opções em vez de duas:

* `KEYS`
* `KEYS + ACTIONS`
* `KEYS + PTT`
* `KEYS + ACTIONS + PTT`

`ACTIONS` cobre os atalhos programáveis atribuídos aos dois botões laterais e `M Long`. Isso torna possível manter esses atalhos disponíveis enquanto trava o teclado dianteiro, ou desativá-los como parte do bloqueio. `PTT` pode ser bloqueado independentemente para evitar transmissão acidental.

Ver [Menu](./Menu#main-menu) e [funções Button](./Button-functions#keypad-lock-and-setlck).

### Manutenção UV Studio

O código de streaming de tela do lado do firmware foi renomeado internamente do manuseio da imagem para o manuseio do UV Studio. Compila que habilita a ponte opcional RX/TX-log UV Studio também pode transmitir linhas de RF-log recentes para ferramentas de visualização compatíveis.

Ver [Características avançadas](./Advanced-features#k5-viewer).

## v5.6.0 destaques

Estas alterações são baseadas nos commits pós-`v5.5.0` no `feature_update_v5`.

### Salvador de tela SetSav

Compila com suporte protetor de tela adicionar o menu `SetSav`.

Modos disponíveis:

* `OFF`: nenhum protetor de tela
* `LOGO`: mostrar o logotipo de inicialização armazenado como uma tela ociosa
* `LOGO+`: mostrar o logotipo de inicialização armazenado com um efeito de rolagem
* `MATRIX`: mostrar uma tela ociosa animada de matriz

O `SetSav` está ligado ao intervalo de luz traseira. Ele pode exibir na tela principal e tela de transmissão FM quando o rádio está ocioso, e é suspenso durante RX, TX, PTT, BEAM, e varredura FM ativa.

Ver [Operação de rádio](./Radio-operation#screen-saver-and-backlight-timeout) e [Menu](./Menu#main-menu).

Como `SetSav` é inserido antes do menu oculto, os índices de menu oculto movem-se por um em `v5.6.0`: `F Lock` começa em `72` em vez de `71`.

### Som de inicialização do logotipo de inicialização

Quando `POnMsg = LOGO`, o modo de logo de inicialização ainda pode manter o comportamento de bip de inicialização normal.

Ver [Menu](./Menu#main-menu) e [UV Studio](./UV-Studio#boot-logo).

### Analisar o indicador RSSI

Compilações de varredura rápida pode exibir uma pequena linha de brilho RSSI durante a digitalização. Ele dá uma visão compacta de amostras recentes RSSI tão fortes candidatos se destacam visualmente enquanto a varredura está em execução.

Ver [Varredura](./Scanning#scan-indicators-and-detection).

### Detecção subaudível de alcance de varredura

`ScnRng` pode detectar CTCSS / DCS enquanto parado em um sinal recebido. O código subaudível detectado é mostrado na interface de varredura quando disponível.

Ver [Varredura](./Scanning#scan-indicators-and-detection).

### Cópia de frequência UI

A tela do scanner `F+4` de cópia de frequência agora separa o estado de busca e o resultado mais claramente:

* `Search Freq`
* `Search Tone`
* `Scan Complete`
* `Scan Failed`
* detalhes `Freq:` e `Tone:` detectados

Ver [Varredura](./Scanning#frequency-copy-and-dcs--ctcss-scanning).

### Atualizações de UV Studio e captura de tela

Molduras de protetor de tela são sincronizadas com UV Studio, e o manuseio de captura de tela foi otimizado para reduzir o uso de RAM e evitar pedaços obsoletos.

Ver [Características avançadas](./Advanced-features#k5-viewer).

### Fixações e refinamentos

Essa versão também incluiu várias correções de comportamento e refinamentos de interface:

* bandascópio / espectro de arredondamento de frequência para passos `8.33 kHz`
* Reconfiguração de RX de relógio duplo AM-to-FM
* Colocação de ícones de bloqueio VFO durante a digitalização
* estojos de proteção de tela/dormir
* ícone de retroiluminação manual oco quando a luz manual está desligada

## Destaques v5.5.0

### Motor de varredura mais rápido

Compilações atuais podem usar o novo mecanismo de varredura `FAST` para digitalização de memória e `ScnRng`.

O menu `SetScn` seleciona entre:

* `NORMAL`: o caminho de digitalização conservador
* `FAST`: um caminho mais rápido que pré-verifica canais ou passos de alcance com RSSI antes de fazer a configuração de recepção completa

Em condições favoráveis, `ScnRng` no modo `FAST` pode escanear em torno de frequências `150+` por segundo.

Ver [Varredura](./Scanning#scan-engine-mode-normal-vs-fast) e [Menu](./Menu#main-menu).

### Exclusões temporárias do intervalo de procura

Enquanto uma varredura `ScnRng` é parada em uma frequência recebida, longa pressão `MENU` para excluir essa frequência da varredura de alcance atual.

Isto foi introduzido com slots `32` em `v5.5.0`; as construções atuais pós-`v5.6.1` permitem exclusões temporárias `64`. Essas exclusões são limpas quando o rádio reinicia ou quando o intervalo de identidade muda.

Ver [Varredura](./Scanning#excluding-frequencies-in-scnrng).

### Modo de transferência BEAM

Compila com suporte BEAM pode enviar o VFO atual ou configuração de canal de memória para outro rádio, ou receber um pacote BEAM e salvá-lo para o primeiro canal de memória livre.

O BEAM é aberto através de uma ação de atalho programável.

Veja [Características avançadas](./Advanced-features#beam-transfer-mode) e [Funções Button](./Button-functions#beam-action).

### Logotipo de arranque personalizado

Compila com suporte de logotipo pode exibir um logotipo de inicialização monocromático `128x64` personalizado na inicialização.

Envie ou baixe o logotipo com UV Studio e selecione `LOGO` no menu `POnMsg`.

Ver [UV Studio](./UV-Studio#boot-logo), [Menu](./Menu#main-menu) e [Resolução de problemas](./Troubleshooting#my-custom-boot-logo-does-not-show).

### Melhorias no ecrã DCS / CTCSS

Os menus `RxDCS`, `TxDCS`, `RxCTCS` e `TxCTCS` agora mostram tanto a posição de entrada selecionada quanto o índice homólogo quando existe.

Isso torna mais fácil distinguir a posição normal da lista, entradas PMR446-homologadas, tons extras e entradas DCS invertidas.

Ver [Menu](./Menu#main-menu).

### Edição do nome do canal

A edição `ChName` foi melhorada com entradas multi-tap, comutação maiúscula/inferior, entrada numérica direta com teclas longas e comportamento `EXIT` mais claro.

Ver [Menu](./Menu#main-menu).

### Persistência do analisador de espectro

O analisador de espectro agora salva mais configurações ao sair da tela de varredura com `EXIT`, incluindo modo gatilho, perfil de sensibilidade automático, escala manual e nível de gatilho.

Iniciando o analisador de `ScnRng` não mais substitui o passo de digitalização salvo ou preferência de contagem de barras.

Ver [Analisador de espectro](./Spectrum-analyzer#saving-settings-on-exit).

### SysInf e informações de compilação

O `SysInf` agora está paginado nas construções atuais. Dependendo das opções de compilação, ele pode mostrar identidade, data/hora de compilação, identificador de commit, informações da bateria, uso de memória e links de projeto QR-code.

Ver [Menu](./Menu#main-menu).

### Cobertura de configurações do Air Copy

As transferências do Air Copy `Settings` agora incluem a área VFO usada por recursos como `ScnRng`, então as frequências de limite de alcance são replicadas ao copiar as configurações.

Ver [AirCopy](./AirCopy).

## Mudanças recentes v5.x também vale a pena saber

As seguintes alterações desembarcaram pouco antes do `v5.5.0` e estão documentadas no wiki porque afetam o uso diário:

* `SetRxA` seleciona diferentes perfis de áudio RX para `FM` e `AM`; em `AM`, ele pode alternar entre `SHARP`, `STOCK` e `OPEN`.
* listas de varredura suportam nomes curtos, e a varredura de memória pode alternar entre listas válidas não vazias durante a digitalização.
* `SysInf`, rádio de transmissão FM e o analisador de espectro UI foram refinados em construções recentes.
* o menu `SetNav` oculto permite que a mesma documentação funcione para os estilos de navegação `UV-K1` e `UV-K5 V3`.

Ver [Menu](./Menu), [Varredura](./Scanning), [Operação de rádio](./Radio-operation), e [Recetor de rádio de transmissão FM](./FM-broadcast-radio-receiver).

## Páginas relacionadas

* [Primeiros passos](./Getting-started)
* [UV Studio](./UV-Studio)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [Aplicações overlay](./Overlay-apps)
* [Sobreposição de aplicações](./Overlay-applications)
* [Varredura](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Funções dos botões](./Button-functions)
* [Características avançadas](./Advanced-features)
* [Analizador de espectro](./Spectrum-analyzer)
* [Menu](./Menu)
