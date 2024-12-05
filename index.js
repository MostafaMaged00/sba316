const btnPaste = document.getElementById("btnPaste");
const btnClear = document.getElementById("btnClear");

const textParag = document.getElementById("textAnlz");

const textarea1 = document.getElementById("textarea1");

//create a event to past text from clipboard to textarea
btnPaste.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    console.log(text.length);
    // if (text.length > 500) {
    //   text = text.slice(0, 500);
    // }
    textarea1.value = text.slice(0, 1000);
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
  // Ensure input is a string
  if (typeof text !== "string") {
    throw new Error("text must be a string");
  }
  if (text.length > 500) {
    text = text.slice(0, 500);
  }

  // List of common words to ignore in unique word counts and most repeated word calculation
  const stopWords = new Set([
    "is",
    "and",
    "the",
    "of",
    "in",
    "a",
    "to",
    "for",
    "on",
    "with",
    "at",
    "by",
    "an",
    "as",
    "was",
    "this",
    "that",
    "after",
    "be",
    "",
  ]);

  // Clean the input by removing extra spaces, trimming, and collapsing multiple spaces
  const cleanedInput = text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "");

  // Split the string into words
  const words = cleanedInput.split(/\s+/);

  // Total word count
  const totalWords = words.length;

  // Create a frequency map to count occurrences of each word (ignoring stop words)
  const wordCount = {};

  words.forEach((word) => {
    const cleanedWord = word.toLowerCase(); // Convert to lowercase to avoid case-sensitivity
    if (!stopWords.has(cleanedWord)) {
      wordCount[cleanedWord] = (wordCount[cleanedWord] || 0) + 1;
    }
  });

  console.log(wordCount);
  console.log(typeof wordCount);

  // Count unique words (excluding stop words)
  const uniqueWordsCount = Object.keys(wordCount).length;

  // Find the most repeated word (excluding stop words)
  let mostRepeatedWord = "";
  let maxCount = 0;
  for (const [word, count] of Object.entries(wordCount)) {
    if (count > maxCount) {
      mostRepeatedWord = word;
      maxCount = count;
    }
  }
  const ul = document.getElementById("listItems");

  const li1 = document.createElement("li");
  li1.textContent = `Word Count : ${totalWords}`;
  ul.appendChild(li1);

  const li2 = document.createElement("li");
  li2.textContent = `unique Word Count: ${uniqueWordsCount}`;
  ul.appendChild(li2);

  if (maxCount > 1) {
    const li3 = document.createElement("li");
    li3.textContent = `Most Frequent Word: `;
    ul.appendChild(li3);

    const li4 = document.createElement("li");
    li4.textContent = `Highest Frequency:`;
    ul.appendChild(li4);
  }

  Object.entries(wordCount)
    .filter(([key, value]) => value > 1)
    .sort((a, b) => b[1] - a[1])
    .forEach(([key, value]) => {
      const listItem = document.createElement("li");
      listItem.textContent = ` \t\t\t${key}: \t ${value}`;
      ul.appendChild(listItem);
    });
}
