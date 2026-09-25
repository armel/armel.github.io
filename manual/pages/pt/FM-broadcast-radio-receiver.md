# Receptor de transmissão FM

O rádio pode receber transmissão FM de `76` para `108 MHz`. Ele usa um chip separado (`BK1080`) para isso. O RDS não é suportado.

Durante a escuta normal de transmissão, o VFO ativo ainda tem prioridade. A recepção no VFO ativo desativa temporariamente o áudio de transmissão; no final da recepção VFO, o rádio volta a transmitir. Enquanto uma varredura manual ou automática da estação FM está funcionando ativamente, o `v5.9.0` ignora temporariamente a recepção do canal principal para que a varredura da estação possa terminar sem ser interrompida.

> [!NOTE]
> Onde esta página menciona `UP` / `DOWN`, use as teclas `LEFT` / `RIGHT` equivalentes no UV-K1. A disposição de navegação ativa segue `SetNav`.

> [!NOTE]
> - o VFO activo tem prioridade durante a escuta normal de transmissão, mas não durante um scan de estação FM activo
> - auto scan substitui todas as memórias `48` FM

![FM](https://github.com/user-attachments/assets/5737c8e4-802d-44e1-a540-da28707eabaa)

## Operações de base

* `F` + `0 FM`, `0 FM` de longa pressão, ou uma [função de botão personalizado](./Button-functions#custom-button-functions) inicia recepção de transmissão
* `EXIT`, ou usando o mesmo comando de início novamente enquanto o rádio está no modo FM, termina a recepção de transmissão
* `F` + `3 VFO/MR`, ou `3 VFO/MR` de longa pressão, alterações entre o modo VFO e o modo de memória

### Definir uma frequência no modo FM- VFO

Simplesmente digitando uma frequência sintoniza o receptor. A resolução é `100 kHz`, então digitando músicas `929` para `92.9 MHz`. Use as setas para mudar nos passos `100 kHz`.

### Alterar o intervalo de transmissão FM

Se você não pode sintonizar a estação que você espera, você pode simplesmente estar na faixa de transmissão FM errado.

Enquanto a recepção de transmissão FM é ativa, longo-pressão `1 BAND` para ciclo através das faixas de FM disponíveis:

* `87.5` para `108 MHz`
* `76` para `108 MHz`
* `76` para `90 MHz`
* `64` para `76 MHz`

O intervalo atualmente selecionado é mostrado na parte inferior esquerda da tela FM, por exemplo `87.5-108M`.

Afinação direta, varredura manual, varredura automática e memórias FM só funcionam dentro do intervalo atualmente selecionado. Se uma estação ou memória FM salva estiver fora desse intervalo, mude para outra banda FM primeiro.

### Guardar na memória do modo FM-VFO

Pressionar `M` no modo VFO permite armazenar a frequência atual em um canal de memória. Use as setas para selecionar a memória, em seguida, confirme com `M`. Existem memórias `48` disponíveis.

### Selecione uma memória

No modo MR, inserir `01` para `48` seleciona um canal de memória. Use `UP` / `DOWN` para passar pelos canais de memória.

### Apagar uma memória armazenada

No modo MR, pressionando `M` permite que você apague esse canal de memória.

## Pesquisando estações de FM-VFO

### Digitalização automática

Comece com `F` + `* Scan` ou por `* Scan` de pressão longa.
O rádio procura estações e armazena as primeiras estações `48` em memória. A digitalização começa no lado baixo da banda. Iniciando a varredura automática apaga canais previamente armazenados. `EXIT` termina a verificação automática.

Enquanto a varredura automática está em execução, um sinal de entrada detectado no canal de transceptor principal não interrompe a varredura FM. A prioridade normal do canal principal é restaurada assim que a varredura FM para.

### Varredura manual

Uma breve impressão no `* Scan` inicia a digitalização manual. O rádio varre para cima da frequência atual até que uma estação seja recebida. Você pode continuar a digitalização em qualquer direção usando as setas. O `EXIT` pára o modo de digitalização.

A mesma exceção temporária do canal principal se aplica durante a varredura manual. Uma vez que a varredura pára em uma estação ou é cancelada, a escuta de transmissão comum novamente produz a recepção no VFO ativo.

## Funções do botão

* `1 BAND` - longa imprensa, interruptor gamas de transmissão FM
* `3 VFO/MR` - mudar de frequência/modo de memória
* `* SCAN`
   * curto - iniciar uma única varredura
   * long press - iniciar a varredura automática (todos os canais de memória serão excluídos e substituídos pelo resultado da varredura)

## Páginas relacionadas

* [Primeiros passos](./Getting-started)
* [Funções dos botões](./Button-functions)
* [Operação de rádio](./Radio-operation)
* [Resolução de problemas](./Troubleshooting)
