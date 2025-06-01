# dio-blog-no-azure-container-registry
## projeto de um Blog em html, css e javascript com imagem armazenada no ACR

### Os conceitos e resumo foram retirados da leitura da documentação oficial: <https://learn.microsoft.com/en-us/azure/container-registry/container-registry-intro> e <https://learn.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli>

### O Azure Container Registry (ACR) é um serviço de registro gerenciado, baseado no Docker Registry 2.0 de código aberto. Ele permite que você crie e mantenha registros de contêineres Azure para armazenar e gerenciar suas imagens de contêiner e artefatos relacionados. Principais Recursos do ACR:
- Camadas de Serviço de Registro: O ACR oferece as camadas Basic, Standard e Premium. Todas as camadas suportam integração de webhook, autenticação de registro com o Microsoft Entra ID e funcionalidade de exclusão. A camada Premium ainda oferece geo-replicação para distribuição avançada de imagens de contêiner.
- Segurança e Acesso: O acesso ao registro de contêineres é controlado usando uma identidade Azure, um service principal do Microsoft Entra ou uma conta de administrador fornecida. O controle de acesso baseado em função (RBAC) do Azure permite atribuir permissões de registro específicas. A camada Premium inclui confiança de conteúdo para assinatura de tags de imagem, além de firewalls e redes virtuais para restringir o acesso.
- Imagens e Artefatos Suportados: O ACR pode incluir imagens Windows e Linux, e também armazena formatos de conteúdo relacionados, como gráficos Helm e imagens construídas de acordo com a especificação do formato de imagem Open Container Initiative (OCI).
- Compilações Automatizadas de Imagens: As tarefas do Azure Container Registry simplificam a construção, teste, envio e implantação de imagens no Azure, incluindo a automação de pipelines de aplicação de patches de SO de contêiner e de framework

### Como Enviar uma Imagem de uma Aplicação de um Blog HTML/CSS/JavaScript para o ACR:
- A título de demonstração criei esse aplicação simples de um Blog escrito com HTML, CSS e JavaScript ( ):
  * Conteúdo Estático: Os layouts básicos do blog (cabeçalhos, rodapés, menus) são arquivos HTML estáticos.
  * Interatividade com JavaScript:
    * Carregar Posts: obter a lista de posts ou os detalhes de um post específico.
    * Renderizar Posts: Manipular o DOM para exibir os posts na página inicial e o conteúdo detalhado de um post.
    * Carregar Comentários: Fazer requisições para buscar os comentários de um post.
    * Enviar Comentários: Enviar dados do formulário de comentários no post.
- Clone esse repositório e esteja com o runtime do Docker rodando localmente.
- Faça login no Azure: `az login`
- Faça login no seu Registro ACR: `az acr login --name registro_no_acr`
- Construa a Imagem Docker: `docker build -t registro_no_acr.azurecr.io/blogapp:v1 .`
- Envie a Imagem para o ACR: `docker push registro_no_acr.azurecr.io/blogapp:v1`































