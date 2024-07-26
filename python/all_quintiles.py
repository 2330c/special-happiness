import json, numpy as np

quintiles = np.percentile([20, 40, 60, 80])

quintile_data = {
    "quintiles": {
        "Q1": quintiles[0],
        "Q2": quintiles[1],
        "Q3": quintiles[2],
        "Q4": quintiles[3]
    }
}

with open('quintiles.json', 'w') as json_file:
    json.dump(quintile_data, json_file, indent=4)

print("Quintiles have been saved.")