import json
import os

# Define the relative file path to plots.json based on your directory structure
file_path = 'data/plots.json'

# Check if the file exists at the given path
if os.path.exists(file_path):
    # Load the JSON file
    with open(file_path, 'r') as f:
        plots = json.load(f)

    # Loop through each plot and add the new properties
    for plot in plots:
        plot["🌆 District"] = "BitVille"
        plot["🌟 Rarity"] = "Legendary"
        plot["💰 Minerals"] = "Titanium"
        plot["💧 Water"] = "25%"
        plot["🏠 Land Type"] = "Water"
        plot["📈 Income"] = "5%"
        plot["🎖️ Title"] = "Waterlord"
        plot["🌊 View"] = "Ocean"

    # Save the updated JSON back to the same file
    with open(file_path, 'w') as f:
        json.dump(plots, f, indent=4)

    print("Plots updated successfully!")
else:
    print(f"Error: File not found at {file_path}")
