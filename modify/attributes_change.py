import json

# Read data from file
with open('data/plots.json', 'r', encoding='utf-8') as file:
  data_list = json.load(file)

# Function to modify each entry
def modify_entry(entry):
  # Remove percentage signs from "Water" and "Income"
  if "💧 Water" in entry:
      entry["💧 Water"] = entry["💧 Water"].replace('%', '')
  if "📈 Income" in entry:
      entry["📈 Income"] = entry["📈 Income"].replace('%', '')
  
  # Remove the "🎖️ Title" key if it exists
  if "🎖️ Title" in entry:
      del entry["🎖️ Title"]

# Apply changes to all entries
for entry in data_list:
  modify_entry(entry)

# Write modified data back to file
with open('modified_data.json', 'w', encoding='utf-8') as file:
  json.dump(data_list, file, ensure_ascii=False, indent=4)

print("Changes successfully applied and saved to 'modified_data.json'.")