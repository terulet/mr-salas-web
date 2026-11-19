# Construcciones y Reformas M.R. Salas · web de Manolo Rodríguez

Web de una sola página en **HTML + CSS + JavaScript puro** (sin frameworks ni build), lista para GitHub Pages o cualquier hosting estático.

Es la web propia de **Manolo**, el padre. La de sus hijos Carlos y Sergio es otra: https://hermanosrodriguez1975.es/ (repo `terulet/hermanosrodriguez`). Esta tiene **identidad propia** a propósito para que no se confundan:

| | Hermanos Rodríguez | M.R. Salas (Manolo) |
|---|---|---|
| Colores | negro + naranja | cal `#F4EFE6` + azul mar `#1D3B4F` + ocre `#A9762A` |
| Logo | H.R con tejado | arco de medio punto con «MR» |
| Tipografías | Bricolage Grotesque + Instrument Sans | Young Serif + Figtree |
| Tono | empresa familiar | en primera persona: Manolo habla directamente |

## Línea visual elegida: A · «Cal y mar» (16-11-2026)
Se hicieron tres propuestas con el mismo contenido: **A · Cal y mar** (esta), **B · Cuaderno de obra** (editorial, papel, tinta negra y verde) y **C · Azul Cadaqués** (moderna, blanco y cobalto, con azulejos). Se eligió la **A**. B y C ya no forman parte de la web, pero se pueden recuperar desde la etiqueta de Git `propuestas-abc`:
```bash
git checkout propuestas-abc -- propuestas
```

## Archivos
```
index.html        página principal
style.css         estilos
script.js         menú móvil, recorrido fotográfico, formulario → WhatsApp
legal.css         estilos de las páginas legales
aviso-legal.html  aviso legal (PENDIENTE de datos fiscales)
privacidad.html   política de privacidad (PENDIENTE de datos fiscales)
cookies.html      política de cookies (la web no instala cookies)
images/retrato-mediterraneo.webp  retrato de portada y recorte en la sección de Manolo
images/manolo-real.webp          foto original usada al compartir la web
images/reformas/                 comparativas ilustrativas y detalle de fachada
robots.txt
sitemap.xml
```

## Probar en local
```bash
python3 -m http.server 8771
```
y abrir http://localhost:8771

## Contacto configurado
- Teléfono y WhatsApp de Manolo: **615 959 391** (`WHATSAPP_NUMERO` en `script.js`).
- Sin email: no se ha inventado ninguno. Si Manolo tiene uno, añadirlo en contacto y en las páginas legales.
- El formulario **no envía nada a ningún servidor**: prepara un mensaje de WhatsApp con nombre, tipo de trabajo, municipio y detalles, y el cliente lo manda.

## Pendiente (ya está publicada, falta completar)
1. **Confirmar el nombre comercial.** Se ha usado «Construcciones y Reformas M.R. Salas» porque es el nombre de la carpeta del cliente. Si no es así, cambiar «M.R. Salas» en todos los archivos.
2. **Datos fiscales** en `aviso-legal.html` y `privacidad.html` (titular, NIF/CIF, domicilio, email para ejercer derechos). Están entre `[corchetes]` y marcados con `PENDIENTE COMPLETAR ANTES DE PUBLICAR`. Que lo revise su gestor.
3. **Retrato y recorrido.** La portada usa la composición mediterránea elegida a partir de la foto que aportó Manolo. Las comparativas de «Reformas» y el detalle interactivo de fachada son ilustrativos. Cuando se disponga de fotos autorizadas de una obra real, se pueden incorporar como caso documentado.
4. **Textos a confirmar con Manolo** (redactados como propuesta, no son datos verificados):
   - «Empecé a mediados de los setenta» y «+50 años de oficio» (sale de la web de los hijos: 1975).
   - «0 € por venir a verlo» / presupuesto sin compromiso.
   - La frase «Si digo que el lunes estoy, el lunes estoy».
   - Municipios de la zona: Roses, Empuriabrava, Castelló d'Empúries, Cadaqués, El Port de la Selva, Llançà, Figueres, L'Escala, Sant Pere Pescador.
   - Servicios: reformas, baños y cocinas, albañilería y obra menor, fachadas, tejados y goteras, piedra y exteriores.
   - Que manda fotos del avance de obra a clientes con segunda residencia.
5. **Fotos de obras suyas.** No hay galería porque no tenemos fotos reales de sus trabajos y no queremos usar imágenes genéricas como si fueran suyas. Cuando las haya, se añade una sección de trabajos.
6. **Dominio.** Ahora usa la URL de GitHub Pages. Cuando haya dominio propio, ver «Publicada» más abajo (marcado `DOMINIO PENDIENTE` en `index.html`).

## Publicada (16-11-2026)
- Web: **https://terulet.github.io/mr-salas-web/**
- Repositorio: https://github.com/terulet/mr-salas-web (público), GitHub Pages desde la rama `master`, raíz.
- Se publicó **a propósito antes de tener los datos**: las páginas legales aún muestran los `[corchetes]`. Completar la lista de abajo cuanto antes.
- Para actualizarla: editar, `git commit` y `git push`; Pages tarda un minuto en desplegar.
- Si hay dominio propio: crear `CNAME`, configurar los DNS y cambiar la URL en `index.html` (canonical, og:url, og:image), `robots.txt` y `sitemap.xml`.
