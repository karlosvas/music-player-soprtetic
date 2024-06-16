#!/bin/bash

# Archivo de registro para almacenar los nombres de archivo modificados
log_file="renamed_files.log"

# Inicializa el archivo de registro si no existe
touch "$log_file"

# Función para leer el archivo de registro y cargar los nombres de archivo renombrados en el diccionario
read_log_file() {
    declare -A renamed_files
    while IFS= read -r line; do
        if [[ ! -z "$line" ]]; then
            renamed_files["$line"]=1
        fi
    done < "$log_file"
    echo "${!renamed_files[@]}"
}

# Función para generar un nombre único basado en el contador y evitar duplicados
generate_unique_name() {
    local new_name
    local original_name="$file"
    local renamed_files_str=$(read_log_file)
    local count=1

    while true; do
        new_name="photo${count}.${extension}"
        if [[ ! -f "$new_name" && ! $(echo "$renamed_files_str" | grep -w "$new_name") ]]; then
            break
        fi
        count=$((count + 1))
    done
    echo "$new_name"
}

# Iterar sobre todos los archivos de imagen en el directorio
count=1
for file in *.{jpg,jpeg,png,gif}; do
    if [[ -f "$file" ]]; then
        extension="${file##*.}"
        new_name=$(generate_unique_name)
        mv "$file" "$new_name"
        echo "Renombrado: $file -> $new_name"
        echo "$new_name" >> "$log_file"
    fi
done
