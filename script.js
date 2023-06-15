const pokeName = document.querySelector('.poke-name')
const pokeNumber = document.querySelector('.num')
const pokeImage = document.querySelector('.poke-logo')
const form = document.querySelector('.form')
const input = document.querySelector('.input-search')
const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')

let searchPoke = 1;




const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (apiResponse.status === 200) {

        const data = await apiResponse.json();
        return data;
    }
   }
    
   
const renderPokemon = async (pokemon) => {

    pokeName.innerHTML = 'Loading...';
    pokeNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if (data) {
        
        pokeImage.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokeNumber.innerHTML = data.id;
        searchPoke = data.id;
        input.value = '';


    } else {
        
        pokeImage.style.display = 'none';
        pokeName.innerHTML = "not Found :c";
        pokeNumber.innerHTML = '';
    }
};
    
form.addEventListener('submit', (event) =>{

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    
});


prev.addEventListener('click', () =>{
    if (searchPoke > 1) {

        searchPoke -= 1;
        renderPokemon(searchPoke);    
    }
});

next.addEventListener('click', () =>{
    searchPoke += 1;
    renderPokemon(searchPoke);    
});

renderPokemon(searchPoke);