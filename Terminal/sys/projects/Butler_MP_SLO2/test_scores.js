"use strict";
const $ = selector => document.querySelector(selector);

const names = ["Ben", "Joel", "Judy", "Anne"];
const scores = [88, 98, 77, 88];

document.addEventListener("DOMContentLoaded", () => {
	// add event handlers
	$("#name").focus();
	$("#add").addEventListener("click", addScore);
	$("#display_results").addEventListener("click", displayResults);
	$("#display_scores").addEventListener("click", displayScores);
});

function displayResults() {
	console.log("HI")
	// Calculate the average score
	const sum = scores.reduce((acc, score) => acc + score, 0);
	const average = sum / scores.length;
  
	// Find the highest score
	const highest = Math.max(...scores);
  
	// Get the "results" div element
	const resultsDiv = $("#results");
  
	// Create or update the HTML elements
	const heading = document.createElement("h2");
	heading.textContent = "Results";
  
	const averageParagraph = document.createElement("p");
	averageParagraph.textContent = `Average Score: ${average.toFixed(2)}`;
  
	const highestParagraph = document.createElement("p");
	highestParagraph.textContent = `Highest Score: ${highest}`;
  
	// Clear any existing content in the "results" div
	resultsDiv.innerHTML = "";
  
	// Append the new elements to the "results" div
	resultsDiv.appendChild(heading);
	resultsDiv.appendChild(averageParagraph);
	resultsDiv.appendChild(highestParagraph);
  }
  function displayScores() {
	// Get the "scores" div element
	const scoresDiv = $("#scores");
  
	// Clear any previous nodes
	scoresDiv.innerHTML = "";
  
	// Iterate over names and scores arrays and create HTML elements
	for (let i = 0; i < names.length; i++) {
	  const nameLabel = document.createElement("label");
	  nameLabel.textContent = names[i];
  
	  const scoreLabel = document.createElement("label");
	  scoreLabel.textContent = scores[i];
  
	  // Add a line break after each pair of name and score
	  const lineBreak = document.createElement("br");
  
	  // Append the elements to the "scores" div
	  scoresDiv.appendChild(nameLabel);
	  scoresDiv.appendChild(scoreLabel);
	  scoresDiv.appendChild(lineBreak);
	}
  }
  function addScore() {
	const nameInput = $("#name");
	const scoreInput = $("#score");
  
	// Get the values from the input fields
	const name = nameInput.value;
	const score = parseFloat(scoreInput.value); // Convert the score to a floating-point number
  
	// Check if both name and score are provided and if score is a valid number within the 0-100 range
	if (name !== "" && !isNaN(score) && score >= 0 && score <= 100) {
	  // Add the name and score to their respective arrays
	  names.push(name);
	  scores.push(score);
  
	  // Clear the input fields after adding the score
	  nameInput.value = "";
	  scoreInput.value = "";
	} else {
	  // Display an error message if the input is invalid
	  alert("Invalid input. Please enter both a name and a valid score between 0 and 100.");
	}
	displayScores();
	displayResults();
	$("#name").focus();
  }
   
  