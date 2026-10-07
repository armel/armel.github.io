# Digitalizando

Esta página agrupa todas as características relacionadas à digitalização: varredura de frequência, varredura de memória, listas de varredura, `ScnRng`, cópia de frequência e varredura DCS / CTCSS.

Para a operação do dia-a-dia VFO/canal, veja [Operação de rádio](./Radio-operation). Para uso de varredura de espectro, consulte [Espectro analisador](./Spectrum-analyzer).

## Nesta página

* [Scanner de frequência](#frequency-scanning)
* [Scanner de canais de memória](#memory-channels-scanning)
* [lista MIX](#mix-scan-list-v610)
* [Modo do motor de varredura: NORMAL vs FAST](#scan-engine-mode-normal-vs-fast)
* [Indicadores de varredura e detecção](#scan-indicators-and-detection)
* [Recópia de frequência e digitalização DCS / CTCSS](#frequency-copy-and-dcs--ctcss-scanning)
* [ Páginas relacionadas](#related-pages)

> [!TIP]
> Se a varredura de memória parecer quebrada, a causa mais comum é uma lista de varredura ativa vazia. Veja [Resolução de problemas](./Troubleshooting) para as verificações rápidas.

## Varredura de frequência

Para iniciar uma varredura de frequência, mude um VFO para o modo de frequência. Defina uma frequência inicial e um passo de frequência (menu `Step`). Inicie a varredura com uma [função personalizada do botão de varredura](./Button-functions#custom-button-functions) ou mantendo pressionado o botão `* Scan`.

### Função de alcance de frequência de varredura

* mudar para o modo de frequência
* definir as frequências VFO superiores e inferiores para os limites do intervalo de varredura
* longo- pressione `5 NOAA`; o rótulo `ScnRng` deve aparecer
* iniciar a varredura pressionando `* Scan`
* o rádio irá verificar entre os limites selecionados
* longo- pressione `5 NOAA` ou `EXIT`, ou alternar VFOs, para sair do modo `ScnRng`

![Scan Range](https://github.com/user-attachments/assets/0f6edd44-3086-4f49-8340-8480486e70a5)

A função `ScnRng` também é suportada pelo analisador de espectro. Se você já ativou o `ScnRng`, basta iniciar o [analisador de espectro](./Spectrum-analyzer).

Se você usar [AirCopy](./AirCopy) e transferir `Settings`, a área VFO está incluída. Isto também copia as frequências limite `ScnRng` atuais do rádio fonte para o rádio alvo.

### Com exclusão das frequências em ScnRng

Enquanto uma varredura `ScnRng` é parada em uma frequência recebida, longa pressão `MENU` para excluir essa frequência da varredura de alcance atual.

Até **64** as frequências de varredura podem ser excluídas. A lista é circular: após 64 exclusões, acrescentando outra substitui a exclusão mais antiga armazenada.

Estas exclusões são temporárias. Eles são mantidos apenas para a configuração `ScnRng` ativa e não são escritos na memória. Eles são limpos se o rádio é reiniciado, e eles também são limpos quando a identidade do intervalo muda: frequência inicial, frequência de parada ou passo de varredura.

## Digitalização de canais de memória

A varredura de memória permite que a varredura de rádio salve canais de memória em vez de passar por frequências.

Para usá-lo, mude o VFO para **Modo de memória**, em seguida, comece a escanear com uma chave de varredura programada ou por `* Scan` de pressão longa.

### Listas de Pesquisa

O rádio fornece **24 listas de varredura**. Cada canal de memória pode ser atribuído a:

* `OFF`: o canal está excluído das listas de verificação
* `1` para `24`: o canal pertence a uma lista de varredura específica
* `ALL`: o canal está incluído em todas as listas de verificação

Um canal de memória só pode pertencer a um destes estados de cada vez.

`MIX` é um modo de digitalização ativo, não outra atribuição por canal. Ele combina várias das listas numeradas; veja [MIX scan list](#mix-scan-list-v610).

### Atribuir um Canal a uma Lista de Procuras

Para alterar a atribuição da lista de verificação do canal de memória atual:

* abrir o menu `ScList`
* ou pressione `5 NOAA` para o atalho de atribuição rápido

O atalho rápido percorre o canal:

* `OFF`
* `1` para `24`
* `ALL`

A atribuição atual é mostrada à direita do nome do canal.

### Listas de Pesquisa com Nome

Listas de digitalização podem ter nomes curtos.

Quando uma lista tem um nome, o rádio mostra que **3-caracter nome** em vez do número da lista numérica, quando possível:

* nos indicadores de estado relacionados com a verificação
* nos menus de seleção da lista
* no ecrã de atribuição da lista de canais

Se uma lista não tiver nome, o rádio mostra o número da lista.

### Lista de verificação ativa

A varredura de memória usa sempre uma ** lista de varredura ativa**.

A lista atualmente ativa é mostrada no canto superior esquerdo da tela durante a digitalização:

* `01` para `24` para uma lista numerada
* `MIX` para a combinação salva de listas selecionadas, começando com `v6.1.0`
* `ALL` para todos os canais listados

Se a lista selecionada tiver um nome, esse nome curto é exibido em vez do número.

Se a lista selecionada estiver vazia ou inválida, o rádio muda automaticamente para a próxima lista válida e não vazia.

### Iniciando digitalização de memória

Uma vez que os canais foram atribuídos às listas, iniciar a verificação de memória por:

* usando uma chave atribuída à função de digitalização
* ou `* Scan` de pressão longa

O rádio então verifica os canais de memória que pertencem à lista de varredura ativa atualmente.

### Mudando a lista de digitalização durante a digitalização

A lista de varredura ativa pode ser alterada sem parar a varredura.

* long-press `* Scan`: mude para a próxima lista de verificação não vazia válida
* `F + navigation key`: navegar através de listas de digitalização durante a digitalização (`UP` / `DOWN` em UV-K5, `LEFT` / `RIGHT` em UV-K1)
* entrada direta do teclado:
  * `01` para `24`: selecione essa lista de varredura diretamente
  * `25`: selecione `MIX`, começando com `v6.1.0`
  * `00`: selecione `ALL`

Se a lista solicitada estiver vazia, o rádio apita e salta para a próxima lista válida, não vazia.

Quando uma varredura de memória lista, o nome da lista substitui temporariamente o medidor de progresso. Em `v5.9.0`, a retomada da varredura é mantida enquanto esse nome é realmente visível, então o medidor oculto e a posição atual da varredura não podem se separar e então saltar para frente quando o medidor retornar.

Este curto espaço aplica-se apenas à digitalização de memória. Escaneamento de frequência e `ScnRng` ainda pode armar a mesma contagem regressiva de sobreposição através de seus controles, mas eles não exibem um nome de lista de varredura e, portanto, continuar sem uma pausa inexplicável.

### Lista de verificação MIX (v6.1.0)

`MIX` verifica várias listas numeradas como um conjunto combinado sem alterar a lista atribuída a qualquer canal. Um canal é incluído quando:

* pertence a uma das listas numeradas habilitadas no editor `MIX`, ou
* sua atribuição de canal é `ALL`

Os canais atribuídos ao `OFF` permanecem excluídos. Um canal ainda tem apenas uma atribuição (`OFF`, `01` para `24`, ou `ALL`); `MIX` armazena uma máscara de seleção separada descrevendo quais listas numeradas devem ser combinadas.

Para configurar o `MIX`:

1. Abre o `ScList`.
1. Selecione `MIX` e pressione `M`.
1. Use as teclas de navegação para mover através de listas `01` para `24`, ou digite um número de lista de dois dígitos para saltar diretamente para ele.
1. Carregue em `M` para activar ou desactivar a lista seleccionada `ON`.
1. Pressione `EXIT` para salvar a seleção e fazer `MIX` o modo de digitalização ativa.

O editor mostra a contagem da lista selecionada como `NN/24`. Pelo menos uma lista deve permanecer ativa; tentar desativar a última lista selecionada produz um bip de erro.

A sequência normal da lista de varredura torna-se `01` através de `24`, então `MIX`, em seguida, `ALL`. Durante uma varredura de memória ativa, digite `25` para selecionar `MIX` diretamente ou `00` para selecionar `ALL`. Se o `MIX` resultante não contém nenhum canal digitalizável válido, o rádio bipa e avança para o próximo modo válido.

A máscara `MIX` salva é parte das configurações de rádio e está incluída em uma transferência `Settings` [AirCopy](./AirCopy).

### Mudando direção de digitalização

Durante a digitalização, pressione uma tecla de navegação:

* `UP` / `DOWN` no UV- K5
* `LEFT` / `RIGHT` no UV-K1

Isso inverte a direção usada para passar pelos canais de memória na lista de varredura atual.

### Varrer Prioridade

O rádio suporta dois canais prioritários:

* `PriCh1`
* `PriCh2`

Estes são configurados no menu e controlados pela configuração `ScPri`.

#### Como funciona

Quando a varredura de prioridade está ativada, o rádio não simplesmente verifica canais em ordem de lista. Em vez disso, insere repetidamente os canais de prioridade no ciclo de digitalização.

A sequência de varredura torna-se:

1. `PriCh1`
1. `PriCh2`
1. próximo canal regular da lista de verificação ativa

Este ciclo repete-se continuamente.

Isso permite que o rádio verifique os dois canais prioritários mais frequentemente do que canais regulares, então a atividade neles é detectada mais rapidamente.

#### Comportamento importante

Quando a verificação de prioridades estiver habilitada:

* canais prioritários são tratados separadamente da verificação de listas normais
* se um canal de prioridade também pertence à lista de verificação ativa, ele é removido do caminho de varredura regular para evitar ser digitalizado duas vezes
* canais prioritários ainda podem ser verificados mesmo se estiverem fora da progressão normal da lista

### Analisar o Comportamento de Parar e Continuar

Quando o scanner encontra atividade em um canal, o que acontece a seguir depende da configuração `ScnRev`.

Dependendo desta configuração, o rádio pode:

* retomar a digitalização automaticamente após um atraso
* permanecer parado no canal ativo até que a varredura seja reiniciada manualmente

O comportamento de pausa e retomada é, portanto, controlado pelo modo de recuperação da varredura, não pela própria lista de varredura.

### Excluindo um canal durante a digitalização

Enquanto a varredura de memória é interrompida em um canal de memória recebido, o `MENU` de longa pressão para excluir esse canal de futuras varreduras de memória.

#### Nota importante

Esta exclusão é temporária.

O canal permanece excluído até o próximo reinício do transceptor.

### Continuar a procura

Se você desligar o transceptor durante a digitalização, a varredura irá retomar automaticamente a próxima vez que você reiniciá-lo.

### Características comuns de verificação de frequência / canal

Os seguintes controles aplicam-se tanto à varredura de frequência como à varredura de memória:

* pressione uma tecla de navegação enquanto escaneia para reverter a direção da varredura (`UP` / `DOWN` em UV-K5, `LEFT` / `RIGHT` em UV-K1)
* pressione `EXIT` para parar a varredura e retornar à frequência ou canal que foi selecionado antes da varredura começar
* pressione `PTT` ou `MENU` para parar a varredura e manter a última frequência ou canal onde a atividade foi encontrada

## Modo do motor de varredura: NORMAL vs FAST

Compila com suporte de digitalização rápida adicione o menu `SetScn`. Ele seleciona o motor de digitalização usado pela memória e `ScnRng`.

### NORMAL

`NORMAL` usa o caminho padrão da varredura. Cada frequência ou canal de memória é totalmente aplicado ao rádio, com configuração VFO normal, configuração de squelch/output-power, configuração de registro receptor, e o tempo de pausa de varredura usual.

Este modo é a escolha mais conservadora. É útil se você preferir o comportamento de digitalização mais antigo ou quiser comparar resultados contra o motor rápido.

### FAST

`FAST` é o modo padrão nas compilações atuais. Ele adiciona um RSSI leve pré-check antes da configuração de recepção completa:

* para scan de memória, o firmware sonda a frequência do próximo canal e o ignora rapidamente se estiver claramente silencioso
* para `ScnRng`, o firmware sonda um pequeno lote de passos de alcance antes de fazer uma melodia completa
* lotes silenciosos são ignorados mais rápido, por isso a digitalização passa menos tempo no espectro vazio
* possíveis sinais são promovidos de volta ao caminho de recepção completo normal, então o comportamento squelch e normal scan-resume ainda decidem o que acontece a seguir
* em `ScnRng`, os passos finos podem ser refinados em torno de um candidato para que o scan cai mais perto do sinal mais forte próximo
* se o loop de varredura para após a pausa normal `ScnRev` tiver expirado, um cão de guarda curto retoma a digitalização

A verificação prévia rápida aprende um piso de ruído local RSSI e compara cada sonda com esse piso e o limiar de squelch configurado. Se o squelch estiver totalmente aberto, ou se o caminho rápido não puder, com segurança, pré-verificar um canal, o firmware cai de volta para a melodia completa normal para esse passo.

> [!NOTE]
> Em `ScnRng`, o modo `FAST` pode escanear em torno de **150 + frequências por segundo** em condições favoráveis, especialmente quando a maioria da faixa é silenciosa e a varredura pode pular lotes silenciosos sem fazer uma configuração de recepção completa para cada passo.

A varredura de frequência simples fora do `ScnRng` ainda avança um passo de frequência de cada vez; `SetScn = FAST` altera principalmente a varredura de memória e o comportamento de varredura.

## Analisar indicadores e detecção

As construções de varredura rápida atuais podem mostrar uma pequena linha de ignição RSSI durante a digitalização. É uma história compacta de amostras recentes do RSSI; amostras quietas permanecem baixas, enquanto candidatos mais fortes se destacam como marcas mais altas.

Durante a digitalização de memória, o indicador lista de varredura continua mostrando a lista ativa:

* `01` para `24`
* `MIX`, começando com `v6.1.0`
* `ALL`
* o nome da lista de verificação de 3 caracteres, quando a lista tiver um

Quando a verificação de prioridade é ativada, um `+` é adicionado ao indicador da lista de verificação.

Durante `ScnRng`, builds com suporte de alcance de varredura subaudível pode detectar CTCSS / DCS enquanto o rádio é parado em um sinal recebido. Se um código for encontrado, a UI de varredura pode mostrar o tom detectado ou código DCS juntamente com a frequência recebida.

O display de digitalização também refine a colocação do indicador de bloqueio VFO durante a digitalização, de modo que o estado de bloqueio TX permanece visível sem sobrepor a informação de varredura ativa.

## Cópia de frequência e varredura DCS / CTCSS

Esta função permite- lhe detectar e copiar definições de frequência e codificação. A busca de frequência funciona apenas para sinais fortes, então o rádio de transmissão tem que estar próximo. Para iniciar a cópia de frequência (`FC`), use o botão de função `4 FC`. A tela do scanner vai abrir. Empurre e segure o botão PTT no outro rádio. Espere alguns segundos até que a frequência e o código (se usado) apareçam na tela. As configurações podem ser salvas com o botão `MENU`. Eles serão salvos em um canal ou no VFO principal, dependendo do modo em que você iniciou a varredura.

Na compilação atual, a tela do scanner torna o estado mais explícito:

* `Search Freq`: procura de frequência em execução
* `Search Tone`: pesquisa de tom/código subaudível está em execução
* `Scan Complete`: um resultado foi encontrado
* `Scan Failed`: nenhum resultado utilizável foi encontrado
* `Freq:` mostra a frequência detectada
* `Tone:` / `CTCSS:` / `DCS:` mostra a configuração subaudível detectada quando uma é encontrada

Você também pode pesquisar apenas o código DCS / CTCSS para uma frequência definida no VFO principal. Escolha a frequência ou canal desejado e pressione `F` + `* SCAN`. A mesma tela aparecerá, mas a busca de frequência será omitida; a frequência do VFO principal será usada. Espere um sinal aparecer ou pressione o PTT no outro rádio. Leva de 1 a 2 segundos para o código ser encontrado. O procedimento de salvamento é o mesmo que acima.

Existe outra maneira de procurar um código DCS / CTCSS. Escolha a frequência ou canal desejado. Vá para o menu `RxDCS` ou `RxCTCS`. Digite a opção de menu e pressione o botão `* SCAN`. Aparecerá uma etiqueta `SCAN`. Espere por um sinal de rádio ou pressione o botão PTT no outro rádio. Quando o código for encontrado, o rótulo `SCAN` desaparecerá. Para salvá-lo, confirme a opção com o botão `MENU`. Não importa qual dos dois itens do menu você começa: tanto DCS quanto CTCSS pode ser encontrado, e o item do menu será alterado para o correto.

## Páginas relacionadas

* [Primeiros passos](./Getting-started)
* [Operação de rádio](./Radio-operation)
* [Funções dos botões](./Button-functions)
* [Analizador de espectro](./Spectrum-analyzer)
* [Características avançadas](./Advanced-features)
* [AirCopy](./AirCopy)
* [Resolução de problemas](./Troubleshooting)
