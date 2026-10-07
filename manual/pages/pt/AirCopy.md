# AirCopy

AirCopy transfere canais de memória e configurações de rádio entre rádios compatíveis. Ele usa FSK no ar e, começando com `v6.1.0`, também pode usar uma conexão direta de cabo serial.

> [!IMPORTANT]
> AirCopy está incluído nas edições `Transfer` e `Labs`. Não faz parte das edições padrão `Fusion` ou `FieldOps`.

> [!WARNING]
> O AirCopy não se destina a tornar compatíveis com layouts de firmware. Use a mesma geração de firmware em ambos os rádios e selecione a mesma seção de dados no remetente e receptor. O protocolo `v6.1.0` otimizado não é compatível com fios com versões AirCopy anteriores.

## Iniciando AirCopy

1. Desliga o rádio.
1. Mantenha `PTT` + `SIDE BUTTON 2️⃣` enquanto liga.
1. Solte todas as chaves quando a tela AirCopy aparecer.

A frequência padrão sobre o ar é `434.000 MHz` a uma potência muito baixa. Você pode inserir outra frequência permitida com o teclado antes de iniciar a transferência.

Use as teclas de navegação para selecionar a mesma seção em ambos os rádios:

* `MEM 001 - 128`
* `MEM 129 - 256`
* `MEM 257 - 384`
* `MEM 385 - 512`
* `MEM 513 - 640`
* `MEM 641 - 768`
* `MEM 769 - 896`
* `MEM 897 - 1024`
* `Settings`
* `All (Mem+Set)`

Em seguida, inicie o alvo antes da fonte:

1. No rádio receptor, pressione `EXIT`.
1. No rádio de envio, pressione `M`.
1. Espere pelo `AIR COPY OK` em ambos os rádios.

Cada seleção de memória transfere canais `128`, incluindo nomes de canais e atributos. `Settings` inclui configurações de rádio, nomes da lista de varredura, a área VFO usada pelo `ScnRng`, a seleção da lista de varredura `MIX`, e as preferências salvas FoxHunt e Beacon. `All (Mem+Set)` transfere todos os oito bancos de memória e Configurações em uma execução.

![AirCopy transfer screen](https://github.com/user-attachments/assets/93307d28-c2e2-4fe3-8bae-fad7f6e817ad)

## Protocolo confiável em v6.0.0

`v6.0.0` introduziu um protocolo de transferência reconhecido:

* o receptor valida enquadramento, deslocamento e CRC antes de armazenar dados
* o receptor reconhece dados válidos e rejeita dados danificados ou inesperados
* o remetente repete um bloco não reconhecido ou rejeitado até três vezes
* dados duplicados são reconhecidos sem serem escritos duas vezes, recuperando-se com segurança de um reconhecimento perdido
* a tela relata o progresso, a contagem de repetição (`RT`) e a contagem de erro de recepção (`ER`)

Um banco de memória contém blocos `68` AirCopy de `64 bytes`; `Settings` contém blocos `12`. Como o receptor envia agradecimentos, ambos os rádios transmitem brevemente na frequência selecionada.

## v6.1.0 melhorias

### Transferências de rádio mais rápidas

O novo protocolo carrega até três blocos `64-byte` em um quadro de dados FSK. Isso reduz o giro fixo e a sobrecarga de reconhecimento e faz uma transferência completa aproximadamente duas vezes mais rápido em condições de rádio semelhantes.

Antes de enviar dados, a fonte fornece hashes CRC32 para grupos de até blocos `24`. O alvo compara esses hashes com seus dados locais e solicita apenas os blocos que diferem. Repetir um backup ou sincronizar dois rádios quase idênticos pode, portanto, ser muito mais rápido do que copiar cada bloco novamente.

O medidor de progresso distingue dados que já eram idênticos aos dados que foram realmente copiados. O protocolo também valida que o remetente e o receptor selecionaram a mesma seção de dados lógicos; uma incompatibilidade falha em vez de escrever um mapa diferente por engano.

### Cópia de Cabo

A edição `Transfer` adiciona `CABLE COPY` sobre UART. Na tela pronta, pressione `* SCAN` para alternar entre o transporte de rádio e cabo. O modo cabo usa a mesma comparação, reconhecimento, repetição e verificação de seleção como modo de rádio, mas não usa uma frequência RF.

A implementação aumenta a taxa serial para a transferência e restaura a taxa normal depois. Ambos os rádios devem executar firmware de cópia por cabo e usar uma conexão serial direta compatível.

### Clonagem em flash externo

Quando `CABLE COPY` está ativo na edição `Transfer`, uma seleção adicional `Flash 2M` pode clonar o Flash externo do rádio. Compara setores `4 KiB` por CRC32 e escreve apenas setores diferentes. O setor de calibração específico do dispositivo está deliberadamente excluído.

> [!WARNING]
> A clonagem de Flash externo pode substituir slots de firmware, bancos de configuração, aplicativos, logs, logotipos e outros dados de Flash externo compartilhados no rádio receptor. Faça backup dos dados importantes primeiro, verifique a direção com cuidado, e não desligue ou desligue o rádio durante a operação.

## Resolução de Problemas

Se uma transferência falhar:

* confirmar que ambos os rádios usam a mesma versão de firmware compatível
* confirmar que ambos os rádios mostram a mesma seleção e transporte
* iniciar a recepção com `EXIT` antes de iniciar a transmissão com `M`
* para transferência de rádio, reduzir a distância ou afastar-se da interferência
* para transferência de cabo, verifique a conexão serial direta e reconecte ambos os rádios
* tentar novamente sem alterar a seleção

## Páginas relacionadas

* [Alterações recentes](./Recent-changes)
* [Características avançadas](./Advanced-features)
* [Varredura](./Scanning)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [UV Studio](./UV-Studio)
* [Resolução de problemas](./Troubleshooting)
