import json

# Путь к JSON файлу
file_path = 'data/plots.json'

# Загрузка данных из JSON файла
with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Обновляем данные для всех участков
for plot in data:
    # Проверка на наличие изображения "images/land.png"
    if plot.get("image") == "images/financial.png":  # Убедитесь, что путь указан правильно
        # Меняем расширение на .webp
        plot["image"] = "images/financial.webp"  # Заменяем .png на .webp

# Сохранение обновленных данных обратно в файл
with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Обновление завершено.")
