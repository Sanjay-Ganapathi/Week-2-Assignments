const container = document.querySelector(".todoList");
const btn = document.querySelector(".submit-btn");

const showList = () => {
  fetch("http://localhost:3000/todos/")
    .then((response) => response.json())
    .then((data) => makeList(data));
};

const makeList = (data) => {
  for (const key in data) {
    const listContainer = document.createElement("div");
    const unorderedList = document.createElement("ul");
    const listItemTitle = document.createElement("li");
    const listItemDesc = document.createElement("li");
    const listItemCompleted = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.id = key;
    deleteBtn.addEventListener("click", handleDelete);

    listItemTitle.innerText = data[key].title;
    listItemDesc.innerText = data[key].description;
    listItemCompleted.innerText = data[key].completed;

    unorderedList.appendChild(listItemTitle);
    unorderedList.appendChild(listItemDesc);
    unorderedList.appendChild(listItemCompleted);

    listContainer.appendChild(unorderedList);
    listContainer.appendChild(deleteBtn);
    container.appendChild(listContainer);
  }
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const completed = document.querySelector("#completed").value;

  const obj = {
    title: title,
    description: description,
    completed: completed === "false" ? false : true,
  };
  fetch("http://localhost:3000/todos/", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then(() => {
      location.reload();
    });
});

showList();
handleDelete = (e) => {
  e.preventDefault();
  console.log("In delete");
  const toDelete = e.target.id;
  fetch(`http://localhost:3000/todos/${toDelete}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => location.reload());
};
