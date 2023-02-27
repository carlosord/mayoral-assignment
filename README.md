Prueba práctica basada en tecnologías de front como React, Next en Tyscript.

## Como arrancar la prueba en local
Clonamos la rama `/prueba_tecnica_cog` y nos situamos en su directorio raiz. Ejecutamos los siguientes comandos:
```bash
# Instalamos todas las dependencias
npm install
# Arrancamos el servidor en el puerto 3000
npm run dev
```

```bash
# Creación de una versión de produccion (optimizada y sin warnnigs)
npm run build
```

Si accedemos a [http://localhost:3000](http://localhost:3000) veremos la vista con los productos.

## Arranque en docker
Existen generados los dockerfile para crear una imagen y posteriormente un contenedor con la aplicación. No obstante, por problemas de compatibilidad de algunas librerias no están en funcionamiento. Por esta razón, y dado que queda fuera de la práctica, no se incluyen las instrucciones de despligue con docker, aunque se mantienen los ficheros por si se quiere consultar como sería la creación de dichos contenedores.


## Componentes implementados
Se implementan las siguientes partes de la tienda cumpliendo con las indicaciones exigidas e incluyendo algún adicional con el objetivo de 
exponer mayor funcionalidad:

1. Buscador por nombre.
2. Componente de ordenacion con precio ascendente y descendente (tiene en cuenta las variantes y los descuentos).
3. Variantes en las tarjetas de los productos. (Basadas diferentes precios, descuentos e imagenes).
4. Vista de detalles del producto.
5. Carrito de la compra (tiene en cuenta las variantes a la hora de sumar un producto o agregarlo).
6. Componentes de modificacion de las columnas de la vista.

** Si se desea se puede modificar el fichero `src/pages/api/data.json` que contiene los datos de los productos para añadir descuentos o modificar los precios.


## Detalles de la implementación destacables
- Componentes estilo React:
Se realizan dos componentes bajo el estilo react (sin next) utilizando aspectos importantes del ciclo de vida de los componentes y la sintaxis 
propia de cualquier componente de esta técnilogia. Exclusivamente se realizan para demostrar el conocimiento en este estilo de sintaxis. Los 
componentes son product-list.tsx y product-card.tsx

- Componentes estilo Nextjs:
El resto de componentes de la app se utilizan siguiendo la sintaxis sugerida de Next.js. Se hace uso de los hooks para mantener el estado de 
aquellas propiedades necesarias para renderizar en caso de modificación.

- Internacionalización de la app:
Mediante la librería `i18next` se realiza la internacionalización de la aplicación. Se utiliza un wrapper que se pone conteniendo a los componentes de la app, lo que nos permite hacer uso de las traducciones a lo largo de toda la aplicación. La aplicación está preparada para detectar el idioma del navegador y seleccionar automaticamente las traducciones que tiene que utilizar.

- Diseño de componentes genericos y especificaciones:
Se diseñan componentes totalmente genericos para poder hacer uso de ellos en diferentes lugares de la app y para diferentes entidades. Uno de los 
ejemplos es el buscador genérico o el ordenador genérico. Sobre los componentes genericos, existe a su vez una especificación, como es el caso del 
`ProductSorter`. Este, contiene los detalles exactos que se necesitan para filtrar un producto: funciones, etiquetas para el combo, etc. Y hace uso 
del ordenador generico con esta configuración, agregandose posteriormente a la vista de productos.

- Control de variantes en la app:
Toda la aplicación se basa en las variantes de los productos para aportar valor. Al modificar una variante, está ya puede usarse en el listado para 
filtrar nuevamente o para reordenar según el nuevo precio. El componente de carrito es capaz de diferenciar si tiene que agregar un nuevo item o 
incrementar una unidad a un item existente en funcion de la variante de la que se trata, puediendo llegar a tener hasta 4 items diferentes del mismo producto pero de diversas variantes y con distintos precios.

- Estructuración de la aplicación:
La aplicación está estructurada de forma que pueda ser facilmente localizable cualquiera de sus componentes.
1. Pages -> Contiene las vistas de la aplicación, en este caso, exclusivamente contiene el indice (listado de productos).
2. Pages/api -> Contiene un api local para simular las peticiones a un servicio web con datos en JSON.
3. Domain -> Interfaces de entidades que se usan asiduamente en la app.
4. Components -> Directorio dedicado a componentes que se usan en las vistas. Esta separado con componentes genericos, distinados a usarse independientemente de la entidad que los necesite (serian susceptibles de incluirse en una libreria privada para incluir en otras aplicaciones de la casa), y otros directorios especificos como pueden ser `cart` y `product` con componentes totalmente especificos y dependientes de la entidad principal de los mismos.
5. Language -> Destinado a contener cada uno de los ficheros con los mensajes de la app internacionalizados.
6. Styles -> Contenedor de los estilos de la aplicación y separado en ficheros en funcion del módulo al que hacen referencia.
7. Test -> Contiene los test de la aplicación con el mismo sistema de directorios que src.

- Test de la app:
Para no realizar test de toda la aplicación y dado que apenas hay grandes funcionalidades, se decide realizar como demostración los test del componente
de ordenación generico. De esta manera, se realiza la instalación y configuracion de `babel-jest` y se adapta para poder usarlo en conjunto con 
typescript. Para lanzar los test se configura una acción dentro de los scripts, de esta manera será suficiente con introducir el comando `npm test`.

- Estilos de la app:
En la vista se puede apreciar el uso de diversos estilo que diferencian entre la version movil y la versión web. Uno de los más significativos es el carrito. Por otra parte, las opciones de más o menos columnas se limitan a pantallas superiores a 400px dado que en las inferiores, con dos columnas se ve muy pequeño. Hasta 767px se puede escoger entre 2 y 3 columnas, de ahi en adelante se puede escoger entre 3 y 4 columnas.