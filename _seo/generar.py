"""Genera páginas estáticas de servicios y enlaza las portadas existentes."""

import json
import posixpath
import re
from dataclasses import dataclass
from html import escape
from pathlib import Path
from urllib.parse import urlencode
from xml.etree import ElementTree

from contenido import SERVICES

ROOT = Path(__file__).resolve().parent.parent
DOMAIN = "https://mrsalas.es/"
LANGUAGES = {
    "es": "Español", "ca": "Català", "fr": "Français",
    "en": "English", "de": "Deutsch", "nl": "Nederlands",
}
SERVICE_DIRECTORIES = {
    "es": "servicios", "ca": "ca/serveis", "fr": "fr/services",
    "en": "en/services", "de": "de/leistungen", "nl": "nl/diensten",
}
PHOTOS = {
    "integral": ("09", 700, 525), "kitchen": ("10", 700, 525),
    "bathroom": ("06", 650, 487), "facade": ("04", 700, 523),
    "terrace": ("02", 700, 525),
}
BEGIN = "<!-- Inicio de enlaces a servicios -->"
END = "<!-- Fin de enlaces a servicios -->"


@dataclass(frozen=True)
class Labels:
    home: str
    language: str
    skip: str
    works: str
    contact: str
    intro: str
    scope: str
    areas: str
    other: str
    photo: str
    whatsapp: str
    message: str


LABELS = {
    "es": Labels(
        home="Inicio", language="Idioma", skip="Saltar al contenido",
        works="Obras reales", contact="Contacto", intro="Explora nuestras reformas",
        scope="Qué revisamos en la primera visita",
        areas="Trabajamos desde Roses. Si tu vivienda está en otro municipio de la provincia de Girona, indica dónde está para confirmar el desplazamiento.",
        other="Otras reformas", photo="Foto de la galería de obras reales",
        whatsapp="Consultar por WhatsApp",
        message="Hola, Manolo. Me interesa el servicio de {service}. La vivienda está en ",
    ),
    "ca": Labels(
        home="Inici", language="Idioma", skip="Ves al contingut",
        works="Obres reals", contact="Contacte", intro="Coneix les nostres reformes",
        scope="Què revisem a la primera visita",
        areas="Treballem des de Roses. Si l’habitatge és en un altre municipi de la província de Girona, digues-nos on és per confirmar el desplaçament.",
        other="Altres reformes", photo="Foto de la galeria d’obres reals",
        whatsapp="Consulta per WhatsApp",
        message="Hola, Manolo. M’interessa el servei de {service}. L’habitatge és a ",
    ),
    "fr": Labels(
        home="Accueil", language="Langue", skip="Aller au contenu",
        works="Réalisations", contact="Contact", intro="Découvrez nos travaux de rénovation",
        scope="Ce que nous vérifions lors de la première visite",
        areas="Nous travaillons depuis Roses. Si votre logement se trouve dans une autre commune de la province de Gérone, indiquez-la pour confirmer le déplacement.",
        other="Autres travaux de rénovation", photo="Photo issue de notre galerie de réalisations",
        whatsapp="Écrire sur WhatsApp",
        message="Bonjour Manolo. Je m’intéresse à votre service de {service}. Le logement se trouve à ",
    ),
    "en": Labels(
        home="Home", language="Language", skip="Skip to content",
        works="Completed work", contact="Contact", intro="Explore our renovation services",
        scope="What we check at the first visit",
        areas="We work from Roses. If your property is in another town in Girona province, tell us where it is so we can confirm whether we can travel there.",
        other="Other renovation services", photo="Photo from our completed projects",
        whatsapp="Ask on WhatsApp",
        message="Hi Manolo. I’d like to ask about {service}. The property is in ",
    ),
    "de": Labels(
        home="Start", language="Sprache", skip="Zum Inhalt springen",
        works="Abgeschlossene Projekte", contact="Kontakt", intro="Unsere Renovierungsleistungen",
        scope="Was wir beim ersten Termin prüfen",
        areas="Wir arbeiten von Roses aus. Liegt Ihre Immobilie in einem anderen Ort in der Provinz Girona? Nennen Sie uns den Ort, damit wir die Anfahrt klären können.",
        other="Weitere Renovierungsleistungen", photo="Foto aus unserer Projektgalerie",
        whatsapp="Per WhatsApp anfragen",
        message="Hallo Manolo, ich interessiere mich für {service}. Die Immobilie befindet sich in ",
    ),
    "nl": Labels(
        home="Home", language="Taal", skip="Naar de inhoud",
        works="Echte projecten", contact="Contact", intro="Bekijk onze renovatiediensten",
        scope="Wat we tijdens het eerste bezoek bekijken",
        areas="Wij werken vanuit Roses. Staat je woning ergens anders in de provincie Girona? Geef de plaats door, dan bevestigen we of we langs kunnen komen.",
        other="Andere renovatiediensten", photo="Foto uit onze projectgalerij",
        whatsapp="Vraag het via WhatsApp",
        message="Hallo Manolo, ik wil graag meer weten over {service}. De woning staat in ",
    ),
}


