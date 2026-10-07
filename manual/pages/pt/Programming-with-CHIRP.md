# Programação com CHIRP

Esta página explica como usar o `CHIRP` com o driver dedicado incluído em cada versão de firmware.

> [!WARNING]
> Use o driver `CHIRP` da mesma versão de firmware que a instalada no seu rádio.
> Não utilize Quansheng CPS.
> Não use um driver `UV-K5` genérico ou um driver de outra versão de firmware.

## Compatibilidade

O driver `v6.1.0` dedicado suporta cada edição oficial do `v6.1.0` em:

* `UV-K1`
* `UV-K5 V3`
* `Fusion`, `FieldOps`, `Transfer` e `Labs`

Não é para:

* `UV-K5 V1 / V2`
* outros modelos Quansheng
* famílias de firmware não relacionadas

Como esse firmware usa seu próprio layout de memória e configurações, outro driver pode ler ou escrever os dados errados. Sempre corresponda a versão do driver à versão do firmware, mesmo quando se move entre edições oficiais.

Não assuma que o driver `v6.0.0` mais antigo é intercambiável com o driver `v6.1.0`.

## Antes de começar

* certifique-se de que o rádio executa a versão F4HWN correspondente
* localizar o arquivo de driver incluído nesse pacote de lançamento
* estar pronto para salvar um backup da imagem de rádio antes de editar qualquer coisa

> [!NOTE]
> `CHIRP` pode mostrar este driver como experimental. Isso é esperado.

## Atualizando para v6.1.0

Antes de atualizar de uma geração de firmware anterior:

1. Baixe o rádio com o driver correspondente ao firmware atualmente instalado.
1. Salve essa imagem e, opcionalmente, exporte os canais de memória para CSV.
1. Faça backup da calibração de rádio com [UV Studio](./UV-Studio#calibration).
1. Flash a edição `v6.1.0` escolhida.
1. Se necessário pela versão que você está migrando, insira o menu oculto e execute `RESET ALL`.
1. Carregue o driver `v6.1.0` CHIRP dedicado e baixe uma nova imagem do rádio atualizado.
1. Copie e cole os canais antigos naquela imagem fresca, depois faça o upload.

> [!WARNING]
> Não importa diretamente um CSV antigo sobre a nova imagem de rádio completa. Copie e cole as linhas do canal em uma imagem recentemente baixada para que o layout de configurações da nova versão permaneça intacto.

## Carregar o driver dedicado em CHIRP

1. Abre o `CHIRP`.
2. Se `File > Load Module...` não estiver disponível, habilite as funcionalidades CHIRP `Help > Developer Mode` primeiro (Menu Ajuda), em seguida, reinicie `CHIRP`.

<img width="406" height="307" alt="Capture d’écran 2026-04-06 à 18 41 46" src="https://github.com/user-attachments/assets/7a82cd02-5368-4b08-ac15-3f0ee210bc75" />

3. Use `File > Load Module...` e selecione o arquivo `f4hwn.fusion.chirp...py` incluído com a versão de firmware.
4. Uma vez carregado o módulo, `CHIRP` deve oferecer a entrada do modelo `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.

> [!NOTE]
> O nome do módulo e a etiqueta do modelo CHIRP mantêm o nome histórico `Fusion`. O módulo `v6.1.0` é, no entanto, o driver compartilhado para as quatro edições oficiais.

## Baixar do rádio

1. Liga o rádio.
1. Conecte o rádio com um cabo `USB-C` compatível ou um cabo de programação de duplo-jack compatível no conector `mic/spkr`.
1. Certifique-se de que o conector está firmemente inserido.
1. Em `CHIRP`, escolha `Radio > Download From Radio...`
1. Selecione a porta serial correta.
1. Selecione `Vendor`: `Quansheng`.
1. Selecione `Model`: `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.
1. Inicie o download e aguarde até que a imagem de rádio tenha sido totalmente lida.

<img width="512" height="380" alt="Capture d’écran 2026-04-06 à 18 42 37" src="https://github.com/user-attachments/assets/b035c8d9-071f-4030-9adc-4966e1c30b29" />

> [!TIP]
> Se a comunicação falhar, desligue o cabo, ligue o rádio primeiro e, em seguida, reconecte o cabo. O motorista dedicado avisa que algumas configurações podem falhar se o rádio foi ligado com o cabo já ligado.

## Mostrar os campos extras

Após o download, habilite `View > Show Extra Fields` no `CHIRP` ( menu Ver).

<img width="258" height="224" alt="Capture d’écran 2026-04-06 à 18 42 06" src="https://github.com/user-attachments/assets/ff30ffd3-2119-42ed-84f3-e69b14903315" />

Isto é importante porque o driver dedicado expõe vários campos específicos do canal através do grupo `Extra`. Sem o `Show Extra Fields`, alguns parâmetros específicos do firmware permanecem ocultos no editor do canal.

Exemplos típicos incluem:

* `TXLock`
* `BusyCL`
* `FreqRev`
* `PTT ID`
* `Compander`
* `Scanlists`

## Editar e enviar

Você pode então editar memórias, nomes e as configurações suportadas.

Quando estiver pronto:

1. Reveja as suas mudanças.
1. Em `CHIRP`, escolha `Radio > Upload To Radio...`
1. Use a mesma porta, fornecedor e modelo.
1. Espere até que o upload esteja completo antes de tocar no cabo ou desligar o rádio.

> [!WARNING]
> Deixe itens de calibração ou avançados em paz, a menos que você saiba exatamente o que eles fazem.

## Identificação Beacon

A aplicação Beacon independente usa a configuração CHIRP `Message Line 1` como sinal de chamada. O motorista dedicado aceita até `12 characters` neste campo.

Quando Beacon transmite no modo `CALL`, o firmware converte letras para maiúsculas, mantém letras, dígitos e `/`, remove caracteres não suportados e adiciona ` MOE`. Se o sinal de chamada resultante estiver vazio, ele transmite `MOE`.

Após alterar o `Message Line 1`, envie as configurações para o rádio antes de iniciar o Beacon. Ver [Beacon](./Beacon) para informações de segurança e comportamento de transmissão.

## Boa prática

* usar sempre o driver incluído com a mesma versão de firmware
* sempre baixar primeiro, em seguida, salvar um backup
* após uma atualização de firmware, recarregue o novo módulo de driver a partir dessa versão
* usar `CHIRP` para programação em massa, não Quansheng CPS

## Se algo parecer errado

Verifique estes pontos:

1. o rádio é realmente um `UV-K1` ou `UV-K5 V3`
1. o rádio executa a versão e edição F4HWN esperadas
1. `CHIRP` carregou o driver a partir dessa mesma versão, não outro módulo `UV-K5`
1. o cabo está totalmente inserido
1. a porta serial selecionada é a correta

## Páginas relacionadas

* [Primeiros passos](./Getting-started)
* [Operação de rádio](./Radio-operation)
* [Beacon](./Beacon)
* [Resolução de problemas](./Troubleshooting)
