
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
  const [findStations, setFindStations] = useState(false);

  const handleFindStations = () => {
    setFindStations(!findStations);
  };

  const stations = [
    { name: "Z 11th Ave", address: "Cnr Eleventh Avenue and Cameron Road, Tauranga" },
    { name: "Z 15th Ave", address: "10-18 Fifteenth Avenue, Tauranga" },
    { name: "Z Addington", address: "250 Lincoln Road, Addington, Christchurch" },
    { name: "Z Albany", address: "287 Oteha Valley Road, Albany" },
    { name: "Z Andy Bay", address: "333 Andersons Bay Road, Andy Bay, Dunedin" },
    { name: "Z Avondale", address: "50-60 Ash Street, Avondale, West Auckland" },
    { name: "Z Barrington", address: "253 Barrington Street, Christchurch" },
    { name: "Z Belfast", address: "Cnr Main North Road and Johns Road, Belfast" },
    { name: "Z Bethlehem", address: "253B State Highway 2" },
    { name: "Z Bishopdale", address: "210 Harewood Road, Bishopdale, Christchurch" },
    { name: "Z Botany Downs", address: "550 Te Irirangi Drive, Botany Downs, Auckland" },
    { name: "Z Broadway", address: "Cnr Calabar Rd and Broadway, Strathmore" },
    { name: "Z Brougham St", address: "495 Brougham Street" },
    { name: "Z Browns Rd", address: "270 Roscommon Road" },
    { name: "Z Bryndwr", address: "52 Strowan Road, Bryndwr, Christchurch" },
    { name: "Z Cambridge", address: "81 Victoria Street, Cambridge" },
    { name: "Z Carlton Corner", address: "1 Papanui Road, Christchurch" },
    { name: "Z Caroline Bay", address: "62 Theodosia Street, Timaru" },
    { name: "Z Cashmere", address: "23-25 Colombo Street, Beckenham, Christchurch" },
    { name: "Z Central Parade", address: "500 Maunganui Road, Mount Maunganui" },
    { name: "Z Clevedon", address: "24-28 Papakura-Clevedon Road" },
    { name: "Z Constable St", address: "35 Constable St, Newtown, Wellington" },
    { name: "Z Huatoki (Z Courtenay Street)", address: "Cnr Courtenay Street and Liardet Street, New Plymouth" },
    { name: "Z Curletts Rd", address: "Cnr Curletts Road and Blenheim Road" },
    { name: "Z Tuhikaramea (Z Dinsdale)", address: "Cnr Whatawhata Road and Tuhikaramea Road, Dinsdale, Hamilton" },
    { name: "Z Dublin St", address: "14 Dublin Street, Whanganui" },
    { name: "Z Ellerslie", address: "301 Ellerslie-Panmure Highway, Mt Wellington, Auckland" },
    { name: "Z Fenton St", address: "Cnr Fenton and Victoria Street, Rotorua" },
    { name: "Z Te Papanui (Z Five Cross Roads)", address: "243 Peachgrove Road, Enderley, Hamilton" },
    { name: "Z Frankton", address: "Cnr Lincoln and Edgar Streets, Frankton, Hamilton" },
    { name: "Z Geraldine", address: "Cnr Waihi Terrace & Pine Street" },
    { name: "Z Gladstone", address: "455 Dee Street, Invercargill" },
    { name: "Z Glen Innes", address: "222-236 Apirana Avenue, Glen Innes, Auckland" },
    { name: "Z Glen Park", address: "241 Glenfield Road, Hillcrest, North Shore" },
    { name: "Z Green Bay", address: "82 Godley Road, Green Bay, Auckland" },
    { name: "Z Green Island", address: "185 Main South Road, Green Island, Dunedin" },
    { name: "Z Greenlane", address: "128 Greenlane Road, Greenlane, Auckland" },
    { name: "Z Hautapu", address: "167 Victoria Road, Cambridge, New Zealand" },
    { name: "Z Havelock Nth", address: "Cnr Havelock Road and Porter Drive, Havelock North" },
    { name: "Z Henderson Valley", address: "1 Corban Avenue, Henderson, Auckland" },
    { name: "Z Heretaunga St", address: "Cnr Heretaunga Street West and Southland Road" },
    { name: "Z High Street", address: "834 High Street, Boulcott, Lower Hutt" },
    { name: "Z Hunters Corner", address: "72-76 East Tamaki Road, Papatoetoe, South Auckland" },
    { name: "Z Huntly", address: "390 Great South Road, Huntly" },
    { name: "Z Hutt Rd", address: "453 Hutt Road, Lower Hutt" },
    { name: "Z Inglewood", address: "47 Rata Street, Inglewood" },
    { name: "Z Johnsonville", address: "136-140 Johnsonville Road, Johnsonville, Wellington" },
    { name: "Z Kahikatea Drive", address: "124-126 Kahikatea Drive, Hamilton" },
    { name: "Z Kaikohe", address: "Broadway, Kaikohe" },
    { name: "Z Kaitaia", address: "141-145 Commerce Street, Kaitaia" },
    { name: "Z Kamo", address: "382 Kamo Road, Whangarei" },
    { name: "Z Kapiti", address: "Cnr Kapiti Road and Milne Drive, Paraparaumu" },
    { name: "Z Karamu Rd", address: "927 Karamu Road North" },
    { name: "Z Kawerau", address: "6 Islington Street, Kawerau" },
    { name: "Z Kennedy Rd", address: "Cnr Tennyson Street & Station Street" },
    { name: "Z Kensington", address: "Cnr Kamo Rd and Nixon Street" },
    { name: "Z Kepa Rd", address: "154 Kepa Road, Orakei, Auckland" },
    { name: "Z Kilbirnie", address: "16-22 Coutts Street, Kilbirnie, Wellington" },
    { name: "Z Kingsway", address: "26 Clevedon Road, Papakura" },
    { name: "Z Kumeu", address: "134-152 Main Road, State Highway 16" },
    { name: "Z Lakeside", address: "Cnr Northcote Road and Taharoto Road" },
    { name: "Z Lincoln Rd", address: "198 Lincoln Road, Henderson" },
    { name: "Z Linwood", address: "Cnr Linwood Avenue and Cashel Street, Christchurch" },
    { name: "Z London St", address: "171 London St & Cnr Glasgow St" },
    { name: "Z Mana", address: "143 Mana Esplanade" },
    { name: "Z Manurewa", address: "1 Alfriston Road, Manurewa, South Auckland" },
    { name: "Z Marton", address: "166 Broadway, Marton" },
    { name: "Z Matamata", address: "Cnr Waharoa Road and Peria Road, Matamata" },
    { name: "Z Merrilands", address: "202 Mangorei Road, New Plymouth" },
    { name: "Z Miramar", address: "27 Miramar Avenue, Miramar, Wellington" },
    { name: "Z Moorhouse", address: "40 Moorhouse Avenue, Christchurch" },
    { name: "Z Morrinsville", address: "202-210 Thames Street, Morrinsville" },
    { name: "Z Mosgiel", address: "Cnr Gladstone Road and Quarry Road, Mosgiel" },
    { name: "Z Mungavin Ave", address: "1-5 Mungavin Avenue, Porirua East, Wellington" },
    { name: "Z New Lynn", address: "62 Rata Street" },
    { name: "Z Northcote", address: "119 Onewa Road" },
    { name: "Z Northcross", address: "847-849 East Coast Road" },
    { name: "Z Ormiston Rd", address: "8 Ormiston Road, Flat Bush, South Auckland" },
    { name: "Z Otahuhu", address: "19 Princes Street, Otahuhu, Auckland" },
    { name: "Z Pakuranga", address: "470 Pakuranga Highway, Pakuranga, Auckland" },
    { name: "Z Palm Beach", address: "16 Domain Road" },
    { name: "Z Palmerston", address: "112 Ronaldsay Street" },
    { name: "Z Papakura North", address: "254 Great South Road, Takanini, Auckland" },
    { name: "Z Picton", address: "101 High Street, Picton" },
    { name: "Z Pioneer Hwy", address: "676 Pioneer Highway" },
    { name: "Z Point Chev", address: "1125-1143 Great North Road" },
    { name: "Z Ponsonby", address: "5-9 Williamson Avenue" },
    { name: "Z Pukekohe", address: "11 Stadium Drive" },
    { name: "Z Pukete", address: "Cnr Pukete and Te Rapa Roads, Te Rapa, Hamilton" },
    { name: "Z Putaruru", address: "68-70 Tirau Street, Putaruru" },
    { name: "Z Queenstown", address: "846 Frankton Road, Queenstown" },
    { name: "Z Redwood", address: "225 Scott Street, Blenheim" },
    { name: "Z Rotokauri", address: "Cnr Wairere Drive & Arthur Porter Drive" },
    { name: "Z Royal Oak", address: "700 Mount Albert Road, Royal Oak, Auckland" },
    { name: "Z Rutherford", address: "106 Rutherford Street, Nelson" },
    { name: "Z Sawyers Arms", address: "530 Sawyers Arms Road" },
    { name: "Z Shirley", address: "7 Marshland Road, Shirley, Christchurch" },
    { name: "Z Silverdale", address: "5 Hibiscus Coast Highway" },
    { name: "Z Springlands", address: "165 Middle Renwick Road, Blenheim" },
    { name: "Z Stadium", address: "26 Mill Street, Hamilton" },
    { name: "Z Stoke", address: "666 Main Road, Stoke, Nelson" },
    { name: "Z Stratford", address: "Cnr Broadway and Regan Street, Stratford" },
    { name: "Z Sunnybrae", address: "37 Northcote Road, Takapuna" },
    { name: "Z Taipa", address: "570 State Highway 10" },
    { name: "Z Tamatea", address: "6 Durham Avenue, Tamatea" },
    { name: "Z Taradale", address: "21 Lee Road" },
    { name: "Z Taranaki St", address: "155 Taranaki Street, Wellington" },
    { name: "Z Tauhara", address: "200 Napier-Taupo Rd, Hilltop, Taupo" },
    { name: "Z Tawa", address: "16-18 Main Road, Tawa, Wellington" },
    { name: "Z Te Atatu", address: "402 Te Atatu Road, Te Atatu, Auckland" },
    { name: "Z Te Awamutu", address: "601 Sloane Street, Te Awamutu" },
    { name: "Z Te Irirangi Dr", address: "136 Dawson Road, Otara, South Auckland" },
    { name: "Z Te Puke", address: "Cnr Jellicoe Street and King Street, Te Puke" },
    { name: "Z Terrace End", address: "768 Main Street" },
    { name: "Z Ti Rakau Dr", address: "284 Ti Rakau Drive, East Tamaki, South Auckland" },
    { name: "Z Tom Pearce Dr", address: "Tom Pearce Drive, Auckland International Airport" },
    { name: "Z Trentham", address: "430 Fergusson Drive, Trentham, Upper Hutt" },
    { name: "Z Valley", address: "248 Kaikorai Valley Road, Kaikorai, Dunedin" },
    { name: "Z VIC Corner", address: "545-555 High Street, Lower Hutt" },
    { name: "Z Vivian St", address: "174 Vivian St, Wellington" },
    { name: "Z Waikuku", address: "1413 Main North Road, Waikuku" },
    { name: "Z Waikumete", address: "4155 Great North Road, Glen Eden, Auckland" },
    { name: "Z Waiuku", address: "16 Kitchener Road" },
    { name: "Z Warkworth", address: "1 Hudson Road, Warkworth" },
    { name: "Z Whakatane", address: "Cnr Domain Road and King Street, Whakatane" },
    { name: "Z Whangaparaoa", address: "651 Whangaparaoa Road, Whangaparaoa" },
    { name: "Z Whitianga", address: "83-85 Albert Street, Whitianga" },
    { name: "Z Windsor", address: "701 Heretaunga St East" },
    { name: "Z Wiri Station Rd", address: "83 Wiri Station Road, Manukau City" },
    { name: "Z Woolston", address: "417 Ferry Road, Christchurch" },
    { name: "Z Karaka", address: "47 Harbourside Drive, Karaka, Auckland 2113" },
    { name: "Z Amberley", address: "47 Carters Road" },
    { name: "Z Ashburton", address: "141 West Street" },
    { name: "Z Awakeri", address: "RD2, Whakatane" },
    { name: "Z Balclutha", address: "High Street" },
    { name: "Z Beach Rd", address: "150 Beach Road" },
    { name: "Z Constellation Dr", address: "36 Constellation Drive" },
    { name: "Z Cromwell", address: "Cnr Barry Avenue and Murray Terrace" },
    { name: "Z Dee St", address: "206-214 Dee Street, Invercargill" },
    { name: "Z Fairy Springs", address: "23 Fairy Springs Road" },
    { name: "Z Gisborne service station", address: "300 Gladstone Road" },
    { name: "Z Gore", address: "Corner Hokonui Drive & Irwell Street" },
    { name: "Z Greymouth", address: "10 Whall Street" },
    { name: "Z Grove Rd", address: "Corner Grove Road & Budge Street" },
    { name: "Z Harris Rd", address: "142 Harris Road" },
  ];

  return (
    <div className="homepage-container">
      <h2 className="homepage-heading">Find a Z Petrol Station</h2>
      <p className="homepage-intro-text">Click the button below to see available Z petrol stations</p>

    <div className="homepage-buttons-container">
        <Link to="/price-comparison" className="header-button orange-gradient-button">Price Comparison</Link>
        <Link to="/services" className="header-button orange-gradient-button">Services</Link>
      </div>

      <button onClick={handleFindStations} className="find-stations-button">
        {findStations ? "Hide Stations" : "Find Stations"}
      </button>

      {findStations && (
        <div className="stations-list">
          {stations.length > 0 ? (
            <ul>
              {stations.map((station, index) => (
                <li key={index} className="station-item">
                  <h3 className="station-name">{station.name}</h3>
                  <p className="station-address">{station.address}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No stations found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Homepage;