def home_file(language):
    return "index.html" if language == "es" else f"{language}.html"


def home_url(language):
    return DOMAIN if language == "es" else DOMAIN + home_file(language)


def service_file(language, key):
    return f"{SERVICE_DIRECTORIES[language]}/{SERVICES[language][key].slug}.html"


def relative(target, source):
    return posixpath.relpath(target, posixpath.dirname(source) or ".")


def alternates(key):
    links = [
        f'<link rel="alternate" hreflang="{lang}" href="{DOMAIN}{service_file(lang, key)}">'
        for lang in LANGUAGES
    ]
    links.append(f'<link rel="alternate" hreflang="x-default" href="{DOMAIN}{service_file("es", key)}">')
    return "\n".join(links)


def service_links(language, source, current=None):
    result = []
    for key, service in SERVICES[language].items():
        if key != current:
            href = relative(service_file(language, key), source)
            result.append(f'      <li><a href="{href}">{escape(service.nav)} <span aria-hidden="true">↗</span></a></li>')
    return "\n".join(result)


def fragment(pattern, homepage):
    matches = re.findall(pattern, homepage, re.DOTALL)
    if len(matches) != 1:
        raise ValueError(f"Expected exactly one fragment for {pattern}")
    return matches[0]


def service_page(language, key, homepage):
    copy = SERVICES[language][key]
    text = LABELS[language]
    file = service_file(language, key)
    url = DOMAIN + file
    home = relative(home_file(language), file)
    title = f"{copy.heading} | M.R. Salas"
    photo_id, width, height = PHOTOS[key]
    photo = f"images/obras-reales/{photo_id}-mini.webp"
    brand = fragment(r'<a href="#inicio" class="brand".*?</a>', homepage)
    brand = brand.replace('href="#inicio"', f'href="{home}"', 1)
    footer = fragment(r'<footer class="footer">.*?</footer>', homepage)
    footer = re.sub(r'href="([^"/#:]+\.html)"', lambda m: f'href="{relative(m[1], file)}"', footer)
    favicon = fragment(r'<link rel="icon" [^\n]+', homepage)
    phone = fragment(r'href="tel:\+(\d+)" class="brief__call"', homepage)
    service_name = copy.nav if language == "de" else copy.nav[0].lower() + copy.nav[1:]
    message = text.message.format(service=service_name)
    whatsapp = f"https://wa.me/{phone}?{urlencode({'text': message})}"
    locale_options = []
    for lang, name in LANGUAGES.items():
        switch = relative(service_file(lang, key), file)
        current = ' aria-current="page"' if lang == language else ""
        locale_options.append(f'          <li><a href="{switch}" lang="{lang}" hreflang="{lang}"{current}>{name}</a></li>')
    options = "\n".join(locale_options)
    scope = "\n".join(f"        <li>{escape(point)}</li>" for point in copy.points)
    schema = json.dumps({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": copy.heading,
        "description": copy.summary,
        "url": url,
        "image": DOMAIN + photo,
        "areaServed": {"@type": "AdministrativeArea", "name": "Provincia de Girona"},
        "provider": {
            "@type": "HomeAndConstructionBusiness",
            "name": "Construcciones y Reformas M.R. Salas",
            "url": DOMAIN,
            "telephone": f"+{phone}",
        },
    }, ensure_ascii=False, indent=2).replace("<", "\\u003c")
    return f"""<!doctype html>
<html lang="{language}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{escape(title)}</title>
<meta name="description" content="{escape(copy.summary)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#182b3e">
<link rel="canonical" href="{url}">
{alternates(key)}
<meta property="og:type" content="website">
<meta property="og:title" content="{escape(title)}">
<meta property="og:description" content="{escape(copy.summary)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{DOMAIN}{photo}">
<meta property="og:image:alt" content="{escape(copy.image_alt)}">
<meta name="twitter:card" content="summary_large_image">
{favicon}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&amp;family=Young+Serif&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="{relative('style.css', file)}">
<link rel="stylesheet" href="{relative('idiomas.css', file)}">
<link rel="stylesheet" href="{relative('servicios-seo.css', file)}">
<script type="application/ld+json">
{schema}
</script>
</head>
<body class="service-page">
<a class="skip" href="#contenido">{text.skip}</a>
<header class="nav">
  <div class="container nav__inner">
    {brand}
    <div class="nav__tools">
      <a class="service-page__contact" href="{home}#contacto">{text.contact}</a>
      <details class="lang-menu">
        <summary aria-label="{text.language} · {LANGUAGES[language]}">{language.upper()}</summary>
        <ul class="lang-menu__options">
{options}
        </ul>
      </details>
    </div>
  </div>
</header>
<main id="contenido" class="container">
  <a class="service-page__back" href="{home}#tipos-de-reforma"><span aria-hidden="true">←</span> {text.home}</a>
  <section class="service-page__hero" aria-labelledby="servicio">
    <div class="service-page__lead">
      <h1 id="servicio">{escape(copy.heading)}</h1>
      <p>{escape(copy.summary)}</p>
      <a class="action action--main" href="{escape(whatsapp)}">{text.whatsapp}</a>
    </div>
    <figure>
      <img src="{relative(photo, file)}" width="{width}" height="{height}" alt="{escape(copy.image_alt)}" fetchpriority="high">
      <figcaption>{text.photo}</figcaption>
    </figure>
  </section>
  <section class="service-page__scope" aria-labelledby="revision">
    <h2 id="revision">{text.scope}</h2>
    <div>
      <ul>
{scope}
      </ul>
      <details>
        <summary>{escape(copy.question)}</summary>
        <p>{escape(copy.answer)}</p>
      </details>
    </div>
  </section>
  <div class="service-page__area">
    <p>{text.areas}</p>
    <div class="service-page__actions">
      <a href="{home}#obras-reales">{text.works}</a>
      <a href="{home}#contacto">{text.contact}</a>
    </div>
  </div>
  <nav class="service-directory" aria-labelledby="otras-reformas">
    <h2 id="otras-reformas">{text.other}</h2>
    <ul>
{service_links(language, file, current=key)}
    </ul>
  </nav>
</main>
{footer}
</body>
</html>
"""


