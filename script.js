let url="https://api.dictionaryapi.dev/api/v2/entries/en/";
let input=document.getElementById("wordInput");
let button=document.getElementById("find");
button.addEventListener("click",function(){
    let word=input.value;
    console.log(word);
    fetchData(word);
});
function fetchData(word){
    fetch(url+word)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);  
            displayData(data);  
        })
        .catch((error)=>{
            console.log(error);
        })
}
function displayData(data){
    const wordData = data[0];
    let synonyms = [];
    let antonyms = [];

    wordData.meanings.forEach(meaning => {
        if (meaning.synonyms && meaning.synonyms.length > 0) {
            synonyms = synonyms.concat(meaning.synonyms);
        }
        if (meaning.antonyms && meaning.antonyms.length > 0) {
            antonyms = antonyms.concat(meaning.antonyms);
        }
        // Also check definitions for synonyms/antonyms
        meaning.definitions.forEach(def => {
            if (def.synonyms && def.synonyms.length > 0) {
                synonyms = synonyms.concat(def.synonyms);
            }
            if (def.antonyms && def.antonyms.length > 0) {
                antonyms = antonyms.concat(def.antonyms);
            }
        });
    });

    // Remove duplicates
    synonyms = [...new Set(synonyms)];
    antonyms = [...new Set(antonyms)];

    document.getElementById("synonyms").textContent = "Synonyms: " + (synonyms.length ? synonyms.join(", ") : "None");
    document.getElementById("antonyms").textContent = "Antonyms: " + (antonyms.length ? antonyms.join(", ") : "None");
}
