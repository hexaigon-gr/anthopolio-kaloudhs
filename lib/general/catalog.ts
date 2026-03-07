export interface CatalogItem {
  nameEl: string;
  nameEn: string;
  price: number;
  size?: string;
}

export interface CatalogCategory {
  key: string;
  items: CatalogItem[];
}

export const CATALOG: CatalogCategory[] = [
  {
    key: "plants",
    items: [
      { nameEl: "Ζάμια σε κασπώ", nameEn: "Zamia in pot", price: 20 },
      {
        nameEl: "Ορχιδέα φαλαίνοψις άσπρη & μωβ σε πήλινο κασπώ",
        nameEn: "Phalaenopsis orchid white & purple in clay pot",
        price: 30,
      },
      {
        nameEl: "Σανσιβέρια πλαστική γλάστρα",
        nameEn: "Sansevieria in plastic pot",
        price: 15,
        size: "40cm",
      },
      {
        nameEl: "Σανσιβέρια σε πήλινη γλάστρα",
        nameEn: "Sansevieria in clay pot",
        price: 28,
      },
      {
        nameEl: "Σανσιβέρια κυλινδρική βαμμένη σε πήλινο κασπώ",
        nameEn: "Cylindrical painted sansevieria in clay pot",
        price: 20,
      },
      {
        nameEl: "Καλαγχόη σε κασπώ",
        nameEn: "Kalanchoe in pot",
        price: 12,
      },
      {
        nameEl: "Τριαντάφυλλο εισαγωγής κόκκινο",
        nameEn: "Imported red rose",
        price: 6,
      },
      {
        nameEl: "Τριαντάφυλλο εισαγωγής φούξια",
        nameEn: "Imported fuchsia rose",
        price: 6,
      },
      {
        nameEl: "Τριαντάφυλλο εισαγωγής λευκό",
        nameEn: "Imported white rose",
        price: 6,
      },
      {
        nameEl: "Τριαντάφυλλο εισαγωγής μπλε",
        nameEn: "Imported blue rose",
        price: 6,
      },
      { nameEl: "Τουλίπες", nameEn: "Tulips", price: 2.5 },
      {
        nameEl: "Χρυσάνθεμο εισαγωγής",
        nameEn: "Imported chrysanthemum",
        price: 2.5,
      },
      {
        nameEl: "Λίλιουμ οριεντάλ ροζ",
        nameEn: "Pink oriental lily",
        price: 6.5,
      },
      { nameEl: "Γυψοφίλη", nameEn: "Gypsophila", price: 1.5 },
      { nameEl: "Ζέρμπερα", nameEn: "Gerbera", price: 2 },
    ],
  },
  {
    key: "foreverRoses",
    items: [
      {
        nameEl: "Forever rose κόκκινο σε καμπάνα",
        nameEn: "Red forever rose in bell jar",
        price: 25,
        size: "12cm",
      },
      {
        nameEl: "Forever rose μπλε σε καμπάνα",
        nameEn: "Blue forever rose in bell jar",
        price: 25,
        size: "12cm",
      },
      {
        nameEl: "Forever rose κόκκινο ολόκληρο σε διάφανο κουτί",
        nameEn: "Red forever rose in transparent box",
        price: 26,
      },
    ],
  },
  {
    key: "roseBears",
    items: [
      {
        nameEl: "Rose bear κόκκινο σε διάφανη συσκευασία",
        nameEn: "Red rose bear in transparent packaging",
        price: 35,
        size: "22x22x26cm",
      },
      {
        nameEl: "Rose bear κόκκινη καρδιά",
        nameEn: "Red heart rose bear",
        price: 65,
        size: "40cm",
      },
      {
        nameEl: "Rose bear κόκκινη καρδιά",
        nameEn: "Red heart rose bear",
        price: 35,
        size: "23cm",
      },
      {
        nameEl: "Forever rose κόκκινη καρδιά",
        nameEn: "Red heart forever rose",
        price: 50,
        size: "40cm",
      },
    ],
  },
  {
    key: "plush",
    items: [
      {
        nameEl: "Αρκουδάκι κόκκινο με καρδιά",
        nameEn: "Red teddy bear with heart",
        price: 11,
        size: "26cm",
      },
      {
        nameEl: "Αρκουδάκι λευκό με καρδιά",
        nameEn: "White teddy bear with heart",
        price: 11,
        size: "26cm",
      },
      {
        nameEl: "Αρκουδάκι κόκκινο με καρδιά",
        nameEn: "Red teddy bear with heart",
        price: 7,
        size: "16cm",
      },
    ],
  },
];
