export function renderRecap (recap) {
    const recapLi = document.createElement("li");
    recapLi.dataset.id = recap._id;
    
    const isCheckedIcon = document.createElement("i");
    if(recap.checked) {
        isCheckedIcon.classList.add("fa-solid", "fa-thumbs-up");
    } else {
        isCheckedIcon.classList.add("fa-solid", "fa-fire");
    }

    const textDiv = document.createElement("div");
    const title = document.createElement("a");
    title.href = `/recaps/${recap._id}`;
    title.innerText = recap.title;
    textDiv.appendChild(title);

    
    const checkDiv = document.createElement("div");
    const checkIcon = document.createElement("i");
    if(recap.checked) {
        checkIcon.classList.add("fa-solid", "fa-rotate-left");
    } else {
        checkIcon.classList.add("fa-solid", "fa-check");
    }
    
    const xmarkIcon = document.createElement("i");
    xmarkIcon.classList.add("fa-solid", "fa-xmark");
    checkDiv.appendChild(checkIcon);
    checkDiv.appendChild(xmarkIcon);

    recapLi.appendChild(isCheckedIcon);
    recapLi.appendChild(textDiv);
    recapLi.appendChild(checkDiv);

    checkIcon.addEventListener("click", checkRecap);
    xmarkIcon.addEventListener("click", xmarkRecap);

    return recapLi;
}

async function checkRecap (event) {
    const recapLi = event.target.parentNode.parentNode;
    const { id } = recapLi.dataset;

    const response = await fetch("/api/recap/ischecked", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    });
    
    if(response.status === 200) {
        const isCheckedIcon = recapLi.querySelector("i");
        isCheckedIcon.classList.toggle("fa-thumbs-up");
        isCheckedIcon.classList.toggle("fa-fire");

        const checkIcon = event.target;
        checkIcon.classList.toggle("fa-rotate-left");
        checkIcon.classList.toggle("fa-check");
    }
}

async function xmarkRecap (event) {
    const recapLi = event.target.parentNode.parentNode;
    const title = recapLi.childNodes[1].firstChild;
    const { id } = recapLi.dataset;
    const assurance = confirm(`Delete ${title.innerText}?`)
    if(assurance === false) return;

    const response = await fetch("/api/recap/remove", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    });
    
    if(response.status === 204) {
        recapLi.remove();
    } else {
        alert("error");
    }
}