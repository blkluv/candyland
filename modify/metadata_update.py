import json
import os

# Define the relative file path to plots.json based on your directory structure
file_path = 'data/plots.json'

# Define the new values to be updated
new_values = {
  "link": "https://commerce.coinbase.com/checkout/c5e7dac9-6baa-4800-b0d9-893f3fc7b16c",
  "🌟 Rarity": "Rare",
  "💰 Minerals": "X",
  "💧 Water": "1%",
  "🏠 Land Type": "Residential",
  "🎖️ Title": "Citizen",
  "🌊 View": "City"
}

# Define the coordinate ranges
x_range = range(178, 222)
y_range = range(136, 162)

# Check if the file exists at the given path
if os.path.exists(file_path):
  # Load the JSON file
  with open(file_path, 'r') as f:
      plots = json.load(f)

  # Loop through each plot and update the properties if within the specified coordinates
  for plot in plots:
      if plot.get("x") in x_range and plot.get("y") in y_range:
          for key, value in new_values.items():
              plot[key] = value

  # Save the updated JSON back to the same file
  with open(file_path, 'w') as f:
      json.dump(plots, f, indent=4)

  print("Plots updated successfully!")
else:
  print(f"Error: File not found at {file_path}")