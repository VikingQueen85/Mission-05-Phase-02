const locations = [
  {
    name: "Z 11th Ave",
    address: "Cnr Eleventh Avenue and Cameron Road, Tauranga",
    location: {
      type: "Point",
      coordinates: [176.1554, -37.7011],
    },
  },
  {
    name: "Z 15th Ave",
    address: "10-18 Fifteenth Avenue, Tauranga",
    location: {
      type: "Point",
      coordinates: [176.1601, -37.7088],
    },
  },
  {
    name: "Z Addington",
    address: "250 Lincoln Road, Addington, Christchurch",
    location: {
      type: "Point",
      coordinates: [172.6105, -43.5397],
    },
  },
  {
    name: "Z Albany",
    address: "287 Oteha Valley Road, Albany",
    location: {
      type: "Point",
      coordinates: [174.7077, -36.7285],
    },
  },
  {
    name: "Z Andy Bay",
    address: "333 Andersons Bay Road, Andy Bay, Dunedin",
    location: {
      type: "Point",
      coordinates: [170.5235, -45.8913],
    },
  },
  {
    name: "Z Avondale",
    address: "50-60 Ash Street, Avondale, West Auckland",
    location: {
      type: "Point",
      coordinates: [174.6923, -36.8872],
    },
  },
  {
    name: "Z Barrington",
    address: "253 Barrington Street, Christchurch",
    location: {
      type: "Point",
      coordinates: [172.618, -43.5539],
    },
  },
  {
    name: "Z Belfast",
    address: "Cnr Main North Road and Johns Road, Belfast",
    location: {
      type: "Point",
      coordinates: [172.6288, -43.4475],
    },
  },
  {
    name: "Z Bethlehem",
    address: "253B State Highway 2",
    location: {
      type: "Point",
      coordinates: [176.1037, -37.697],
    },
  },
  {
    name: "Z Bishopdale",
    address: "210 Harewood Road, Bishopdale, Christchurch",
    location: {
      type: "Point",
      coordinates: [172.5936, -43.4922],
    },
  },
  {
    name: "Z Botany Downs",
    address: "550 Te Irirangi Drive, Botany Downs, Auckland",
    location: {
      type: "Point",
      coordinates: [174.9126, -36.9317],
    },
  },
  {
    name: "Z Broadway",
    address: "Cnr Calabar Rd and Broadway, Strathmore",
    location: {
      type: "Point",
      coordinates: [174.821, -41.3197],
    },
  },
  {
    name: "Z Brougham St",
    address: "495 Brougham Street",
    location: {
      type: "Point",
      coordinates: [172.6517, -43.548],
    },
  },
  {
    name: "Z Browns Rd",
    address: "270 Roscommon Road",
    location: {
      type: "Point",
      coordinates: [174.8687, -37.0097],
    },
  },
  {
    name: "Z Bryndwr",
    address: "52 Strowan Road, Bryndwr, Christchurch",
    location: {
      type: "Point",
      coordinates: [172.6053, -43.5042],
    },
  },
  {
    name: "Z Cambridge",
    address: "81 Victoria Street, Cambridge",
    location: {
      type: "Point",
      coordinates: [175.469, -37.8913],
    },
  },
  {
    name: "Z Carlton Corner",
    address: "1 Papanui Road, Christchurch",
    location: {
      type: "Point",
      coordinates: [172.6286, -43.5204],
    },
  },
  {
    name: "Z Caroline Bay",
    address: "62 Theodosia Street, Timaru",
    location: {
      type: "Point",
      coordinates: [171.2505, -44.394],
    },
  },
  {
    name: "Z Cashmere",
    address: "23-25 Colombo Street, Beckenham, Christchurch",
    location: {
      type: "Point",
      coordinates: [172.6369, -43.5539],
    },
  },
  {
    name: "Z Central Parade",
    address: "500 Maunganui Road, Mount Maunganui",
    location: {
      type: "Point",
      coordinates: [176.1952, -37.6493],
    },
  },
  {
    name: "Z Clevedon",
    address: "24-28 Papakura-Clevedon Road",
    location: {
      type: "Point",
      coordinates: [175.053, -37.0305],
    },
  },
  {
    name: "Z Constable St",
    address: "35 Constable St, Newtown, Wellington",
    location: {
      type: "Point",
      coordinates: [174.7826, -41.3061],
    },
  },
  {
    name: "Z Huatoki (Z Courtenay Street)",
    address: "Cnr Courtenay Street and Liardet Street, New Plymouth",
    location: {
      type: "Point",
      coordinates: [174.0772, -39.062],
    },
  },
  {
    name: "Z Curletts Rd",
    address: "Cnr Curletts Road and Blenheim Road",
    location: {
      type: "Point",
      coordinates: [172.5833, -43.5414],
    },
  },
  {
    name: "Z Tuhikaramea (Z Dinsdale)",
    address: "Cnr Whatawhata Road and Tuhikaramea Road, Dinsdale, Hamilton",
    location: {
      type: "Point",
      coordinates: [175.241, -37.7946],
    },
  },
  {
    name: "Z Dublin St",
    address: "14 Dublin Street, Whanganui",
    location: {
      type: "Point",
      coordinates: [175.0505, -39.9287],
    },
  },
  {
    name: "Z Ellerslie",
    address: "301 Ellerslie-Panmure Highway, Mt Wellington, Auckland",
    location: {
      type: "Point",
      coordinates: [174.8329, -36.9038],
    },
  },
  {
    name: "Z Fenton St",
    address: "Cnr Fenton and Victoria Street, Rotorua",
    location: {
      type: "Point",
      coordinates: [176.2505, -38.1408],
    },
  },
  {
    name: "Z Te Papanui (Z Five Cross Roads)",
    address: "243 Peachgrove Road, Enderley, Hamilton",
    location: {
      type: "Point",
      coordinates: [175.2974, -37.7811],
    },
  },
  {
    name: "Z Frankton",
    address: "Cnr Lincoln and Edgar Streets, Frankton, Hamilton",
    location: {
      type: "Point",
      coordinates: [175.253, -37.7892],
    },
  },
  {
    name: "Z Geraldine",
    address: "Cnr Waihi Terrace & Pine Street",
    location: {
      type: "Point",
      coordinates: [171.2407, -44.0921],
    },
  },
  {
    name: "Z Gladstone",
    address: "455 Dee Street, Invercargill",
    location: {
      type: "Point",
      coordinates: [168.3582, -46.3908],
    },
  },
  {
    name: "Z Glen Innes",
    address: "222-236 Apirana Avenue, Glen Innes, Auckland",
    location: {
      type: "Point",
      coordinates: [174.8621, -36.8653],
    },
  },
  {
    name: "Z Glen Park",
    address: "241 Glenfield Road, Hillcrest, North Shore",
    location: {
      type: "Point",
      coordinates: [174.7431, -36.7937],
    },
  },
  {
    name: "Z Green Bay",
    address: "82 Godley Road, Green Bay, Auckland",
    location: {
      type: "Point",
      coordinates: [174.686, -36.919],
    },
  },
  {
    name: "Z Green Island",
    address: "185 Main South Road, Green Island, Dunedin",
    location: {
      type: "Point",
      coordinates: [170.4187, -45.9082],
    },
  },
  {
    name: "Z Greenlane",
    address: "128 Greenlane Road, Greenlane, Auckland",
    location: {
      type: "Point",
      coordinates: [174.7953, -36.8856],
    },
  },
  {
    name: "Z Hautapu",
    address: "167 Victoria Road, Cambridge, New Zealand",
    location: {
      type: "Point",
      coordinates: [175.4517, -37.8732],
    },
  },
  {
    name: "Z Havelock Nth",
    address: "Cnr Havelock Road and Porter Drive, Havelock North",
    location: {
      type: "Point",
      coordinates: [176.8837, -39.6644],
    },
  },
  {
    name: "Z Henderson Valley",
    address: "1 Corban Avenue, Henderson, Auckland",
    location: {
      type: "Point",
      coordinates: [174.636, -36.8821],
    },
  },
  {
    name: "Z Heretaunga St",
    address: "Cnr Heretaunga Street West and Southland Road",
    location: {
      type: "Point",
      coordinates: [176.8329, -39.6385],
    },
  },
  {
    name: "Z High Street",
    address: "834 High Street, Boulcott, Lower Hutt",
    location: {
      type: "Point",
      coordinates: [174.9189, -41.2023],
    },
  },
  {
    name: "Z Hunters Corner",
    address: "72-76 East Tamaki Road, Papatoetoe, South Auckland",
    location: {
      type: "Point",
      coordinates: [174.8698, -36.967],
    },
  },
  {
    name: "Z Huntly",
    address: "390 Great South Road, Huntly",
    location: {
      type: "Point",
      coordinates: [175.1558, -37.5621],
    },
  },
  {
    name: "Z Hutt Rd",
    address: "453 Hutt Road, Lower Hutt",
    location: {
      type: "Point",
      coordinates: [174.8727, -41.2403],
    },
  },
  {
    name: "Z Inglewood",
    address: "47 Rata Street, Inglewood",
    location: {
      type: "Point",
      coordinates: [174.2125, -39.1554],
    },
  },
  {
    name: "Z Johnsonville",
    address: "136-140 Johnsonville Road, Johnsonville, Wellington",
    location: {
      type: "Point",
      coordinates: [174.8091, -41.223],
    },
  },
  {
    name: "Z Kahikatea Drive",
    address: "124-126 Kahikatea Drive, Hamilton",
    location: {
      type: "Point",
      coordinates: [175.2635, -37.7997],
    },
  },
  {
    name: "Z Kaikohe",
    address: "Broadway, Kaikohe",
    location: {
      type: "Point",
      coordinates: [173.801, -35.4055],
    },
  },
  {
    name: "Z Kaitaia",
    address: "141-145 Commerce Street, Kaitaia",
    location: {
      type: "Point",
      coordinates: [173.2647, -35.115],
    },
  },
  {
    name: "Z Kamo",
    address: "382 Kamo Road, Whangarei",
    location: {
      type: "Point",
      coordinates: [174.3168, -35.6983],
    },
  },
  {
    name: "Z Kapiti",
    address: "Cnr Kapiti Road and Milne Drive, Paraparaumu",
    location: {
      type: "Point",
      coordinates: [174.9881, -40.9103],
    },
  },
  {
    name: "Z Karamu Rd",
    address: "927 Karamu Road North",
    location: {
      type: "Point",
      coordinates: [176.8415, -39.6267],
    },
  },
  {
    name: "Z Kawerau",
    address: "6 Islington Street, Kawerau",
    location: {
      type: "Point",
      coordinates: [176.7029, -38.1022],
    },
  },
  {
    name: "Z Kennedy Rd",
    address: "Cnr Tennyson Street & Station Street",
    location: {
      type: "Point",
      coordinates: [176.9084, -39.4827],
    },
  },
  {
    name: "Z Kensington",
    address: "Cnr Kamo Rd and Nixon Street",
    location: {
      type: "Point",
      coordinates: [174.3218, -35.713],
    },
  },
  {
    name: "Z Kepa Rd",
    address: "154 Kepa Road, Orakei, Auckland",
    location: {
      type: "Point",
      coordinates: [174.8213, -36.8529],
    },
  },
  {
    name: "Z Kilbirnie",
    address: "16-22 Coutts Street, Kilbirnie, Wellington",
    location: {
      type: "Point",
      coordinates: [174.7967, -41.3121],
    },
  },
  {
    name: "Z Kingsway",
    address: "26 Clevedon Road, Papakura",
    location: {
      type: "Point",
      coordinates: [174.9507, -37.0673],
    },
  },
  {
    name: "Z Kumeu",
    address: "134-152 Main Road, State Highway 16",
    location: {
      type: "Point",
      coordinates: [174.5515, -36.7801],
    },
  },
  {
    name: "Z Lakeside",
    address: "Cnr Northcote Road and Taharoto Road",
    location: {
      type: "Point",
      coordinates: [174.7645, -36.7885],
    },
  },
  {
    name: "Z Lincoln Rd",
    address: "198 Lincoln Road, Henderson",
    location: {
      type: "Point",
      coordinates: [174.6393, -36.8665],
    },
  },
  {
    name: "Z Linwood",
    address: "Cnr Linwood Avenue and Cashel Street, Christchurch",
    location: {
      type: "Point",
      coordinates: [172.6713, -43.5358],
    },
  },
  {
    name: "Z London St",
    address: "171 London St & Cnr Glasgow St",
    location: {
      type: "Point",
      coordinates: [175.2709, -37.7809],
    },
  },
  {
    name: "Z Mana",
    address: "143 Mana Esplanade",
    location: {
      type: "Point",
      coordinates: [174.8698, -41.1147],
    },
  },
  {
    name: "Z Manurewa",
    address: "1 Alfriston Road, Manurewa, South Auckland",
    location: {
      type: "Point",
      coordinates: [174.8962, -37.0223],
    },
  },
  {
    name: "Z Marton",
    address: "166 Broadway, Marton",
    location: {
      type: "Point",
      coordinates: [175.3789, -40.0683],
    },
  },
  {
    name: "Z Matamata",
    address: "Cnr Waharoa Road and Peria Road, Matamata",
    location: {
      type: "Point",
      coordinates: [175.7725, -37.8118],
    },
  },
  {
    name: "Z Merrilands",
    address: "202 Mangorei Road, New Plymouth",
    location: {
      type: "Point",
      coordinates: [174.1068, -39.0734],
    },
  },
  {
    name: "Z Miramar",
    address: "27 Miramar Avenue, Miramar, Wellington",
    location: {
      type: "Point",
      coordinates: [174.8217, -41.3093],
    },
  },
  {
    name: "Z Moorhouse",
    address: "40 Moorhouse Avenue, Christchurch",
    location: {
      type: "Point",
      coordinates: [172.6329, -43.5398],
    },
  },
  {
    name: "Z Morrinsville",
    address: "202-210 Thames Street, Morrinsville",
    location: {
      type: "Point",
      coordinates: [175.5255, -37.6548],
    },
  },
  {
    name: "Z Mosgiel",
    address: "Cnr Gladstone Road and Quarry Road, Mosgiel",
    location: {
      type: "Point",
      coordinates: [170.3429, -45.8797],
    },
  },
  {
    name: "Z Mungavin Ave",
    address: "1-5 Mungavin Avenue, Porirua East, Wellington",
    location: {
      type: "Point",
      coordinates: [174.8519, -41.1415],
    },
  },
  {
    name: "Z New Lynn",
    address: "62 Rata Street",
    location: {
      type: "Point",
      coordinates: [174.6811, -36.9102],
    },
  },
  {
    name: "Z Northcote",
    address: "119 Onewa Road",
    location: {
      type: "Point",
      coordinates: [174.7578, -36.8111],
    },
  },
  {
    name: "Z Northcross",
    address: "847-849 East Coast Road",
    location: {
      type: "Point",
      coordinates: [174.723, -36.7118],
    },
  },
  {
    name: "Z Ormiston Rd",
    address: "8 Ormiston Road, Flat Bush, South Auckland",
    location: {
      type: "Point",
      coordinates: [174.9009, -36.9538],
    },
  },
  {
    name: "Z Otahuhu",
    address: "19 Princes Street, Otahuhu, Auckland",
    location: {
      type: "Point",
      coordinates: [174.8455, -36.9392],
    },
  },
  {
    name: "Z Pakuranga",
    address: "470 Pakuranga Highway, Pakuranga, Auckland",
    location: {
      type: "Point",
      coordinates: [174.887, -36.9015],
    },
  },
  {
    name: "Z Palm Beach",
    address: "16 Domain Road",
    location: {
      type: "Point",
      coordinates: [176.2429, -37.6322],
    },
  },
  {
    name: "Z Palmerston",
    address: "112 Ronaldsay Street",
    location: {
      type: "Point",
      coordinates: [170.7161, -45.4851],
    },
  },
  {
    name: "Z Papakura North",
    address: "254 Great South Road, Takanini, Auckland",
    location: {
      type: "Point",
      coordinates: [174.9397, -37.0456],
    },
  },
  {
    name: "Z Picton",
    address: "101 High Street, Picton",
    location: {
      type: "Point",
      coordinates: [174.0016, -41.2917],
    },
  },
  {
    name: "Z Pioneer Hwy",
    address: "676 Pioneer Highway",
    location: {
      type: "Point",
      coordinates: [175.5906, -40.3807],
    },
  },
  {
    name: "Z Point Chev",
    address: "1125-1143 Great North Road",
    location: {
      type: "Point",
      coordinates: [174.7077, -36.8665],
    },
  },
  {
    name: "Z Ponsonby",
    address: "5-9 Williamson Avenue",
    location: {
      type: "Point",
      coordinates: [174.7485, -36.8532],
    },
  },
  {
    name: "Z Pukekohe",
    address: "11 Stadium Drive",
    location: {
      type: "Point",
      coordinates: [174.9103, -37.2023],
    },
  },
  {
    name: "Z Pukete",
    address: "Cnr Pukete and Te Rapa Roads, Te Rapa, Hamilton",
    location: {
      type: "Point",
      coordinates: [175.2415, -37.7533],
    },
  },
  {
    name: "Z Putaruru",
    address: "68-70 Tirau Street, Putaruru",
    location: {
      type: "Point",
      coordinates: [175.9818, -38.053],
    },
  },
  {
    name: "Z Queenstown",
    address: "846 Frankton Road, Queenstown",
    location: {
      type: "Point",
      coordinates: [168.6942, -45.0251],
    },
  },
  {
    name: "Z Redwood",
    address: "225 Scott Street, Blenheim",
    location: {
      type: "Point",
      coordinates: [173.9431, -41.503],
    },
  },
  {
    name: "Z Rotokauri",
    address: "Cnr Wairere Drive & Arthur Porter Drive",
    location: {
      type: "Point",
      coordinates: [175.2132, -37.7656],
    },
  },
  {
    name: "Z Royal Oak",
    address: "700 Mount Albert Road, Royal Oak, Auckland",
    location: {
      type: "Point",
      coordinates: [174.7709, -36.9064],
    },
  },
  {
    name: "Z Rutherford",
    address: "106 Rutherford Street, Nelson",
    location: {
      type: "Point",
      coordinates: [173.2801, -41.275],
    },
  },
  {
    name: "Z Sawyers Arms",
    address: "530 Sawyers Arms Road",
    location: {
      type: "Point",
      coordinates: [172.5833, -43.4795],
    },
  },
  {
    name: "Z Shirley",
    address: "7 Marshland Road, Shirley, Christchurch",
    location: {
      type: "Point",
      coordinates: [172.6515, -43.5042],
    },
  },
  {
    name: "Z Silverdale",
    address: "5 Hibiscus Coast Highway",
    location: {
      type: "Point",
      coordinates: [174.6726, -36.6206],
    },
  },
  {
    name: "Z Springlands",
    address: "165 Middle Renwick Road, Blenheim",
    location: {
      type: "Point",
      coordinates: [173.9318, -41.5126],
    },
  },
  {
    name: "Z Stadium",
    address: "26 Mill Street, Hamilton",
    location: {
      type: "Point",
      coordinates: [175.2755, -37.7853],
    },
  },
  {
    name: "Z Stoke",
    address: "666 Main Road, Stoke, Nelson",
    location: {
      type: "Point",
      coordinates: [173.2269, -41.314],
    },
  },
  {
    name: "Z Stratford",
    address: "Cnr Broadway and Regan Street, Stratford",
    location: {
      type: "Point",
      coordinates: [174.2869, -39.3391],
    },
  },
  {
    name: "Z Sunnybrae",
    address: "37 Northcote Road, Takapuna",
    location: {
      type: "Point",
      coordinates: [174.7645, -36.7885],
    },
  },
  {
    name: "Z Taipa",
    address: "570 State Highway 10",
    location: {
      type: "Point",
      coordinates: [173.4682, -34.9972],
    },
  },
  {
    name: "Z Tamatea",
    address: "6 Durham Avenue, Tamatea",
    location: {
      type: "Point",
      coordinates: [176.8858, -39.4912],
    },
  },
  {
    name: "Z Taradale",
    address: "21 Lee Road",
    location: {
      type: "Point",
      coordinates: [176.8532, -39.5298],
    },
  },
  {
    name: "Z Taranaki St",
    address: "155 Taranaki Street, Wellington",
    location: {
      type: "Point",
      coordinates: [174.7781, -41.296],
    },
  },
  {
    name: "Z Tauhara",
    address: "200 Napier-Taupo Rd, Hilltop, Taupo",
    location: {
      type: "Point",
      coordinates: [176.0898, -38.6732],
    },
  },
  {
    name: "Z Tawa",
    address: "16-18 Main Road, Tawa, Wellington",
    location: {
      type: "Point",
      coordinates: [174.8252, -41.1764],
    },
  },
  {
    name: "Z Te Atatu",
    address: "402 Te Atatu Road, Te Atatu, Auckland",
    location: {
      type: "Point",
      coordinates: [174.654, -36.8529],
    },
  },
  {
    name: "Z Te Awamutu",
    address: "601 Sloane Street, Te Awamutu",
    location: {
      type: "Point",
      coordinates: [175.3283, -38.0069],
    },
  },
  {
    name: "Z Te Irirangi Dr",
    address: "136 Dawson Road, Otara, South Auckland",
    location: {
      type: "Point",
      coordinates: [174.8984, -36.9631],
    },
  },
  {
    name: "Z Te Puke",
    address: "Cnr Jellicoe Street and King Street, Te Puke",
    location: {
      type: "Point",
      coordinates: [176.3213, -37.7848],
    },
  },
  {
    name: "Z Terrace End",
    address: "768 Main Street",
    location: {
      type: "Point",
      coordinates: [175.632, -40.3512],
    },
  },
  {
    name: "Z Ti Rakau Dr",
    address: "284 Ti Rakau Drive, East Tamaki, South Auckland",
    location: {
      type: "Point",
      coordinates: [174.8878, -36.9189],
    },
  },
  {
    name: "Z Tom Pearce Dr",
    address: "Tom Pearce Drive, Auckland International Airport",
    location: {
      type: "Point",
      coordinates: [174.793, -37.0004],
    },
  },
  {
    name: "Z Trentham",
    address: "430 Fergusson Drive, Trentham, Upper Hutt",
    location: {
      type: "Point",
      coordinates: [175.0592, -41.1309],
    },
  },
  {
    name: "Z Valley",
    address: "248 Kaikorai Valley Road, Kaikorai, Dunedin",
    location: {
      type: "Point",
      coordinates: [170.4727, -45.8828],
    },
  },
  {
    name: "Z VIC Corner",
    address: "545-555 High Street, Lower Hutt",
    location: {
      type: "Point",
      coordinates: [174.9082, -41.215],
    },
  },
  {
    name: "Z Vivian St",
    address: "174 Vivian St, Wellington",
    location: {
      type: "Point",
      coordinates: [174.7745, -41.2938],
    },
  },
  {
    name: "Z Waikuku",
    address: "1413 Main North Road, Waikuku",
    location: {
      type: "Point",
      coordinates: [172.6738, -43.2796],
    },
  },
  {
    name: "Z Waikumete",
    address: "4155 Great North Road, Glen Eden, Auckland",
    location: {
      type: "Point",
      coordinates: [174.6644, -36.899],
    },
  },
  {
    name: "Z Waiuku",
    address: "16 Kitchener Road",
    location: {
      type: "Point",
      coordinates: [174.7297, -37.2494],
    },
  },
  {
    name: "Z Warkworth",
    address: "1 Hudson Road, Warkworth",
    location: {
      type: "Point",
      coordinates: [174.6631, -36.4011],
    },
  },
  {
    name: "Z Whakatane",
    address: "Cnr Domain Road and King Street, Whakatane",
    location: {
      type: "Point",
      coordinates: [176.9841, -37.9621],
    },
  },
  {
    name: "Z Whangaparaoa",
    address: "651 Whangaparaoa Road, Whangaparaoa",
    location: {
      type: "Point",
      coordinates: [174.7508, -36.6267],
    },
  },
  {
    name: "Z Whitianga",
    address: "83-85 Albert Street, Whitianga",
    location: {
      type: "Point",
      coordinates: [175.7032, -36.8335],
    },
  },
  {
    name: "Z Windsor",
    address: "701 Heretaunga St East",
    location: {
      type: "Point",
      coordinates: [176.8643, -39.6384],
    },
  },
  {
    name: "Z Wiri Station Rd",
    address: "83 Wiri Station Road, Manukau City",
    location: {
      type: "Point",
      coordinates: [174.8765, -37.0068],
    },
  },
  {
    name: "Z Woolston",
    address: "417 Ferry Road, Christchurch",
    location: {
      type: "Point",
      coordinates: [172.6775, -43.541],
    },
  },
  {
    name: "Z Karaka",
    address: "47 Harbourside Drive, Karaka, Auckland 2113",
    location: {
      type: "Point",
      coordinates: [174.9189, -37.1009],
    },
  },
  {
    name: "Z Amberley",
    address: "47 Carters Road",
    location: {
      type: "Point",
      coordinates: [172.723, -43.1611],
    },
  },
  {
    name: "Z Ashburton",
    address: "141 West Street",
    location: {
      type: "Point",
      coordinates: [171.7444, -43.9056],
    },
  },
  {
    name: "Z Awakeri",
    address: "RD2, Whakatane",
    location: {
      type: "Point",
      coordinates: [176.8406, -38.0264],
    },
  },
  {
    name: "Z Balclutha",
    address: "High Street",
    location: {
      type: "Point",
      coordinates: [169.7423, -46.2405],
    },
  },
  {
    name: "Z Beach Rd",
    address: "150 Beach Road",
    location: {
      type: "Point",
      coordinates: [174.7735, -36.8465],
    },
  },
  {
    name: "Z Constellation Dr",
    address: "36 Constellation Drive",
    location: {
      type: "Point",
      coordinates: [174.7225, -36.7573],
    },
  },
  {
    name: "Z Cromwell",
    address: "Cnr Barry Avenue and Murray Terrace",
    location: {
      type: "Point",
      coordinates: [169.2023, -45.0396],
    },
  },
  {
    name: "Z Dee St",
    address: "206-214 Dee Street, Invercargill",
    location: {
      type: "Point",
      coordinates: [168.3516, -46.406],
    },
  },
  {
    name: "Z Fairy Springs",
    address: "23 Fairy Springs Road",
    location: {
      type: "Point",
      coordinates: [176.2238, -38.1077],
    },
  },
  {
    name: "Z Gisborne service station",
    address: "300 Gladstone Road",
    location: {
      type: "Point",
      coordinates: [178.0163, -38.6653],
    },
  },
  {
    name: "Z Gore",
    address: "Corner Hokonui Drive & Irwell Street",
    location: {
      type: "Point",
      coordinates: [168.9392, -46.1023],
    },
  },
  {
    name: "Z Greymouth",
    address: "10 Whall Street",
    location: {
      type: "Point",
      coordinates: [171.2098, -42.455],
    },
  },
  {
    name: "Z Grove Rd",
    address: "Corner Grove Road & Budge Street",
    location: {
      type: "Point",
      coordinates: [173.9515, -41.5204],
    },
  },
  {
    name: "Z Harris Rd",
    address: "142 Harris Road",
    location: {
      type: "Point",
      coordinates: [174.8967, -36.9329],
    },
  },
]

module.exports = locations
