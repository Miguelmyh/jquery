// id to keep track of which element to remove (this would be better not in global scope)
let currentId = 0;

// list of all of movies in memory for sorting / repainting
let moviesList = [];

$(function(){

  $(".form").on("submit", function(e){
    e.preventDefault();
    checkValidity();
    $('.results').html('');
    let title = $(".title").val();
    let rating = $(".rating").val();
    let movie = {title, rating, currentId};
    let previousValues = JSON.parse(localStorage.getItem('movie'));

    checkForMovie(title, rating);
    // const movieToAppend = createMovie(movie);
    currentId++;

    moviesList.push(movie);///movie = {title, rating, id}

    localStorage.setItem('movie', JSON.stringify(moviesList));
    $(".results").on("click", ".btn.btn-danger", function(e){
      console.log(e.target);
      let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(e.target).data("deleteId"));
      moviesList.splice(indexToRemoveAt, 1);
      $(e.target).closest('tr').remove();
    })
  });

});

function checkValidity(){
  let min = "hi";

  if ($(".rating").val() > 10 || $(".rating").val() < 0) {
    alert('must be from 0 to 10');
    throw new Error('must be in a range of 0 to 10');
  }
  if($(".title").val().length >= min.length){
    return;
  }else{
    alert("invalid input");
    throw new Error('add correct name');
  }
};

// function createMovie(movie){
//   console.log(movie.title);
//   let title = movie.title;
//   // $(".titles").append(`<li>${title}</li>`);
//   let rating = movie.rating;
//   let id = movie.currentId;
//   // $(".ratings").append(`<li>${rating}}</li>`);
  
//   return movie;
// }

function checkForMovie(name, rate){
  let movieSearched = JSON.parse(localStorage.getItem('movie'));
  console.log(movieSearched);

  movieSearched.forEach((itemArray) => {
    let content = {...itemArray};
    let title = content.title;
    let rating = content.rating;
    let id = content.currentId;
    console.log(content.title);
    if(content.title === name && content.rating === rate){
       $(".results").html(`<table>
        <tr>
        <td> TITLE: ${title}</td>
        <td> RATING: ${rating}</td>
        <td>
          <button class="btn btn-danger" data-delete-id=${currentId}>
            Delete
          </button>
        </td>
        <tr>
        </table>
        `);
    }
  });
  if($(".results").children().length === 0){
    alert('submitted');
  }
      
}
