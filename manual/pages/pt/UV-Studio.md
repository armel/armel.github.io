# UV Studio

UV Studio é o companheiro baseado no navegador para firmware F4HWN compatível no UV-K1 e UV-K5 V3. Ele combina funções de display ao vivo e teclado remoto, instalação de firmware, manutenção de rádio, gerenciamento Multiboot e gerenciamento de aplicativos Labs em uma interface.

Abra aqui:

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

UV Studio se comunica diretamente com o rádio através da API `Web Serial`. Dados de rádio são tratados localmente no navegador; nenhuma instalação de aplicativo, conta de servidor ou upload na nuvem é necessária.

> [!IMPORTANT]
> UV Studio não está limitado à edição Fusion. Suas ferramentas gerais funcionam com edições F4HWN compatíveis, enquanto algumas visualizações requerem uma capacidade de firmware específica. Em particular, o gerenciamento de sobreposição-aplicação e as ferramentas externas-Flash são para Labs.

## Estado da versão

UV Studio `v1.6.0` acompanha o firmware estável `v6.1.0`. Além do catálogo de firmware v6, gerenciamento de slots Multiboot e catálogo oficial de sobreposição de aplicativos, ele adiciona:

* uma interface reorganizada que agrupa backup/restore e download/upload de boot-logo
* `2 MiB` completo externo-Flash backup e restauração para builds Labs compatíveis
* Comparação e verificação CRC32 para restauração de Flash externo mais rápida e segura
* restauração guiada do Flash externo de fábrica reconstruída seguido pelo firmware de estoque correto para UV-K1 ou UV-K5 V3

## Requisitos

Precisas de:

* um Quansheng UV-K1 ou UV-K5 V3 compatível com o PY32F071 MCU
* uma ligação `USB-C` com capacidade para dados ou um cabo USB-para-serial compatível com Baofeng/Kenwood
* um navegador desktop com suporte `Web Serial`, como Chrome, Brave, Edge, Opera ou Firefox 151+

Uma cópia transferida da árvore de código UV Studio completa também pode ser aberta localmente. É uma aplicação estática HTML/CSS/JavaScript e não requer uma etapa de compilação ou servidor web local.

## Resumo da funcionalidade e do modo de rádio

| Ferramenta | Estado de rádio necessário | Requisitos em matéria de Firmware |
| --- | --- | --- |
| Visualizador ao vivo e log RF ao vivo | inicialização normal | Suporte compatível ao Visualizador/Registro de RF |
| Firmware Flash | Modo `DFU` / flash | Carregador de arranque UV-K1 ou UV-K5 V3 |
| Calibração, Logotipo de inicialização, RF Log exportação | inicialização normal | firmware F4HWN compatível |
| Fendas de Firmware | inicialização normal | `v6.0.0` ou mais recente com capacidade para multiboot |
| Aplicativos | inicialização normal | Labs com suporte para sobreposição de aplicativos |
| Backup/restauração de Flash externo | inicialização normal | `v6.1.0` Labs com acesso de Flash externo |
| Restauração de software de fábrica | inicialização normal Labs, em seguida, DPU quando solicitado | `v6.1.0` Labs para a primeira fase |

Para entrar no modo `DFU`, desligue o rádio, mantenha `PTT` pressionado e ligue-o sem soltar o botão. Solte `PTT` e ligue ou volte a ligar o cabo de dados. Não é necessário nenhum botão lateral.

## O que o UV Studio pode fazer

O UV Studio fornece:

* uma exibição de rádio `128x64` em tempo real
* teclados virtuais UV-K1 e UV-K5 com prensas curtas e longas
* uma janela de teclado destacável e um controle de reinicialização de rádio
* imagens de tela de rádio e renderização LCD ajustável
* atividade RF ao vivo, marcadores de sessão, filtros e análise
* exportação da atividade armazenada do log RF para CSV
* instalação de firmware a partir do catálogo oficial, a compilação de desenvolvimento de rolamento, ou um arquivo `.bin` local
* download direto do driver CHIRP correspondente para firmware F4HWN versão estável
* instalação, validação, nomeação, eliminação e redefinição de configurações de slots de firmware Multiboot
* instalação e remoção de aplicativos Labs sobreposição de um catálogo oficial versionado ou arquivos `.app` locais
* backup de calibração e restauração
* personalizado boot-logo download, visualização, conversão e upload
* backup externo-Flash, restauração e recuperação guiada de software de fábrica em `v1.6.0`
* temas claros e escuros e traduções em dez idiomas

