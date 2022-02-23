//Showing all the data as default================>
const getAPIData = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then(res => res.json())
        .then(data => mealsData(data))
}
getAPIData();
const mealsData = data => {
    const cardParent = document.getElementById('card-parent');
    data.meals.forEach(e => {
        const card = document.createElement('div');
        card.classList.add('card', 'w-25', 'my-3');
        card.innerHTML = `
            <img src="${e.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${e.strMeal}</h5>
                <p class="card-text">${e.strInstructions.substr(0, 100)}</p>
                <a href="#" onclick="cardDetail('${e.idMeal}')" class="btn btn-primary">Details</a>
            </div>
        `
        cardParent.appendChild(card)
    });
}
//Showing data by search===================>
const getInput = () => {
    //Clear pervious search result
    const cardParent = document.getElementById('card-parent');
    cardParent.innerHTML = '';
    const singleCard = document.getElementById('single-card');
    singleCard.innerHTML = '';
    //Getting user input result
    const userInputField = document.getElementById('userInput');
    const userInputValue = userInputField.value;
    //Error handling for empty search
    if (userInputValue == '') {
        document.getElementById('error-message').classList.remove('d-none');
        document.getElementById('userInput').classList.add('border', 'border-danger');
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => updateBySearch(data))
    }
}
//Updating data by user search
const updateBySearch = data => {
    //Error handling for empty search
    if (data.meals == null) {
        document.getElementById('error-message').classList.remove('d-none');
        document.getElementById('userInput').classList.add('border', 'border-danger');
    } else {    //Updating Card by search by product name
        document.getElementById('error-message').classList.add('d-none');
        document.getElementById('userInput').classList.remove('border', 'border-danger');
        const cardParent = document.getElementById('card-parent');
        data.meals.forEach(e => {
        const card = document.createElement('div');
        card.classList.add('card', 'w-25', 'my-3');
        card.innerHTML = `
            <img src="${e.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${e.strMeal}</h5>
                <p class="card-text">${e.strInstructions.substr(0, 100)}</p>
                <a href="#" onclick="cardDetail('${e.idMeal}')" class="btn btn-primary">Details</a>
            </div>
        `
            cardParent.appendChild(card);
    })
    }
}
//Getting meal ID by click Details button and building API URL with ID
const cardDetail = (e) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`
    fetch(url)
        .then(res => res.json())
        .then(data => mealDetail(data))
}
//Showing single card by clicking Details button
const mealDetail = data => {
    console.log(data.meals[0])
    const singleCard = document.getElementById('single-card');
    singleCard.innerHTML = `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Name: ${data.meals[0].strMeal}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Category: ${data.meals[0].strCategory}</h6>
            <p class="card-text">${data.meals[0].strInstructions}</p>
            <a href="#" class="card-link">Order Now</a>
            <a href="#" class="card-link">Add to Cart</a>
        </div>
    </div>
    `
}