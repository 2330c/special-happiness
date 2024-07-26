"""This program gets the data from ../json/literacy.json as a Python dictionary. Since JSON syntax and Python dictionary syntax are so similar, few changes need to be made.

We ignore the first four characters 'var ' because that is specific to JS. It's important that the JSON file was saved with the standard indentation, because indentation is important in Python!"""
"""It's literacy.json & mortality rate.json have dictionaries as values, whereas water.json & malnutrition.json have arrays as values. In literacy, we look at the key 'total population', whereas in mortality rate, it's 'total'."""

import os, json, numpy as np

def calquintiles(data, key = 'total population'):
    rates = []
    
    for country in data:
        rate = data[country][key]
        if type(rate) == type(""):
            rate = float(rate.strip('%'))
        rates.append(rate)

    percentiles = np.percentile(rates, [0, 20, 40, 60, 80, 100])

    quintiles = {
        'Q1': [],
        'Q2': [],
        'Q3': [],
        'Q4': [],
        'Q5': []
    }

    for country in data:
        rate = data[country][key]
        if type(rate) == type(""):
            rate = float(rate.strip('%'))
        if rate <= percentiles[1]:
            quintiles['Q1'].append(country)
        elif rate <= percentiles[2]:
            quintiles['Q2'].append(country)
        elif rate <= percentiles[3]:
            quintiles['Q3'].append(country)
        elif rate <= percentiles[4]:
            quintiles['Q4'].append(country)
        else:
            quintiles['Q5'].append(country)

    return percentiles, quintiles

if __name__ == "__main__":
    dirname = os.path.dirname(__file__)
    option = input("Choose one:\n"+
                   "(1) Literacy\n"+
                   "(2) Malnutrition\n"
                   "(3) Mortality rate\n"+
                   "(4) Water\n")
    if len(option) > 1:
        option = option[0]
    elif len(option) < 1:
        option = "1"
    if option not in ["1","2","3","4"]:
        option = "1"
    filenames = {"1":"literacy.json",
               "2":"malnutrition.json",
               "3":"mortality rate.json",
               "4":"water.json"}
    output_filename = {"1":"literacyrate_AB_quiz.js",
                       "2":"malnutrition_AB_quiz.js",
                       "3":"mortalityrate_AB_quiz.js",
                       "4":"water_AB_quiz.js"}
    filename = os.path.join(dirname, "../json/"+filenames[option])
    output_filename = os.path.join(dirname, "../json/" + output_filename[option])

    with open(filename) as f:
        t = f.readlines()
        t = "".join(t)
        #print(t)
        i = t.index("=")
        data = json.loads(t[i+1:].strip())
    
    key = 0 #For arrays (which become lists), we want to use index 0, which has the rate
    if option == "1":
        key = "total population"
    elif option == "3":
        key = "total"
    percentiles, quintiles = calquintiles(data, key)

    print("Percentiles:", percentiles)
    for q in quintiles:
        print(f"Quintile {q}: {len(quintiles[q])} countries")
        print(quintiles[q])

    with open(output_filename, 'w') as json_file:
        json_file.write("var quintiles = ")
        json.dump(quintiles, json_file, indent=2)

    print(f"{output_filename} saved.")