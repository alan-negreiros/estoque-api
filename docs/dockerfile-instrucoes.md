# Pesquisa: instrucoes de um Dockerfile

Este documento resume, com minhas palavras, as instrucoes mais usadas em um Dockerfile para empacotar a API de Estoque em um container Docker.

## FROM

Define a imagem base usada para construir a nova imagem. No caso da API de Estoque, a base precisa ter Node.js instalado, por isso foi usada uma imagem oficial `node:lts-alpine`. A parte `lts` acompanha uma versao estavel de suporte prolongado do Node, e `alpine` reduz o tamanho da imagem.

## WORKDIR

Define a pasta interna do container onde os proximos comandos vao ser executados. Ao usar `WORKDIR /app`, todos os comandos seguintes passam a trabalhar dentro de `/app`, evitando caminhos longos e deixando a estrutura mais previsivel.

## COPY

Copia arquivos da maquina local, chamada de contexto de build, para dentro da imagem. Na API, primeiro copiamos `package.json` e `package-lock.json` para instalar dependencias com cache melhor. Depois copiamos o restante do codigo, incluindo `server.js`, `src`, `contracts` e `config`.

## RUN

Executa comandos durante a construcao da imagem. O resultado fica salvo em uma camada da imagem. Na API, `RUN npm ci --omit=dev` instala exatamente as dependencias registradas no `package-lock.json`, sem dependencias de desenvolvimento.

## EXPOSE

Documenta qual porta a aplicacao usa dentro do container. A API original roda na porta 3000, entao o Dockerfile usa `EXPOSE 3000`. Essa instrucao nao publica a porta sozinha; para acessar pelo computador, ainda e necessario usar `-p 3000:3000` no `docker run`.

## CMD

Define o comando padrao executado quando o container inicia. Para a API de Estoque, o comando padrao e `node server.js`, porque esse arquivo sobe o servidor Express na porta 3000.

## Comandos de validacao

Para construir a imagem:

```bash
docker build -t estoque-api:latest .
```

Para executar o container mapeando a porta 3000 do computador para a porta 3000 do container:

```bash
docker run --rm -d --name estoque-api -p 3000:3000 estoque-api:latest
```

Para testar a rota de status:

```bash
curl http://localhost:3000/api/estoque/status
```

Para parar o container:

```bash
docker stop estoque-api
```

## Fontes consultadas

- Dockerfile reference: https://docs.docker.com/reference/dockerfile/
- Build context e .dockerignore: https://docs.docker.com/build/concepts/context/
- docker buildx build: https://docs.docker.com/reference/cli/docker/buildx/build/
- docker container run: https://docs.docker.com/reference/cli/docker/container/run/
