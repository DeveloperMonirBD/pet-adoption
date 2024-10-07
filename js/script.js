// **load 4pets btn fetch
const leadCategoriesBtn = async () => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
        const data = await response.json();
        displayCategoriesBtn(data.categories);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// ** load pets btn functionality
const loadCategoryPets = (id) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => displayAllPets(data.data))
        .catch(error => console.log(error));
};

// ** spinner not working------------
const handleSearch = () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
    spinner.style.display = 'flex';

    setTimeout(function () {
        loadCategoryPets();
    }, 3000);
};

// **load 4pets btn display
const displayCategoriesBtn = items => {
    const petsBtn = document.getElementById('petBtn');
    items.forEach(item => {
        const { id, category_icon, category } = item;
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
    <button
        onclick="loadCategoryPets('${category}')"
        class="border w-full block lg:inline-block px-16 py-6 rounded-xl hover:rounded-full border-[#bae8ec] hover:border-[#0E7A81] text-xl hover:bg-[#d9e8eb] hover:bg-transparent transition-all">
        <div class="flex justify-center items-center gap-4" href="">
          <img src=${category_icon} alt="" />
          <p>${category}</p>
        </div>
      </button>
        `;

        petsBtn.appendChild(buttonContainer);
    });
};

// ** display all pets
const loadAllPets = async () => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
        const data2 = await response.json();
        displayAllPets(data2.pets);
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
    <div class= "h-screen">
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
    return
  }

    pets.forEach(pet => {
        const { image, category, breed, date_of_birth, gender, price } = pet;
        const petDiv = document.createElement('div');
        petDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl p-6 border">
          <figure class="h-[204px]">
            <img src=${image}
              class="h-full w-full object-cover rounded-xl" />
          </figure>

          <div class="pt-4 space-y-2">
            <h3 class="card-title font-bold">${category ? category : 'Data not found'}</h3>

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
              <button class="btn text-lg p-2 border-slate-300 hover:border-slate-300">
                <i class="fa-regular fa-thumbs-up"></i>
              </button>
              <button class="btn text-md border-slate-300 hover:border-slate-400">
                Adopt
              </button>


              <button class="btn text-md border-slate-300 hover:border-slate-300"
                onclick="my_modal_1.showModal()">Details</button>

              <dialog id="my_modal_1" class="modal">
                <div class="modal-box">

                  <div class="card bg-base-100">
                    <figure>
                      <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes"
                        class="rounded-xl" />
                    </figure>
                    <div class="pt-4 space-y-2">
                      <h3 class="card-title font-bold">Mister Tartosh</h3>

                      <div class=" pb-4 space-y-2">
                        <div class="flex items-center gap-2 text-gray-500">
                          <img src="./images/breed.png" alt="" />
                          <p>Breed: Golder Retriver</p>
                        </div>
                        <div class="flex items-center gap-2 text-gray-500">
                          <img src="./images/birth.png" alt="" />
                          <p>Birth: 2024</p>
                        </div>
                        <div class="flex items-center gap-2 text-gray-500">
                          <img src="./images/gender.png" alt="" />
                          <p>Gender: Female</p>
                        </div>
                        <div class="flex items-center gap-2 text-gray-500">
                          <img src="./images/dolor.png" alt="" />
                          <p>Price: 199$</p>
                        </div>

                        <div class="mt-4">
                          <h3 class="font-bold text-xl mb-2">Details Information</h3>
                          <p>It is a long established fact that a reader will be distracted by the readable content of
                            a page when
                            looking at its
                            layout.
                            The point of using is that it has a more-or-less normal distribution of letters, as
                            opposed to using.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-action">
                    <form method="dialog">
    
                      <button class="btn w-full">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>

            </div>
          </div>
        </div>

        `;

        cardContainer.appendChild(petDiv);
    });
};

leadCategoriesBtn();
loadAllPets();
