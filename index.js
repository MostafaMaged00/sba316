const btnPaste = document.getElementById("btnPaste");
const btnClear = document.getElementById("btnClear");

const textParag = document.getElementById("textAnlz");

const textarea1 = document.getElementById("textarea1");

//create a event to past text from clipboard
btnPaste.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    textParag.innerText = text;
    btnPaste.classList.add("inactive");
    console.log("Text pasted.");
  } catch (error) {
    console.log("Failed to read clipboard");
  }
});

//clear function
btnClear.addEventListener("click", function () {
  console.log("test");

  //clear list items
  listItems.innerHTML = "";
  textParag.innerText = "";
});

const btnAnlyz = document.getElementById("btnAnlyz");

btnAnlyz.addEventListener("click", function () {
  const text = textParag.innerText;
  getStat(text);
});

function getStat(text) {
  // Check if the input is a valid string
  if (typeof text !== "string") {
    return "Input should be a string.";
  }

  // Clean the text: Remove non-alphanumeric characters (except spaces), and convert to lowercase
  const cleanedText = text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "");

  // Split the cleaned text into an array of words
  const words = cleanedText.split(/\s+/).filter(Boolean); // Split by spaces and remove empty strings

  const wordCount = words.length;

  // Create an object to store the frequency of each word
  const wordFrequency = {};

  words.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  // Count unique words (length of wordFrequency object)
  const uniqueWordCount = Object.keys(wordFrequency).length;

  // Find the most frequent word (if any)
  let mostFrequentWord = null;
  let highestFrequency = 0;

  for (const [word, frequency] of Object.entries(wordFrequency)) {
    if (frequency > highestFrequency) {
      highestFrequency = frequency;
      mostFrequentWord = word;
    }
  }

  console.log(`wordCount: ${wordCount}`);
  console.log(`uniqueWordCount: ${uniqueWordCount}`);
  console.log(`mostFrequentWord: ${mostFrequentWord}`);
  console.log(`highestFrequency: ${highestFrequency}`);
}
