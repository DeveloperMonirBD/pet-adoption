let data;

// ** Adopt Countdown
const adoptBtn = () => {
    let count = 3;
    const countdownElement = document.getElementById('countdown');
    countdownElement.textContent = count;
    const countdownInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count;

        if (count < 1) {
            clearInterval(countdownInterval);
            document.getElementById('my_adopt_modal').checked = false;
        }
    }, 1700);
};

// **load 4 Categories Btn
const leadCategoriesBtn = async () => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
        const data = await response.json();
        displayCategoriesBtn(data.categories);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// ** display 4 Categories Btn
const displayCategoriesBtn = items => {
    const petsBtn = document.getElementById('petBtn');
    items.forEach(item => {
        const { id, category_icon, category } = item;
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
    <button
        id = "btn-${category}"
        onclick="searchCategory('${category}')"
        class="category-btn border w-full block lg:inline-block px-16 py-6 rounded-xl hover:rounded-full border-[#bae8ec] hover:bg-[#bae8ec] hover:border-[#0E7A81] text-xl  transition-all">
        <div class="flex justify-center items-center gap-4" href="">
          <img src=${category_icon} alt="" />
          <p>${category}</p>
        </div>
      </button>
        `;

        petsBtn.appendChild(buttonContainer);
    });
};

// ** load all pets
const loadAllPets = async () => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
        data = await response.json();
        setTimeout(() => {
            spinnerContainer.style.display = 'none';
            displayAllPets(data.pets);
        }, 2000);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// ** display all pets
const displayAllPets = pets => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    if (pets.length === 0) {
        cardContainer.innerHTML = `
    <div class= "min-h-screen">
    <div class="w-full absolute top-0 left-0 bg-[#F8F8F8] md:p-20 rounded-2xl z-10 shadow-xl border">
          <div class="flex flex-col justify-center items-center text-center gap-6 my-10">
            <div>
              <img class="w-full" src="./images/error.webp" alt="error img">
            </div>
            <h2 class="text-2xl font-extrabold">No Information Available</h2>
            <p class="text-lg">It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
          </div>
        </div>
    </div>
    `;
        return;
    }
    pets.forEach(pet => {
        const { petId, pet_name, pet_details, image, category, breed, date_of_birth, gender, price } = pet;
        const petDiv = document.createElement('div');
        petDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl p-6 border">
          <figure class="h-[204px]">
            <img src=${image}
              class="h-full w-full object-cover rounded-xl" />
          </figure>

          <div class="pt-4 space-y-2">
            <h3 class="card-title font-bold">${pet_name ? pet_name : 'Data not found'}</h3>

            <div class="border-b pb-4 space-y-2">
              <div class="flex items-center gap-2 text-gray-500">
                <img src="./images/breed.png" alt="" />
                <p>Breed: ${breed ? breed : 'Data not found'}</p>
              </div>
              <div class="flex items-center gap-2 text-gray-500">
                <img src="./images/birth.png" alt="" />
                <p>Birth: ${date_of_birth ? date_of_birth : 'Data not found'}</p>
              </div>
              <div class="flex items-center gap-2 text-gray-500">
                <img src="./images/gender.png" alt="" />
                <p>Gender: ${gender ? gender : 'Data not found'}</p>
              </div>
              <div class="flex items-center gap-2 text-gray-500">
                <img src="./images/dolor.png" alt="" />
                <p>Price: ${price ? price + '$' : 'Data not found'}</p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 px-4 pt-2">
              <button onclick="loadCategoryImg(${petId})" class="btn text-md text-[#0E7A81] hover:text-black border-[#0E7A81] hover:bg-[#bae8ec] hover:border-[#0E7A81]  transition-all">
                <a><img src="./images/like.png" alt=""></a>
              </button>

              <label onclick="adoptBtn()" for="my_adopt_modal" class="btn text-md text-[#0E7A81] hover:text-black border-[#0E7A81] hover:bg-[#bae8ec] hover:border-[#0E7A81]  transition-all">Adopt</label>

              <button class="btn text-md text-[#0E7A81] hover:text-black border-[#0E7A81] hover:bg-[#bae8ec] hover:border-[#0E7A81]  transition-all"
                onclick="loadDetails(${petId})">Details</button>
            </div>
          </div>
        </div>

        `;

        cardContainer.appendChild(petDiv);
    });
};

