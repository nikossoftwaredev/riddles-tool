import { sanitizeDiacritics } from "greek-utils";
import { LocationInfo } from "types/search";

export const ODONIMIO: LocationInfo[] = [
  { street: "Αναγνώστου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Σκιές & Γέλια", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κορδέλας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Αρετής", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Τόλμη & Γοητεία", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Πορτοφόλι", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Πάγου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Καλούμπα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Καραγκιόζη", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Ελ. Βενιζέλου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μπαρμπαρίγου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Νταρζάνου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κάλτσας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Βρεττάκου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Άρτας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Ρόμπας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Αγίου Φανουρίου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Νίλσεν", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κρεμμυδίου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Ντολμαδάκια", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Αφίσα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Γεμιστά", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Νερού", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Τσουβέλα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Τογιότα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Ποντίκι", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μπούτιας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Ντέρμπι", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Επισκοπή", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μιλνότα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Ντάλγουιτς", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Βίντατζ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Παρθένου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Αντετοκούνμπο", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μύγας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Απρίλη", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Γατόσκυλου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κράκεν", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μπέλντουμ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Καραμανλή", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Χαϊδεμένου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κλαρίνου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Άιρον μαν", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Γρίφου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Βλαχουένια", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Καραόκε", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μαρίζας Κοχ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Λούτσα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Ντεκαπάζ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μάρκου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Χόμπιτ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Αισθηματίες", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κβάι", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Πανεπιστημίου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Ραχούλλας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Uomo", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Επίκουρου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Νούλη", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κεμπάπ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Πρωταπριλιάς", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Λάμπας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Επανάστασης", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Τσαρούχη", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Αρθούρου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Σάμσουνγκ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Καπετάνιου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Καφενείοτε", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Τζόκερ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Λόκι", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Τσελεμεντέ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Σουσάμι", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Αυτοί Είστε", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Βίντεο", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Παρασκευάς", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Τεκίλας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Δέσποινας Τρίγκας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Φραγκιαδάκη", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Αγίων Τόπων", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κεφαλληνίας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μπλουζάκι", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Άντε γεια", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Γύρο Απ΄ολα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Σκορπιού", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Χατζηφραγκέτα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Στυλό", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Αστερίξ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Πορτογαλίας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Τρίποδου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Πιτσικόκος", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κωστάκη", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μαραντόνα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Καντίνα Είχαμε", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μαρμαροτούρη", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κ.Κ.Θ. 2001", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μείον", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μαλτέζου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Τα λιγουρεύεστε", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Πάτρα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Αλκατράζ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Σκάρλετ Γουίτς", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κόνκορντ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κολοκοτρώνη", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Χαρταετού", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μουσολίνι", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Χάρτη", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Στάλιν", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Τσιριμπίμ Τσιριμπόμ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "ΠΑΣΟΚ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Αμαρουσίου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Πέππα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Γαλανάδου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Δίκανο", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κομήτη", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Σταλόνε", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Γκιουλέκα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Ημερολογίου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Τίγρη", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μπουμπουλίνας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Μπέντζαμιν Γιόβετ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Βίβλου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Σφραγίδας", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Παντόφλα", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Κάρμεν", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Σμάιλι", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Βίκος", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "RTMS", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Υδροχόου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Παπία", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Βέγγου", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Επιτροπής", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Βίλατζ", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "Υμηττού", town: "ΟΔΟΝΥΜΙΟ" },
  { street: "1930", town: "ΟΔΟΝΥΜΙΟ" }
].map(
  (s): LocationInfo => ({
    town: s.town as LocationInfo["town"],
    street: sanitizeDiacritics(s.street.toUpperCase())
  })
);
