# Começar

Esta página é um guia de orientação rápida para usuários pela primeira vez do firmware. Não substitui a documentação completa, mas deve ajudá-lo a encontrar a página certa mais rapidamente e evitar os erros mais comuns.

## Primeiros 5 minutos

Se você só quiser programar uma frequência, teste o rádio e salve-o:

1. Selecione o VFO ativo com `F` + `2 A/B`.
1. Mude esse VFO para `frequency mode` com `F` + `3 VFO/MR`.
1. Digite uma frequência com o teclado.
1. Abra o menu com `M`, escolha `Channels` (ou `All`), e ajuste os itens básicos que você precisa (`Step`, `Power`, tons, offset, largura de banda, `Mode`, `TXLock`).
1. Salve a configuração com `ChSave` se você quiser mantê-la como um canal de memória.
1. Volte para `channel mode` com `F` + `3 VFO/MR` quando quiser navegar por canais salvos.

Se você precisar visualizar ou controlar o rádio de um navegador, inspecione atividade RF, firmware flash, faça backup da calibração ou faça upload de um logotipo de inicialização personalizado, use [UV Studio](./UV-Studio). Se preferir programar memórias de um computador, utilize o driver `CHIRP` dedicado fornecido com cada versão de firmware. Veja [Programação com CHIRP](./Programming-with-CHIRP) para o fluxo de trabalho completo.

Se você já conhece o firmware, consulte [Alterações recentes](./Recent-changes) para as últimas mudanças estáveis do `v6.1.0` e os destaques anteriores do `v6.0.0`.

> [!WARNING]
> Não utilize Quansheng CPS. Ele substitui configurações personalizadas.

## Escolha uma edição

O último lançamento estável do `v6.1.0` tem quatro edições oficiais:

| Edição | Melhor para | Capacidades adicionais |
| --- | --- | --- |
| `Fusion` | a maioria dos usuários e operação diária | conjunto de características de referência equilibrada |
| `FieldOps` | uso de campo e primeira resposta | RescueOps, residente FoxHunt, residente Beacon |
| `Transfer` | cópia de dados entre rádios | AirCopy e Beam residente |
| `Labs` | experimentação | RescueOps, AirCopy e aplicativos de sobreposição instaláveis |

FoxHunt e Beacon são aplicações independentes desde `v6.0.0`. No FieldOps eles são residentes; no Labs eles são instalados e lançados separadamente como aplicativos de sobreposição.

Para a maioria dos usuários, comece com Fusion e escolha uma edição especializada apenas quando você precisar de suas capacidades adicionais. Multiboot permite manter várias edições e configurações isoladas no mesmo rádio.

## Tarefas comuns

### Iniciar as frequências de digitalização

1. Mude um VFO para `frequency mode`.
1. Defina a frequência inicial.
1. Defina o passo de frequência com o menu `Step`.
1. Mantenha `* SCAN` pressionado.

Para uma faixa de varredura limitada, carregue os limites inferior e superior nos dois VFOs, pressione `5 NOAA` para permitir `ScnRng` e, em seguida, pressione `* SCAN`.

Para o comportamento completo da varredura, listas de varredura, varredura de prioridade e varredura DCS / CTCSS, veja [Varredura](./Scanning).

### Iniciar a digitalização dos canais de memória

1. Muda para `channel mode`.
1. Atribuir canais a uma lista de verificação com o menu `ScList`, ou por `5 NOAA` de longa pressão.
1. Mantenha `* SCAN` pressionado.

O firmware `v6.1.0` atual suporta listas de varredura `24`, `ALL` e um modo `MIX` configurável que verifica várias listas selecionadas juntas.

Veja [Varredura](./Scanning) para o comportamento completo da lista de varredura.

### Se não conseguir transmitir

Verifique primeiro estes itens:

1. Verifique se `Mode` é `FM` e não `AM` ou `USB`.
1. Verifique se a frequência está dentro do plano `F Lock` selecionado.
1. Se a frequência estiver fora do plano de banda selecionado, verifique se `TXLock` está definido para `OFF`.
1. Procure um pequeno cadeado ao lado do canal ou nome VFO.

Se isso ainda não explica, veja [Resolução de problemas](./Troubleshooting).

### Gravar a bateria

Os dois principais menus a saber são:

* `BatSav` para a relação ativo/sono durante a operação normal
* `SetOff` para sono profundo após um período de inatividade