O UV Studio possui a conexão serial globalmente. Ele impede duas operações de usar a porta ao mesmo tempo e mantém ou restabelece a conexão ao alternar entre ferramentas de modo normal compatíveis.

## Visualizador ao vivo

O Live Viewer espelha o display de rádio e fornece teclados virtuais UV-K1 e UV-K5 correspondentes.

1. Liga o rádio normalmente.
1. Liga o rádio ao computador.
1. Abra `Live Viewer`, selecione o teclado apropriado e clique em `Connect`.
1. Escolha a porta serial de rádio.
1. Use o teclado virtual ou teclado do computador.
1. Clique em `Disconnect` antes de desligar o cabo.

A barra de ferramentas pode reiniciar o rádio conectado, capturar uma captura de tela, alterar a aparência do LCD simulado e desconectar o teclado em uma janela flutuante. O painel `Help` integrado lista todos os atalhos de teclado; os controles comuns incluem setas para navegação, dígitos para prensas curtas, `Shift` mais uma tecla para uma longa imprensa, `Enter` ou `M` para Menu, `Esc` para Sair, e `F1` / `F2` para os botões laterais.

> [!IMPORTANT]
> O controle do visualizador não pode iniciar uma transmissão. O `PTT` exibido não está disponível e UV Studio não é uma ferramenta remota-TX.

## Registo RF

Quando o firmware em execução suporta o RF Log e a ponte do Visualizador, o UV Studio exibe sessões RX e TX ao vivo com:

* informações de direção, frequência e canal
* duração da sessão
* Nível de sinal RX ou potência TX
* tensão da bateria
* Filtros `ALL`, `RX` e `TX`
* atividade, tempo de ar, frequência, sessão e análise de bateria

A ferramenta `Export RF Log` separada lê até as últimas atividades armazenadas e marcadores de energia `512` e cria `rf-log.csv`. Mantenha o rádio em modo normal. Se os nomes dos canais ou as informações do banco de configuração estiverem erradas, atualize para um firmware que contenha as últimas correções do log v6 RF.

## Firmware Flash

> [!WARNING]
> Flashing uma imagem incompatível ou corrompido pode deixar o rádio inutilizável. Confirme a compatibilidade do modelo e bootloader, faça um backup de calibração e mantenha o cabo conectado até que a operação termine.

O catálogo de firmware agrupa as construções F4HWN estáveis atuais por edição, inclui a compilação de desenvolvimento Fusion rolando, e também pode oferecer imagens de estoque compatíveis. Um arquivo `.bin` local permanece disponível quando o catálogo não pode ser carregado ou ao usar uma compilação personalizada.

1. Inicie o rádio no modo `DFU`.
1. Abre o `Flash Firmware`.
1. Selecione a entrada correta do catálogo ou escolha um arquivo `.bin` local compatível.
1. Clique em `Flash firmware` e selecione a porta serial.
1. Aguarde que a operação de progresso termine e que o rádio reinicie.

Quando uma compilação F4HWN com versão estável é selecionada, UV Studio oferece o driver CHIRP compartilhado publicado para essa versão de firmware. O desenvolvimento de rolamentos e as construções de material não usam esse link de driver automático.

## Fendas de Firmware

Todas as quatro edições oficiais `v6.0.0` suportam Multiboot. UV Studio gerencia slots de usuário `1` para `4` em Flash externo. O backup `Main` protegido é mantido pelo firmware e não é intencionalmente exposto como um slot gravável.

Para instalar outra edição:

1. Iniciar um rádio com capacidade para multiboot normalmente.
1. Abra o `Firmware Slots` e atualize a tabela.
1. Selecione uma imagem `v6.x` F4HWN estável compatível do catálogo ou carregue um arquivo `.bin` local.
1. Escolha o slot `1` para `4` e, opcionalmente, digite um nome de exibição de até caracteres `15`.
1. Selecione `Write to slot`, confirme e aguarde apagar, escrever e verificação CRC completa.

O catálogo de slot exclui intencionalmente firmware de estoque, firmware v5, e a imagem de desenvolvimento de rolamento porque essas entradas não são garantidas para retornar ao seletor Multiboot.

Cada slot povoado tem duas ações de manutenção independentes:

* `Erase FW` remove a imagem de firmware armazenada, mas não redefine o banco de configuração desse slot.
* `Reset config` apaga os canais e banco de configurações associados com esse slot, mas deixa sua imagem de firmware instalada.

Veja [Multiboot e Multiconfig](./Multiboot-and-Multiconfig) para `Main`, seleção de slots, bancos de configuração, `SetCfg` e comportamento de recuperação.

