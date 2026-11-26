"""Textos de servicio y términos de búsqueda de M.R. Salas."""

from dataclasses import dataclass


@dataclass(frozen=True)
class Service:
    slug: str
    nav: str
    heading: str
    summary: str
    points: tuple
    question: str
    answer: str
    image_alt: str


SERVICES = {
    "es": {
        "integral": Service(
            slug="reformas-integrales-roses", nav="Reformas integrales",
            heading="Reformas integrales en Roses",
            summary="Reforma tu piso, casa o segunda residencia en Roses con Manolo Rodríguez. Antes de empezar, vemos qué conservar, qué reparar y qué merece cambiar.",
            points=(
                "Revisamos cómo usas la vivienda y qué estancias necesitan una nueva distribución, más almacenamiento o mejores acabados.",
                "Decidimos qué instalaciones se pueden conservar y qué conviene renovar antes de cerrar paredes y suelos.",
                "Si la vivienda se usa por temporadas, hablamos de cuándo podrás acceder a ella y qué partes de la obra conviene hacer juntas.",
            ),
            question="¿Puedo reformar el piso por fases?",
            answer="Lo hablamos en la primera visita. Empezar por una estancia tiene sentido si se puede separar del resto. Si varios espacios comparten instalaciones o pavimento, conviene valorar esas dependencias antes de decidir el orden.",
            image_alt="Salón con chimenea de una vivienda en la galería de M.R. Salas",
        ),
        "kitchen": Service(
            slug="reforma-cocinas-roses", nav="Reforma de cocinas",
            heading="Reforma de cocinas en Roses",
            summary="Renueva tu cocina con una distribución que te sirva a diario. En la visita con Manolo revisamos el espacio, los acabados y lo que conviene conservar.",
            points=(
                "Tomamos como punto de partida el paso entre encimera, fregadero y zona de cocción, además del espacio para abrir muebles y electrodomésticos.",
                "Antes de mover el fregadero o abrir la cocina al salón, revisamos tomas, desagüe, ventilación y condiciones del tabique.",
                "Planificamos el orden de revestimientos, encimera y mobiliario para que los encuentros queden resueltos antes del montaje.",
            ),
            question="¿Se puede abrir la cocina al salón?",
            answer="Depende del tabique y de las instalaciones que pasen por él. Vemos primero el alcance en la vivienda para saber qué comprobaciones hacen falta.",
            image_alt="Cocina abierta de la galería de trabajos reales de M.R. Salas",
        ),
        "bathroom": Service(
            slug="reforma-banos-roses", nav="Reforma de baños",
            heading="Reforma de baños en Roses",
            summary="Cambia la bañera por una ducha o renueva todo el baño. Manolo revisa contigo el desagüe, los revestimientos y la distribución antes de definir la obra.",
            points=(
                "Comprobamos la altura disponible y el desagüe para decidir cómo colocar el plato de ducha y cómo rematar la entrada.",
                "Revisamos la impermeabilización y los encuentros con paredes, suelo y mampara, especialmente donde cae el agua.",
                "Si se cambia todo el baño, acordamos la posición de sanitarios, lavabo y muebles antes de elegir revestimientos.",
            ),
            question="¿Tengo que cambiar todos los azulejos si retiro la bañera?",
            answer="A veces basta con rehacer la zona afectada. Revisamos si el revestimiento existente se puede conservar y cómo quedarán la unión y las piezas de remate.",
            image_alt="Baño con doble lavabo en una obra de M.R. Salas",
        ),
        "facade": Service(
            slug="rehabilitacion-fachadas-girona", nav="Rehabilitación de fachadas",
            heading="Rehabilitación de fachadas en Girona",
            summary="Desde Roses, M.R. Salas revisa fachadas con revoco deteriorado, fisuras o humedad. Indica el municipio y qué has observado para valorar el alcance.",
            points=(
                "Observamos dónde se desprende el revestimiento, cómo es el soporte y si las marcas aparecen también cerca de ventanas o balcones.",
                "Revisamos entradas de agua y remates antes de decidir si procede una reparación localizada o una intervención más amplia.",
                "La altura, el acceso y el estado del revestimiento condicionan la forma de trabajar. Los valoramos antes de definir el presupuesto.",
            ),
            question="¿Puedo pintar directamente sobre una fachada con humedad?",
            answer="Primero hay que averiguar de dónde viene la humedad y cómo está el soporte. Con eso se decide qué reparación y qué revestimiento tienen sentido.",
            image_alt="Fachada de piedra de la galería de obras de M.R. Salas",
        ),
        "terrace": Service(
            slug="reforma-terrazas-porches-roses", nav="Terrazas y porches",
            heading="Reforma de terrazas y porches en Roses",
            summary="Si el suelo exterior se mueve, se encharca o deja pasar agua, Manolo revisa la terraza o el porche para valorar el pavimento, las pendientes y el desagüe.",
            points=(
                "Comprobamos por dónde sale el agua y qué ocurre cerca de la puerta, las juntas, el sumidero y el remate contra los muros.",
                "Antes de elegir un pavimento, revisamos el soporte y qué hay debajo de la terraza, sobre todo cuando cubre una estancia.",
                "Buscamos un acabado adecuado al uso del espacio y a su exposición a la intemperie, tanto para una terraza abierta como para un porche.",
            ),
            question="¿Se puede colocar un pavimento nuevo encima del antiguo?",
            answer="Depende del soporte, de las pendientes y de la altura que quede en puertas y desagües. Ver la terraza permite decidir si se puede conservar el pavimento o si conviene levantarlo.",
            image_alt="Vivienda con terrazas en la galería de obras de M.R. Salas",
        ),
    },
    "ca": {
        "integral": Service(
            slug="reformes-integrals-roses", nav="Reformes integrals",
            heading="Reformes integrals a Roses",
            summary="Reforma el teu pis, casa o segona residència a Roses amb en Manolo Rodríguez. A la visita valorem què conservar, què reparar i què convé canviar.",
            points=(
                "Parlem de com fas servir l’habitatge i de quines estances necessiten una altra distribució, més espai per desar o uns acabats nous.",
                "Decidim quines instal·lacions es poden aprofitar i quines convé renovar abans de tancar parets i paviments.",
                "Si hi vens per temporades, acordem quan tindràs accés a l’habitatge i quins treballs té sentit agrupar.",
            ),
            question="Puc reformar el pis per fases?",
            answer="Ho valorem a la primera visita. Es pot començar per una estança si es pot separar de la resta. Si diferents espais comparteixen instal·lacions o paviment, cal tenir-ho en compte a l’hora d’ordenar els treballs.",
            image_alt="Sala d’estar amb llar de foc, de la galeria d’obres de M.R. Salas",
        ),
        "kitchen": Service(
            slug="reforma-cuines-roses", nav="Reforma de cuines",
            heading="Reforma de cuines a Roses",
            summary="Renova la cuina perquè et sigui còmoda cada dia. Amb en Manolo revisem la distribució, els acabats i les peces que val la pena aprofitar.",
            points=(
                "Mirem el recorregut entre el taulell, l’aigüera i la zona de cocció, i l’espai per obrir mobles i electrodomèstics.",
                "Per moure l’aigüera o obrir la cuina al menjador, primer revisem les preses, el desguàs, la ventilació i l’envà.",
                "Acordem l’ordre dels revestiments, el taulell i els mobles perquè els punts d’unió quedin resolts abans del muntatge.",
            ),
            question="Es pot obrir la cuina al menjador?",
            answer="Depèn de l’envà i de les instal·lacions que hi passin. Primer veiem l’habitatge i determinem què s’ha de comprovar.",
            image_alt="Cuina oberta de la galeria d’obres reals de M.R. Salas",
        ),
        "bathroom": Service(
            slug="reforma-banys-roses", nav="Reforma de banys",
            heading="Reforma de banys a Roses",
            summary="Canvia la banyera per una dutxa o reforma tot el bany. En Manolo revisa amb tu el desguàs, els revestiments i la distribució.",
            points=(
                "Comprovem l’alçada disponible i el desguàs per decidir com col·locar el plat de dutxa i resoldre l’accés.",
                "Revisem la impermeabilització i les unions amb el terra, les parets i la mampara, sobretot on cau l’aigua.",
                "Si es reforma tot el bany, acordem on van els sanitaris, la pica i els mobles abans de triar les rajoles.",
            ),
            question="Cal canviar totes les rajoles si trec la banyera?",
            answer="De vegades es pot intervenir només a la zona afectada. Comprovem si es poden aprofitar les rajoles existents i com quedaran la unió i els remats.",
            image_alt="Bany amb doble pica en una obra de M.R. Salas",
        ),
        "facade": Service(
            slug="rehabilitacio-facanes-girona", nav="Rehabilitació de façanes",
            heading="Rehabilitació de façanes a Girona",
            summary="Des de Roses, M.R. Salas revisa façanes amb arrebossat deteriorat, fissures o humitat. Explica’ns què hi veus i en quin municipi és la finca.",
            points=(
                "Mirem on es desprèn el revestiment i com és el suport, especialment a prop de balcons i finestres.",
                "Revisem les entrades d’aigua i els remats abans de decidir si cal una reparació puntual o una actuació més àmplia.",
                "L’alçada, l’accés i l’estat del revestiment influeixen en la manera de treballar i s’han de valorar abans de fer pressupost.",
            ),
            question="Puc pintar directament sobre una façana amb humitat?",
            answer="Primer cal saber d’on ve la humitat i en quin estat es troba el suport. Això permet escollir la reparació i l’acabat adequats.",
            image_alt="Façana de pedra de la galeria d’obres de M.R. Salas",
        ),
        "terrace": Service(
            slug="reforma-terrasses-porxos-roses", nav="Terrasses i porxos",
            heading="Reforma de terrasses i porxos a Roses",
            summary="Si es mou el paviment, s’hi formen bassals o hi passa aigua, en Manolo revisa la terrassa o el porxo, els pendents i el desguàs.",
            points=(
                "Comprovem per on surt l’aigua, sobretot als embornals, les juntes i les trobades amb portes i murs.",
                "Revisem el suport i què hi ha sota la terrassa abans de triar un paviment, especialment si hi ha una estança a sota.",
                "Busquem un acabat adequat a l’ús de l’espai i a l’exposició a la intempèrie, tant en un porxo com en una terrassa oberta.",
            ),
            question="Es pot posar un paviment nou sobre l’antic?",
            answer="Depèn de l’estat del suport, els pendents i l’alçada lliure a portes i desguassos. A la visita veiem si es pot conservar o si s’ha d’aixecar.",
            image_alt="Habitatge amb terrasses de la galeria d’obres de M.R. Salas",
        ),
    },
    "fr": {
        "integral": Service(
            slug="renovation-maison-roses", nav="Rénovation complète",
            heading="Rénovation de maison à Roses, en Espagne",
            summary="Vous souhaitez rénover une maison, un appartement ou une résidence secondaire à Roses ? Faites le point avec Manolo Rodríguez lors d’une première visite.",
            points=(
                "On examine l’usage des pièces avant de choisir ce qu’il faut redistribuer, conserver ou remettre en état.",
                "On repère les réseaux à reprendre avant de refermer les cloisons ou de finir les sols.",
                "Si vous venez à Roses par périodes, on parle des dates d’accès au logement et des travaux à regrouper.",
            ),
            question="Peut-on rénover l’appartement pièce par pièce ?",
            answer="La visite permet de voir si une pièce peut être traitée séparément. Si plusieurs pièces partagent des réseaux ou un même revêtement de sol, il faut en tenir compte pour organiser les travaux.",
            image_alt="Séjour avec cheminée, issu de la galerie de réalisations de M.R. Salas",
        ),
        "kitchen": Service(
            slug="renovation-cuisine-roses", nav="Rénovation de cuisine",
            heading="Rénovation de cuisine à Roses",
            summary="Réorganisez votre cuisine à Roses avec Manolo. Lors de la visite, on examine les passages, les équipements et les finitions à garder ou à remplacer.",
            points=(
                "On vérifie la circulation entre le plan de travail, l’évier et la cuisson ainsi que le dégagement des meubles et des appareils.",
                "Avant de déplacer l’évier ou d’ouvrir sur le séjour, on examine les arrivées, l’évacuation, la ventilation et la cloison.",
                "On fixe l’ordre des revêtements, du plan de travail et du mobilier pour traiter les raccords avant la pose.",
            ),
            question="Peut-on ouvrir la cuisine sur le séjour ?",
            answer="Cela dépend de la cloison et des réseaux qui la traversent. La visite sert à préciser les vérifications à faire avant d’arrêter le projet.",
            image_alt="Cuisine ouverte de la galerie des réalisations de M.R. Salas",
        ),
        "bathroom": Service(
            slug="renovation-salle-de-bain-roses", nav="Rénovation de salle de bains",
            heading="Rénovation de salle de bains à Roses",
            summary="Remplacez la baignoire par une douche ou refaites toute la salle de bains. Manolo examine avec vous l’évacuation, l’agencement et les revêtements.",
            points=(
                "On vérifie la hauteur disponible et l’évacuation pour positionner le receveur et prévoir l’accès à la douche.",
                "On examine l’étanchéité et les raccords autour de la douche, notamment aux jonctions entre le sol et les parois.",
                "Pour une rénovation complète, on choisit l’emplacement des sanitaires, de la vasque et des meubles avant le carrelage.",
            ),
            question="Faut-il changer tout le carrelage après avoir retiré la baignoire ?",
            answer="Dans certains cas, on peut reprendre uniquement la zone concernée. On examine l’état du carrelage existant et la façon de raccorder les nouvelles finitions.",
            image_alt="Salle de bains avec double vasque, réalisée par M.R. Salas",
        ),
        "facade": Service(
            slug="renovation-facade-gerone", nav="Rénovation de façade",
            heading="Rénovation de façade dans la province de Gérone",
            summary="Basée à Roses, M.R. Salas examine les enduits dégradés, fissures et traces d’humidité. Indiquez-nous la commune et ce que vous avez remarqué.",
            points=(
                "On repère les zones où l’enduit se détache et on observe le support près des balcons et des fenêtres.",
                "On recherche les entrées d’eau et les raccords mal protégés avant de décider s’il faut une reprise locale ou plus étendue.",
                "La hauteur, l’accès et l’état de la façade déterminent la façon dont la réparation peut être organisée.",
            ),
            question="Peut-on repeindre une façade marquée par l’humidité ?",
            answer="On commence par identifier l’origine de l’humidité et vérifier le support. La réparation et la finition dépendent ensuite de ces constats.",
            image_alt="Façade en pierre, issue de la galerie de réalisations de M.R. Salas",
        ),
        "terrace": Service(
            slug="renovation-terrasse-roses", nav="Terrasses et porches",
            heading="Rénovation de terrasse à Roses",
            summary="Un revêtement qui bouge, des flaques ou une infiltration sur votre terrasse ? Manolo inspecte la pente, l’évacuation et les raccords avant de définir les travaux.",
            points=(
                "On observe l’écoulement près des portes, des joints, des évacuations et des raccords avec les murs.",
                "On examine le support avant de choisir un revêtement, surtout si la terrasse couvre une pièce habitable.",
                "On tient compte de l’usage et de l’exposition aux intempéries pour choisir une finition adaptée à l’espace.",
            ),
            question="Peut-on poser un carrelage neuf sur l’ancien ?",
            answer="Cela dépend du support, des pentes et de la hauteur disponible aux seuils et aux évacuations. La visite permet de voir si l’ancien revêtement peut être conservé.",
            image_alt="Maison avec terrasses de la galerie de réalisations de M.R. Salas",
        ),
    },
    "en": {
        "integral": Service(
            slug="home-renovations-roses", nav="Full home renovations",
            heading="Home renovations in Roses, Spain",
            summary="Renovating a house, flat or holiday home in Roses? Walk through the property with Manolo Rodríguez to decide what to keep, repair or change.",
            points=(
                "We look at how you use each room before discussing changes to the layout, storage and finishes.",
                "We check which existing services can stay and which need attention before walls and floors are closed up.",
                "If you use the property seasonally, we discuss access dates and which parts of the work make sense to do together.",
            ),
            question="Can I renovate my flat in stages?",
            answer="We discuss this at the first visit. Some rooms can be handled separately. If work in different rooms shares plumbing, wiring or flooring, we consider those connections before agreeing the order.",
            image_alt="Living room with a fireplace from the M.R. Salas project gallery",
        ),
        "kitchen": Service(
            slug="kitchen-renovation-roses", nav="Kitchen renovation",
            heading="Kitchen renovation in Roses",
            summary="Plan a kitchen that works for you every day. At the property, Manolo reviews the layout, finishes and which existing features you could keep.",
            points=(
                "We look at the route between the worktop, sink and hob and leave enough room for cupboards and appliances to open.",
                "Before moving the sink or opening the kitchen to the living area, we check the plumbing, drainage, ventilation and wall.",
                "We agree the order for wall finishes, worktops and cabinetry so the junctions are ready before fitting.",
            ),
            question="Can I open my kitchen into the living room?",
            answer="It depends on the wall and the services that run through it. A site visit helps identify the checks needed before changing the layout.",
            image_alt="Open-plan kitchen from the M.R. Salas project gallery",
        ),
        "bathroom": Service(
            slug="bathroom-renovation-roses", nav="Bathroom renovation",
            heading="Bathroom renovation in Roses",
            summary="Replace a bath with a shower or remodel the whole bathroom. Manolo reviews the drainage, layout and finishes with you before agreeing the work.",
            points=(
                "We check the available floor depth and drainage to work out how to fit the shower tray and finish the entrance.",
                "We look at waterproofing and the junctions between the floor, walls and screen, especially around the shower.",
                "For a full refit, we agree where the basin, toilet and storage will go before choosing the tiles.",
            ),
            question="Will I need to replace all the tiles when I remove the bath?",
            answer="Sometimes only the area around the bath needs to be retiled. We look at the condition of the existing tiles and how the new finish will meet them.",
            image_alt="Bathroom with twin basins from the M.R. Salas project gallery",
        ),
        "facade": Service(
            slug="facade-restoration-girona", nav="Façade restoration",
            heading="Façade restoration in Girona province",
            summary="From Roses, M.R. Salas assesses façades with damaged render, cracks or signs of damp. Tell us where the property is and what you have noticed.",
            points=(
                "We check where render is coming away and examine the surface around windows and balconies.",
                "We look at potential paths for water and at exposed junctions before deciding between a local repair and wider work.",
                "Height, access and the condition of the surface affect how the job can be carried out and how it should be priced.",
            ),
            question="Can I paint straight over damp patches on a façade?",
            answer="First identify the source of the damp and check the condition of the underlying surface. Those findings determine which repair and finish are suitable.",
            image_alt="Stone façade from the M.R. Salas project gallery",
        ),
        "terrace": Service(
            slug="terrace-renovation-roses", nav="Terraces and porches",
            heading="Terrace and porch renovation in Roses",
            summary="If the paving lifts, water pools or a terrace leaks, Manolo can inspect the surface, slopes and drainage before agreeing what to repair.",
            points=(
                "We check how water drains near the door, joints, outlets and the places where paving meets the walls.",
                "We look at the base and what lies beneath it before choosing the paving, especially if the terrace covers a room.",
                "We choose finishes to suit how you use the space and how exposed it is to the weather.",
            ),
            question="Can new outdoor tiles go over the old ones?",
            answer="It depends on the base, the slope and the room available at thresholds and outlets. Inspecting those details helps determine whether the old surface can stay.",
            image_alt="House with terraces from the M.R. Salas project gallery",
        ),
    },
    "de": {
        "integral": Service(
            slug="haussanierung-roses", nav="Komplettsanierung",
            heading="Haus und Wohnung renovieren in Roses",
            summary="Sie möchten ein Haus, eine Wohnung oder ein Ferienhaus in Roses sanieren? Besprechen Sie mit Manolo Rodríguez vor Ort, was bleiben kann und was erneuert werden soll.",
            points=(
                "Wir besprechen, wie Sie die Räume nutzen und wo ein anderer Grundriss, mehr Stauraum oder neue Oberflächen helfen.",
                "Wir prüfen, welche Leitungen bleiben können und welche vor dem Schließen der Wände und Böden erneuert werden sollten.",
                "Wenn Sie das Objekt nur zeitweise nutzen, besprechen wir den Zugang und welche Arbeiten sich sinnvoll zusammenfassen lassen.",
            ),
            question="Kann ich meine Wohnung in Etappen renovieren?",
            answer="Beim ersten Termin klären wir, ob einzelne Räume getrennt bearbeitet werden können. Gemeinsame Leitungen und durchgehende Böden spielen bei der Reihenfolge eine Rolle.",
            image_alt="Wohnzimmer mit Kamin aus der Projektgalerie von M.R. Salas",
        ),
        "kitchen": Service(
            slug="kuechenrenovierung-roses", nav="Küchenrenovierung",
            heading="Küchenrenovierung in Roses",
            summary="Planen Sie eine Küche, die im Alltag zu Ihnen passt. Manolo schaut mit Ihnen auf den Grundriss, die Oberflächen und die vorhandene Ausstattung.",
            points=(
                "Wir prüfen die Wege zwischen Arbeitsplatte, Spüle und Kochfeld sowie den Platz zum Öffnen von Schränken und Geräten.",
                "Vor dem Versetzen der Spüle oder dem Öffnen zum Wohnraum prüfen wir Anschlüsse, Abfluss, Lüftung und Wand.",
                "Wir stimmen die Reihenfolge von Wandbelag, Arbeitsplatte und Schränken so ab, dass die Anschlüsse vor dem Einbau geklärt sind.",
            ),
            question="Lässt sich die Küche zum Wohnzimmer öffnen?",
            answer="Das hängt von der Wand und den darin verlaufenden Leitungen ab. Vor Ort lässt sich klären, welche Prüfungen für den Umbau nötig sind.",
            image_alt="Offene Küche aus der Projektgalerie von M.R. Salas",
        ),
        "bathroom": Service(
            slug="badsanierung-roses", nav="Badsanierung",
            heading="Badsanierung in Roses",
            summary="Tauschen Sie die Badewanne gegen eine Dusche oder sanieren Sie das ganze Bad. Manolo bespricht mit Ihnen Abfluss, Aufteilung und Oberflächen.",
            points=(
                "Wir prüfen die vorhandene Aufbauhöhe und den Abfluss, bevor wir die Position der Duschwanne und den Einstieg festlegen.",
                "Wir achten auf die Abdichtung und die Anschlüsse zwischen Boden, Wand und Abtrennung, besonders im Duschbereich.",
                "Bei einer Komplettsanierung klären wir die Position von Waschbecken, WC und Schränken vor der Fliesenauswahl.",
            ),
            question="Müssen beim Ausbau der Badewanne alle Fliesen erneuert werden?",
            answer="Oft kommt eine Reparatur im betroffenen Bereich infrage. Entscheidend sind der Zustand der alten Fliesen und der Übergang zur neuen Oberfläche.",
            image_alt="Bad mit zwei Waschbecken aus der Projektgalerie von M.R. Salas",
        ),
        "facade": Service(
            slug="fassadensanierung-girona", nav="Fassadensanierung",
            heading="Fassadensanierung in der Provinz Girona",
            summary="Von Roses aus prüft M.R. Salas Fassaden mit losem Putz, Rissen und Feuchtigkeit. Nennen Sie uns den Ort und was Ihnen aufgefallen ist.",
            points=(
                "Wir schauen, wo Putz abblättert und wie der Untergrund an Fenstern und Balkonen aussieht.",
                "Wir prüfen mögliche Eintrittsstellen für Wasser und die Anschlüsse, bevor wir den Umfang der Reparatur besprechen.",
                "Höhe, Zugang und Zustand der Oberfläche bestimmen, wie die Arbeiten organisiert und kalkuliert werden können.",
            ),
            question="Kann man feuchte Stellen an der Fassade einfach überstreichen?",
            answer="Zuerst klären wir die Ursache der Feuchtigkeit und den Zustand des Untergrunds. Daraus ergibt sich, welche Reparatur und welche Oberfläche infrage kommen.",
            image_alt="Natursteinfassade aus der Projektgalerie von M.R. Salas",
        ),
        "terrace": Service(
            slug="terrassensanierung-roses", nav="Terrassen und Veranden",
            heading="Terrassensanierung in Roses",
            summary="Lose Fliesen, Pfützen oder Wasser im Innenraum? Manolo begutachtet auf Ihrer Terrasse Belag, Gefälle und Entwässerung.",
            points=(
                "Wir prüfen den Wasserablauf an Türen, Fugen, Abläufen und Wandanschlüssen.",
                "Vor der Auswahl des Belags prüfen wir den Untergrund, besonders wenn unter der Terrasse ein Raum liegt.",
                "Für eine offene Terrasse oder einen überdachten Sitzplatz berücksichtigen wir die Nutzung und den Schutz vor Witterung.",
            ),
            question="Kann man neue Terrassenfliesen auf die alten legen?",
            answer="Das hängt vom Untergrund, vom Gefälle und von den Höhen an Türen und Abläufen ab. Vor Ort lässt sich beurteilen, ob der vorhandene Belag bleiben kann.",
            image_alt="Haus mit Terrassen aus der Projektgalerie von M.R. Salas",
        ),
    },
    "nl": {
        "integral": Service(
            slug="woning-renoveren-roses", nav="Volledige woningrenovatie",
            heading="Woning renoveren in Roses, Spanje",
            summary="Wil je een huis, appartement of tweede woning in Roses renoveren? Loop samen met Manolo Rodríguez door het huis en bespreek wat kan blijven en wat moet veranderen.",
            points=(
                "We bespreken hoe je de ruimtes gebruikt en waar een andere indeling, extra opbergruimte of nieuwe afwerking helpt.",
                "We bekijken welke installaties goed zijn en welke je beter vernieuwt voordat wanden en vloeren worden afgewerkt.",
                "Gebruik je de woning alleen in bepaalde periodes? Dan bespreken we wanneer de woning toegankelijk is en welke werkzaamheden samen kunnen.",
            ),
            question="Kan ik mijn appartement in fases renoveren?",
            answer="Tijdens het eerste bezoek kijken we of een ruimte apart kan worden aangepakt. Gedeelde leidingen en doorlopende vloeren spelen mee bij het bepalen van de volgorde.",
            image_alt="Woonkamer met open haard uit de projectgalerij van M.R. Salas",
        ),
        "kitchen": Service(
            slug="keukenrenovatie-roses", nav="Keukenrenovatie",
            heading="Keukenrenovatie in Roses",
            summary="Maak van je keuken een ruimte die praktisch werkt. Ter plaatse bespreekt Manolo de indeling, afwerking en welke onderdelen je kunt behouden.",
            points=(
                "We bekijken de loopruimte tussen het werkblad, de spoelbak en de kookplaat, ook met kastdeuren en apparatuur open.",
                "Voor we de spoelbak verplaatsen of de keuken bij de woonkamer trekken, controleren we leidingen, afvoer, ventilatie en wand.",
                "We stemmen de volgorde van wandafwerking, werkblad en kasten af zodat de aansluitingen kloppen bij de montage.",
            ),
            question="Kan mijn keuken open naar de woonkamer?",
            answer="Dat hangt af van het type wand en de leidingen die erdoor lopen. Tijdens een bezoek bepalen we wat er moet worden gecontroleerd voordat de indeling verandert.",
            image_alt="Open keuken uit de projectgalerij van M.R. Salas",
        ),
        "bathroom": Service(
            slug="badkamerrenovatie-roses", nav="Badkamerrenovatie",
            heading="Badkamerrenovatie in Roses",
            summary="Vervang het bad door een douche of vernieuw de hele badkamer. Manolo bekijkt samen met jou de afvoer, indeling en afwerking.",
            points=(
                "We controleren de beschikbare vloerhoogte en de afvoer voor de plaatsing van de douchebak en de instap.",
                "We letten op de waterdichting en de aansluitingen tussen vloer, wand en scherm, vooral op plekken die nat worden.",
                "Bij een complete renovatie bepalen we eerst waar toilet, wastafel en meubels komen en daarna welke tegels passen.",
            ),
            question="Moeten alle tegels eruit als ik het bad weghaal?",
            answer="Soms hoeft alleen het deel rond het oude bad opnieuw te worden afgewerkt. We bekijken of de bestaande tegels kunnen blijven en hoe de nieuwe afwerking erop aansluit.",
            image_alt="Badkamer met dubbele wastafel uit de projectgalerij van M.R. Salas",
        ),
        "facade": Service(
            slug="gevelrenovatie-girona", nav="Gevelrenovatie",
            heading="Gevelrenovatie in de provincie Girona",
            summary="Vanuit Roses bekijkt M.R. Salas gevels met los pleisterwerk, scheuren of vochtplekken. Vertel ons in welke plaats de woning staat en wat je ziet.",
            points=(
                "We bekijken waar de gevelafwerking loslaat en hoe de ondergrond rond ramen en balkons eraan toe is.",
                "We controleren waar water binnen kan komen en hoe aansluitingen zijn afgewerkt voordat we de omvang van het herstel bepalen.",
                "Hoogte, bereikbaarheid en de staat van de gevel bepalen hoe het werk kan worden uitgevoerd en begroot.",
            ),
            question="Kan ik een gevel met vochtplekken gewoon overschilderen?",
            answer="Eerst moet duidelijk zijn waar het vocht vandaan komt en in welke staat de ondergrond is. Daarna kiezen we een passende reparatie en afwerking.",
            image_alt="Natuurstenen gevel uit de projectgalerij van M.R. Salas",
        ),
        "terrace": Service(
            slug="terrasrenovatie-roses", nav="Terrassen en veranda’s",
            heading="Terrasrenovatie in Roses",
            summary="Ligt de bestrating los, blijft er water staan of lekt je terras? Manolo bekijkt de vloer, de afwatering en de aansluitingen voordat het werk begint.",
            points=(
                "We bekijken hoe water wegloopt bij deuren, voegen, afvoerpunten en de aansluitingen aan de muur.",
                "We controleren de ondergrond vóór de keuze van de tegels, vooral als er een kamer onder het terras ligt.",
                "De afwerking moet passen bij het gebruik en bij de blootstelling aan regen en buitenlucht, met of zonder overkapping.",
            ),
            question="Kunnen nieuwe terrastegels over de oude heen?",
            answer="Dat hangt af van de ondergrond, het afschot en de ruimte bij deuren en afvoeren. Ter plaatse kunnen we bepalen of de bestaande tegels kunnen blijven.",
            image_alt="Woning met terrassen uit de projectgalerij van M.R. Salas",
        ),
    },
}
