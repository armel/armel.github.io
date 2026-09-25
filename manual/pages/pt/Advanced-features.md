# Recursos avançados

Esta página abrange recursos especializados ou opcionais que não são necessários para operação de rádio básica: BEAM, log RF, RescueOps, UV Studio, o modo de retomada, o jogo embutido e o procedimento de desbloqueio TX orientado para a pesquisa. Os aplicativos AirCopy, FoxHunt, Beacon, Multiboot e sobreposição têm suas próprias páginas detalhadas.

Para uso diário de rádio, consulte [Operação de rádio](./Radio-operation). Para recursos relacionados à digitalização, veja [Varredura](./Scanning).

> [!NOTE]
> Onde esta página menciona `UP` / `DOWN`, use as teclas `LEFT` / `RIGHT` equivalentes no UV-K1. A disposição de navegação ativa segue `SetNav`.

## AirCopy

AirCopy transfere bancos de memória e configurações entre rádios compatíveis. `v6.0.0` adicionou blocos reconhecidos, repetições, manipulação duplicada e `All (Mem+Set)`. `v6.1.0` adiciona quadros multi-bloco, comparação e skipping de blocos idênticos, transporte de cabo e clonagem externa-Flash protegida na edição Transfer.

Veja [AirCopy](./AirCopy) para disponibilidade de edição, controles, compatibilidade de protocolo, transferências de rádio, informações de segurança `CABLE COPY` e `Flash 2M`.

## Aplicações Multiboot, Multiconfig e sobreposição

`v6.0.0` adiciona duas plataformas maiores documentadas separadamente:

* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig) explica `Main` mais quatro slots de firmware, o seletor de inicialização, bancos de configuração independentes, gerenciamento de slots `SetCfg` e UV Studio.
* [Aplicações overlay](./Overlay-apps) explica a plataforma experimental apenas para laboratórios `.app`, instalação através do UV Studio, o lançador `F + 7`, verificações de compatibilidade e desenvolvimento de aplicativos.

## Modo de transferência BEAM

BEAM é um modo de transferência direta opcional para um canal de memória ou VFO. Ao contrário de [AirCopy](./AirCopy), que transfere bancos de memória ou seções de configurações, BEAM é destinado a compartilhar rapidamente a configuração atualmente selecionada com outro rádio compatível.