## Aplicativos (Labs)

A vista `Apps` gerencia os oito slots experimentais sobrepostos na edição Labs.

1. Iniciar o Labs normalmente e abrir o `Apps`.
1. Atualizar a tabela de aplicativos.
1. Selecione a versão de firmware, em seguida, um aplicativo oficial de seu catálogo versionado; alternativamente, carregue um arquivo `.app` local.
1. Selecione o slot de destino e escolha `Install app`.
1. No rádio, use `F + 7`, selecione o aplicativo e pressione `M`.

UV Studio mostra o nome do aplicativo, versão, tamanho e status de validação. Excluir um aplicativo apaga apenas esse slot de aplicativos.

> [!IMPORTANT]
> Os aplicativos de sobreposição estão ligados ao firmware ABI, nível de API, endereço RAM e recursos. Selecione a versão do catálogo de aplicativos correspondente ao firmware instalado. Reinstale aplicativos compatíveis após uma atualização de firmware quando necessário.

Veja [Aplicações overlay](./Overlay-apps) para compatibilidade do carregador e [Referência das aplicações](./Overlay-applications) para o propósito e os controles de cada aplicativo.

## Escolhendo o backup ou cópia certo

Estas operações protegem ou copiam diferentes partes do rádio e não são intercambiáveis:

| Operação | Qual a composição de | Melhor utilização | Comportamento de calibração |
| --- | --- | --- | --- |
| UV Studio `Calibration` | Calibração de RF e hardware específicos do dispositivo | backup de segurança essencial para um rádio | lê ou restaura explicitamente a calibração; use apenas com o mesmo rádio |
| Imagem de rádio CHIRP | canais mais configurações compreendidas por essa versão do driver | edição e migração de memórias/configurações | não é um substituto para um backup de calibração |
| UV Studio `External Flash` | Imagem `2 MiB` de Flash externo, incluindo configurações, slots, aplicativos, logs, logotipo e dados de calibração no arquivo de backup | backup de arquivo completo e recuperação | a restauração preserva deliberadamente a calibração já presente no rádio alvo |
| Memória AirCopy ou `Settings` | bancos de memória selecionados e/ou configurações de rádio compatíveis | sincronizando dados selecionados entre dois rádios | não copia calibração de hardware |
| AirCopy `Flash 2M` | Flash externo clonado diretamente sobre um cabo | fazendo com que o estado de Flash externo compartilhado de outro rádio corresponda à fonte | exclui e preserva o setor de calibração do rádio alvo |

Para atualizações de rotina, faça pelo menos um backup de calibração e uma imagem CHIRP. Use o backup completo do Flash externo antes de experimentar com Multiboot, slots de aplicativos, recuperação de fábrica ou armazenamento de baixo nível.

## Backup e restauração de Flash externo (v1.6.0)

Esta ferramenta requer os comandos externos-Flash fornecidos pelo `v6.1.0` Labs. Não está disponível em `v6.0.0`.

A vista `External Flash` lê ou restaura o completo PY25Q16 `2 MiB` externo SPI Flash por endereço físico. Isso inclui bancos de configuração, slots de firmware, slots de aplicativos, log RF, estado Multiboot, logotipo de inicialização e outros dados compartilhados.

### Recuar

1. Iniciar uma compilação Labs compatível normalmente.
1. Abra `External Flash` e selecione `Back up`.
1. Clique em `Read external flash` e escolha a porta serial.
1. Espere até que o chip completo seja lido; isso pode levar vários minutos.
1. Baixe `external-flash.bin`.

O backup é exatamente `2 MiB`. Armazená-lo com segurança: contém configuração de rádio e dados de calibração específicos do dispositivo.

### Restaurar

1. Iniciar uma compilação Labs compatível normalmente.
1. Abra `External Flash` e selecione `Restore`.
1. Escolha um backup `2 MiB` completo criado por esta ferramenta.
1. Clique em `Restore external flash` e confirme a operação destrutiva.
1. Mantenha o rádio alimentado e conectado até a verificação terminar e o rádio reiniciar.

UV Studio recusa arquivos que não são exatamente `2 MiB`. Ele funciona setor por setor em unidades `4 KiB` e nunca apaga ou escreve o setor de calibração específico do dispositivo. Com o firmware atual compara valores CRC32, ignora setores que já são idênticos, escreve apenas os restantes setores e verifica cada um. Ele remonta a uma comparação direta de byte quando o comando CRC não está disponível.

