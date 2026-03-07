export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anthopolio-kaloudhs.gr";

export const SEO = {
  siteName: "ΑΝΘΗ-ΦΥΤΑ KALOUDIS",
  titleSuffix: " | ΑΝΘΗ-ΦΥΤΑ KALOUDIS",
  defaultTitle: "ΑΝΘΗ-ΦΥΤΑ KALOUDIS | Κηποτεχνικές Εργασίες Ηλιούπολη",
  defaultDescription:
    "Ανθοπωλείο και κηποτεχνικές υπηρεσίες στην Ηλιούπολη. Άνθη, φυτά, στολισμοί γάμων και βαφτίσεων, συντηρήσεις κήπων, αυτόματα ποτίσματα, κλαδέματα και σχεδιασμός κήπου.",
  keywords: [
    "ανθοπωλείο Ηλιούπολη",
    "κηποτεχνικές εργασίες",
    "άνθη φυτά",
    "στολισμοί γάμων",
    "στολισμοί βαφτίσεων",
    "συντήρηση κήπου",
    "αυτόματο πότισμα",
    "κλαδέματα",
    "σχεδιασμός κήπου",
    "βραχόκηποι",
    "flower shop Ilioupoli",
    "garden services Athens",
    "ανθοπωλείο Αργυρούπολη",
    "στολισμός γάμου Νότια Προάστια",
    "garden design south Athens",
    "wedding flowers Athens",
    "KALOUDIS",
  ],
} as const;

export const SERVICE_SEO: Record<
  string,
  {
    titleEl: string;
    titleEn: string;
    descriptionEl: string;
    descriptionEn: string;
    keywordsEl: string[];
    keywordsEn: string[];
  }
