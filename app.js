const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;


function updateSelectedCount(){
   const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
   const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

   localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

   const selectedSeatsCounts = selectedSeats.length;
   count.innerText = selectedSeatsCounts;
   total.innerText = selectedSeatsCounts * ticketPrice; 
}

function setMoviedata(movieIndex, moviePrice) {
       localStorage.setItem('selectedMovieIndex', movieIndex);
       localStorage.setItem('selectedMoviePrice', moviePrice);
}

movieSelect.addEventListener('change', (e) => {
   ticketPrice =e.target.value;
   setMoviedata(e.target.seatsIndex , e.target.value);
   updateSelectedCount();
});

populateUI()

function populateUI(){
   const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

   if(selectedSeats !== null && selectedSeats.length > 0){
      seats.forEach((seat, index) => {
         if(selectedSeats.indexOf(index) > - 1){
            seat.classList.add('selected');
         }
      })
   }

   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

   if(selectedMovieIndex !== null){
      movieSelect.seatsIndex = selectedMovieIndex;
   }
};




container.addEventListener('click', (e) => {
   if(e.target.classList.contains('seat') && !e.target.classList.contains('ccupied')){
    e.target.classList.toggle('selected');

    updateSelectedCount(); 
   }
});

updateSelectedCount();