Atribuir `BEAM` a um dos atalhos personalizáveis (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`), então acionar esse atalho para abrir o modo BEAM.

No modo BEAM:

* `UP` / `DOWN` alterna entre `BEAM TX` e `BEAM RX`
* O `M` inicia a operação seleccionada
* `EXIT` deixa o modo BEAM

O `BEAM TX` envia a configuração atual do VFO ou do canal de memória, incluindo frequência, deslocamento, tons, modulação, largura de banda, potência, atribuição da lista de varredura, compander, configurações relacionadas ao DTMF quando habilitado e nome do canal.

`BEAM RX` espera por um pacote BEAM de outro rádio e o salva para o primeiro canal de memória livre. Se a memória estiver cheia, o estado mostra `MEM FULL`.

Veja [Funções Button](./Button-functions#beam-action) para os detalhes de nível de atalho.

## FoxHunt

[FoxHunt](./Fox-Hunt) é uma aplicação somente para recepção e detecção de sinais. Desde `v6.0.0`, ele tem sua própria ação de atalho `FOX HUNT`. É residente em FieldOps e disponível como um aplicativo de sobreposição instalável em Labs.

## Beacon

[Beacon](./Beacon) é um aplicativo Morse de transmissão de estilo ARDF separado com sua própria ação de atalho `BEACON` e requisitos de segurança. É residente em FieldOps e disponível como um aplicativo de sobreposição instalável separado em Labs.

## Registo RF

Compila com registro RX/TX adicionar uma ação de atalho `RF LOG`. Atribua-o a `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`, então ative esse atalho para abrir a tela de histórico.

Os registros de log RF recebem, monitoram e transmitem sessões para flash externo. É útil para verificar atividade recente após a digitalização, monitoramento de um canal não vigiado ou revisão de transmissões feitas durante o uso do campo.

Cada registro de entradas de tráfego:

* frequência, ou a referência do canal de memória quando a sessão veio de um canal salvo
* Direcção RX ou TX
* duração da sessão
* nível de pico RX S-meter para sessões recebidas, ou nível de potência TX para sessões transmitidas
* menor tensão da bateria medida durante a sessão

A visão de log mostra as entradas mais recentes primeiro e expõe até 512 entradas de tráfego. Quando o filtro `ALL` é selecionado, linhas de separadores horizontais marcam o rádio reiniciado.

<img width="640" height="384" alt="screenshot_2026-08-04_01-36-59-167Z" src="https://github.com/user-attachments/assets/5e0d22a1-4a48-46ed-bbc1-c90c77418120" />

Controles na tela de registro de RF:

* `UP` / `DOWN`: percorre os itens
* `F` + `UP`: saltar para a nova entrada
* `F` + `DOWN`: saltar para a entrada mais antiga visível
* `M`: ciclo do filtro entre `ALL`, `RX` e `TX`
* `* SCAN`: ciclo o distintivo do lado direito detalhe entre a duração, S-meter / potência TX, e menor tensão da bateria
* longo- pressione `M`: abra a confirmação clara; longo- pressione `M` novamente em `CLEAR LOG / SURE?` para apagar o log
* `EXIT`: deixe a tela de registro RF ou cancele a confirmação clara

O log é armazenado em uma área de flash externo reservada, por isso sobrevive ciclos de energia normais. Limpar o registo apaga a área reservada.

Veja [Funções Button](./Button-functions#rf-log-action) para os detalhes de nível de atalho.

## RescueOps

### Disclaimer

Gostaria de esclarecer que não sou especialista em serviços de emergência; no entanto, esta característica especial foi desenvolvida com a intenção de satisfazer as necessidades de comunicação dos primeiros respondedores da forma mais eficaz possível. Estou aberto a sugestões de aperfeiçoamento dos profissionais, dentro dos limites de minhas habilidades, do tempo disponível para mim e das capacidades técnicas do transceptor.

### Visão geral

O recurso RescueOps foi desenvolvido especificamente para integrar-se em um sistema de comunicação projetado para os primeiros respondedores (firefighters, etc.). Ele adiciona controles de campo restritos e o comportamento aprimorado da Lanterna, que pode ser configurado para modos fixos, piscando ou SOS. O menu `SetKey` seleciona a tecla de inicialização usada com `PTT` para entrar ou sair do modo RescueOps. Por padrão, a chave é `MENU`, mas também pode ser `UP`, `DOWN`, `EXIT` ou `* SCAN`.

Na família `v6.0.0` oficial, RescueOps está incluído em `FieldOps` e `Labs`. AirCopy é uma capacidade separada fornecida por `Transfer` e `Labs`; habilitar RescueOps não permite AirCopy por si só.

### Utilização

> [!NOTE]
> [Emanuele](https://github.com/emanuelegissi), membro do “[Corpo nazionale dei Vigili del fuoco](https://en.wikipedia.org/wiki/Vigili_del_Fuoco)”, escreveu [documentação](https://github.com/emanuelegissi/uv-k5-firmware-custom/wiki) especificamente dedicado ao uso do recurso RescueOps. Muito obrigado a ele.

Por padrão, o transceptor funciona como qualquer outra versão de firmware, permitindo o acesso a menus (e menus ocultos), prensas longas, ou combinações de teclas `F` para ativar várias funções diretamente do teclado (por exemplo, para iniciar uma varredura ou ajustar a potência de transmissão), bem como atalhos.

No entanto, se o transceptor estiver ligado enquanto pressiona o `PTT` e a tecla configurada no menu `SetKey`, ele irá mudar para o modo RescueOps, desencadeando as seguintes alterações:

* o menu está bloqueado
* prensas longas e combinações de teclas `F` estão desabilitadas (exceto `A/B` e bloqueio de teclado)
* reiniciar no modo menu oculto está bloqueado
* o teclado só pode ser usado para alterar os canais de memória, tal como as teclas `UP` e `DOWN`

Pressões curtas e longas em `F1` e `F2`, bem como prensas longas em `M`, permanecem disponíveis para atalhos. Esta configuração é da responsabilidade do responsável pela instalação do transceptor. Se os atalhos não forem desejados, eles podem simplesmente ser configurados para a ação `NONE`.

Note que o recurso RescueOps oferece 2 novas ações:

* `POWER HIGH`, que permite mudar rapidamente para a potência máxima do `5 W`, se necessário
* `REMOVE OFFSET`, para remover temporariamente o deslocamento de um canal de memória se presente

Essas 2 ações foram acrescentadas a pedido dos profissionais de resgate e correspondem às necessidades no campo.

Uma vez no modo RescueOps, cada inicialização normal mantém o transceptor neste modo. Para voltar ao modo padrão, com acesso a menus e menus ocultos, simplesmente repita a operação de inicialização enquanto pressiona o `PTT` e a chave configurada no menu `SetKey`.

## Jogo

Este firmware inclui um pequeno jogo de fuga.

* Em builds sem sobreposição de aplicativos, pressione `F+7` para iniciar o jogo residente.
* Na edição `Labs`, o `F+7` abre o [overlay-app launcher](./Overlay-apps); instale e selecione `Breakout` ou outro jogo lá.
* Para sair, pressione `EXIT`
* Você pode pausar o jogo com `M`
* Mover a pá usando `4` ou `UP` para a esquerda, e `0` ou `DOWN` para a direita

Este jogo não tem ambição além de diversão. A idéia era simplesmente explorar o que é possível no Quansheng K5 ao lado de suas características de rádio. Pense nisso como um aceno brincalhão para a era Nokia 3310.

![Game](https://github.com/user-attachments/assets/45e20b92-3955-4313-84d7-6c831be1e176)

## Continuar o Modo

O seu transmissor irá reiniciar no mesmo estado em que estava antes de ser desligado. Então, se foi no modo Bandscope, ouvindo transmissão FM, ou digitalização, ele irá automaticamente retomar esse estado na próxima inicialização.

## TX em todas as bandas

### Atenção

** Esta modificação é UNTESTED e é para fins de pesquisa SOMENTE, para explorar as capacidades do dispositivo e seu chipset. NÃO transmita em frequências ilegais. Use uma carga falsa. O(s) autor(es) e contribuidor(es) deste repositório NÃO são responsáveis por quaisquer danos, litígios ou outras consequências do uso indevido deste firmware de pesquisa e não aceitam qualquer culpabilidade. Ao instalar qualquer firmware deste repositório, você aceita toda a responsabilidade por quaisquer consequências que possam surgir e renuncia ao direito de prosseguir ações judiciais contra o(s) autor(es).**

Esta opção não permitirá que você transmita qualquer modulação que não seja FM; esta é uma limitação de hardware. Mudar para AM ou SSB apenas altera o modo de saída de áudio AF do IC RF. Ele não muda todo o CI para o modo AM / SSB. Isto é só para ouvir. Este firmware também é construído com um bloqueio adicional que bloqueia TX quando AM ou SSB está habilitado.

Como exemplo de por que isso não deve ser usado para comunicações reais, considere o seguinte gráfico para a potência de transmissão em `27.254 MHz`:

![txspectrum](https://github.com/egzumer/uv-k5-firmware-custom/assets/14902414/65cdcb90-01b3-4344-a06b-ac7b8c408899)

* `27.254 MHz` -> **228 microwatts**
* `54 MHz` -> 2,4 miliwatts
* `81 MHz` -> 230 miliwatts
* `109 MHz` -> 558 miliwatts
* `136 MHz` -> 412 miliwatts
* `163 MHz` -> 122 miliwatts
* `190 MHz` -> 14,8 miliwatts
* `218 MHz` -> 2 miliwatts
* `245 MHz` -> 2,6 miliwatts

Créditos: [Tunas1337 / UV-K5-Moded-Firmwares](https://github.com/Tunas1337/UV-K5-Modded-Firmwares#even-bigger-warning)

### Como desbloquear TX em todas as bandas

1. Ir para o menu [escondido](./Menu#hidden-menu)
1. Digite o menu `F Lock`
1. Escolha a opção `UNLOCK ALL`
1. Repita os passos 2-3 **3 vezes**. Faz com cuidado. Se você confirmar qualquer outra opção no processo, o contador é reiniciado e você terá que repetir o procedimento novamente.

## Páginas relacionadas

* [Primeiros passos](./Getting-started)
* [Operação de rádio](./Radio-operation)
* [Varredura](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [UV Studio](./UV-Studio)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [Aplicações overlay](./Overlay-apps)
* [Funções dos botões](./Button-functions)
* [Resolução de problemas](./Troubleshooting)
