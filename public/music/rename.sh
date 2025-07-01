#!/bin/bash

# Cambia al directorio del script
cd "$(dirname "$0")"

# Renombra todos los archivos de imagen a lowercase y reemplaza espacios por guiones
for file in *; do
    if [[ -f "$file" ]]; then
        # Convierte a minúsculas y reemplaza espacios por guiones
        new_name=$(echo "$file" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
        # Solo renombra si el nombre cambia
        if [[ "$file" != "$new_name" ]]; then
            mv "$file" "$new_name"
            echo "Renombrado: $file -> $new_name"
        fi
    fi
done