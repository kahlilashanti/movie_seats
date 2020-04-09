const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//add a + to it to make the string a number
let ticketPrice = +movieSelect.value;
// console.log(typeof ticketPrice);


//movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
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
})