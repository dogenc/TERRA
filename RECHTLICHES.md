# Rechtliche Hinweise

## 1. Zweckbestimmung

TERRA ist ein **Lern- und Anschauungswerkzeug für Geologie und Geografie**: Schule, Studium, Lehre und allgemeine Bildung. Die Inhalte behandeln den Aufbau der Erde, Plattentektonik, rekonstruierte Kontinentpositionen, Erdbeben und regionale Erdgeschichte.

TERRA ist **kein Warn-, Prognose- oder Gefahreninformationssystem**. Erdbebendaten beschreiben erfasste Ereignisse, liefern keine Vorhersage und sind keine Grundlage für Entscheidungen über persönliche Sicherheit. Im Ereignisfall gelten ausschließlich die Hinweise der zuständigen Behörden.

## 2. Inhaltliche Hinweise

- Erdschichten und Plattenmechanismen sind **didaktisch vereinfacht**; die Kruste ist sichtbar verstärkt, Animationen zeigen keine realen Geschwindigkeiten.
- Die Zeitreise zeigt **rekonstruierte heutige Konturen** an früheren Positionen (Modell ZAHIROVIC2022), keine tatsächlichen damaligen Küsten oder Landschaften.
- Der Ruhrgebiet-Aufschluss ist ein **schematisches Schichtmodell**, kein konkretes Bohrprofil. Die Reliefansicht ist kein präzises Geländemodell.
- Erdbebendaten stammen aus dem USGS-Katalog und können nachträglich korrigiert werden. Ohne Verbindung zeigt TERRA einen ausdrücklich gekennzeichneten **Archivstand**.
- Die Texte sind KI-unterstützt erstellt und **nicht redaktionell oder fachlich abgenommen**. Sie können Fehler enthalten oder vereinfachen. Für Prüfungen gelten das eingesetzte Lehrbuch und die Vorgaben der Lehrkraft bzw. der Prüfungsordnung.
- Hinweise auf Fehler sind willkommen (Issue oder Pull Request).

## 3. Gewährleistung und Haftung

Die Software wird gemäß [MIT-Lizenz](LICENSE) **„wie sie ist“ und unentgeltlich** bereitgestellt, ohne jede Gewährleistung für Richtigkeit, Vollständigkeit, Aktualität, Verfügbarkeit oder Eignung für einen bestimmten Zweck.

Soweit gesetzlich zulässig, ist die Haftung der Urheber und Mitwirkenden ausgeschlossen. Unberührt bleiben:
- die Haftung für Vorsatz und grobe Fahrlässigkeit,
- die Haftung für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit,
- die Haftung nach dem Produkthaftungsgesetz,
- sonstige zwingende gesetzliche Haftung.

Für unentgeltlich überlassene Software gelten in Deutschland ergänzend die Haftungsmaßstäbe der Schenkung (§§ 521, 523, 524 BGB).

## 4. Externe Links

Die Anwendung verlinkt auf externe Quellen (USGS, NASA, GPlates/EarthByte, GeoPark Ruhrgebiet, DOI-Links). Für deren Inhalte sind ausschließlich die jeweiligen Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.

## 5. Datenschutz

TERRA selbst erhebt **keine personenbezogenen Daten**:

- keine Konten, keine Cookies, keine Analyse- oder Tracking-Werkzeuge, keine Werbung, keine externe KI-Anbindung,
- Programmteile, 3D-Bibliothek, Texturen und geologische Daten werden lokal bzw. vom eigenen Server geladen; es gibt keine CDNs oder Schriftarten-Dienste,
- **einzige automatische Verbindung zu Dritten** ist der Abruf des öffentlichen USGS-Erdbebenfeeds (`earthquake.usgs.gov`). Dabei verarbeitet der USGS technisch notwendige Verbindungsdaten wie IP-Adresse und Zeitpunkt. Es werden keine Nutzerdaten übertragen,
- **Notizen, Lernstand und der zuletzt abgerufene Erdbebenstand** werden ausschließlich lokal gespeichert (`localStorage`) und nie übertragen. Sie lassen sich über die Browser-Einstellungen bzw. durch Entfernen der Desktop-App löschen,
- **„Offline speichern“** legt App- und Datendateien im Browser-Cache des Geräts ab,
- **Teilen** und **Bild speichern** werden nur auf ausdrücklichen Klick ausgeführt.

**Hosting:** Wer TERRA auf einer eigenen Domain veröffentlicht, ist für den Betrieb selbst verantwortlich. Der Hosting-Anbieter verarbeitet beim Abruf technisch notwendige Verbindungsdaten wie IP-Adresse, Zeitpunkt und abgerufene Datei. Betreiber einer öffentlichen Instanz sollten eine Datenschutzerklärung und – je nach Art des Angebots – ein Impressum bereitstellen.

## 6. Lizenzen

- Eigener Code, eigene Lehrmodelle und Texte: [MIT-Lizenz](LICENSE)
- Erdtexturen (CC BY 4.0), NASA-Topografie und -Bathymetrie, PB2002-Plattengrenzen (ODC-By 1.0), GPlates-Rekonstruktionen (CC BY 4.0 / CC BY 3.0), USGS-Erdbebendaten und three.js (MIT): siehe [NOTICE.md](dist/NOTICE.md)

Die MIT-Lizenz des Codes ersetzt die gesonderten Lizenzen der Datensätze nicht.

---

<sub>Diese Hinweise wurden nach bestem Wissen erstellt, stellen aber keine Rechtsberatung dar. Stand: Oktober 2026.</sub>
