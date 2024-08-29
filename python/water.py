import csv
import random
import json

with open("../our world in data malnutrition.csv") as f:
    reader = csv.reader(f)
    header = next(reader)
    print(header)
    percents = {} # % access to safe drinking water by country & year
    for row in reader:
        country =  row[0]
        year = row[2]
        percentage = float(row[3])
        percents[country] = percentage, year
    print(len(percents))

def jiggle(value, amount=30):
    return value + random.uniform(-amount, amount)

def generate_choices(value):
    if value < 20:
        wrongchoice = [
            [value + 20, value + 60, value + 80],
            [jiggle(value + 10,5), jiggle(value + 30,20), jiggle(value + 50)]]
    elif value < 50:
        wrongchoice = [
            [value - 10, value + 25, value + 50],
            [jiggle(value - 10,5), jiggle(value + 15,10), jiggle(value + 35,15)]]
    else:
        wrongchoice = [
            [value - 40, value - 20, value - 10],
            [jiggle(value - 30,20), jiggle(value - 15,10), jiggle(value - 10,5)]]
    return random.choice(wrongchoice)

num_questions = 10
score = 0
'''
for x in range(num_questions):
    length = len(percents)
    r = random.randint(0,length-1)
    key = list(percents)[r] #a country-year pair
    value = percents[key] #the % of people with clean drinking water

    letters = ["A", "B", "C", "D"]
    correctchoice = value
    wrongchoice = generate_choices(value)
    choices = [correctchoice] + [wrongchoice]

    li = [0,1,2,3]
    random.shuffle(li) #li will denote what index to go into in choices
    print("What % of the people had access to clean drinking water","in",key[0],"in",key[1],"?")
    for x in range(4):
        if li[x] == 0:  #This is the correct answer choice
            print(f"{letters[x]}: {choices[0]:.2f}%")
        else:
            print(f"{letters[x]}: {choices[1][li[x]-1]:.2f}%")
    answer = input()
    index = letters.index(answer)
    if li[index]==0:
        print("Correct!")
        score += 1
    else:
        print("Incorrect.")

print(f"\nYour final score is {score} out of {num_questions}.")
'''
with open("../json/water.json",'w') as f:
    f.write("var water = ")
    json.dump(percents,f, indent=2)
