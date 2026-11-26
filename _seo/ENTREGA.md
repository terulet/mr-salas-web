# M. R. Salas · Bloque SEO multilingüe

Maqueta del 26 de noviembre de 2026, basada en la versión publicada `5e63f87`. El trabajo sigue el enfoque de Proinstal con páginas propias por servicio, traducciones enlazadas entre sí y seguimiento por URL. La maqueta incorpora 30 páginas de servicios y conserva las seis portadas y sus direcciones actuales. Los textos fuente están en `_seo/contenido.py`. Para regenerar el bloque, ejecuta `python3 _seo/generar.py`.

## Búsquedas objetivo

Cada fila corresponde a una intención. El castellano y el catalán usan vocabulario local. Las versiones internacionales conservan el nombre de Roses y añaden España donde ayuda a situar la búsqueda. Son términos objetivo. El volumen y la posición quedan por medir.

| Servicio | ES | CA | FR | EN | DE | NL |
| --- | --- | --- | --- | --- | --- | --- |
| Integral | reformas integrales en Roses | reformes integrals a Roses | rénovation de maison à Roses Espagne | home renovations in Roses Spain | Haus renovieren in Roses | woning renoveren in Roses Spanje |
| Cocinas | reforma de cocinas en Roses | reforma de cuines a Roses | rénovation cuisine à Roses | kitchen renovation in Roses | Küchenrenovierung in Roses | keukenrenovatie in Roses |
| Baños | reforma de baños en Roses | reforma de banys a Roses | rénovation salle de bains à Roses | bathroom renovation in Roses | Badsanierung in Roses | badkamerrenovatie in Roses |
| Fachadas | rehabilitación de fachadas en Girona | rehabilitació de façanes a Girona | rénovation façade province de Gérone | façade restoration in Girona province | Fassadensanierung Provinz Girona | gevelrenovatie provincie Girona |
| Terrazas | reforma de terrazas y porches en Roses | reforma de terrasses i porxos a Roses | rénovation terrasse à Roses | terrace renovation in Roses | Terrassensanierung in Roses | terrasrenovatie in Roses |

**Consultas complementarias para BOAB Radar** incluyen «empresa de reformas en Roses», «reformar segunda residencia en Roses», «cambiar bañera por ducha en Roses», «reparar revoco de fachada en Girona» y «reformar terraza con filtraciones en Roses». Se conservan las consultas base «Manolo Rodríguez Roses» y «reformas en Roses» para poder comparar con la primera medición.

## Evidencias de cada servicio

Cada página presenta una obra de la galería existente, qué se revisa en la visita y una pregunta específica del servicio. El botón de WhatsApp prepara un mensaje que identifica el trabajo en el idioma de la página. El visitante puede escribir su municipio antes de enviarlo. Las fichas explican que la empresa trabaja desde Roses y confirma el desplazamiento para otros municipios de la provincia.

## Publicación e indexación en bloque

1. Tras la revisión, publicar la rama en GitHub Pages y comprobar que el dominio oficial responde correctamente en las 36 URL del sitemap. Validar las páginas enlazadas desde las portadas y el selector de idiomas.
2. Comprobar la nueva lectura de `https://mrsalas.es/sitemap.xml` en Search Console. Puede volver a enviarse una vez para comunicar la ampliación si todavía figura la versión de seis direcciones. Revisar que el nuevo sitemap descubra las 36 páginas.
3. Inspeccionar las direcciones principales, empezando por reformas integrales en castellano, catalán y francés. Pedir indexación individual solo si sigue sin aparecer en Google y la inspección publicada es apta. Usar el sitemap para el conjunto de las páginas. Las seis portadas ya se comunicaron a Google antes de esta maqueta.
4. Guardar por URL la fecha de descubrimiento, el estado de indexación y la dirección canónica elegida por Google. Comparar impresiones, clics y consultas por idioma y servicio en Search Console, con periodos completos y comparables. La ficha de Google Maps se gestiona por separado.
5. Revisar el sitemap en la propiedad de Bing ya abierta. Repetir las dos consultas base de BOAB Radar en Google, Bing, Maps e IA, y añadir una muestra de consultas de servicios. Registrar la aparición del dominio, la aparición de su ficha y las menciones de IA por separado.

Fuentes de implementación. [Versiones lingüísticas y hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions), [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) y [Solicitar el rastreo](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## Revisión de la maqueta

El [bloque de servicios](http://100.98.237.124:18826/#tipos-de-reforma) está disponible desde MacBoab por Tailscale. La vista privada incluye una cabecera `noindex`. El dominio público sigue sirviendo el sitemap de seis portadas.

Se verificaron 36 respuestas HTTP 200, los títulos y enlaces de las 30 páginas, las seis alternativas por servicio, sus enlaces canónicos y los mensajes de WhatsApp. En el navegador se comprobó el paso de la versión española a la francesa, la pregunta desplegable y la vuelta desde el servicio a la portada francesa a tamaño móvil. La generación produjo los mismos archivos en dos pasadas.
