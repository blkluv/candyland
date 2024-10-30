import json

# 
file_path = 'data/plots.json'

# 
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 
new_link = "https://commerce.coinbase.com/checkout/65d378d3-ed7c-41f7-b193-ee280225bf21"

# 
for plot in data:
    # 
    if plot.get("🌟 Rarity") == "Epic":
        # 
        plot["link"] = new_link

# 
with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Обновление ссылок завершено.")
