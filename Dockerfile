# Usa a imagem Nginx Alpine, que é muito leve
FROM nginx:alpine

# Remove o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos do seu frontend para o diretório de serviço do Nginx
# O diretório 'public' local será copiado para '/usr/share/nginx/html' no container
COPY public /usr/share/nginx/html

# Copia um arquivo de configuração customizado do Nginx
COPY nginx.conf /etc/nginx/conf.d/blog.conf

# Expõe a porta 80 do container
EXPOSE 80

# Comando para iniciar o Nginx quando o container for executado
CMD ["nginx", "-g", "daemon off;"]