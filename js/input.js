// Api URL
const dictionaryAPI = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// eslint-disable-next-line no-undef
const name = prompt('Ingrese su nombre')

// Arrays
const alphabet = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMÑOPQRSTUVWXYZ';
// eslint-disable-next-line no-array-constructor
const dictionary = new Array()
// eslint-disable-next-line no-unused-vars
const words = new Array();
// eslint-disable-next-line prefer-const
let numbers = new Array();
const colors = [
  'rojo', 'azul', "verde", "amarillo", "naranja", "negro", 'blanco', 'gris', 'rosa', 'violeta',
    'celeste', "marrón", "beige", "turquesa", "dorado", "plateado", "salmón", "café", "cian", "magenta",
    'lavanda', "teal", "marfil", "ocre", "pardo", "carmesí", "escarlata", "esmeralda", "turmalina", "zafiro",
    "rubí", 'topacio', "aguamarina", "amatista", "cuarzo", "cristal", "perla", "diamante", "carbón", "grafito",
    "plomo", 'aluminio', "cobre", "bronce", "latón", "hierro", "acero", "estaño", "platino", "paladio",
    "rodio", 'iridio', "rutenio", "osmio", "titanio", "vanadio", "cromo", "manganeso", "cobalto", "níquel",
    "cinc", "galio", "germanio", "arsénico", "selenio", "bromo", "kriptón", "rubidio", "estroncio", "itrio",
    "circonio", "niobio", "molibdeno", "tecnecio", "rutenio", "rodio", "paladio", "plata", "cadmio", "indio",
    "antimonio", "telurio", "yodo", "xenón", "cesio", "bario", "lantano", "cerio", "praseodimio", "neodimio",
    "prometio", "samario", "europio", "gadolinio", "terbio", "disprosio", "holmio", "erbio", "tulio", "iterbio",
    "lutecio", "hafnio", "tantalio", "wolframio", "renio", "mercurio", "talio", "plomo", "bismuto", "polonio"
]

// Welcome greetings
const morningGreatings = ['Buenos dias', 'Que tenga un lindo dia', 'Comenzando un buen dia'];
const afternoonGreatings = ['Buenas tardes', 'Que tenga una linda tarde', 'Disfrute de la tarde'];
const nightGreatings = ['Buenas noches', 'Que tenga una linda noche']

function getHour () {
  const date = new Date()
  const hour = date.getHours()
  return hour
}

if (getHour() >= 6 && getHour() < 12) {
  // eslint-disable-next-line no-undef
  alert(morningGreatings[Math.floor(Math.random() * morningGreatings.length)] + ' ' + name)
} else if (getHour() >= 12 && getHour() < 19) {
  // eslint-disable-next-line no-undef
  alert(afternoonGreatings[Math.floor(Math.random() * afternoonGreatings.length)] + ' ' + name)
} else if (getHour() >= 19 || getHour() < 6) {
  // eslint-disable-next-line no-undef
  alert(nightGreatings[Math.floor(Math.random() * nightGreatings.length)] + ' ' + name)
}

// ----------------------------------------------

// Function to get the definition of a word from the dictionary API
async function getDefinition (word) {
  try {
    const response = await fetch(`${dictionaryAPI}${word}`)
    const data = await response.json()
    if (data && data.length > 0 && data[0].meanings && data[0].meanings.length > 0) {
      return data[0].meanings[0].definitions[0].definition
    } else {
      return 'No se encontró la definición.'
    }
  } catch (error) {
    console.error('Error fetching definition:', error)
    return 'Error al obtener la definición.'
  }
}

// ----------------------------------------------

// Registering phrase button and stadistics
const phraseButton = document.getElementById('phraseButton')
const phraseResult = document.getElementById('aresult')
const letters = document.getElementById('letters-result')
const phrase = document.getElementById('phrase')

