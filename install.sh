#!/bin/bash
# Atualiza pacotes e instala Node.js
sudo apt-get update -y
sudo apt-get install -y nodejs npm git

# Garante que os submodulos sejam baixados corretamente
git submodule update --init --recursive

# Instala as dependencias da API
npm install

# Inicia a API em background (Porta 3000)
nohup node server.js > api.log 2>&1 &
