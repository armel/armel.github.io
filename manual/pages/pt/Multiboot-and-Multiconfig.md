# Multiboot e Multiconfig

A partir do `v6.0.0`, edições compatíveis podem manter várias imagens de firmware F4HWN no Flash externo do rádio e restaurar uma a partir de um seletor na inicialização. Cada slot de firmware tem seu próprio banco de configuração por padrão, então tentar outra edição não substitui os canais e configurações usados pelos outros slots.

Multiboot está incluído nas quatro edições oficiais `v6.0.0`: `Fusion`, `FieldOps`, `Transfer` e `Labs`. Os slots de firmware são gerenciados com [UV Studio](./UV-Studio#firmware-slots) enquanto o rádio está rodando normalmente.

> [!IMPORTANT]
> Coloque apenas uma imagem `v6.0.0` ou F4HWN mais recente com suporte Multiboot em um slot de firmware. Um `v5.x`, estoque ou outro firmware não multiboot podem ser executados após serem restaurados, mas não pode abrir o seletor de inicialização para retornar a outro slot.

## slots de firmware

O rádio mantém cinco entradas Multiboot:

| Rótulo de rádio | Objecto | Gerenciado por |
| --- | --- | --- |
| `M` | `Main`, um backup automático do firmware instalado através do procedimento de flashing normal | firmware |
| `1` para `4` | imagens adicionais de firmware F4HWN | UV Studio |

O `Main` está protegido das gravações da máquina. Na primeira inicialização de um firmware compatível com multiboot instalado através do procedimento normal `Flash Firmware`, o rádio exibe `Init Main` e copia o firmware em execução para `M`. Não desligue o rádio durante esta inicialização.

Os quatro slots do usuário vivem apenas em Flash externo até serem selecionados. Instalar ou apagar um no UV Studio não substitui imediatamente o firmware actualmente em execução a partir do Flash interno.

## Instalando um firmware em um slot

1. Inicie o rádio normalmente com um firmware habilitado para multiboot.
1. Conecte-o a um navegador desktop com uma conexão de dados USB suportada.
1. Abra [UV Studio](https://armel.github.io/uvstudio/) e selecione `Firmware Slots`.
1. Selecione uma compilação estável compatível `v6.x` F4HWN no catálogo, ou escolha um arquivo `.bin` local compatível.
1. Escolha slot `1`, `2`, `3` ou `4` e, opcionalmente, edite seu nome de exibição.
1. Selecione `Write to slot`, confirme e aguarde os passos de apagar, escrever e verificação para terminar.

Cada slot aceita uma imagem de aplicação até `118 KiB`. UV Studio escreve a imagem para Flash externo, armazena seu tamanho e CRC, em seguida, pede ao rádio para verificar a imagem completa.

`Erase FW` remove a imagem de firmware externa desse slot de usuário. Ele não apaga o banco de configuração do slot e não afeta uma cópia desse firmware já em execução em Flash interno.

## Selecionar um firmware na inicialização

1. Desliga o rádio.
1. Mantenha `M` (`MENU`) por si só enquanto liga o rádio. Não segure `PTT`.
1. Solte a chave quando a tela `F4HWN MULTIBOOT` aparecer.
1. Espere enquanto o rádio verifica e valida os slots.
1. Use `UP` / `DOWN` em UV-K5, ou `LEFT` / `RIGHT` em UV-K1, para selecionar `M` ou slot `1` para `4`. O layout ativo segue `SetNav`.
1. Pressione `M` para selecioná-lo e, em seguida, pressione `M` novamente em `Restore ...?` para confirmar.
1. Não desligue o rádio durante o `Writing / Verify`. O rádio reinicia automaticamente com o firmware seleccionado.

Pressione `EXIT` da lista de slots para cancelar e continuar iniciando o firmware já instalado. Os slots inválidos, incompletos, superdimensionados ou com falhas de CRC são exibidos, mas não podem ser restaurados.

O seletor inicialmente destaca o slot de onde veio o firmware em execução. Ele também é espelhado em UV Studio quando esse suporte está disponível.

## Multiconfig: um banco de configuração por slot

Por padrão, selecionar slot de firmware `N` também seleciona banco de configuração `N`:

| Firmware | Configuração padrão | Conteúdo guardado naquele banco |
| --- | --- | --- |
| `Main` (`M`) | `CFG M` | canais de memória, nomes, VFOs, listas de digitalização e configurações de rádio |
| slot `1` | `CFG 1` | sua própria cópia das mesmas áreas de configuração |
| slot `2` | `CFG 2` | sua própria cópia das mesmas áreas de configuração |
| slot `3` | `CFG 3` | sua própria cópia das mesmas áreas de configuração |
| slot `4` | `CFG 4` | sua própria cópia das mesmas áreas de configuração |

Dados de calibração, o logotipo de inicialização, metadados Multiboot, slots de firmware/app e o log RF são compartilhados em vez de duplicados em cada banco.

Um banco de configuração não utilizado começa com padrões de fábrica na primeira vez que é usado. Esta separação é útil quando as edições têm configurações diferentes ou quando você deseja testar um firmware sem modificar a configuração normal do `Main`.

## Usando o SetCfg

O menu `SetCfg` permite que o firmware em execução use um banco de configuração diferente sem alterar o firmware. Por exemplo, `SLOT 2 / CFG 4` significa que o firmware restaurado da slot 2 está atualmente usando os canais e configurações armazenados no banco 4.

1. Abra o menu normal e selecione `SetCfg`.
1. Escolha `CFG M`, `CFG 1`, `CFG 2`, `CFG 3` ou `CFG 4`.
1. Pressione `M`, então pressione `M` novamente em `SURE?`.
1. O rádio reinicia e mapeia o banco selecionado.

Confirmar o banco já em uso é um no-op e não reiniciar o rádio. A página de identidade `SysInf` mostra crachás `SLOT` e `CFG` separados para que você possa sempre verificar a combinação atual.

> [!CAUTION]
> O `SetCfg` permite que as configurações sejam compartilhadas deliberadamente em edições e versões de firmware. A compatibilidade é sua responsabilidade. Faça backup dos dados importantes do canal/configuração antes de abrir um banco com firmware que pode usar um layout de dados diferente.

Em UV Studio, `Reset config` apaga o banco de configuração associado ao slot de usuário `1` para `4` sem apagar seu firmware. A próxima inicialização usando esse banco recria configurações padrão. O `CFG M` está protegido deste comando; use o procedimento normal de reinicialização de fábrica do firmware para a configuração principal.

## Notas de recuperação e de segurança

* Cada slot é totalmente verificado CRC antes de Flash interno é apagado.
* O estado de slot/config ativo é armazenado redundantemente e verificado antes de uma restauração começar.
* `DO NOT POWER OFF` significa que Flash interno está sendo reescrito. Interromper esta fase pode tornar a aplicação não inicializável e exigir recuperação normal de DFU.
* Se um flash de firmware normal substituir a imagem interna, a próxima inicialização com capacidade Multiboot detecta a alteração e adota essa imagem como o novo backup `Main` com `CFG M`.
* Se o rádio relatar `STATE ERROR` ou `Flash state unknown`, reinicie-o. O firmware pára lá deliberadamente em vez de arriscar escrever através de um mapeamento de configuração incerto.

## Páginas relacionadas

* [UV Studio](./UV-Studio#firmware-slots)
* [Alterações recentes](./Recent-changes)
* [Menu](./Menu)
* [Aplicações overlay](./Overlay-apps)
* [Resolução de problemas](./Troubleshooting)