phraseButton.addEventListener('click', () => {
  const counter = counterLetterA(phrase.value)
  const letterCounter = counterLetters(phrase.value)

  wordInPhrase(phrase.value.trim())

  phraseResult.innerHTML = `<p>Letras a: ${counter}</p>`
  letters.innerHTML = `<p>Espacios: ${letterCounter}</p>`
    
    //Add options to select wordResult by a foreach
    const inputWords = document.getElementById("words-result")
    inputWords.innerHTML = "";
    dictionary.forEach(word => {
        const change = word.toLowerCase();
        const wordFormatted = capitalizedWord(change);
        const option = document.createElement("option");
        option.value = wordFormatted;
        option.text = wordFormatted;
        addWordToServer(wordFormatted)
        inputWords.appendChild(option);
    });
});

// ----------------------------------------------

//Dictionary functions
const getMeaningButton = document.getElementById("getMeaning");
getMeaningButton.addEventListener("click", async () => {
    const selectElement = document.getElementById("dictionary");
    const selectedWord = selectElement.value;
    if (selectedWord) {
        const definition = await getDefinition(selectedWord);
        alert(`Definición de ${selectedWord}: ${definition}`);
    } else {
        alert("Por favor, selecciona una palabra del diccionario.");
    }
});

// ----------------------------------------------

//Registering color button and stadistics
const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const color3 = document.getElementById("color3");
const colors1 = document.getElementById("colors1");
const colors2 = document.getElementById("colors2");
const colors3 = document.getElementById("colors3");
const colorButton = document.getElementById("colorButton");

colorButton.addEventListener("click", () => {
    let color1Result = verifyColor(color1.value.trim());
    let color2Result = verifyColor(color2.value.trim());
    let color3Result = verifyColor(color3.value.trim());

    if(color1Result){
        colors1.innerText = color1.value.trim();
    }else {
        color1.innerText = "Color no válido";
    }

    if(color2Result){
         colors2.innerText = color2.value.trim();
    }else {
         colors2.innerText = "Color no válido";
    }

    if(color3Result){
         colors3.innerText = color3.value.trim();
         let difinition = displayDefinitions(color3.value.trim());
         console.log(difinition);
    }else {
         colors3.innerText = "Color no válido";
    }

    populateSelect("dictionary", dictionary);
});

// ----------------------------------------------

//Registering number button and stadistics

const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const number3 = document.getElementById("number3");
const numberButton = document.getElementById("numberButton");



numberButton.addEventListener("click", () => {
    addNumbers(number1.value.trim());
    addNumbers(number2.value.trim());
    addNumbers(number3.value.trim());

    const numbersRegister = document.getElementById("numbers-registered");
    numbersRegister.innerHTML= '';

    numbers.forEach(number=> {
        const option = document.createElement("option");
        option.value=number;
        option.text=number;
        numbersRegister.appendChild(option);
    })

});

// ----------------------------------------------

//Favorite phrase and like, dislike buttons

const getPhraseButton = document.getElementById("generatePhrase");
const randomPhrase = document.getElementById("phraseGenerate");
getPhraseButton.addEventListener("click", () => {
    let phrase = generateRandomPhrase();
    if(phrase == undefined){
        alert("No hay suficientes palabras en el diccionario");
        randomPhrase.innerText = "No hay suficientes palabras en el diccionario";
    }
    else{
        alert(phrase);
        randomPhrase.innerText = phrase;
    }
});

const like = document.getElementById("like-phrase");
const dislike = document.getElementById("dislike-phrase");
const favorite = document.getElementById("favorite-phrase");
const currentFavorite = "";

like.addEventListener("click", () => {
    if(randomPhrase.innerText != "" && randomPhrase.innerText != "No hay suficientes palabras en el diccionario"){
        favorite.innerText = randomPhrase.innerText;
        currentFavorite = randomPhrase.text;
    }else{
        favorite.innerText = "Error. No hay frase generada";
    }

    console.log(currentFavorite);
});

dislike.addEventListener("click", () => {
    if(randomPhrase.innerText != "" && randomPhrase.innerText != "No hay suficientes palabras en el diccionario"){
        randomPhrase.innerText = "...";
        currentFavorite = "";
    }else{
        favorite.innerText = "Error. No hay frase generada";
    }
});



