# TERRA · Daten, Quellen und Lizenzen

TERRA 1.0.0 · DGKN@Labs · 2026. Code und selbst erstellte Lehrmodelle: MIT.

## Erdtexturen

Solar System Scope / INOVE, auf Grundlage von NASA Blue Marble und anderen NASA-Bilddaten. Bereitgestellt und verkleinert über die Three.js-Beispiele. CC BY 4.0: https://creativecommons.org/licenses/by/4.0/ . Quellen: https://www.solarsystemscope.com/textures/ und https://threejs.org/examples/webgpu_tsl_earth.html . Tages- und Nachtkomposite sind historische Visualisierungen. Wolken zeigen eine statische Illustration, kein aktuelles Wetter. Die kombinierte Maske enthält Höhe (R), Rauheit (G) und Wolken (B); TERRA verwendet G und B.

Topografie und Bathymetrie: NASA Earth Observatory / Jesse Allen, GEBCO / British Oceanographic Data Centre. Quellen: https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/topography-bathymetry-maps/ . NASA-Medien sind grundsätzlich in den USA nicht urheberrechtlich geschützt; Rechtehinweise für Fremdmaterial sind zu beachten. Bearbeitung: Skalierung 5400×2700 auf 4096×2048, JPEG; Färbung im Shader. Das Raster ist eine Visualisierung und wird nicht als präzise Höhenmessung oder 3D-Geländemodell verwendet.

## Heutige Platten und Grenzen

Bird, P. (2003): An updated digital model of plate boundaries. Geochemistry, Geophysics, Geosystems 4(3), 1027. DOI: 10.1029/2001GC000252 . Aufbereitung: Hugo Ahlenius / Nordpil, GeoJSON durch csterling. Daten: https://github.com/fraxen/tectonicplates . Lizenz: Open Data Commons Attribution 1.0, https://opendatacommons.org/licenses/by/1.0/ . Koordinaten unverändert; Umrechnung auf Kugelkoordinaten, Linienfärbung, Hervorhebung und geografische Auswahl in TERRA. Plattengrenztypen werden für die Karte nicht aus unvollständigen Type-Feldern geraten.

## Zeitreise

GPlates Web Service / EarthByte, Modell ZAHIROVIC2022, Ankerplatte 0. Zahirovic, S., Eleish, A., Doss, S., Pall, J., Cannon, J., Pistone, M., Tetley, M. G., Young, A., & Fox, P. (2022): Subduction kinematics and carbonate platform interactions. Geoscience Data Journal 9(2), 371–383. DOI: 10.1002/gdj3.146 . Modell: https://zenodo.org/records/14188878 , CC BY 4.0. Küstenkomponente laut EarthByte: CC BY 3.0, https://www.earthbyte.org/gplates-2-5-software-and-data-sets/ . Dienst: https://gwsdoc.gplates.org/reconstruction/reconstruct-coastlines/ . Abruf: 03.10.2026; elf Zustände von 0 bis 250 Ma, Schrittweite 25 Ma. Bearbeitungen: Metadaten ergänzt, Koordinaten unverändert, Färbung auf equirektangulärer Rasterkarte im Browser. Es handelt sich um rekonstruierte heutige Küstenkonturen, nicht um tatsächliche damalige Küsten oder Landschaften. Der Mantelbezugsrahmen ist eine Modellwahl, keine absolute Beobachtung vergangener Koordinaten.

## Erdbeben

USGS: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson . USGS-Katalog, Magnitude ≥ 2,5, letzte sieben Tage. Der mitgelieferte Snapshot trägt den Zeitstempel in metadata.generated. TERRA versucht einen neuen Abruf, andernfalls wird der letzte lokale oder der mitgelieferte Stand als Archivstand angezeigt. Koordinaten, Magnitude, Datum, Kennung und Tiefe werden aus den Daten gelesen. Tiefenlinien lassen sich maßstäblich oder 8-fach überhöht anzeigen. Der Datensatz ist keine Gefahrenprognose und keine vollständige globale Erfassung kleiner Beben.

## Lehrinhalte und Lehrmodelle

Grundlagen: USGS Inside the Earth / Understanding plate motions / Determining the Depth of an Earthquake; GeoPark Ruhrgebiet Karbon / Geologische Wand Kampmannbrücke. Links sind direkt bei den Einträgen verfügbar. Texte sind eigene, KI-unterstützt erstellte Zusammenfassungen; keine wörtliche Übernahme. Noch keine externe fachredaktionelle Abnahme. Erdschichten zeigen gerundete Radien; die Kruste ist leicht verstärkt. Die Plattenmechanismen sind vereinfachte didaktische Animationen ohne reale Geschwindigkeiten. Der Ruhrgebiet-Aufschluss ist ein schematisches Schichtmodell, kein konkretes Bohrprofil. TERRA dient der Bildung und macht keine Aussagen zur individuellen Sicherheit oder Ereignisvorhersage.

## Software

Three.js 0.180.0 und OrbitControls: Three.js Authors, MIT; Lizenz unter vendor/LICENSE. Oberfläche, Animationen und Daten werden lokal ausgeliefert. Keine externen Schriftdateien, keine Analyse-Skripte. Notizen und Lernstand verbleiben im Browser; der optionale USGS-Abruf und externe Quellenlinks stellen Internetverbindungen her.

Vollständige Provenienz der Datenpakete: assets/texture-provenance.json und assets/reconstruction-provenance.json .
