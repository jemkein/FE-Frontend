<template>
  <!-- Container for the About us Page-->
      <v-container fluid>
        <v-layout align-top justify-left>
          <v-flex xs16 sm12 md8>
            <v-card>
              <!-- Each item can contain 'font, text, margin or weight'-->
              <!-- The for loop iterates through the array classes and uses 'font' as key-->
              <v-item v-for="[font, text, margin, weight] in classes" :key="font">
                <template>
                  <!-- generates for each item of array classes a new div -->
                  <div :class="[`text-${font}`, `mb-${margin}`, `font-weight-${weight}`]" v-text="$t(text)">
                  </div>
                </template>
              </v-item>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
export default {
  name: 'AboutUs',
  data: () => ({
    // Elements of Array with different Font and CSS
    classes: [
      ['h5', 'About us'],
      ['h6', 'THMName'],
      ['body-2', 'Street'],
      ['body-2', 'Postalcode'],
      ['body-2', 'Country', '5'],
      ['body-2', '§1', '5'],
      ['body-2', 'law', '1'],
      ['body-2', 'tax', '1'],
      ['body-2', 'responsible', '0', 'bold'],
      ['body-2', 'Name1'],
      ['body-2', 'Street1'],
      ['body-2', 'Postalcode1', '5'],
      ['body-2', 'Context', '1', 'bold'],
      ['body-2', '§55', '5'],
      ['body-2', 'SocialMedia', '1', 'bold'],
      ['body-2', 'Instagram'],
      ['body-2', 'Gitlab'],
      ['body-2', 'Linkedin'],
      ['body-2', 'Facebook', '5'],
      ['body-2', 'Partner', '1', 'bold'],
      ['body-2', 'Name2'],
      ['body-2', 'Street2'],
      ['body-2', 'Postalcode2'],
      ['body-2', 'Content1', '1', 'bold'],
      ['body-2', 'Contentparagraph1', '5'],
      ['body-2', 'Content2', '1', 'bold'],
      ['body-2', 'Contentparagraph2', '5'],
      ['body-2', 'Content3', '1', 'bold'],
      ['body-2', 'Contentparagraph3', '5'],
      ['body-2', 'Content4', '1', 'bold'],
      ['body-2', 'Contentparagraph4', '5'],
      ['body-2', 'Content5', '1', 'bold'],
      ['body-2', 'Contentparagraph5', '10'],
      ['body-2', '.', '10']
    ]
  })
}
</script>
<i18n>
{
  "en": {
    "About us": "About us",
    "THMName" : "Technische Hochschule Mittelhessen (THM) University of Applied Sciences",
    "Street" : "Wiesenstraße 14",
    "Postalcode" : "35390 Gießen",
    "Country": "Germany",
    "§1": "Die Technische Hochschule Mittelhessen ist eine rechtsfähige Körperschaft des öffentlichen Rechts und zugleich staatliche Einrichtung gemäß § 1 (1) HHG (Hessisches Hochschulgesetz vom 14. Dezember 2009, GVBl. I, S. 666).",
    "law": "Sie wird gesetzlich vertreten durch den Präsidenten Prof. Dr. Matthias Willems.",
    "tax": "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:DE 813885934",
    "responsible": "Zuständige Aufsichtsbehörde:",
    "Name1": "Hessisches Ministerium für Wissenschaft und Kunst",
    "Street1": "Rheinstraße 23 - 25",
    "Postalcode1": "65185 Wiesbaden",
    "Context": "Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV:",
    "§55" : "Das Präsidium hat die allgemeine inhaltliche Verantwortung und entscheidet in Zweifelsfällen über die Zulässigkeit von Daten. Die Einrichtungen und Organe der Technischen Hochschule Mittelhessen (u.a. Fachbereiche, Bibliothek, AStA, Personalräte) erstellen ihre Webseiten in eigener Verantwortung. Die inhaltliche Verantwortung dieser Webseiten liegt bei der/dem Vertretungsberechtigten der jeweils zuständigen Einrichtung bzw. bei der von ihr/ihm autorisierten Person. Die Kontaktdaten dieser Personen sind dort jeweils im Impressum angegeben.",
    "SocialMedia" : "Das Impressum gilt auch für folgende Social Media Profile:",
    "Instagram" : "https://www.thm.de/instagram",
    "Gitlab": "https://git.thm.de/softwaretechnik-projekt-pick-by-light-system-wise21_22",
    "Linkedin": "https://de.linkedin.com/school/technische-hochschule-mittelhessen/",
    "Facebook": "https://www.thm.de/facebook",
    "Partner": "Technische Ansprechpartner für den Internetauftritt:",
    "Name2": "Referat Neue Medien",
    "Street2": "Ostanlage 37 - 41",
    "Postalcode2" : "35390 Gießen",
    "Content1": "1. Inhalt der Internetpräsenz",
    "Contentparagraph1": "Die Technische Hochschule Mittelhessen (THM) ist bemüht, die bereitgestellte Internetpräsenz stets informativ, aktuell, klar strukturiert und übersichtlich zu halten. Trotzdem können Fehler und Unklarheiten nicht vollständig ausgeschlossen werden. Aus diesem Grunde übernimmt die Technische Hochschule Mittelhessen keine Gewähr für die Vollständigkeit, die Richtigkeit, die Aktualität und die Qualität der zur Verfügung gestellten Informationen.Für Schäden immaterieller oder materieller Art, die durch die Nutzung oder die Nichtnutzung der dargebotenen Informationen oder durch die Nutzung fehlerhafter oder unvollständiger Informationen mittelbar oder unmittelbar entstehen, haftet die Technische Hochschule Mittelhessen nicht, sofern ihr nicht nachweislich ein grob fahrlässiges oder vorsätzliches Verschulden zur Last gelegt werden kann. Gleiches gilt für kostenlos zur Verfügung gestellte Software.Die Technische Hochschule Mittelhessen kann ohne vorherige Ankündigung Teile des Internetangebotes oder auch das gesamte Internetangebot verändern, ergänzen löschen oder endgültig oder zeitweise sperren.",
    "Content2": "2. Links und Verweise",
    "Contentparagraph2":"Für „fremde Inhalte“, die durch direkte oder indirekte Verknüpfungen (sogenannte Links) von anderen Anbietern zur Verfügung gestellt werden, übernimmt die Technische Hochschule Mittelhessen keine Haftung. Sie macht sich diese Seiten ausdrücklich nicht zu Eigen und distanziert sich auch von den Inhalten der gelinkten/verknüpften Seiten. Diese Feststellung betrifft auch die von der Technischen Hochschule Mittelhessen eingerichteten Diskussionsforen, Gästebücher und Mailinglisten.Für unvollständige, fehlerhafte oder auch illegale Inhalte und insbesondere für Schäden, die aus der Nutzung dieser Seiten und der in ihnen dargebotenen Informationen entstehen, haftet allein der Anbieter der entsprechenden Seiten. Die Technische Hochschule Mittelhessen hat keine Kenntnis über anstößige oder rechtswidrige Inhalte der gelinkten/verknüpften Seiten der Anbieter. Sollten auf diesen Seiten dennoch rechtswidrige oder anstößige Inhalte enthalten sein, distanziert sich die Technische Hochschule Mittelhessen ausdrücklich von diesen Inhalten.",
    "Content3":"3. Urheberrecht",
    "Contentparagraph3":"Die Technische Hochschule Mittelhessen ist bestrebt, in ihren Publikationen die Urheberrechte der verwendeten Dokumente, Texte, Grafiken, Tondokumente und Videosequenzen zu beachten, von ihr selbst erstellte Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen. Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind! Das Copyright für von der Technischen Hochschule Mittelhessen veröffentlichte Dokumente bleibt alleine bei der Technische Hochschule Mittelhessen. Die Vervielfältigung der von der Technischen Hochschule Mittelhessen erstellten Dokumente und Publikationen ist ohne ausdrückliche Zustimmung der Technischen Hochschule Mittelhessen nicht gestattet. Das Layout der Homepage und die verwendeten Graphiken sowie sonstige Inhalte sind urheberrechtlich geschützt.",
    "Content4":"4. Datenschutz",
    "Contentparagraph4":"Sofern auf unserer Webseite die Möglichkeit zur Eingabe persönlicher oder geschäftlicher Daten wie Namen, E-Mail-Adressen, Anschriften usw. besteht, erfolgt die Preisgabe dieser Daten seitens des Nutzers auf freiwilliger Basis.",
    "Content5":"5. Rechtswirksamkeit dieses Haftungsausschlusses",
    "Contentparagraph5":"Dieser Haftungsausschluss ist als Teil des Internetangebots zu betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtsgrundlage nicht oder nicht vollständig entsprechen, bleiben die übrigen Teile der Internetpräsentation in ihrem Inhalt und in ihrer Gültigkeit unberührt."
  },
  "de": {
    "About us": "Impressum",
    "THMName" : "Technische Hochschule Mittelhessen (THM) University of Applied Sciences",
    "Street" : "Wiesenstraße 14",
    "Postalcode" : "35390 Gießen",
    "Country": "Germany",
    "§1": "Die Technische Hochschule Mittelhessen ist eine rechtsfähige Körperschaft des öffentlichen Rechts und zugleich staatliche Einrichtung gemäß § 1 (1) HHG (Hessisches Hochschulgesetz vom 14. Dezember 2009, GVBl. I, S. 666).",
    "law": "Sie wird gesetzlich vertreten durch den Präsidenten Prof. Dr. Matthias Willems.",
    "tax": "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:DE 813885934",
    "responsible": "Zuständige Aufsichtsbehörde:",
    "Name1": "Hessisches Ministerium für Wissenschaft und Kunst",
    "Street1": "Rheinstraße 23 - 25",
    "Postalcode1": "65185 Wiesbaden",
    "Context": "Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV:",
    "§55" : "Das Präsidium hat die allgemeine inhaltliche Verantwortung und entscheidet in Zweifelsfällen über die Zulässigkeit von Daten. Die Einrichtungen und Organe der Technischen Hochschule Mittelhessen (u.a. Fachbereiche, Bibliothek, AStA, Personalräte) erstellen ihre Webseiten in eigener Verantwortung. Die inhaltliche Verantwortung dieser Webseiten liegt bei der/dem Vertretungsberechtigten der jeweils zuständigen Einrichtung bzw. bei der von ihr/ihm autorisierten Person. Die Kontaktdaten dieser Personen sind dort jeweils im Impressum angegeben.",
    "SocialMedia" : "Das Impressum gilt auch für folgende Social Media Profile:",
    "Instagram" : "https://www.thm.de/instagram",
    "Gitlab": "https://git.thm.de/softwaretechnik-projekt-pick-by-light-system-wise21_22",
    "Linkedin": "https://de.linkedin.com/school/technische-hochschule-mittelhessen/",
    "Facebook": "https://www.thm.de/facebook",
    "Partner": "Technische Ansprechpartner für den Internetauftritt:",
    "Name2": "Referat Neue Medien",
    "Street2": "Ostanlage 37 - 41",
    "Postalcode2" : "35390 Gießen",
    "Content1": "1. Inhalt der Internetpräsenz",
    "Contentparagraph1": "Die Technische Hochschule Mittelhessen (THM) ist bemüht, die bereitgestellte Internetpräsenz stets informativ, aktuell, klar strukturiert und übersichtlich zu halten. Trotzdem können Fehler und Unklarheiten nicht vollständig ausgeschlossen werden. Aus diesem Grunde übernimmt die Technische Hochschule Mittelhessen keine Gewähr für die Vollständigkeit, die Richtigkeit, die Aktualität und die Qualität der zur Verfügung gestellten Informationen.Für Schäden immaterieller oder materieller Art, die durch die Nutzung oder die Nichtnutzung der dargebotenen Informationen oder durch die Nutzung fehlerhafter oder unvollständiger Informationen mittelbar oder unmittelbar entstehen, haftet die Technische Hochschule Mittelhessen nicht, sofern ihr nicht nachweislich ein grob fahrlässiges oder vorsätzliches Verschulden zur Last gelegt werden kann. Gleiches gilt für kostenlos zur Verfügung gestellte Software.Die Technische Hochschule Mittelhessen kann ohne vorherige Ankündigung Teile des Internetangebotes oder auch das gesamte Internetangebot verändern, ergänzen löschen oder endgültig oder zeitweise sperren.",
    "Content2": "2. Links und Verweise",
    "Contentparagraph2":"Für „fremde Inhalte“, die durch direkte oder indirekte Verknüpfungen (sogenannte Links) von anderen Anbietern zur Verfügung gestellt werden, übernimmt die Technische Hochschule Mittelhessen keine Haftung. Sie macht sich diese Seiten ausdrücklich nicht zu Eigen und distanziert sich auch von den Inhalten der gelinkten/verknüpften Seiten. Diese Feststellung betrifft auch die von der Technischen Hochschule Mittelhessen eingerichteten Diskussionsforen, Gästebücher und Mailinglisten.Für unvollständige, fehlerhafte oder auch illegale Inhalte und insbesondere für Schäden, die aus der Nutzung dieser Seiten und der in ihnen dargebotenen Informationen entstehen, haftet allein der Anbieter der entsprechenden Seiten. Die Technische Hochschule Mittelhessen hat keine Kenntnis über anstößige oder rechtswidrige Inhalte der gelinkten/verknüpften Seiten der Anbieter. Sollten auf diesen Seiten dennoch rechtswidrige oder anstößige Inhalte enthalten sein, distanziert sich die Technische Hochschule Mittelhessen ausdrücklich von diesen Inhalten.",
    "Content3":"3. Urheberrecht",
    "Contentparagraph3":"Die Technische Hochschule Mittelhessen ist bestrebt, in ihren Publikationen die Urheberrechte der verwendeten Dokumente, Texte, Grafiken, Tondokumente und Videosequenzen zu beachten, von ihr selbst erstellte Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen. Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind! Das Copyright für von der Technischen Hochschule Mittelhessen veröffentlichte Dokumente bleibt alleine bei der Technische Hochschule Mittelhessen. Die Vervielfältigung der von der Technischen Hochschule Mittelhessen erstellten Dokumente und Publikationen ist ohne ausdrückliche Zustimmung der Technischen Hochschule Mittelhessen nicht gestattet. Das Layout der Homepage und die verwendeten Graphiken sowie sonstige Inhalte sind urheberrechtlich geschützt.",
    "Content4":"4. Datenschutz",
    "Contentparagraph4":"Sofern auf unserer Webseite die Möglichkeit zur Eingabe persönlicher oder geschäftlicher Daten wie Namen, E-Mail-Adressen, Anschriften usw. besteht, erfolgt die Preisgabe dieser Daten seitens des Nutzers auf freiwilliger Basis.",
    "Content5":"5. Rechtswirksamkeit dieses Haftungsausschlusses",
    "Contentparagraph5":"Dieser Haftungsausschluss ist als Teil des Internetangebots zu betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtsgrundlage nicht oder nicht vollständig entsprechen, bleiben die übrigen Teile der Internetpräsentation in ihrem Inhalt und in ihrer Gültigkeit unberührt."
  }
}
</i18n>

<style scoped>
</style>
