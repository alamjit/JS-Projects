const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const nextQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader-icon');

let apiQuotes = []

function loading(){
    quoteContainer.hidden = true;
    loader.hidden = false;
}
function loadComplete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Get New Quote
function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check Quote length to determine styling
    if (quote.text.length >100){
        quoteText.classList.add('long-quote')
    }
    else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
    //Cheking if quote author is availaible
    if (!quote.author){
        quoteAuthor.textContent = 'Unknown'
    }
    else{
        quoteAuthor.textContent = quote.author
    }
    loadComplete(); 
}

// Get quotes from api
async function getQuotes(){
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        //Catch error handling
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
twitterBtn.addEventListener('click' , tweetQuote);
nextQuoteBtn.addEventListener('click' , newQuote);

//On Load
getQuotes();

