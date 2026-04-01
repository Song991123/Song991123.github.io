// 전체 출력 ============================

//초기 데이터
let mockData = [{
        id: 0,
        isDone: false,
        content: "React study",
        date: new Date().getTime()
    },
    {
        id: 1,
        isDone: true,
        content: "친구만나기",
        date: new Date().getTime()
    },
    {
        id: 2,
        isDone: false,
        content: "낮잠자기",
        date: new Date().getTime()
    },
];
// 요일 출력을 위한 배열
let day = ["일", "월", "화", "수", "목", "금", "토"];

onload = () => {
    // initData(mockData) 함수 호출
    initData(mockData);
    // 현재 날짜를 년 월 일 요일로 출력한다.
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");
    const dayOfWeek = day[today.getDay()];
    document.querySelector(".Header h1").textContent = `${year}-${month}-${date} (${dayOfWeek})`;
};

const initData = (printData) => {
    // 데이터 출력 전에 기존에 출력된 요소를 초기화한다.
    document.querySelector(".List .todos_wrapper").innerHTML = "";

    // mockData 배열을 forEach를 이용해서 화면에 출력한다.
    printData.forEach((data) => {
        // 날짜 출력은 년.월.일 형식으로 출력. ex) 2024.06.17
        const year = new Date(data.date).getFullYear();
        const month = String(new Date(data.date).getMonth() + 1).padStart(2, "0");
        const date = String(new Date(data.date).getDate()).padStart(2, "0");

        // data의 id값을 이용해서 화면에 출력할 요소를 만든다.
        const todo = document.createElement("div");
        todo.classList.add("TodoItem");
        /* 
        -> checkbox
            onchange="onUpdate(id값)" todo의 isDone이 true이면 checked속성 추가
        
        -> button
            name 속성 추가해서 value에 todo의 id 설정
            onclick ="todoDel(this)" 추가
        */
        todo.innerHTML = `
                <input type="checkbox" id="todo-${data.id}" ${data.isDone ? "checked" : ""} onchange="onUpdate(${data.id})">
                <div class="content">${data.content}</div>
                <div class="date">${year}.${month}.${date}</div>
                <button name="delete" value="${data.id}" onclick="todoDel(this)">삭제</button>
        `;
        // 요소를 List의 하위 요소로 추가한다.
        document.querySelector(".List .todos_wrapper").appendChild(todo);
    });

}

// 투두 추가 ============================
let idIndex = 3; // 초기 데이터의 id값이 0,1,2이므로 3부터 시작
document.querySelector(".Editor > button").onclick = () => {
    event.preventDefault(); // 전송 기능 막음

    // id는 idIndex,isDone은 기본 false,content는 입력한 내용, date는 new Date().getTime()
    const content = document.querySelector(".Editor > input").value;
    const newTodo = {
        id: idIndex++,
        isDone: false,
        content: content,
        date: new Date().getTime()
    };
    // 준비된 하나의 레코드를 mokData에 push() 함수를 이용해서 추가한다.
    mockData.push(newTodo);
    document.querySelector(".Editor > input").value = ""; // 입력창 초기화

    initData(mockData); //호출한다.(다시 화면 랜더링)
}

// 투두 수정 ============================
const onUpdate = (targetId) =>{
    /*  mockData의 state의 값들 중에 targetId와 일치하는 todoitem의 isDone 변경
        map함수를 이용한다. map함수의 결과를 mockData에 저장한다.
    */
    mockData = mockData.map((todo) => {
        if (todo.id === targetId) {
            return { ...todo, isDone: !todo.isDone };
        }
        return todo;
    });

    initData(mockData); //호출한다.(다시 화면 랜더링)

}

// 투두 삭제 ============================
const todoDel = (th) => {
    // filter()함수를 이용해서 삭제하려는 대상이외의 todo만 추출해서 mockData에 담는다.
    const targetId = parseInt(th.value);
    mockData = mockData.filter((todo) => todo.id !== targetId);
    
    initData(mockData); //호출한다.(다시 화면 랜더링)
}

// 투두 검색 ============================
document.querySelector("#keyword").onkeyup = (e) => {
    let searchedTodos = getFilterData(e.target.value);
    console.log(searchedTodos);
    initData(searchedTodos); //호출한다.(다시 화면 랜더링)
}
const getFilterData = (search) => {
    //검색어가 없으면 mockData를 리턴한다.
    if(search ==="") return mockData;

    //filter함수를 이용해서 search(검색어)를 포함하고 있는 todo들을 받는다.
    const filteredData = mockData.filter((todo) => todo.content.includes(search));

    //filter의 결과를 리턴 한다.
    return filteredData;
}