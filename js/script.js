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

// **load 4pets btn functionality
const displayCategoriesBtn = items => {
    const petsBtn = document.getElementById('petBtn');
    items.forEach(item => {
        const { category_icon, category } = item;
        const div = document.createElement('div');
        div.innerHTML = `
    <button
        class="border w-full block lg:inline-block px-16 py-6 rounded-xl hover:rounded-full border-[#bae8ec] hover:border-[#0E7A81] text-xl hover:bg-[#d9e8eb] hover:bg-transparent transition-all">
        <div class="flex justify-center items-center gap-4" href="">
          <img src=${category_icon} alt="" />
          <p>${category}</p>
        </div>
      </button>
        `;
        petsBtn.appendChild(div);
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
    pets.forEach(pet => {
        const { image, category, breed, date_of_birth, gender, price } = pet;
        const cardContainer = document.getElementById('card-container');
        const petDiv = document.createElement('div');
        petDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl p-6 border">
          <figure class="">
            <img src=${image}
              class="rounded-xl" />
          </figure>

          <div class="pt-4 space-y-2">
            <h3 class="card-title font-bold">${category}</h3>

            <div class="border-b pb-4 space-y-2">
              <div class="flex items-center gap-2 text-gray-500">
                <img src="./images/breed.png" alt="" />
                <p>Breed: ${breed}</p>
              </div>
              <div class="flex items-center gap-2 text-gray-500">
                <img src="./images/birth.png" alt="" />
                <p>Birth: ${date_of_birth}</p>
              </div>
              <div class="flex items-center gap-2 text-gray-500">
                <img src="./images/gender.png" alt="" />
                <p>Gender: ${gender}</p>
              </div>
              <div class="flex items-center gap-2 text-gray-500">
                <img src="./images/dolor.png" alt="" />
                <p>Price: ${price}$</p>
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




loadAllPets();




leadCategoriesBtn();
