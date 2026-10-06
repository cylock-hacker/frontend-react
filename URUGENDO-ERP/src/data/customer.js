const Customers = [
  {
    id: "CUS-1001",
    name: "Jean Claude Niyonzima",
    phone: "+250 788 245 631",
    email: "jean.niyonzima@example.com",
    type: "Individual",
    location: "Kigali",
    totalOrders: 3,
    totalSpent: 157500000,
    lastOrderDate: "2026-10-05",
    status: "Active"
  },

  {
    id: "CUS-1002",
    name: "Alice Uwase",
    phone: "+250 783 512 904",
    email: "alice.uwase@example.com",
    type: "Individual",
    location: "Kigali",
    totalOrders: 5,
    totalSpent: 1245000,
    lastOrderDate: "2026-10-02",
    status: "Active"
  },

  {
    id: "CUS-1003",
    name: "Mugisha Motors Ltd",
    phone: "+250 788 631 420",
    email: "info@mugishamotors.example",
    type: "Business",
    location: "Kigali",
    totalOrders: 18,
    totalSpent: 48600000,
    lastOrderDate: "2026-09-30",
    status: "Active"
  },

  {
    id: "CUS-1004",
    name: "Samuel Habimana",
    phone: "+250 782 194 735",
    email: "samuel.habimana@example.com",
    type: "Individual",
    location: "Huye",
    totalOrders: 2,
    totalSpent: 62500000,
    lastOrderDate: "2026-10-01",
    status: "Active"
  },

  {
    id: "CUS-1005",
    name: "Kigali Auto Service",
    phone: "+250 788 452 817",
    email: "kigaliauto@example.com",
    type: "Business",
    location: "Kicukiro",
    totalOrders: 24,
    totalSpent: 15850000,
    lastOrderDate: "2026-10-01",
    status: "Active"
  },

  {
    id: "CUS-1006",
    name: "Fabrice Tuyishime",
    phone: "+250 783 741 625",
    email: "fabrice.tuyishime@example.com",
    type: "Individual",
    location: "Gasabo",
    totalOrders: 4,
    totalSpent: 58250000,
    lastOrderDate: "2026-10-02",
    status: "Active"
  },

  {
    id: "CUS-1007",
    name: "Aline Mukamana",
    phone: "+250 788 326 491",
    email: "aline.mukamana@example.com",
    type: "Individual",
    location: "Nyarugenge",
    totalOrders: 6,
    totalSpent: 2380000,
    lastOrderDate: "2026-10-02",
    status: "Active"
  },

  {
    id: "CUS-1008",
    name: "Prime Logistics Ltd",
    phone: "+250 788 903 214",
    email: "operations@primelogistics.example",
    type: "Business",
    location: "Kigali",
    totalOrders: 15,
    totalSpent: 186500000,
    lastOrderDate: "2026-10-03",
    status: "Active"
  },

  {
    id: "CUS-1009",
    name: "Emmanuel Bizimana",
    phone: "+250 783 624 518",
    email: "emmanuel.bizimana@example.com",
    type: "Individual",
    location: "Musanze",
    totalOrders: 3,
    totalSpent: 945000,
    lastOrderDate: "2026-10-03",
    status: "Active"
  },

  {
    id: "CUS-1010",
    name: "East Africa Construction",
    phone: "+250 788 517 302",
    email: "procurement@eaconstruction.example",
    type: "Business",
    location: "Kigali",
    totalOrders: 21,
    totalSpent: 245000000,
    lastOrderDate: "2026-10-04",
    status: "Active"
  },

  {
    id: "CUS-1011",
    name: "AutoFix Garage",
    phone: "+250 782 845 190",
    email: "autofixgarage@example.com",
    type: "Business",
    location: "Remera",
    totalOrders: 31,
    totalSpent: 22450000,
    lastOrderDate: "2026-10-04",
    status: "Active"
  },

  {
    id: "CUS-1012",
    name: "Diane Ingabire",
    phone: "+250 788 193 746",
    email: "diane.ingabire@example.com",
    type: "Individual",
    location: "Kigali",
    totalOrders: 7,
    totalSpent: 74500000,
    lastOrderDate: "2026-10-05",
    status: "Active"
  },

  {
    id: "CUS-1013",
    name: "Kigali Taxi Cooperative",
    phone: "+250 783 405 219",
    email: "info@kigali-taxi.example",
    type: "Business",
    location: "Kigali",
    totalOrders: 28,
    totalSpent: 78500000,
    lastOrderDate: "2026-10-05",
    status: "Active"
  },

  {
    id: "CUS-1014",
    name: "Patrick Rukundo",
    phone: "+250 788 724 631",
    email: "patrick.rukundo@example.com",
    type: "Individual",
    location: "Kigali",
    totalOrders: 2,
    totalSpent: 920000,
    lastOrderDate: "2026-10-05",
    status: "Active"
  },

  {
    id: "CUS-1015",
    name: "Rwanda Mining Services",
    phone: "+250 782 631 904",
    email: "fleet@rwandamining.example",
    type: "Business",
    location: "Kigali",
    totalOrders: 12,
    totalSpent: 286000000,
    lastOrderDate: "2026-10-06",
    status: "Active"
  },

  {
    id: "CUS-1016",
    name: "Kevin Nsengiyumva",
    phone: "+250 783 918 452",
    email: "kevin.nsengiyumva@example.com",
    type: "Individual",
    location: "Rubavu",
    totalOrders: 1,
    totalSpent: 1850000,
    lastOrderDate: "2026-09-18",
    status: "Inactive"
  },

  {
    id: "CUS-1017",
    name: "Horizon Transport Ltd",
    phone: "+250 788 341 726",
    email: "admin@horizontransport.example",
    type: "Business",
    location: "Kigali",
    totalOrders: 17,
    totalSpent: 132500000,
    lastOrderDate: "2026-09-27",
    status: "Active"
  },

  {
    id: "CUS-1018",
    name: "Marie Claire Uwamahoro",
    phone: "+250 782 516 843",
    email: "marie.uwamahoro@example.com",
    type: "Individual",
    location: "Huye",
    totalOrders: 4,
    totalSpent: 3650000,
    lastOrderDate: "2026-09-25",
    status: "Active"
  },

  {
    id: "CUS-1019",
    name: "City Auto Parts Ltd",
    phone: "+250 788 615 307",
    email: "sales@cityautoparts.example",
    type: "Business",
    location: "Kicukiro",
    totalOrders: 36,
    totalSpent: 42650000,
    lastOrderDate: "2026-10-03",
    status: "Active"
  },

  {
    id: "CUS-1020",
    name: "Alexis Hakizimana",
    phone: "+250 783 274 915",
    email: "alexis.hakizimana@example.com",
    type: "Individual",
    location: "Musanze",
    totalOrders: 2,
    totalSpent: 1280000,
    lastOrderDate: "2026-09-20",
    status: "Inactive"
  },

  {
    id: "CUS-1021",
    name: "Rwanda Auto Solutions",
    phone: "+250 788 492 631",
    email: "info@rwandaautosolutions.example",
    type: "Business",
    location: "Kigali",
    totalOrders: 22,
    totalSpent: 198500000,
    lastOrderDate: "2026-10-06",
    status: "Active"
  }
];

export default Customers;