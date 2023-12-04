#Main Function
def main():
  totalhours = []
  Gpas = []
  overallhours = 0
  #uses the list of total hours as a control statement to stop the loop
  while len(totalhours) <= 6:
    name = input("Course name (Enter Done to end): ")
    # Break statement for if you want less than 6 iterations
    if(name == "Done"):
      break
    credits = float(input("Course Credit Hours: "))
    
    #Put the values of the iteration into the variables
    totalhours.append(credits)
    grade = GetPoints(input("Letter Grade : "))
    Gpas.append(grade)
    #formatting for readability
    print("\n" * 3)

  # Calculate The total credit hours and print the average GPA
  for hour in totalhours:
    overallhours += hour
  print("Gpa = " + float(Average(Gpas)))
  print("Total credit Hours = " + overallhours)


# Returns points for each letter grade
def GetPoints(Grade):
  if(Grade == "A"):
    return float(4)
  elif(Grade == "B"):
    return float(3)
  elif(Grade == "C"):
    return float(2)
  elif(Grade == "D"):
    return float(1)
  else:
    return float(0)

#General purpose function to average a List
def Average(listtoaverage):
  average = 0
  for item in listtoaverage:
    average += item
  return average/len(listtoaverage)



if __name__ == "__main__":
    main()