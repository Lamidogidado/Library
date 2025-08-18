let calculation = localStorage.getItem('calculation') || '';

dispay();

function updateCalculation(value) {
  calculation += value;

  dispay();
   saveCalculation();
}
// localstorage 
function saveCalculation() {
   localStorage.setItem('calculation', calculation);
 }
 function dispay (){
  document.querySelector('.js-display')
  .innerHTML = calculation;
 }

 