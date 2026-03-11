const cableProducts = [
  {
    id: "simpull-thhn-thwn2-copper",
    name: "SIMpull THHN/THWN-2 Copper Building Wire",
    category: "Building Wire",
    description:
      "Southwire SIMpull THHN/THWN-2 is a single-conductor building wire with a dual rating for use in dry and wet locations. The patented SIMpull solution reduces the friction between wire and conduit, making pulls easier and reducing installation time by up to 50%. UL Listed and RoHS compliant.",
    voltage: "600V",
    temperature: "90\u00b0C dry / 75\u00b0C wet",
    conductorMaterial: "Copper",
    insulationType: "PVC/Nylon (THHN) / PVC (THWN-2)",
    jacketColor: "Various (Black, White, Red, Blue, Green, Orange)",
    applications: [
      "Commercial and residential branch circuits",
      "Conduit installations in dry and wet locations",
      "Raceways and cable trays",
      "Machine tool wiring",
      "Control circuits",
      "Power distribution in buildings",
    ],
    layers: [
      {
        name: "Nylon Jacket",
        color: "#3A3A3A",
        description:
          "Abrasion-resistant nylon outer jacket provides mechanical protection and enables the SIMpull low-friction advantage for easier conduit pulls.",
        thickness: 0.4,
      },
      {
        name: "PVC Insulation",
        color: "#1A5276",
        description:
          "Heat-resistant PVC insulation rated for 90\u00b0C in dry locations and 75\u00b0C in wet locations. Provides excellent dielectric strength and moisture resistance.",
        thickness: 1.2,
      },
      {
        name: "Copper Conductor",
        color: "#B87333",
        description:
          "Solid or stranded annealed copper conductor offering superior conductivity and flexibility. Available in gauges from 14 AWG through 1000 kcmil.",
        thickness: 2.5,
      },
    ],
    sourceUrl:
      "https://www.southwire.com/wire-cable/building-wire/simpull-thhn-thwn-2-cu/p/",
    heroText: "THE WIRE THAT CHANGED THE PULL",
    tagline:
      "Patented SIMpull technology cuts installation time in half with the lowest pulling friction in the industry.",
  },
  {
    id: "romex-nm-b",
    name: "Romex SIMpull NM-B Cable",
    category: "Nonmetallic Sheathed Cable",
    description:
      "Southwire Romex SIMpull NM-B is the most recognized brand of nonmetallic sheathed cable in the industry. Designed for residential wiring, it features the patented SIMpull outer jacket that glides through framing members and reduces burn-through. Meets all NEC Article 334 requirements.",
    voltage: "600V",
    temperature: "90\u00b0C",
    conductorMaterial: "Copper",
    insulationType: "PVC with Nylon",
    jacketColor: "White (14 AWG), Yellow (12 AWG), Orange (10 AWG), Black (6/8 AWG)",
    applications: [
      "Residential branch circuit wiring",
      "Exposed and concealed wiring in dry locations",
      "One- and two-family dwelling circuits",
      "Lighting circuits",
      "Receptacle circuits",
      "Switch legs and home runs",
    ],
    layers: [
      {
        name: "PVC Outer Jacket",
        color: "#F5E6AB",
        description:
          "Color-coded PVC outer jacket with SIMpull technology for easy identification by wire gauge. The smooth finish reduces friction when pulling through bored holes in framing.",
        thickness: 0.8,
      },
      {
        name: "Paper Separator",
        color: "#D5C4A1",
        description:
          "Kraft paper wrapping separates the individual conductors from the outer jacket, providing additional protection and easier stripping during termination.",
        thickness: 0.2,
      },
      {
        name: "PVC/Nylon Conductor Insulation",
        color: "#2C3E50",
        description:
          "Individual THHN/THWN-2 rated insulation on each conductor -- black (hot), white (neutral), and bare copper (ground). Nylon layer resists abrasion during installation.",
        thickness: 0.9,
      },
      {
        name: "Copper Conductors",
        color: "#B87333",
        description:
          "Solid annealed copper conductors (14 AWG through 6 AWG) providing reliable current-carrying capacity for residential branch circuits. Includes a bare copper grounding conductor.",
        thickness: 2.0,
      },
    ],
    sourceUrl:
      "https://www.southwire.com/wire-cable/building-wire/romex-simpull-nm-b/p/",
    heroText: "AMERICA'S MOST TRUSTED RESIDENTIAL WIRE",
    tagline:
      "The original Romex brand -- over 85 years of proven performance behind every wall in America.",
  },
  {
    id: "uf-b-underground-feeder",
    name: "Underground Feeder (UF-B) Cable",
    category: "Underground Feeder Cable",
    description:
      "Southwire UF-B cable is designed for direct burial underground without conduit, as well as wet and dry interior installations. The solid thermoplastic construction resists moisture, fungus, and corrosion, making it ideal for outdoor lighting, landscape wiring, and outbuilding feeds. Listed per UL 493 and NEC Article 340.",
    voltage: "600V",
    temperature: "90\u00b0C dry / 75\u00b0C wet",
    conductorMaterial: "Copper",
    insulationType: "Integral PVC (solid thermoplastic)",
    jacketColor: "Gray",
    applications: [
      "Direct burial underground feeder circuits",
      "Outdoor landscape and security lighting",
      "Wiring to detached garages, sheds, and outbuildings",
      "Interior wiring in wet or dry locations",
      "Agricultural and farm building wiring",
      "Swimming pool and hot tub circuits (with GFCI)",
    ],
    layers: [
      {
        name: "PVC Outer Jacket",
        color: "#8E8E8E",
        description:
          "Moisture-resistant gray PVC jacket molded integrally around the conductors. Rated for direct burial and provides protection against soil chemicals, moisture ingress, and fungal growth.",
        thickness: 1.4,
      },
      {
        name: "PVC Conductor Insulation",
        color: "#4A4A4A",
        description:
          "Individual PVC insulation fused with the outer jacket in a solid cross-section. Each conductor is color-coded -- black (hot), white (neutral) -- with insulation rated at 90\u00b0C dry.",
        thickness: 0.8,
      },
      {
        name: "Copper Conductors",
        color: "#B87333",
        description:
          "Solid annealed copper conductors providing reliable performance in underground environments. Includes an uninsulated bare copper equipment grounding conductor.",
        thickness: 2.0,
      },
    ],
    sourceUrl:
      "https://www.southwire.com/wire-cable/building-wire/uf-b-w-g-cable/p/",
    heroText: "BUILT TO GO WHERE CONDUIT CAN'T",
    tagline:
      "Direct-burial rated and solid-molded for decades of reliable underground performance.",
  },
  {
    id: "mc-cable-metal-clad",
    name: "MC Cable (Metal Clad)",
    category: "Metal Clad Cable",
    description:
      "Southwire MC Cable features an interlocking aluminum armor that provides superior mechanical protection for commercial and industrial installations. The armor serves as an equipment grounding path and eliminates the need for separate conduit. Available with THHN/THWN-2 rated conductors and listed per UL 1569 and NEC Article 330.",
    voltage: "600V",
    temperature: "90\u00b0C dry / 75\u00b0C wet",
    conductorMaterial: "Copper",
    insulationType: "THHN/THWN-2 PVC/Nylon",
    jacketColor: "Aluminum Armor (silver/metallic)",
    applications: [
      "Commercial office buildings and tenant fit-outs",
      "Industrial power and control circuits",
      "Healthcare facilities",
      "Data centers and server rooms",
      "Exposed and concealed branch circuits",
      "Cable tray installations",
    ],
    layers: [
      {
        name: "Interlocking Aluminum Armor",
        color: "#A8A9AD",
        description:
          "Continuously interlocking aluminum armor strip provides robust mechanical protection, serves as an equipment grounding conductor, and allows the cable to be bent without specialized tools. Anti-short bushings protect conductors at termination points.",
        thickness: 0.6,
      },
      {
        name: "Polypropylene Bond Tape",
        color: "#E8E8E8",
        description:
          "Internal bonding tape between the armor and conductor assembly provides additional mechanical protection and prevents conductor insulation damage from contact with the metal armor.",
        thickness: 0.15,
      },
      {
        name: "PVC/Nylon Conductor Insulation",
        color: "#C0392B",
        description:
          "Individual THHN/THWN-2 rated PVC insulation with nylon jacket on each conductor. Color-coded per NEC -- black, red, blue (hot phases), white (neutral), green (ground).",
        thickness: 0.9,
      },
      {
        name: "Copper Conductors",
        color: "#B87333",
        description:
          "Stranded annealed copper conductors for flexibility during installation in tight commercial spaces. Available from 14 AWG through 750 kcmil in 2, 3, or 4 conductor configurations plus ground.",
        thickness: 2.2,
      },
    ],
    sourceUrl:
      "https://www.southwire.com/wire-cable/metal-clad-cable/mc-cable-cu/p/",
    heroText: "ARMOR-GRADE PROTECTION. ZERO CONDUIT.",
    tagline:
      "Interlocking aluminum armor delivers industrial-strength protection with faster installation than rigid conduit.",
  },
  {
    id: "ser-seu-service-entrance",
    name: "SER/SEU Service Entrance Cable",
    category: "Service Entrance Cable",
    description:
      "Southwire SER and SEU service entrance cable is used to deliver power from the utility meter to the main breaker panel, and for large feeder circuits between panels. SER includes a bare neutral and insulated ground, while SEU features a concentric bare neutral. Built to UL 854 and NEC Article 338 standards for reliable overhead and underground service entrance applications.",
    voltage: "600V",
    temperature: "90\u00b0C (conductors) / 75\u00b0C (overall)",
    conductorMaterial: "Aluminum",
    insulationType: "Cross-linked Polyethylene (XLPE)",
    jacketColor: "Gray",
    applications: [
      "Main service entrance from meter to panel",
      "Feeder circuits between main and sub-panels",
      "Large appliance feeds (ranges, dryers, HVAC)",
      "Above-ground service drop connections",
      "Multi-family dwelling service distribution",
      "Mobile home and manufactured housing feeds",
    ],
    layers: [
      {
        name: "PVC Outer Jacket",
        color: "#7B8D8E",
        description:
          "Sunlight-resistant gray PVC outer jacket protects the cable assembly from UV exposure, moisture, and physical damage. Rated for exterior installations on building surfaces.",
        thickness: 1.0,
      },
      {
        name: "Bare Concentric Neutral (SEU) / Ground Wires (SER)",
        color: "#C0C0C0",
        description:
          "In SEU configuration, bare aluminum neutral wires are spirally wrapped concentrically around the insulated conductors. In SER configuration, a separate bare aluminum grounding conductor is included alongside the insulated neutral.",
        thickness: 0.6,
      },
      {
        name: "Filler Material",
        color: "#D0D0C8",
        description:
          "Non-hygroscopic filler material occupies the interstices between conductors, maintaining the cable's round profile and preventing moisture migration along the cable length.",
        thickness: 0.3,
      },
      {
        name: "XLPE Conductor Insulation",
        color: "#1B1B1B",
        description:
          "Cross-linked polyethylene insulation on each phase conductor provides excellent dielectric performance and a 90\u00b0C temperature rating. Color-coded black and red for dual hot legs, with a white-striped neutral (SER).",
        thickness: 1.1,
      },
      {
        name: "Aluminum Conductors",
        color: "#848789",
        description:
          "Compressed stranded AA-8000 series aluminum alloy conductors engineered for improved flexibility and reduced creep compared to standard aluminum. Available in 4 AWG through 4/0 AWG configurations.",
        thickness: 3.0,
      },
    ],
    sourceUrl:
      "https://www.southwire.com/wire-cable/service-entrance/ser-service-entrance-cable-al/p/",
    heroText: "WHERE UTILITY POWER MEETS YOUR BUILDING",
    tagline:
      "Heavy-duty aluminum service entrance cable engineered for the most critical connection in your electrical system.",
  },
  {
    id: "xhhw-2-aluminum",
    name: "XHHW-2 Aluminum Building Wire",
    category: "Building Wire",
    description:
      "Southwire XHHW-2 aluminum building wire features cross-linked polyethylene insulation rated for wet and dry locations at 90\u00b0C. The XLPE insulation offers superior moisture resistance and a thinner wall compared to PVC, allowing for more conductors per conduit. Ideal for large feeder and branch circuit applications where aluminum's lighter weight and lower cost provide significant advantages. Listed per UL 44.",
    voltage: "600V",
    temperature: "90\u00b0C wet and dry",
    conductorMaterial: "Aluminum",
    insulationType: "Cross-linked Polyethylene (XLPE)",
    jacketColor: "Black",
    applications: [
      "Large feeder circuits in commercial buildings",
      "Industrial power distribution",
      "Paralleled conductor installations",
      "Cable tray systems",
      "Conduit and raceway installations in wet or dry locations",
      "Power plant and utility applications",
    ],
    layers: [
      {
        name: "XLPE Insulation",
        color: "#1C1C1C",
        description:
          "Cross-linked polyethylene insulation provides a full 90\u00b0C rating in both wet and dry locations -- a key advantage over THWN-2 which derates in wet conditions. The thinner insulation wall allows higher conduit fill rates.",
        thickness: 1.3,
      },
      {
        name: "Aluminum Conductor",
        color: "#848789",
        description:
          "Compact-stranded AA-8000 series aluminum alloy conductor with excellent flexibility and termination characteristics. The lighter weight (one-third of copper) reduces support structure requirements and installation labor on large runs.",
        thickness: 3.2,
      },
    ],
    sourceUrl:
      "https://www.southwire.com/wire-cable/building-wire/xhhw-2-al/p/",
    heroText: "MAXIMUM RATING. MINIMUM WEIGHT.",
    tagline:
      "Full 90\u00b0C wet/dry rating in lightweight aluminum -- the smart choice for large-scale power distribution.",
  },
];

export default cableProducts;

export function getProductById(id) {
  const defaults = cableProducts.find(p => p.id === id);
  if (defaults) return defaults;
  const custom = getCustomProducts();
  return custom.find(p => p.id === id) || null;
}

export function getAllProducts() {
  return [...cableProducts, ...getCustomProducts()];
}

export function getCustomProducts() {
  try {
    const stored = localStorage.getItem('customCableProducts');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveCustomProduct(product) {
  const custom = getCustomProducts();
  const idx = custom.findIndex(p => p.id === product.id);
  if (idx >= 0) {
    custom[idx] = product;
  } else {
    custom.push(product);
  }
  localStorage.setItem('customCableProducts', JSON.stringify(custom));
  return custom;
}

export function deleteCustomProduct(id) {
  const custom = getCustomProducts().filter(p => p.id !== id);
  localStorage.setItem('customCableProducts', JSON.stringify(custom));
  return custom;
}
