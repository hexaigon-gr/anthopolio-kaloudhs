export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anthopolio-kaloudhs.gr";

export const SEO = {
  siteName: "ΑΝΘΗ-ΦΥΤΑ KALOUDIS",
  titleSuffix: " | ΑΝΘΗ-ΦΥΤΑ KALOUDIS",
  defaultTitle: "ΑΝΘΗ-ΦΥΤΑ KALOUDIS | Κηποτεχνικές Εργασίες Αττική",
  defaultDescription:
    "Ανθοπωλείο & κηποτεχνικές υπηρεσίες στην Αττική: άνθη, φυτά, στολισμοί γάμων/βαφτίσεων, συντήρηση κήπου, πότισμα, κλαδέματα.",
  keywords: [
    "ανθοπωλείο",
    "κηποτεχνικές εργασίες",
    "άνθη φυτά",
    "στολισμοί γάμων",
    "στολισμοί βαφτίσεων",
    "συντήρηση κήπου",
    "αυτόματο πότισμα",
    "κλαδέματα",
    "σχεδιασμός κήπου",
    "βραχόκηποι",
    "flower shop Athens",
    "garden services Athens",
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
    titleEl: "Στολισμός Γάμου",
    titleEn: "Wedding Decoration Athens",
    descriptionEl:
      "Ανθοστολισμός εκκλησίας, νυφική ανθοδέσμη και στολισμός δεξίωσης γάμου στην Αττική. Μοναδικές συνθέσεις από το KALOUDIS.",
    descriptionEn:
      "Church floral arrangements, bridal bouquets, and wedding reception decoration in Attica. Unique compositions by KALOUDIS.",
    keywordsEl: [
      "στολισμός γάμου",
      "ανθοστολισμός εκκλησίας",
      "νυφική ανθοδέσμη",
      "στολισμός δεξίωσης γάμου",
      "νυφικά λουλούδια",
    ],
    keywordsEn: [
      "wedding decoration Athens",
      "church floral arrangements Athens",
      "bridal bouquet Athens",
      "wedding flowers Greece",
      "reception decoration Athens",
    ],
  },
  baptisms: {
    titleEl: "Στολισμός Βάπτισης",
    titleEn: "Baptism Decoration Athens",
    descriptionEl:
      "Στολισμός βάπτισης και λαμπάδα βαπτιστικών στην Αττική. Ανθοσυνθέσεις και διακόσμηση εκκλησίας από το KALOUDIS.",
    descriptionEn:
      "Baptism decoration and christening arrangements in Attica. Church floral design and styling by KALOUDIS.",
    keywordsEl: [
      "στολισμός βάπτισης",
      "ανθοστολισμός βάπτισης",
      "διακόσμηση εκκλησίας βάπτιση",
      "λαμπάδα βαπτιστικών",
    ],
    keywordsEn: [
      "baptism decoration Athens",
      "christening flowers Athens",
      "church decoration baptism",
      "baptism flowers Greece",
    ],
  },
  "church-icons": {
    titleEl: "Στολισμός Εικόνων & Εκκλησιών",
    titleEn: "Church & Icon Decoration Athens",
    descriptionEl:
      "Ανθοστολισμός εικόνων, εκκλησιών και ιερών ναών στην Αττική. Πανηγύρια, εορτές αγίων και θρησκευτικές τελετές από το KALOUDIS.",
    descriptionEn:
      "Church and religious icon floral decoration in Attica. Patron saint celebrations and religious ceremonies by KALOUDIS.",
    keywordsEl: [
      "στολισμός εικόνων",
      "στολισμός εκκλησίας",
      "ανθοστολισμός ναού",
      "πανηγύρι εκκλησίας",
      "εορτή αγίου στολισμός",
      "στολισμός εικόνας εκκλησίας",
    ],
    keywordsEn: [
      "church decoration Athens",
      "icon decoration Athens",
      "church floral arrangements Athens",
      "religious ceremony flowers Greece",
    ],
  },
  receptions: {
    titleEl: "Στολισμός Δεξιώσεων & Εκδηλώσεων",
    titleEn: "Reception & Event Decoration Athens",
    descriptionEl:
      "Στολισμός δεξιώσεων, εκδηλώσεων, πάρτι και ιδιωτικών γιορτών στην Αττική. Ανθοσυνθέσεις και διακόσμηση χώρων από το KALOUDIS.",
    descriptionEn:
      "Reception and event floral decoration in Attica. Flower arrangements and venue styling by KALOUDIS.",
    keywordsEl: [
      "στολισμός δεξίωσης",
      "στολισμός εκδήλωσης",
      "διακόσμηση πάρτι λουλούδια",
      "ανθοστολισμός εκδηλώσεων",
      "στολισμός αίθουσας δεξιώσεων",
    ],
    keywordsEn: [
      "reception decoration Athens",
      "event decoration Athens",
      "party flowers Athens",
      "venue floral styling Greece",
    ],
  },
  "commercial-spaces": {
    titleEl: "Στολισμός Επαγγελματικών Χώρων",
    titleEn: "Commercial Space Decoration Athens",
    descriptionEl:
      "Ανθοστολισμός και διακόσμηση επαγγελματικών χώρων, γραφείων, ξενοδοχείων και καταστημάτων στην Αττική. Εβδομαδιαίες συνθέσεις από το KALOUDIS.",
    descriptionEn:
      "Floral decoration for offices, hotels, shops and commercial spaces in Attica. Weekly arrangements by KALOUDIS.",
    keywordsEl: [
      "στολισμός επαγγελματικών χώρων",
      "λουλούδια γραφείου",
      "ανθοσυνθέσεις ξενοδοχείων",
      "διακόσμηση καταστημάτων λουλούδια",
      "εβδομαδιαίες ανθοσυνθέσεις",
    ],
    keywordsEn: [
      "commercial space flowers Athens",
      "office flowers Athens",
      "hotel floral arrangements Athens",
      "shop decoration flowers Greece",
    ],
  },
  "garden-design": {
    titleEl: "Σχεδιασμός Κήπου",
    titleEn: "Garden Design Athens",
    descriptionEl:
      "Σχεδιασμός και κατασκευή κήπου στην Αττική. Δημιουργικές λύσεις φυτοτεχνίας και αρχιτεκτονικής κήπων από το KALOUDIS.",
    descriptionEn:
      "Garden design and construction in Attica. Creative landscaping and garden architecture solutions by KALOUDIS.",
    keywordsEl: [
      "σχεδιασμός κήπου",
      "κατασκευή κήπου",
      "αρχιτεκτονική κήπων",
      "φυτοτεχνία",
      "κηποτεχνία",
    ],
    keywordsEn: [
      "garden design Athens",
      "landscaping Athens",
      "garden construction Athens",
      "garden architecture Greece",
    ],
  },
  maintenance: {
    titleEl: "Συντήρηση Κήπου",
    titleEn: "Garden Maintenance Athens",
    descriptionEl:
      "Συντήρηση κήπου και φροντίδα φυτών στην Αττική. Τακτική περιποίηση χώρων πρασίνου από το KALOUDIS.",
    descriptionEn:
      "Garden maintenance and plant care in Attica. Regular green space upkeep by KALOUDIS.",
    keywordsEl: [
      "συντήρηση κήπου",
      "φροντίδα φυτών",
      "περιποίηση κήπου",
      "κηπουρικές εργασίες",
      "γκαζόν",
    ],
    keywordsEn: [
      "garden maintenance Athens",
      "plant care Athens",
      "lawn care Athens",
      "garden upkeep Greece",
    ],
  },
  irrigation: {
    titleEl: "Αυτόματο Πότισμα",
    titleEn: "Automatic Irrigation Athens",
    descriptionEl:
      "Εγκατάσταση αυτόματου ποτίσματος στην Αττική. Συστήματα άρδευσης κήπου και μπαλκονιού από το KALOUDIS.",
    descriptionEn:
      "Automatic irrigation system installation in Attica. Garden and balcony watering systems by KALOUDIS.",
    keywordsEl: [
      "αυτόματο πότισμα",
      "σύστημα άρδευσης",
      "εγκατάσταση ποτίσματος",
      "πότισμα κήπου",
      "στάγδην άρδευση",
    ],
    keywordsEn: [
      "automatic irrigation Athens",
      "sprinkler system Athens",
      "garden watering Athens",
      "drip irrigation Greece",
    ],
  },
  pruning: {
    titleEl: "Κλαδέματα Δέντρων",
    titleEn: "Tree Pruning Athens",
    descriptionEl:
      "Κλαδέματα δέντρων και θάμνων στην Αττική. Επαγγελματική κλαδευτική φροντίδα από το KALOUDIS.",
    descriptionEn:
      "Professional tree and shrub pruning in Attica. Expert trimming and shaping services by KALOUDIS.",
    keywordsEl: [
      "κλαδέματα δέντρων",
      "κλάδεμα θάμνων",
      "κλαδευτική",
      "φροντίδα δέντρων",
      "κλαδέματα ελιάς",
    ],
    keywordsEn: [
      "tree pruning Athens",
      "shrub trimming Athens",
      "tree care Athens",
      "pruning services Greece",
    ],
  },
  "tall-trees": {
    titleEl: "Κοπή Ψηλών Δέντρων",
    titleEn: "Tall Tree Removal Athens",
    descriptionEl:
      "Κοπή και απομάκρυνση ψηλών δέντρων στην Αττική. Ασφαλής υλοτομία με εξειδικευμένο συνεργείο KALOUDIS.",
    descriptionEn:
      "Tall tree cutting and removal in Attica. Safe felling with specialized crew by KALOUDIS.",
    keywordsEl: [
      "κοπή ψηλών δέντρων",
      "υλοτομία",
      "αφαίρεση δέντρων",
      "κοπή επικίνδυνων δέντρων",
      "δενδροκομία",
    ],
    keywordsEn: [
      "tall tree removal Athens",
      "tree felling Athens",
      "dangerous tree cutting Athens",
      "tree removal services Greece",
    ],
  },
  "land-clearing": {
    titleEl: "Καθαρισμός Οικοπέδων",
    titleEn: "Land Clearing Athens",
    descriptionEl:
      "Καθαρισμός οικοπέδων και αποψίλωση χώρων στην Αττική. Γρήγορη αποκομιδή κλαδιών και σκουπιδιών από το KALOUDIS.",
    descriptionEn:
      "Land clearing and lot cleanup in Attica. Fast debris and brush removal by KALOUDIS.",
    keywordsEl: [
      "καθαρισμός οικοπέδων",
      "αποψίλωση χώρων",
      "αποκομιδή κλαδιών",
      "καθαρισμός αγροτεμαχίου",
      "αντιπυρική προστασία",
    ],
    keywordsEn: [
      "land clearing Athens",
      "lot cleanup Athens",
      "brush removal Athens",
      "fire prevention clearing Greece",
    ],
  },
  "pest-control": {
    titleEl: "Ψεκασμοί Φυτοπροστασίας",
    titleEn: "Plant Pest Control Athens",
    descriptionEl:
      "Ψεκασμοί φυτοπροστασίας και καταπολέμηση ασθενειών φυτών στην Αττική. Εξειδικευμένες λύσεις από το KALOUDIS.",
    descriptionEn:
      "Plant pest control spraying and disease treatment in Attica. Specialized solutions by KALOUDIS.",
    keywordsEl: [
      "ψεκασμοί φυτοπροστασίας",
      "καταπολέμηση εντόμων φυτών",
      "ασθένειες φυτών",
      "ψεκασμός κήπου",
      "φυτοπροστασία",
    ],
    keywordsEn: [
      "pest control Athens",
      "plant disease treatment Athens",
      "garden spraying Athens",
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
    titleEl: "Άνθη & Φυτά",
    titleEn: "Flowers & Plants Athens",
    descriptionEl:
      "Φρέσκα λουλούδια, φυτά εσωτερικού και εξωτερικού χώρου, σπάνια είδη και σαρκοφάγα φυτά στην Αττική. Ανθοπωλείο KALOUDIS.",
    descriptionEn:
      "Fresh flowers, indoor and outdoor plants, rare species and carnivorous plants in Attica. KALOUDIS flower shop.",
    keywordsEl: [
      "άνθη",
      "φυτά εσωτερικού χώρου",
      "φυτά εξωτερικού χώρου",
      "ανθοπωλείο",
      "σπάνια φυτά",
      "σαρκοφάγα φυτά",
      "λουλούδια",
    ],
    keywordsEn: [
      "flowers Athens",
      "indoor plants Athens",
      "outdoor plants Athens",
      "flower shop Athens",
      "rare plants Greece",
      "carnivorous plants Athens",
    ],
  },
  soil: {
    titleEl: "Χώματα & Υποστρώματα",
    titleEn: "Soil & Substrates Athens",
    descriptionEl:
      "Εξειδικευμένα χώματα και υποστρώματα για κάθε τύπο φυτού στην Αττική. Χώμα κήπου, γλάστρας και φυτωρίου από το KALOUDIS.",
    descriptionEn:
      "Specialized soils and substrates for every plant type in Attica. Garden, pot, and nursery soil by KALOUDIS.",
    keywordsEl: [
      "χώματα",
      "υποστρώματα φυτών",
      "χώμα κήπου",
      "χώμα γλάστρας",
      "τύρφη",
    ],
    keywordsEn: [
      "soil Athens",
      "plant substrates Athens",
      "garden soil Athens",
      "potting mix Greece",
    ],
  },
  fertilizers: {
    titleEl: "Λιπάσματα",
    titleEn: "Fertilizers Athens",
    descriptionEl:
      "Ποιοτικά λιπάσματα για υγιή ανάπτυξη και πλούσια ανθοφορία στην Αττική. Οργανικά και χημικά λιπάσματα από το KALOUDIS.",
    descriptionEn:
      "Quality fertilizers for healthy growth and rich blooming in Attica. Organic and chemical fertilizers by KALOUDIS.",
    keywordsEl: [
      "λιπάσματα",
      "οργανικά λιπάσματα",
      "λίπασμα φυτών",
      "λίπασμα κήπου",
      "θρεπτικά φυτών",
    ],
    keywordsEn: [
      "fertilizers Athens",
      "organic fertilizer Athens",
      "plant food Athens",
      "garden fertilizer Greece",
    ],
  },
  pots: {
    titleEl: "Γλάστρες",
    titleEn: "Pots & Planters Athens",
    descriptionEl:
      "Γλάστρες σε κάθε μέγεθος και στυλ στην Αττική. Κεραμικές, πλαστικές και διακοσμητικές γλάστρες από το KALOUDIS.",
    descriptionEn:
      "Pots and planters in every size and style in Attica. Ceramic, plastic, and decorative planters by KALOUDIS.",
    keywordsEl: [
      "γλάστρες",
      "κεραμικές γλάστρες",
      "διακοσμητικές γλάστρες",
      "γλάστρες μπαλκονιού",
      "ζαρντινιέρες",
    ],
    keywordsEn: [
      "pots Athens",
      "ceramic planters Athens",
      "decorative pots Athens",
      "planters Greece",
    ],
  },
  "pest-products": {
    titleEl: "Απεντόμωση & Απαλλαγή Τρωκτικών",
    titleEn: "Pest Control Products",
    descriptionEl:
      "Ποντικοφάρμακα, εντομοκτόνα, απώθηση φιδιών και λύσεις απαλλαγής από κατσαρίδες, μυρμήγκια και τρωκτικά. KALOUDIS.",
    descriptionEn:
      "Mouse poison, insecticides, snake repellent and solutions for cockroaches, ants and rodents. KALOUDIS.",
    keywordsEl: [
      "ποντικοφάρμακα",
      "εντομοκτόνα",
      "απεντόμωση",
      "κατσαρίδες",
      "μυρμήγκια",
      "απώθηση φιδιών",
      "τρωκτικοκτονία",
    ],
    keywordsEn: [
      "mouse poison",
      "insecticides",
      "pest control products",
      "cockroach killer",
      "ant poison",
      "snake repellent",
      "rodent control",
    ],
  },
};
