# Beacon

Beacon é uma aplicação Morse de transmissão estilo ARDF. Ele repetidamente envia um identificador selecionado no ativo TX VFO, alternando entre uma janela de transmissão configurável e intervalo silencioso.

Desde `v6.0.0`, Beacon e [FoxHunt](./Fox-Hunt) são aplicações separadas e ações programáveis separadas. Beacon começa diretamente em seu ciclo de transmissão; não abre através de FoxHunt.

Beacon é residente na edição `FieldOps`. Em `Labs`, instale o aplicativo `Beacon` sobreposição com [UV Studio](./UV-Studio#apps-labs). O atalho `BEACON` lança a aplicação residente ou a aplicação de sobreposição instalada correspondente, dependendo da edição.

> [!WARNING]
> Beacon inicia sua primeira transmissão imediatamente. Antes de lançá-lo, verifique os requisitos ativos TX VFO, frequência, potência, antena, `F Lock`, `TXLock`, indicativo de chamadas e identificação, ciclo de serviço e regulamentos locais. Não deixar um farol sem vigilância a transmitir quando forem proibidas transmissões autónomas ou periódicas.

## Iniciando Beacon

Atribuir `BEACON` para `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, ou `M Long`, em seguida, acionar esse atalho. No Labs você também pode lançar `Beacon` do seletor de aplicativos `F + 7`.

![Beacon transmit-cycle screen](https://github.com/user-attachments/assets/000a4e9e-f89b-421d-a011-103d96467efd)

## Identificadores

| Configuração | Mensagem | Objecto |
| --- | --- | --- |
| `MOE` para `MO5` | `MOE`, `MOI`, `MOS`, `MOH`, `MO5` | cinco identificadores de raposa padrão IARU ARDF |
| `MO` | `MO` | identificador de fim/casa |
| `CALL` | sinal de chamada configurado seguido de `MOE` | farol de banda amadora identificado |

O sinal vem do CHIRP `Message Line 1`. As letras são convertidas para maiúsculas; letras, dígitos e `/` são suportadas. Ver [Programação com CHIRP](./Programming-with-CHIRP#beacon-identification).

O identificador usa um tom `1000 Hz` em aproximadamente `12 WPM`.

## Calendário e chaveamento

* `TX`: `5` para `60 seconds`, em passos `5-second`; `30 seconds` padrão
* `IDLE`: `5` para `240 seconds`, em passos `5-second`; `30 seconds` padrão

Para o timing clássico de cinco-fox, use `TX = 60 s` e `IDLE = 240 s`.

| Modo | Comportamento |
| --- | --- |
| `TONE` | Mantém a operadora FM ativa para a janela TX completa e teclas o tom `1000 Hz` |
| `CARR` | Chaves do portador e tom juntos para cada elemento Morse, para que o sinal desapareça nas lacunas |

`TONE` é o padrão mais limpo. O `CARR` reproduz mais de perto os transmissores ARDF interrompidos pelo portador, mas o chaveamento direto do portador pode produzir pequenos cliques e propagação espectral adicional.

## Controlos

| Controlo | Acção |
| --- | --- |
| `1` | Ciclo da duração `TX` |
| `2` | Ciclo da duração `IDLE` |
| `3` | Ciclo do identificador |
| `4` | Alternar `TONE` / `CARR` |
| `F`, então `1`, `2`, `3`, ou `4` | Passo a configuração correspondente para trás |
| mantenha `F` por cerca de 0,5 segundos | Bloquear ou desbloquear todos os controles Beacon |
| `M` durante TX | Interromper a transmissão atual e iniciar um novo intervalo de inatividade |
| `M` enquanto estiver ocioso | Reiniciar a contagem regressiva completa |
| `EXIT` | Parar com segurança e sair do Beacon |

Antes de cada explosão, Beacon verifica as restrições normais de frequência TX, `TXLock` por canal, estado da bateria e modulação. Se a transmissão é recusada, ela mostra o status de rádio correspondente e espera antes de tentar a próxima explosão programada.

## Configurações salvas

Beacon salva seu identificador, duração `TX`, duração `IDLE` e modo `TONE` / `CARR`. Estas configurações são restauradas no próximo lançamento e estão incluídas em uma transferência AirCopy `Settings`. O bloqueio temporário da aplicação não é gravado.

## Páginas relacionadas

* [FoxHunt](./Fox-Hunt)
* [Funções dos botões](./Button-functions#beacon-action)
* [Programação com CHIRP](./Programming-with-CHIRP#beacon-identification)
* [Aplicações overlay](./Overlay-apps)
* [Sobreposição de aplicações](./Overlay-applications#beacon)
* [AirCopy](./AirCopy)
* [Operação de rádio](./Radio-operation)