Veja [Operação de rádio](./Radio-operation#battery-display-type-and-calibration) para exibição de bateria, tipo de bateria e calibração e [Operação de rádio](./Radio-operation#about-the-setoff-menu) para o comportamento detalhado do modo de latência.

## Diferenças de modelos

Este firmware visa o `UV-K1` e `UV-K5 V3`.

A diferença dia-a-dia mais visível na documentação é a navegação:

* `UV-K5`: a navegação é geralmente descrita com `UP` / `DOWN`
* `UV-K1`: a navegação é geralmente descrita com `LEFT` / `RIGHT`

A opção de menu oculto `SetNav` controla este estilo de navegação.

Algumas capturas de tela e exemplos usam a terminologia UV-K5 primeiro, mas o mesmo recurso geralmente existe no UV-K1 com as teclas de navegação equivalentes.

## Conceitos principais

Estes termos aparecem ao longo do wiki:

* `VFO mode`: você digita frequências diretamente e ajustar as configurações ao vivo antes de salvá-las
* `Channel mode` / `memory mode`: você navega por canais de memória salvos
* `Main VFO`: a linha superior ou inferior ativa, marcada pelo `►`
* `Menu category`: o primeiro nível de menu categorizado introduzido no Fusion `v5.9.0` e usado pelas edições v6 atuais; `All` restaura a ordem plana original e numeração global
* `F Lock`: o principal plano de banda TX
* `TXLock`: uma permissão TX extra por canal quando uma frequência está fora do plano `F Lock` selecionado
* `Scan list`: um dos grupos de varredura de memória `24`, ou `ALL`
* `MIX`: um modo de digitalização `v6.1.0` que combina uma seleção salva de listas `01` para `24`
* `ScnRng`: verifica apenas entre as frequências atualmente carregadas nas duas VFOs
* `SetOff`: tempo limite de inatividade antes do sono profundo
* `POnMsg`: modo de exibição inicial, incluindo o logotipo de inicialização personalizado opcional
* `Multiboot`: mantém `Main` mais quatro imagens de firmware compatíveis com v6 adicionais em Flash externo
* `Config bank`: o perfil de canais/settings isolados emparelhado com um slot Multiboot por padrão
* `SetCfg`: muda o banco de configuração sem alterar o slot de firmware em execução
* `Overlay app`: um pequeno programa `.app` apenas para laboratórios carregado do Flash externo para RAM quando lançado
* `MO`, `DW`, `DWR`, `XB`: Abreviaturas `RxMode` mostradas na barra de estado

## Para onde ir a seguir

* [Operação de rádio](./Radio-operation) para uso do VFO/canal, barra de estado, `F Lock`, `TXLock` e comportamento de sono
* [Alterações recentes](./Recent-changes) para as principais alterações visíveis pelo usuário em versões recentes
* [UV Studio](./UV-Studio) para visualização ao vivo, atividade RF, flashing de firmware, slots Multiboot, aplicativos Labs, calibração, logotipos de inicialização e as ferramentas de recuperação `v1.6.0` de flash externo
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig) para slots de firmware, o seletor de inicialização, bancos de configuração e `SetCfg`
* [Aplicações overlay](./Overlay-apps) para instalar e lançar aplicativos experimentais Labs
* [Programação com CHIRP](./Programming-with-CHIRP) para programação de computador com o driver dedicado incluído em cada versão
* [Varredura](./Scanning) para varredura de frequência, varredura de memória, `ScnRng`, e varredura DCS / CTCSS
* [Menu](./Menu) para cada item de menu e o menu oculto
* [Funções dos botões](./Button-functions) para atalhos, teclas longas e teclas programáveis
* [FoxHunt](./Fox-Hunt) para detecção de direção assistida apenas por sinal
* [Beacon](./Beacon) para o transmissor Morse periódico independente
* [AirCopy](./AirCopy) para transferência de memória/configurações de rádio e melhorias `v6.1.0`
* [Características avançadas](./Advanced-features) para RescueOps, o modo de retomada, o jogo embutido, e recursos de pesquisa TX-on-all-bands
* [Analizador de espectro](./Spectrum-analyzer) para digitalização em estilo bandscope
* [Recetor de rádio de transmissão FM](./FM-broadcast-radio-receiver) para a funcionalidade FM de transmissão
* [Resolução de problemas](./Troubleshooting) para problemas comuns e verificações rápidas