def link_from_home(language, html):
    file = home_file(language)
    text = LABELS[language]
    html = re.sub(rf"  {BEGIN}.*?{END}\n\n", "", html, count=1, flags=re.DOTALL)
    stylesheet = '<link rel="stylesheet" href="servicios-seo.css">\n'
    if stylesheet not in html:
        html = html.replace("</head>", stylesheet + "</head>", 1)
    marker = '  <section class="real-works page-section" id="obras-reales"'
    if html.count(marker) != 1:
        raise ValueError(f"Cannot add service links to {file}")
    directory = f"""  {BEGIN}
  <nav class="service-directory container" id="tipos-de-reforma" aria-labelledby="tipos-title">
    <h2 id="tipos-title">{text.intro}</h2>
    <ul>
{service_links(language, file)}
    </ul>
  </nav>
  {END}

"""
    return html.replace(marker, directory + marker, 1)


def sitemap():
    root = ElementTree.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    urls = [home_url(lang) for lang in LANGUAGES]
    urls.extend(DOMAIN + service_file(lang, key) for lang in LANGUAGES for key in PHOTOS)
    for url in urls:
        ElementTree.SubElement(ElementTree.SubElement(root, "url"), "loc").text = url
    ElementTree.indent(root, space="  ")
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + ElementTree.tostring(root, encoding="unicode") + "\n"


def main():
    if set(SERVICES) != set(LANGUAGES) or any(set(rows) != set(PHOTOS) for rows in SERVICES.values()):
        raise ValueError("Every language must have the same set of services")
    outputs = {ROOT / "sitemap.xml": sitemap()}
    for language in LANGUAGES:
        path = ROOT / home_file(language)
        homepage = path.read_text(encoding="utf-8")
        outputs[path] = link_from_home(language, homepage)
        for key in PHOTOS:
            page = ROOT / service_file(language, key)
            outputs[page] = service_page(language, key, homepage)

    for path, content in outputs.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        previous = path.read_text(encoding="utf-8") if path.is_file() else None
        if content != previous:
            path.write_text(content, encoding="utf-8")
    print(f"{len(LANGUAGES) * len(PHOTOS)} páginas de servicios, {len(LANGUAGES)} portadas y sitemap generado.")


if __name__ == "__main__":
    main()
