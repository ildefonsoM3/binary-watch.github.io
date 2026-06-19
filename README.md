# Reloj Binario Estilo Europeo

Una aplicación web interactiva que representa la hora actual utilizando un sistema binario, perfectamente integrado en la fachada de un edificio de estilo europeo clásico. Desarrollado completamente con Vanilla JavaScript, HTML5 y CSS3.

## 📐 Sobre el Proyecto

El objetivo de este proyecto es combinar la lógica matemática de la conversión binaria con un diseño arquitectónico estético (techos abuhardillados estilo Mansard, ventanas de arco clásico y balcones simulados). 

La estructura principal consta de 4 torres y 4 pisos:
* **Torre 1 (Leyenda):** Muestra el valor posicional de cada bit.
* **Torres 2, 3 y 4:** Representan la Hora, los Minutos y los Segundos, separando las decenas y unidades en dos columnas de ventanas por torre.

## ✨ Características Principales

* **Lógica en Vanilla JS:** Conversión en tiempo real de la hora del sistema a formato binario (4 bits) sin frameworks ni dependencias externas.
* **Manipulación Eficiente del DOM:** Generación dinámica de la estructura del edificio y actualización de las clases CSS (`.on`, `.off`) cada segundo.
* **Sistema de Leyenda Visual:** Columna izquierda dedicada a mostrar estáticamente los valores (8, 4, 2, 1) para facilitar la lectura a los usuarios que no están familiarizados con el código binario.
* **Control de Formato:** Un *switch* interactivo que permite alternar la lógica de cálculo entre el formato de 12 horas y 24 horas al instante.
* **Diseño Responsivo y Estético:** Uso de Variables CSS (`:root`), Flexbox y transiciones suaves (`transition`) para el encendido y apagado de las ventanas.

## 📖 ¿Cómo leer la hora?

El reloj funciona leyendo el estado de las ventanas (1 = Encendida, 0 = Apagada) de arriba hacia abajo, sumando los valores correspondientes al piso activo.

Los valores de los pisos son:
* Piso 1 (Superior): **8**
* Piso 2: **4**
* Piso 3: **2**
* Piso 4 (Inferior): **1**

Cada par de ventanas (izquierda y derecha) en una torre representa las decenas y unidades de ese fragmento de tiempo. Por ejemplo, para leer un **5**, se encenderán las ventanas de los pisos con valor **4** y **1** (4 + 1 = 5).

### Ejemplo visual para la hora `09:05:53`:

| Leyenda (Valor) | Hora (0, 9) | Minuto (0, 5) | Segundo (5, 3) |
|:---:|:---:|:---:|:---:|
| **8** | 0, 1 | 0, 0 | 0, 0 |
| **4** | 0, 0 | 0, 1 | 1, 0 |
| **2** | 0, 0 | 0, 0 | 0, 1 |
| **1** | 0, 1 | 0, 1 | 1, 1 |

## 🚀 Instalación y Uso

Al ser un proyecto estático del lado del cliente, no requiere de un servidor local complejo ni instalación de paquetes (`npm`).

1. Clona este repositorio o descarga los archivos.
2. Abre el archivo `index.html` en cualquier navegador web moderno.
3. El script tomará automáticamente la hora de tu sistema y comenzará la ejecución cíclica mediante `setInterval`.

## 📁 Estructura de Archivos

* `index.html`: Estructura semántica base y controles de usuario.
* `style.css`: Reglas de diseño, iluminación (efectos de `box-shadow`) y estructura de Flexbox.
* `script.js`: Contiene los algoritmos de división temporal, conversión a cadenas binarias (`.toString(2)`) y el enlace lógico con la interfaz de usuario.