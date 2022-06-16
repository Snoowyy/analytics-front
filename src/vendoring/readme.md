# Vendoring para proyecto usados en frontend

Ésta carpeta contiene los proyectos externos de fronend, que por cualquier motivo halla sido necesario incluir directamente en forma de código fuente. En  éste documento debe mantenerse actualizada la lista de librerías que son copiadas en esta forma, y su ruta en github o equivalente.

* Apache Arrow [js]: [carpeta js en apache arrow](https://github.com/apache/arrow/tree/16bbdd47a73782588090872adf54a11b9c95aa6e/js). Desde ese código exacto, se genera el paquete ts con:

    npm install
    npm build

Y se compia el contenido del paquete ts a la carpeta arrow-js
