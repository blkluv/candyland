import json

# Путь к JSON файлу
file_path = 'data/plots.json'

# Загрузка данных из JSON файла
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Новый линк, который будет установлен
new_link = "https://commerce.coinbase.com/checkout/65d378d3-ed7c-41f7-b193-ee280225bf21"

# Обновляем данные для всех участков
for plot in data:
    # Проверка, является ли редкость "Epic"
    if plot.get("🌟 Rarity") == "Epic":
        # Меняем значение поля "link" на новый
        plot["link"] = new_link

# Сохранение обновленных данных обратно в файл
with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Обновление ссылок завершено.")
