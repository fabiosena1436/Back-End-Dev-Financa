#!/bin/sh
set -e

# Limpar possíveis arquivos de pipe residuais
rm -rf /tmp/tsx-*

# Executar o comando fornecido
exec "$@"