> = {
  weddings: {
    titleEl: "Στολισμός Γάμου Ηλιούπολη",
    titleEn: "Wedding Decoration Ilioupoli Athens",
    descriptionEl:
      "Ανθοστολισμός εκκλησίας, νυφική ανθοδέσμη και στολισμός δεξίωσης γάμου στην Ηλιούπολη και τα Νότια Προάστια. Μοναδικές συνθέσεις από το KALOUDIS.",
    descriptionEn:
      "Church floral arrangements, bridal bouquets, and wedding reception decoration in Ilioupoli and south Athens. Unique compositions by KALOUDIS.",
    keywordsEl: [
      "στολισμός γάμου Ηλιούπολη",
      "ανθοστολισμός εκκλησίας",
      "νυφική ανθοδέσμη",
      "στολισμός δεξίωσης γάμου",
      "γάμος Νότια Προάστια",
      "νυφικά λουλούδια Ηλιούπολη",
    ],
    keywordsEn: [
      "wedding decoration Ilioupoli",
      "church floral arrangements Athens",
      "bridal bouquet south Athens",
      "wedding flowers Greece",
      "reception decoration Ilioupoli",
    ],
  },
  baptisms: {
    titleEl: "Στολισμός Βάπτισης Ηλιούπολη",
    titleEn: "Baptism Decoration Ilioupoli Athens",
    descriptionEl:
      "Στολισμός βάπτισης και λαμπάδα βαπτιστικών στην Ηλιούπολη και τα Νότια Προάστια. Ανθοσυνθέσεις και διακόσμηση εκκλησίας από το KALOUDIS.",
    descriptionEn:
      "Baptism decoration and christening arrangements in Ilioupoli and south Athens. Church floral design and styling by KALOUDIS.",
    keywordsEl: [
      "στολισμός βάπτισης Ηλιούπολη",
      "ανθοστολισμός βάπτισης",
      "διακόσμηση εκκλησίας βάπτιση",
      "βάπτιση Νότια Προάστια",
      "λαμπάδα βαπτιστικών",
    ],
    keywordsEn: [
      "baptism decoration Ilioupoli",
      "christening flowers Athens",
      "church decoration baptism",
      "baptism south Athens",
    ],
  },
  "garden-design": {
    titleEl: "Σχεδιασμός Κήπου Ηλιούπολη",
    titleEn: "Garden Design Ilioupoli Athens",
    descriptionEl:
      "Σχεδιασμός και κατασκευή κήπου στην Ηλιούπολη και τα Νότια Προάστια. Δημιουργικές λύσεις φυτοτεχνίας και αρχιτεκτονικής κήπων από το KALOUDIS.",
    descriptionEn:
      "Garden design and construction in Ilioupoli and south Athens. Creative landscaping and garden architecture solutions by KALOUDIS.",
    keywordsEl: [
      "σχεδιασμός κήπου Ηλιούπολη",
      "κατασκευή κήπου",
      "αρχιτεκτονική κήπων",
      "φυτοτεχνία Νότια Προάστια",
      "κηποτεχνία Ηλιούπολη",
    ],
    keywordsEn: [
      "garden design Ilioupoli",
      "landscaping south Athens",
      "garden construction Athens",
      "garden architecture Greece",
    ],
  },
  maintenance: {
    titleEl: "Συντήρηση Κήπου Ηλιούπολη",
    titleEn: "Garden Maintenance Ilioupoli Athens",
    descriptionEl:
      "Συντήρηση κήπου και φροντίδα φυτών στην Ηλιούπολη και τα Νότια Προάστια. Τακτική περιποίηση χώρων πρασίνου από το KALOUDIS.",
    descriptionEn:
      "Garden maintenance and plant care in Ilioupoli and south Athens. Regular green space upkeep by KALOUDIS.",
    keywordsEl: [
      "συντήρηση κήπου Ηλιούπολη",
      "φροντίδα φυτών",
      "περιποίηση κήπου Νότια Προάστια",
      "κηπουρικές εργασίες",
      "γκαζόν Ηλιούπολη",
    ],
    keywordsEn: [
      "garden maintenance Ilioupoli",
      "plant care south Athens",
      "lawn care Athens",
      "garden upkeep Greece",
    ],
  },
  irrigation: {
    titleEl: "Αυτόματο Πότισμα Ηλιούπολη",
    titleEn: "Automatic Irrigation Ilioupoli Athens",
    descriptionEl:
      "Εγκατάσταση αυτόματου ποτίσματος στην Ηλιούπολη και τα Νότια Προάστια. Συστήματα άρδευσης κήπου και μπαλκονιού από το KALOUDIS.",
    descriptionEn:
      "Automatic irrigation system installation in Ilioupoli and south Athens. Garden and balcony watering systems by KALOUDIS.",
    keywordsEl: [
      "αυτόματο πότισμα Ηλιούπολη",
      "σύστημα άρδευσης",
      "εγκατάσταση ποτίσματος Νότια Προάστια",
      "πότισμα κήπου",
      "στάγδην άρδευση",
    ],
    keywordsEn: [
      "automatic irrigation Ilioupoli",
      "sprinkler system Athens",
      "garden watering south Athens",
      "drip irrigation Greece",
    ],
  },
  pruning: {
    titleEl: "Κλαδέματα Δέντρων Ηλιούπολη",
    titleEn: "Tree Pruning Ilioupoli Athens",
    descriptionEl:
      "Κλαδέματα δέντρων και θάμνων στην Ηλιούπολη και τα Νότια Προάστια. Επαγγελματική κλαδευτική φροντίδα από το KALOUDIS.",
    descriptionEn:
      "Professional tree and shrub pruning in Ilioupoli and south Athens. Expert trimming and shaping services by KALOUDIS.",
    keywordsEl: [
      "κλαδέματα δέντρων Ηλιούπολη",
      "κλάδεμα θάμνων",
      "κλαδευτική Νότια Προάστια",
      "φροντίδα δέντρων",
      "κλαδέματα ελιάς",
    ],
    keywordsEn: [
      "tree pruning Ilioupoli",
      "shrub trimming Athens",
      "tree care south Athens",
      "pruning services Greece",
    ],
  },
  "tall-trees": {
    titleEl: "Κοπή Ψηλών Δέντρων Ηλιούπολη",
    titleEn: "Tall Tree Removal Ilioupoli Athens",
    descriptionEl:
      "Κοπή και απομάκρυνση ψηλών δέντρων στην Ηλιούπολη και τα Νότια Προάστια. Ασφαλής υλοτομία με εξειδικευμένο συνεργείο KALOUDIS.",
    descriptionEn:
      "Tall tree cutting and removal in Ilioupoli and south Athens. Safe felling with specialized crew by KALOUDIS.",
    keywordsEl: [
      "κοπή ψηλών δέντρων Ηλιούπολη",
      "υλοτομία Νότια Προάστια",
      "αφαίρεση δέντρων",
      "κοπή επικίνδυνων δέντρων",
      "δενδροκομία Ηλιούπολη",
    ],
    keywordsEn: [
      "tall tree removal Ilioupoli",
      "tree felling Athens",
      "dangerous tree cutting south Athens",
      "tree removal services Greece",
    ],
  },
  "rock-gardens": {
    titleEl: "Βραχόκηποι Ηλιούπολη",
    titleEn: "Rock Gardens Ilioupoli Athens",
    descriptionEl:
      "Κατασκευή βραχόκηπων και διακοσμητικών κήπων με πέτρα στην Ηλιούπολη και τα Νότια Προάστια. Μοναδικός σχεδιασμός από το KALOUDIS.",
    descriptionEn:
      "Rock garden design and construction in Ilioupoli and south Athens. Unique stone landscaping by KALOUDIS.",
    keywordsEl: [
      "βραχόκηποι Ηλιούπολη",
      "κατασκευή βραχόκηπου",
      "κήπος με πέτρα Νότια Προάστια",
      "διακοσμητικός κήπος",
      "βραχόκηπος σχεδιασμός",
    ],
    keywordsEn: [
      "rock garden Ilioupoli",
      "stone garden Athens",
      "rock landscaping south Athens",
      "decorative garden Greece",
    ],
  },
  "land-clearing": {
    titleEl: "Καθαρισμός Οικοπέδων Ηλιούπολη",
    titleEn: "Land Clearing Ilioupoli Athens",
    descriptionEl:
      "Καθαρισμός οικοπέδων και αποψίλωση χώρων στην Ηλιούπολη και τα Νότια Προάστια. Γρήγορη αποκομιδή κλαδιών και σκουπιδιών από το KALOUDIS.",
    descriptionEn:
      "Land clearing and lot cleanup in Ilioupoli and south Athens. Fast debris and brush removal by KALOUDIS.",
    keywordsEl: [
      "καθαρισμός οικοπέδων Ηλιούπολη",
      "αποψίλωση χώρων",
      "αποκομιδή κλαδιών Νότια Προάστια",
      "καθαρισμός αγροτεμαχίου",
      "αντιπυρική προστασία",
    ],
    keywordsEn: [
      "land clearing Ilioupoli",
      "lot cleanup Athens",
      "brush removal south Athens",
      "fire prevention clearing Greece",
    ],
  },
  "pest-control": {
    titleEl: "Ψεκασμοί Φυτοπροστασίας Ηλιούπολη",
    titleEn: "Plant Pest Control Ilioupoli Athens",
    descriptionEl:
      "Ψεκασμοί φυτοπροστασίας και καταπολέμηση ασθενειών φυτών στην Ηλιούπολη και τα Νότια Προάστια. Εξειδικευμένες λύσεις από το KALOUDIS.",
    descriptionEn:
      "Plant pest control spraying and disease treatment in Ilioupoli and south Athens. Specialized solutions by KALOUDIS.",
    keywordsEl: [
      "ψεκασμοί φυτοπροστασίας Ηλιούπολη",
      "καταπολέμηση εντόμων φυτών",
      "ασθένειες φυτών Νότια Προάστια",
      "ψεκασμός κήπου",
      "φυτοπροστασία Ηλιούπολη",
    ],
    keywordsEn: [
      "pest control Ilioupoli",
      "plant disease treatment Athens",
      "garden spraying south Athens",
      "plant protection Greece",
    ],
  },
};