// Sort Click function
const handleSortClick = pets => {
    const array = data.pets;
    let sortedArray = array.sort((a, b) => {
        return b.price - a.price;
    });
    const spinnerContainer = document.getElementById('spinnerContainer');
    spinnerContainer.style.display = 'flex';
    document.getElementById('card-container').innerHTML = '';

    setTimeout(function () {
        spinnerContainer.style.display = 'none';
        displayAllPets(sortedArray);
    }, 2000);
};

// ** load Category Pets
const loadCategoryPets = id => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // active class remove
            removeActiveClass();

            // active class add
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active');

            displayAllPets(data.data);
        })
        .catch(error => console.log(error));
};

// ** spinner load in search Category btn
const searchCategory = category => {
    const spinnerContainer = document.getElementById('spinnerContainer');
    spinnerContainer.style.display = 'flex';
    document.getElementById('card-container').innerHTML = '';

    setTimeout(function () {
        spinnerContainer.style.display = 'none';
        loadCategoryPets(category);
    }, 2000);
};

// ** remove active class
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (let btn of buttons) {
        btn.classList.remove('active');
    }
};

// ** load details
const loadDetails = async petId => {
    console.log(petId);
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.petData);
};

// ** display details
const displayDetails = petItem => {
    const detailsContainer = document.getElementById('modal-content');

    const { petId, pet_name, pet_details, image, category, breed, date_of_birth, gender, price } = petItem;

    detailsContainer.innerHTML = `
    <div class="card bg-base-100">
        <figure>
          <img class="w-full" src=${image}
            class="rounded-xl" />
        </figure>
        <div class="pt-4 space-y-2">
          <h3 class="card-title font-bold">${pet_name ? pet_name : 'Data not found'}</h3>

          <div class=" pb-4 space-y-2">
            <div class="flex items-center gap-2 text-gray-500">
              <img src="./images/breed.png" alt="" />
              <p>Breed: ${breed ? breed : 'Data not found'}</p>
            </div>
            <div class="flex items-center gap-2 text-gray-500">
              <img src="./images/birth.png" alt="" />
              <p>Birth: ${date_of_birth ? date_of_birth : 'Data not found'}</p>
            </div>
            <div class="flex items-center gap-2 text-gray-500">
              <img src="./images/gender.png" alt="" />
              <p>Gender: ${gender ? gender : 'Data not found'}</p>
            </div>
            <div class="flex items-center gap-2 text-gray-500">
              <img src="./images/dolor.png" alt="" />
              <p>Price: ${price ? price + '$' : 'Data not found'}</p>
            </div>

            <div class="mt-4">
              <h3 class="font-bold text-xl mb-2">Details Information</h3>
              <p>${pet_details ? pet_details : 'Data not found'}</p>
            </div>
          </div>
        </div>
      </div>
  `;
    document.getElementById('customModal').showModal();
};

// ** load images in 2nd img container
const loadCategoryImg = async petId => {
    console.log(petId);
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayImg(data.petData);
};

// ** display images in 2nd img container
const displayImg = petImg => {
    const imageContainer = document.getElementById('petImageContainer');
    const imgDiv = document.createElement('div');
    imgDiv.innerHTML = `
    <div class="lg:h-[90px] ">
          <img class="h-full w-full rounded-md object-cover" src=${petImg.image} alt="" />
        </div>
  `;
    imageContainer.appendChild(imgDiv);
};

leadCategoriesBtn();
loadAllPets();
