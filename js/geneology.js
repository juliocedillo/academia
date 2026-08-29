```javascript
/* =========================================
   Academic Genealogy — Julio Cedillo
   ========================================= */


const people = document.querySelectorAll(".person-node");


people.forEach(person => {

    person.addEventListener("click", function () {

        // Remove previous selection
        people.forEach(node => {
            node.classList.remove("selected");
        });

        // Select clicked person
        this.classList.add("selected");

    });

});


function resetGenealogy() {

    people.forEach(person => {
        person.classList.remove("selected");
    });

}
```