export const PRODUCT_SEO: Record<
  string,
  {
    titleEl: string;
    titleEn: string;
    descriptionEl: string;
    descriptionEn: string;
    keywordsEl: string[];
    keywordsEn: string[];
  }
> = {
  flowers: {
    titleEl: "Άνθη & Φυτά Ηλιούπολη",
    titleEn: "Flowers & Plants Ilioupoli Athens",
    descriptionEl:
      "Φρέσκα λουλούδια, φυτά εσωτερικού και εξωτερικού χώρου, σπάνια είδη και σαρκοφάγα φυτά στην Ηλιούπολη. Ανθοπωλείο KALOUDIS.",
    descriptionEn:
      "Fresh flowers, indoor and outdoor plants, rare species and carnivorous plants in Ilioupoli. KALOUDIS flower shop.",
    keywordsEl: [
      "άνθη Ηλιούπολη",
      "φυτά εσωτερικού χώρου",
      "φυτά εξωτερικού χώρου",
      "ανθοπωλείο Ηλιούπολη",
      "σπάνια φυτά",
      "σαρκοφάγα φυτά",
      "λουλούδια Νότια Προάστια",
    ],
    keywordsEn: [
      "flowers Ilioupoli",
      "indoor plants Athens",
      "outdoor plants south Athens",
      "flower shop Ilioupoli",
      "rare plants Greece",
      "carnivorous plants Athens",
    ],
  },
  soil: {
    titleEl: "Χώματα & Υποστρώματα Ηλιούπολη",
    titleEn: "Soil & Substrates Ilioupoli Athens",
    descriptionEl:
      "Εξειδικευμένα χώματα και υποστρώματα για κάθε τύπο φυτού στην Ηλιούπολη. Χώμα κήπου, γλάστρας και φυτωρίου από το KALOUDIS.",
    descriptionEn:
      "Specialized soils and substrates for every plant type in Ilioupoli. Garden, pot, and nursery soil by KALOUDIS.",
    keywordsEl: [
      "χώματα Ηλιούπολη",
      "υποστρώματα φυτών",
      "χώμα κήπου",
      "χώμα γλάστρας",
      "τύρφη Νότια Προάστια",
    ],
    keywordsEn: [
      "soil Ilioupoli",
      "plant substrates Athens",
      "garden soil south Athens",
      "potting mix Greece",
    ],
  },
  fertilizers: {
    titleEl: "Λιπάσματα Ηλιούπολη",
    titleEn: "Fertilizers Ilioupoli Athens",
    descriptionEl:
      "Ποιοτικά λιπάσματα για υγιή ανάπτυξη και πλούσια ανθοφορία στην Ηλιούπολη. Οργανικά και χημικά λιπάσματα από το KALOUDIS.",
    descriptionEn:
      "Quality fertilizers for healthy growth and rich blooming in Ilioupoli. Organic and chemical fertilizers by KALOUDIS.",
    keywordsEl: [
      "λιπάσματα Ηλιούπολη",
      "οργανικά λιπάσματα",
      "λίπασμα φυτών",
      "λίπασμα κήπου Νότια Προάστια",
      "θρεπτικά φυτών",
    ],
    keywordsEn: [
      "fertilizers Ilioupoli",
      "organic fertilizer Athens",
      "plant food south Athens",
      "garden fertilizer Greece",
    ],
  },
  pots: {
    titleEl: "Γλάστρες Ηλιούπολη",
    titleEn: "Pots & Planters Ilioupoli Athens",
    descriptionEl:
      "Γλάστρες σε κάθε μέγεθος και στυλ στην Ηλιούπολη. Κεραμικές, πλαστικές και διακοσμητικές γλάστρες από το KALOUDIS.",
    descriptionEn:
      "Pots and planters in every size and style in Ilioupoli. Ceramic, plastic, and decorative planters by KALOUDIS.",
    keywordsEl: [
      "γλάστρες Ηλιούπολη",
      "κεραμικές γλάστρες",
      "διακοσμητικές γλάστρες",
      "γλάστρες μπαλκονιού Νότια Προάστια",
      "ζαρντινιέρες",
    ],
    keywordsEn: [
      "pots Ilioupoli",
      "ceramic planters Athens",
      "decorative pots south Athens",
      "planters Greece",
    ],
  },
};
