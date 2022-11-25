document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "rename") {
    const id = event.target.dataset.id;
    const divTitle = event.target.closest("li").children[0];

    const title = prompt("New name note", divTitle.innerHTML);
    if (title) {
      rename({ id, title }).then(() => {
        divTitle.innerHTML = title;
      });
    }
  }
});

async function rename(item) {
  await fetch(`/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(item),
  });
}

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
