# FoxHunt

FoxHunt é uma aplicação de força de sinal apenas para encontrar rádio amador (ARDF). Ajuda o operador a se aproximar de um transmissor oculto, mostrando `dBm` calibrado, S-meter, pico, mínimo, tendência e histórico de sinal recente.

Desde `v6.0.0`, FoxHunt e [Beacon](./Beacon) são aplicações separadas e ações programáveis separadas. FoxHunt não transmite e não muda para Beacon.

FoxHunt é residente na edição `FieldOps`. Em `Labs`, instale o aplicativo `FoxHunt` sobreposição com [UV Studio](./UV-Studio#apps-labs). O atalho `FOX HUNT` lança a aplicação residente ou a aplicação de sobreposição instalada correspondente, dependendo da edição.

## Iniciando FoxHunt

Atribuir `FOX HUNT` para `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`, em seguida, acionar esse atalho no VFO que você deseja monitorar. No Labs você também pode lançar `FoxHunt` do seletor de aplicativos `F + 7`.

> [!NOTE]
> A navegação usa `UP` / `DOWN` em UV-K5 e `LEFT` / `RIGHT` em UV-K1. O layout ativo segue `SetNav`.

## Exibição e controles

A escala de sinal vai de `S0` para `S9+40`. O medidor principal pode mostrar uma escadaria de 13 níveis ou um histórico de rolagem de aproximadamente 18 segundos. A tendência compara o sinal atual com o nível medido cerca de um segundo antes.

![FoxHunt signal-strength screen](https://github.com/user-attachments/assets/8e7c2554-f1ca-4a83-ba03-e579607f953d)

| Controlo | Acção |
| --- | --- |
| `1` | Alternar as telas de escadaria e de história do sinal |
| `2` | Ciclo silencioso, sinal geiger-estilo, e áudio recebido-estação |
| `3` | Ciclo `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` e `BYP+` |
| teclas de navegação | Aumentar ou diminuir a atenuação diretamente |
| `F`, então `2` ou `3` | Passo a configuração correspondente para trás |
| `M` | Repor as referências de pico, mínimo e tendência |
| mantenha `F` por cerca de 0,5 segundos | Bloquear ou desbloquear os controles FoxHunt |
| `EXIT` | Sair do FoxHunt |

Enquanto bloqueado, apenas as teclas de navegação para atenuação e outra longa imprensa de `F` permanecem disponíveis.

## Pontas de localização

* Aumente a atenuação à medida que o sinal se torna forte para que o medidor fique longe da escala completa.
* Reinicie as referências com `M` antes de cada comparação ou varredura corporal.
* Segure o rádio contra o peito e gire lentamente; seu corpo muitas vezes cria um sinal útil mínimo na direção longe do transmissor.
* Use pico (`PK`) e mínimo (`MN`) para comparar uma rotação completa.
* Use o gráfico de histórico para ver os vales de sinal e o indicador de tendência enquanto caminha um rolamento.

`BYP` e `BYP+` são configurações de ganho de perto, não um bypass de hardware literal. O valor `dBm` absoluto exibido muda com o passo de ganho, então compare as leituras enquanto permanece no mesmo passo.

## Configurações salvas

FoxHunt salva sua atenuação, calibre e modo de áudio. Estas configurações são restauradas no próximo lançamento e estão incluídas em uma transferência AirCopy `Settings`. O bloqueio temporário da aplicação não é gravado.

## Páginas relacionadas

* [Beacon](./Beacon)
* [Funções dos botões](./Button-functions#fox-hunt-action)
* [Aplicações overlay](./Overlay-apps)
* [Sobreposição de aplicações](./Overlay-applications#foxhunt)
* [AirCopy](./AirCopy)
* [Características avançadas](./Advanced-features)
