FROM node:18

WORKDIR /home/app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências e tsx globalmente
RUN npm install && \
    npm install -g tsx

# Copiar o resto dos arquivos do projeto
COPY . .

EXPOSE 3333

# Adicionar um script de inicialização
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["tsx", "watch", "./src/server.ts"]