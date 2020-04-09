const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//add a + to it to make the string a number
let ticketPrice = +movieSelect.value;
// console.log(typeof ticketPrice);


//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    //to get the index of the selected movie
    // console.log(e.target.selectedIndex, e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    //we want to save the movie title and price in local storage as well

    updateSelectedCount();
});

//seat click event
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //this gives us a nodeList
    // console.log(selectedSeats)
    //now lets get the length
    const selectedSeatsCount = selectedSeats.length;
    // console.log(selectedSeatsCount)
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;


    // in order to save seats we need an array of indexes
    // 1. copy selected seats into an array
    const seatsIndex = [...selectedSeats]
        // 2. map through array - .map returns something, forEach does not
        .map((seat) =>
            //we want to return the index of the seats that were selected
            [...seats].indexOf(seat)
        )
    // 3. return a new array of indexes
    // console.log(seatsIndex)
    //spread operator copies the elements of an array

    //save to local storage, which is included in the browser
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); //pass in a key value pair
    //seatsIndex is an array so it has to be made a string by wrapping it in JSON.stringify()
    //select seats then go to dev tools -> application -> localstorage you'll see the array


}

//check if seat is occupied and only allow clicking on non-occupied seats
container.addEventListener('click', (e) => {
    // console.log(e.target);
    //only open seats
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        // console.log(e.target);
        e.target.classList.toggle('selected');

        updateSelectedCount();


    }
});