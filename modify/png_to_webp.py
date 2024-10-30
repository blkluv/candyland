import json

# 
file_path = 'data/plots.json'

# 
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 
for plot in data:
    # 
    if plot.get("image") == "images/financial.png":  # 
        # 
        plot["image"] = "images/financial.webp"  # 

# 
with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Обновление завершено.")
