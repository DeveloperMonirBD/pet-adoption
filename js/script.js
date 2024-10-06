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
        class="border w-full block lg:inline-block px-16 py-4 rounded-xl hover:rounded-full border-[#bae8ec] hover:border-[#0E7A81] text-xl hover:bg-[#d9e8eb] hover:bg-transparent transition-all">
        <div class="flex justify-center items-center gap-4" href="">
          <img src=${category_icon} alt="" />
          <p>${category}</p>
        </div>
      </button>
        `;
        petsBtn.appendChild(div);
    });
};




leadCategoriesBtn();