function generateRandomPhrase(){
    let dictionary = window.dictionary || [];
    if(dictionary.length > 10){
        let useWords = new Array();
        for(let i = 0;i < 10;i++){
            let random = Math.floor(Math.random() * dictionary.length);
            if(!useWords.includes(dictionary[random].text)){
                useWords.push(dictionary[random].text);
            }else{
                i--;
            }
        }
        return useWords.join(" ");
    }else{
        alert("No hay suficientes palabras en el diccionario");
    }
}

//-------------------------------------------------


//Functions to stadistics
function verifyColor(color){
    color = color.toLowerCase();
    if(colors.includes(color)){
        if(!dictionary.includes(color)){
            dictionary.push(color);
        }
        return true;
    }else{
        return false;
    }
}

function counterLetterA (phrase) {
  let counter = 0
  for (let i = 0; i < phrase.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (phrase[i] == 'a' || phrase[i] == 'A') {
      counter++
    }
  }
  return counter
}

function counterLetters (phrase) {
  let counter = 0
  for (let i = 0; i < phrase.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (phrase[i] == ' ') {
      counter++
    }
  }
  return counter
}


function wordInPhrase(phrase){
    let word = "";
    let words = phrase.split(" ");

    words.forEach(function(w){
        let word = "";
        for(let i = 0;i < w.length;i++){
            if(alphabet.includes(w[i])){
                word += w[i];
            }
        }
        if(!dictionary.includes(word)){
            const firstLetter = word.charAt(0)
            const firstLetterCap = firstLetter.toUpperCase()
            const remainingLetters = word.slice(1)
            const capitalizedWord = firstLetterCap + remainingLetters
            dictionary.push(capitalizedWord);
        }
    });
    populateSelect("dictionary", dictionary);
}

function addNumbers(number){
    if(!numbers.includes(number) && verifyNumbers(number)){
        numbers.push(number);
    }
}   

function populateSelect(selectElementId, items) {
    const selectElement = document.getElementById(selectElementId);
    selectElement.innerHTML = ""; 
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.text = item;
        selectElement.appendChild(option);
    });
}

function verifyNumbers(number){

    return /^\d+$/.test(number);
}

//function to check if the word is written correctly using gramatical

const correction = document.getElementById("correction");
const correctionText = document.getElementById("input-correction");
correction.addEventListener("click", () => {
    gsCorrection( correctionText.value.trim());
});

function gsCorrection(text){
    const NLPCloudClient = require('nlpcloud');
    const user = new NLPCloudClient({model:'llama-3-1-405b',token:' 1e60c1935c4522255f9a94f74f4fd0d693eba288 ',gpu:true})
    // Returns an Axios promise with the results.
    // In case of success, results are contained in `response.data`. 
    // In case of failure, you can retrieve the status code in `err.response.status` 
    // and the error message in `err.response.data.detail`.
    user.gsCorrection({text:text}).then(function (response) {
        console.log(response.data);
    })
    .catch(function (err) {
        console.error(err.response.status);
        console.error(err.response.data.detail);
    });
}

// ----------------------------------------------

const wordSearched = document.getElementById('word-searched')
const btnSearch = document.getElementById('btn-search')

btnSearch.addEventListener('click', async () => {
  const word = wordSearched.value
  const wordSwitch = word.toLowerCase()
  const wordFormatted = capitalizedWord(wordSwitch)

  try {
    const response = await fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ wordSearched: wordFormatted })
    })

    const data = await response.json()

    if (response.ok) {
        alert(
          'id: ' + data._id + '\n' +
          'Palabra: ' + data.word + '\n' +
          'Fecha de registro: ' + data.date
        )
    } else {
        alert('Error al buscar la palabra')
    }

 } catch (error) {
    alert('Word not found')
 }
})


async function addWordToServer (word) {
    try{
        const response = await fetch('http://localhost:3000/addWord', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word })
        })
        const data = await response.json()
        if (response.ok) {
        console.log('Palabra agregada correctamente: '+ word)
    } else {
      console.log('Error al agregar la palabra')
      }
    } catch (error) {
        console.log('Error al agregar la palabra')
    }
}


function capitalizedWord (word) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord
}

