export const abilities = [
  {
    words: ["ignite", "incinerate", "burn", "explosion", "fireball"],
    power: "fire",
  },
  {
    words: ["freeze", "chill", "pause", "halt"],
    power: "freeze",
  },
  {
    words: ["heal", "cleanse", "restore", "recovery", "purify"],
    power: "reset",
  },
  {
    words: ["time", "clock", "temporal", "chrono"],
    power: "time",
  },
];

export const allSpecialWords = abilities.reduce((acc, ability) => {
  return [...acc, ...ability.words];
}, [] as string[]);

export const wordlist = [
  // — Nature —
  "forest", "river", "ocean", "mountain", "valley", "thunder", "lightning",
  "crystal", "glacier", "volcano", "canyon", "meadow", "horizon", "monsoon",
  "tornado", "blizzard", "rainbow", "waterfall", "desert", "jungle", "swamp",
  "tundra", "savanna", "pebble", "boulder", "cliff", "shore", "dune", "marsh",
  "lagoon", "estuary", "fjord", "plateau", "rapids", "summit", "crater",
  "cavern", "grotto", "geyser", "spring", "delta", "peninsula", "archipelago",
  "atoll", "reef", "trench", "current", "tide", "gale", "squall", "frost",
  "hail", "sleet", "mist", "fog", "drizzle", "shower", "storm", "tempest",
  "breeze", "gust", "whirlwind", "cyclone", "hurricane", "typhoon", "nimbus",
  "stratus", "cirrus", "cumulus", "aurora", "solstice", "equinox", "zenith",

  // — Animals —
  "tiger", "dolphin", "falcon", "jaguar", "python", "cobra", "penguin",
  "elephant", "giraffe", "panther", "cheetah", "buffalo", "coyote", "badger",
  "ferret", "otter", "walrus", "narwhal", "platypus", "chameleon", "gecko",
  "iguana", "pelican", "toucan", "parrot", "flamingo", "ostrich", "condor",
  "vulture", "wolverine", "moose", "bison", "caribou", "lynx", "ocelot",
  "puma", "tapir", "capybara", "armadillo", "anteater", "pangolin", "quokka",
  "meerkat", "mongoose", "warthog", "gazelle", "impala", "wildebeest", "hyena",
  "jackal", "dingo", "quoll", "numbat", "wombat", "possum", "wallaby",
  "kangaroo", "koala", "echidna", "axolotl", "salamander", "newt", "toad",
  "gecko", "skink", "viper", "mamba", "taipan", "anaconda", "boa", "rattler",
  "osprey", "harpy", "kestrel", "merlin", "hobby", "buzzard", "kite", "ibis",
  "heron", "egret", "crane", "stork", "spoonbill", "avocet", "plover",
  "puffin", "gannet", "albatross", "petrel", "shearwater", "booby", "frigate",
  "manatee", "dugong", "beluga", "orca", "porpoise", "seahorse", "stingray",
  "manta", "barracuda", "grouper", "snapper", "marlin", "swordfish", "tuna",
  "salmon", "trout", "perch", "pike", "carp", "catfish", "sturgeon",

  // — Plants & Flora —
  "fern", "moss", "lichen", "algae", "fungus", "orchid", "dahlia", "peony",
  "lotus", "jasmine", "lilac", "magnolia", "wisteria", "hibiscus", "azalea",
  "rhododendron", "foxglove", "lavender", "rosemary", "thyme", "basil",
  "sage", "mint", "oregano", "coriander", "turmeric", "saffron", "cardamom",
  "cinnamon", "vanilla", "clove", "nutmeg", "ginger", "wasabi", "horseradish",
  "bamboo", "mangrove", "baobab", "sequoia", "redwood", "cypress", "cedar",
  "spruce", "birch", "willow", "maple", "aspen", "poplar", "beech", "walnut",
  "chestnut", "hazel", "acacia", "banyan", "fig", "palm", "cactus", "agave",

  // — Food & Drink —
  "mango", "papaya", "guava", "lychee", "avocado", "broccoli", "spinach",
  "radish", "turnip", "parsley", "walnut", "almond", "cashew", "pistachio",
  "pretzel", "waffle", "pancake", "noodle", "pasta", "risotto", "paella",
  "sushi", "ramen", "pho", "burrito", "falafel", "hummus", "tahini",
  "kimchi", "tempura", "teriyaki", "satay", "tikka", "masala", "curry",
  "tagine", "couscous", "quinoa", "polenta", "gnocchi", "ravioli", "lasagna",
  "calzone", "focaccia", "brioche", "baguette", "croissant", "macaron",
  "sorbet", "gelato", "tiramisu", "cannoli", "baklava", "madeleine",
  "smoothie", "espresso", "latte", "mocha", "chai", "matcha", "kombucha",

  // — Colors & Descriptors —
  "crimson", "scarlet", "amber", "violet", "indigo", "silver", "golden",
  "bronze", "ivory", "ebony", "azure", "magenta", "turquoise", "lavender",
  "fuchsia", "cobalt", "teal", "maroon", "khaki", "vivid", "vibrant",
  "radiant", "luminous", "brilliant", "dazzling", "glowing", "gleaming",
  "sparkling", "shimmering", "flickering", "blazing", "searing", "frigid",
  "glacial", "ancient", "eternal", "infinite", "mystical", "arcane",
  "elusive", "phantom", "spectral", "celestial", "astral", "cosmic",

  // — Action Verbs —
  "shatter", "vanish", "conjure", "summon", "banish", "enchant", "bewitch",
  "fortify", "amplify", "radiate", "resonate", "cascade", "spiral", "surge",
  "soar", "plunge", "drift", "wander", "tumble", "scatter", "gather",
  "weave", "forge", "craft", "sculpt", "carve", "etch", "engrave", "mold",
  "temper", "anneal", "smelt", "refine", "purge", "cleanse", "mend", "bind",
  "unravel", "unwind", "unleash", "awaken", "beckon", "invoke", "revive",
  "ascend", "descend", "traverse", "venture", "explore", "discover", "seek",
  "pursue", "escape", "evade", "intercept", "ambush", "outrun", "outflank",

  // — Mythology & Legend —
  "dragon", "phoenix", "griffin", "hydra", "chimera", "sphinx", "minotaur",
  "cyclops", "titan", "olympus", "medusa", "perseus", "theseus", "odyssey",
  "achilles", "hercules", "centaur", "satyr", "nereid", "triton", "selene",
  "helios", "eos", "atlas", "kronos", "gorgon", "basilisk", "leviathan",
  "behemoth", "kraken", "roc", "wyvern", "manticore", "harpy", "siren",
  "valkyrie", "odin", "thor", "loki", "freya", "baldur", "fenrir", "yggdrasil",
  "valhalla", "ragnarok", "jormungandr", "mjolnir", "gungnir", "sleipnir",
  "anubis", "osiris", "thoth", "horus", "sekhmet", "khepri", "nefertiti",
  "gilgamesh", "enkidu", "ishtar", "marduk", "tiamat", "quetzalcoatl",

  // — Fantasy & Magic —
  "wizard", "sorcerer", "enchanter", "summoner", "diviner", "oracle",
  "prophet", "herald", "champion", "sentinel", "guardian", "warden",
  "vanguard", "crusader", "templar", "assassin", "berserker", "archmage",
  "spellblade", "runesmith", "hexblade", "warlock", "lich", "wraith",
  "specter", "revenant", "golem", "familiar", "elemental", "djinn",
  "nymph", "dryad", "sylph", "undine", "gnome", "sprite", "pixie",
  "brownie", "boggart", "banshee", "kelpie", "selkie", "changeling",
  "amulet", "talisman", "grimoire", "codex", "scroll", "rune", "sigil",
  "glyph", "cipher", "hex", "curse", "boon", "ward", "charm", "relic",
  "artifact", "shard", "nexus", "portal", "vortex", "rift", "prism",

  // — Space & Astronomy —
  "quasar", "nebula", "pulsar", "magnetar", "neutron", "photon", "plasma",
  "fusion", "antimatter", "wormhole", "singularity", "accretion", "parallax",
  "aphelion", "perihelion", "ecliptic", "meridian", "galactic", "stellar",
  "orbital", "trajectory", "periapsis", "apoapsis", "inclination", "precession",
  "nutation", "albedo", "magnitude", "redshift", "blueshift", "spectrum",
  "protostar", "supergiant", "hypergiant", "dwarf", "binary", "cluster",
  "filament", "void", "baryon", "lepton", "quark", "boson", "fermion",
  "neutrino", "positron", "muon", "gluon", "hadron", "meson", "proton",

  // — Technology (clean terms only) —
  "algorithm", "bandwidth", "compiler", "debugger", "firewall", "firmware",
  "gateway", "hardware", "interface", "kernel", "latency", "malware",
  "overflow", "pipeline", "protocol", "runtime", "sandbox", "software",
  "terminal", "virtual", "webhook", "buffer", "packet", "socket", "thread",
  "mutex", "callback", "closure", "iterator", "generator", "promise",
  "module", "library", "framework", "component", "middleware", "endpoint",
  "payload", "schema", "migration", "deployment", "repository", "branch",
  "commit", "merge", "rebase", "refactor", "benchmark", "profiler",
  "emulator", "simulator", "container", "cluster", "orchestrate", "provision",

  // — Science & Mathematics —
  "entropy", "catalyst", "polymer", "isotope", "electron", "proton",
  "molecule", "compound", "reaction", "synthesis", "oxidation", "reduction",
  "diffusion", "osmosis", "mitosis", "meiosis", "ribosome", "chromosome",
  "genome", "protein", "enzyme", "hormone", "neuron", "synapse", "cortex",
  "cerebrum", "thalamus", "hippocampus", "amygdala", "dendrite", "axon",
  "gradient", "derivative", "integral", "vector", "tensor", "scalar",
  "eigenvalue", "determinant", "topology", "manifold", "fractal", "chaos",
  "resonance", "frequency", "amplitude", "wavelength", "refraction",
  "diffraction", "interference", "polarization", "capacitor", "inductor",

  // — Geography & Places —
  "peninsula", "archipelago", "isthmus", "plateau", "prairie", "steppe",
  "taiga", "chaparral", "wetland", "floodplain", "watershed", "aquifer",
  "tributary", "confluence", "meander", "oxbow", "alluvial", "moraine",
  "drumlin", "esker", "kame", "cirque", "arête", "col", "nunatak",
  "caldera", "fumarole", "solfatara", "lava", "pumice", "obsidian", "basalt",
  "granite", "marble", "quartz", "feldspar", "mica", "schist", "gneiss",
  "sandstone", "limestone", "shale", "slate", "chalk", "flint", "jasper",

  // — Abstract & Philosophical —
  "serenity", "clarity", "harmony", "balance", "justice", "virtue",
  "courage", "wisdom", "patience", "resilience", "tenacity", "integrity",
  "empathy", "compassion", "gratitude", "purpose", "destiny", "legacy",
  "paradox", "axiom", "theorem", "corollary", "premise", "inference",
  "deduction", "induction", "analogy", "metaphor", "allegory", "parable",
  "archetype", "paradigm", "zeitgeist", "ethos", "pathos", "logos",
  "nihilism", "stoicism", "pragmatism", "empiricism", "rationalism",
];
