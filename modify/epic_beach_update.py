import json
import random

# 
file_path = 'data/plots.json'

# 
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 
def random_mineral():
    elements = [
        "Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon", 
        "Sodium", "Magnesium", "Aluminium", "Silicon", "Phosphorus", "Sulfur", "Chlorine", "Argon", "Potassium", 
        "Calcium", "Scandium", "Titanium", "Vanadium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", 
        "Copper", "Zinc", "Gallium", "Germanium", "Arsenic", "Selenium", "Bromine", "Krypton", "Rubidium", 
        "Strontium", "Yttrium", "Zirconium", "Niobium", "Molybdenum", "Technetium", "Ruthenium", "Rhodium", 
        "Palladium", "Silver", "Cadmium", "Indium", "Tin", "Antimony", "Tellurium", "Iodine", "Xenon", 
        "Caesium", "Barium", "Lanthanum", "Cerium", "Praseodymium", "Neodymium", "Promethium", "Samarium", 
        "Europium", "Gadolinium", "Terbium", "Dysprosium", "Holmium", "Erbium", "Thulium", "Ytterbium", 
        "Lutetium", "Hafnium", "Tantalum", "Tungsten", "Rhenium", "Osmium", "Iridium", "Platinum", "Gold", 
        "Mercury", "Thallium", "Lead", "Bismuth", "Polonium", "Astatine", "Radon", "Francium", "Radium", 
        "Actinium", "Thorium", "Protactinium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", 
        "Berkelium", "Californium", "Einsteinium", "Fermium", "Mendelevium", "Nobelium", "Lawrencium", 
        "Rutherfordium", "Dubnium", "Seaborgium", "Bohrium", "Hassium", "Meitnerium", "Darmstadtium", 
        "Roentgenium", "Copernicium", "Nihonium", "Flerovium", "Moscovium", "Livermorium", "Tennessine", 
        "Oganesson"
    ]
    return random.choice(elements)

# 
images_to_update = [
    "images/beach_3_corner_down_left.png",
    "images/beach_3_corner_down_right.png",
    "images/beach_3_corner_left.png",
    "images/beach_3_corner_right.png",
    "images/beach_corner_down_left.png",
    "images/beach_corner_down_right.png",
    "images/beach_corner_up_left.png",
    "images/beach_corner_up_right.png",
    "images/beach_horizontal_down.png",
    "images/beach_horizontal_up.png",
    "images/beach_horizontal.png",
    "images/beach_vertical_left.png",
    "images/beach_vertical_right.png"
]

# 
for plot in data:
    if plot.get("image") in images_to_update:  # 
        plot["🏠 Land Type"] = "Beach"
        plot["💰 Minerals"] = random_mineral()
        plot["🌟 Rarity"] = "Epic"
        plot["💧 Water"] = str(random.randint(1, 30))
        plot["📈 Income"] = str(random.randint(1, 30))
        plot["🌊 View"] = "Ocean"
        plot["📦 Storage"] = str(random.randint(30, 60))
        plot["link"] = "https://commerce.coinbase.com/checkout/c5e7dac9-6baa-4800-b0d9-893f3fc7b16c"

# 
with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Обновление завершено.")
