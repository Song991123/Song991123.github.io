

// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {//data는 과일 또는 야채의 배열
  console.log(data)
  container.innerHTML = "";
  data.forEach(item => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
/* 
  과일 출력
*/
function filterAndSortFruits() {
  // 검색어와 정렬 기준 가져오기
  const keyword = searchBox.value.trim();
  const sortBy = sortSelect.value;
  // 과일 데이터 필터링
  let filteredFruits = fruits.filter(fruit => fruit.name.includes(keyword));

  // 과일 데이터 정렬
  if (sortBy === "low") {
    filteredFruits.sort((a, b) => a.price - b.price);
  } else if (sortBy === "high") {
    filteredFruits.sort((a, b) => b.price - a.price);
  }else {
    filteredFruits.sort((a, b) => a.name.localeCompare(b.name));
  }

   //화면에 다시 출력
  //renderProducts(?, ?);
  renderProducts(filteredFruits, fruitList);
}

// 채소 출력 (3개씩 증가)
function loadVeggies() {
  // 3개씩 증가해 출력할 데이터 계산
  veggiePage++;
  const showVeggie = veggiePage * 3;
  const veggiesToLoad = veggies.slice(0, showVeggie);
  
  //화면에 다시 출력
  //renderProducts(?, ?);
  renderProducts(veggiesToLoad, veggieList);

  if(showVeggie >= veggies.length) {
    loadMoreBtn.style.display = "none";
  }
}
////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
