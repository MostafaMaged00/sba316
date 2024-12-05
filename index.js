const btnPaste = document.getElementById("btnPaste");
const btnClear = document.getElementById("btnClear");

const textParag = document.getElementById("textAnlz");

const textarea1 = document.getElementById("textarea1");

//create a event to past text from clipboard to textarea
btnPaste.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    textarea1.value = text;
    btnPaste.classList.add("inactive");
    console.log("Text pasted.");
  } catch (error) {
    console.log("Failed to read clipboard");
  }
});

//clear function
btnClear.addEventListener("click", function () {
  // console.log("test");
  //clear list items
  listItems.innerHTML = "";
  textarea1.value = "";
  // textParag.innerText = "";
  btnPaste.classList.remove("inactive");
  btnAnlyz.classList.remove("inactive");
});

const btnAnlyz = document.getElementById("btnAnlyz");
btnAnlyz.addEventListener("click", function () {
  const text = textarea1.value;
  getStat(text);
  btnAnlyz.classList.add("inactive");
});

//create a function to analyze text
function getStat(text) {
  // Check if the input is a valid string
  if (typeof text !== "string") {
    return "Input should be a string.";
  }

  const stopwords = ["a", "The"];

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

  const ul = document.getElementById("listItems");

  const li1 = document.createElement("li");
  li1.textContent = `Word Count : ${wordCount}`;
  ul.appendChild(li1);

  const li2 = document.createElement("li");
  li2.textContent = `unique Word Count: ${uniqueWordCount}`;
  ul.appendChild(li2);

  const li3 = document.createElement("li");
  li3.textContent = `Most Frequent Word: ${mostFrequentWord}`;
  ul.appendChild(li3);

  const li4 = document.createElement("li");
  li4.textContent = `Highest Frequency: ${highestFrequency}`;
  ul.appendChild(li4);
}