> [!WARNING]
> A restauração substitui quase todo o conteúdo externo-Flash, incluindo configurações, logs, logotipo, aplicativos, slots de firmware e estado Multiboot. O setor de calibração do rádio receptor está preservado, então um backup completo de um rádio não é um método para copiar a calibração desse rádio para outro.

Para uma cópia direta rádio-radio de Flash externo, veja a função `Flash 2M` apenas cabo separado em [AirCopy](./AirCopy#external-flash-cloning).

## Restauração de software de fábrica (v1.6.0)

A vista `Factory reset` é uma recuperação guiada de dois estágios para retornar um UV-K1 ou UV-K5 V3 ao software Quansheng correspondente:

1. Iniciar `v6.1.0` Labs normalmente.
1. Abra `Factory reset` e selecione o modelo exato: `UV-K1` ou `UV-K5 V3`.
1. Confirma o aviso. UV Studio carrega a fábrica de correspondência reconstruída imagem externa-Flash e firmware de estoque, em seguida, verifica o seu tamanho e SHA-256 antes de escrever qualquer coisa.
1. UV Studio restaura e verifica o Flash externo, preservando o setor de calibração específico do dispositivo.
1. Quando solicitado, desligue o rádio e digite o modo `DFU`. Não o inicie normalmente entre as duas fases.
1. Selecione `Continue in DFU`; UV Studio instala o firmware de estoque correspondente automaticamente.

Os alvos de estoque empacotados são UV-K1 `v7.03.01` e UV-K5 V3 `v7.00.11`.

> [!WARNING]
> Esta é uma restauração de software destrutiva. Ele remove configurações F4HWN, estado Multiboot, slots de firmware, aplicativos de sobreposição, registros de RF e o logotipo personalizado. A imagem externa é um estado de fábrica reconstruído, não um depósito físico intocado. Selecione o modelo correto e não interrompa nenhum dos estágios.

## Calibração

A calibração é específica do dispositivo. Crie um backup antes de experimentos de firmware ou manutenção de baixo nível, e nomeie o arquivo com o modelo de rádio ou número de série para que os backups não sejam misturados entre dispositivos.

Para apoiar:

1. Liga o rádio normalmente.
1. Abra `Calibration` e selecione `Back up`.
1. Clique em `Read calibration data`.
1. Baixe `calibration.dat`.

Para o restaurar:

1. Liga o mesmo rádio normalmente.
1. Abra `Calibration` e selecione `Restore`.
1. Escolha seu arquivo `calibration.dat`.
1. Clique em `Restore calibration data` e aguarde a conclusão.

> [!WARNING]
> Restaure apenas a calibração pertencente a esse rádio, a menos que você entenda completamente as consequências.

## Logotipo de inicialização

Compatíveis builds podem usar uma imagem `128x64` monocromática personalizada na inicialização ou como um protetor de tela.

Para enviar um logotipo:

1. Liga o rádio normalmente.
1. Abra `Boot Logo` e selecione `Upload`.
1. Escolha uma imagem em um formato comum, como PNG, JPEG ou BMP.
1. Ajuste `Threshold` e `Invert colors` ao verificar a visualização.
1. Selecione `Upload logo to radio`.
1. Escolha `LOGO` em `POnMsg`, ou um modo de logotipo compatível em `SetSav`.

A aba `Download` lê a imagem atual, visualiza-a e salva-a como `logo.png`.

## Resolução de Problemas

Se UV Studio não puder comunicar com o rádio:

* confirmar que a operação seleccionada utiliza o modo de arranque normal ou DFU correcto
* desconectar o cabo, reiniciar o rádio nesse modo, reconectá-lo e selecionar a porta serial novamente
* fechar outros programas ou páginas do navegador que possam possuir a porta serial
* verificar se o cabo transporta dados e está totalmente inserido
* usar uma edição de firmware e versão que expõe a capacidade necessária
* para Apps ou Flash externo, verifique se Labs está rodando em vez de Fusion, FieldOps, ou Transfer

Os detalhes expansíveis do protocolo e operação do `Console` podem ajudar a identificar um comando, tempo- limite, falha de validação ou arquivo errado não suportado.

## Páginas relacionadas

* [Primeiros passos](./Getting-started)
* [Alterações recentes](./Recent-changes)
* [Programação com CHIRP](./Programming-with-CHIRP)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [Aplicações overlay](./Overlay-apps)
* [Sobreposição de aplicações](./Overlay-applications)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [Características avançadas](./Advanced-features)
* [Resolução de problemas](./Troubleshooting)
