# Sobrepor aplicativos

Sobreposição de aplicativos são pequenos programas `.app` armazenados em Flash externo e carregados em um espaço de trabalho dedicado `4 KiB` RAM apenas quando lançado. Eles permitem que a edição experimental `Labs` adicione ferramentas, modos de rádio, demos visuais e jogos sem encaixar permanentemente cada aplicativo no Flash interno do firmware.

> [!WARNING]
> Overlay apps são um recurso experimental `v6.0.0`. Atualmente, apenas a edição `Labs` contém o carregador de aplicativos. Os aplicativos estão vinculados a um firmware ABI, nível de API, endereço RAM e recursos residentes opcionais; atualizar ou reinstalar um aplicativo se o rádio reportar um erro de compatibilidade.

## Como funciona a plataforma

O rádio fornece slots `8` de aplicativos externos-Flash. Cada slot contém um código de cabeçalho mais aplicativo de no máximo `4 KiB`. Antes de uma aplicação ser executada, o carregador verifica:

* o formato de arquivo/cabeçalho da aplicação e o estado comprometido
* o ABI necessário e o nível mínimo de API
* o tamanho do código e endereço do link RAM
* os recursos de firmware residentes necessários da aplicação
* um CRC-32 do código após ter sido carregado em RAM

O firmware interno Flash nunca é reescrito quando um aplicativo é instalado, lançado ou excluído. Um aplicativo ruim ou incompatível é recusado de forma limpa em vez de ser executado.

O catálogo atual contém onze aplicativos: ferramentas de rádio como `Broadcast FM`, `FoxHunt`, `Beacon` e `Beam`, mais `Breakout`, `Tetris`, `Cube3D`, `Plasma`, `Snake`, `Rapid Roll` e `Space Impact`. Veja [Referência das aplicações](./Overlay-applications) para os aplicativos documentados e seus controles. A disponibilidade depende dos binários de aplicativos distribuídos para a versão de firmware selecionada e dos recursos compilados para o firmware Labs em execução.

## Instalar uma aplicação com o UV Studio

1. Iniciar o rádio normalmente com a edição `Labs`.
1. Conecte-o a um navegador desktop com uma conexão de dados USB suportada.
1. Abra [UV Studio](https://armel.github.io/uvstudio/) e selecione `Apps` (`Labs only`).
1. Selecione a versão de firmware e um aplicativo compatível no catálogo oficial ou escolha um arquivo `.app` local.
1. Escolha o slot de aplicação de destino.
1. Selecione `Install app` e aguarde a gravação e verificação para concluir.

UV Studio pode atualizar a mesa de slot, mostrar o nome, versão, tamanho e status de cada aplicativo, e excluir um aplicativo sem tocar no resto do rádio.

Os slots de aplicativos são numerados `1` para `8` em UV Studio e no lançador `F + 7` on-radio.

## Lançar uma aplicação

1. Na tela de rádio normal, pressione `F` e `7 VOX`.
1. Use `UP` / `DOWN` em UV-K5, ou `LEFT` / `RIGHT` em UV-K1, para selecionar um dos oito slots exibidos. O layout ativo segue `SetNav`.
1. Pressione `M` para executar o aplicativo selecionado.
1. Use os controles mostrados por esse aplicativo; na maioria dos aplicativos, `EXIT` retorna ao lançador de aplicativos ou tela de rádio normal.

Os slots vazios permanecem visíveis no lançador. A posição de fenda e rolagem selecionada são lembradas até que o rádio reinicie. O lançador e aplicativos compatíveis são espelhados no UV Studio.

Alguns aplicativos também podem anunciar uma das ações programáveis normais: `FM RADIO`, `FOX HUNT`, `BEACON` ou `BEAM`. Quando o aplicativo correspondente é instalado e válido, essa ação pode lançá-lo diretamente a partir de uma chave atribuída ou do seletor de ação side-key. Se mais de um aplicativo instalado anuncia a mesma ação, o slot compatível de menor número é usado.

## Mensagens de compatibilidade

| Mensagem de rádio | Significado / ação |
| --- | --- |
| `UPDATE APP` | o formato do aplicativo, ABI, tamanho ou endereço de link é mais antigo ou incompatível; instale uma compilação de aplicativo correspondente |
| `UPDATE FIRMWARE` | o aplicativo requer uma API de aplicativo mais recente; atualizar o firmware Labs |
| `REINSTALL APP` | a escrita está incompleta ou o código CRC está errado; instale o arquivo `.app` novamente |
| `NOT SUPPORTED` | o aplicativo precisa de uma capacidade residente que esta compilação Labs não inclui |
| `NO APP` | o espaço seleccionado está vazio ou não tem nenhum cabeçalho válido da aplicação |

Após a saída de um aplicativo, o carregador restaura o VFO selecionado, recebe/dual-watch tuning, backlight manipulação e cache externo-Flash. Apps que modificam dados compartilhados suportados, como predefinições Broadcast FM ou dados de canal Beam, peçam ao firmware residente para commit-lo depois que o código de sobreposição parou de ser executado.

## A criar aplicações a partir da origem

Os desenvolvedores podem construir os aplicativos presentes no repositório de firmware com:

```sh
./compile-app.sh
./compile-app.sh All
./compile-app.sh fm foxhunt
```

Os arquivos `.app` gerados são colocados em `build/Apps/`. Cada aplicativo está ligado no endereço de sobreposição configurado do firmware e embalado com seus metadados e CRC. Reconstruir aplicativos quando o ABI, API, recursos necessários, ou sobreposição de endereços muda.

## Páginas relacionadas

* [Sobreposição de aplicações](./Overlay-applications)
* [UV Studio](./UV-Studio#apps-labs)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [Funções dos botões](./Button-functions)
* [Alterações recentes](./Recent-changes)
* [Características avançadas](./Advanced-features)
