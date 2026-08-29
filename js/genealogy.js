/* =========================================
   Julio Cedillo — Academic Genealogy
   ========================================= */


/*
   Each person has an ID and a relationship.

   "advisor" = their academic lineage connection
   "mentors" = people who directly mentored Julio
*/

const genealogy = [
    {
        id: "giddings",
        name: "Franklin Henry Giddings",
        role: "Sociologist",
        relationship: "Intellectual Ancestor",
        advisor: null
    },

    {
        id: "chapin",
        name: "F. Stuart Chapin",
        role: "Sociologist",
        relationship: "Academic Lineage",
        advisor: "giddings"
    },

    {
        id: "sewell",
        name: "William H. Sewell",
        role: "Sociologist",
        relationship: "Academic Lineage",
        advisor: "chapin"
    },

    {
        id: "haller",
        name: "Archibald O. Haller",
        role: "Sociologist",
        relationship: "Academic Lineage",
        advisor: "sewell"
    },

    {
        id: "portes",
        name: "Alejandro Portes",
        role: "Sociologist",
        relationship: "Academic Lineage",
        advisor: "haller"
    },

    {
        id: "itzigsohn",
        name: "José Itzigsohn",
        role: "Sociologist",
        relationship: "Academic Lineage",
        advisor: "portes"
    },

    {
        id: "rodriguez-muniz",
        name: "Michael Rodríguez-Muñiz",
        role: "Mentor",
        relationship: "Mentor",
        advisor: "itzigsohn"
    },

    {
        id: "hammer",
        name: "Ricarda Hammer",
        role: "Mentor",
        relationship: "Mentor",
        advisor: "itzigsohn"
    },

    {
        id: "julio",
        name: "Julio Cedillo",
        role: "Sociologist",
        relationship: "Student",
        mentors: [
            "rodriguez-muniz",
            "hammer"
        ]
    }
];



/* =========================================
   Find a Person
   ========================================= */

function findPerson(id) {
    return genealogy.find(person => person.id === id);
}



/* =========================================
   Create Person Node
   ========================================= */

function createPersonNode(person) {

    const node = document.createElement("div");

    node.classList.add("person-node");

    if (person.id === "julio") {
        node.classList.add("current-person");
    }

    node.dataset.person = person.id;

    node.innerHTML = `
        <div class="node-name">
            ${person.name}
        </div>

        <div class="node-info">
            ${person.role}
        </div>
    `;

    node.addEventListener("click", () => {
        selectPerson(person.id);
    });

    return node;
}



/* =========================================
   Select Person
   ========================================= */

function selectPerson(id) {

    const nodes = document.querySelectorAll(".person-node");

    nodes.forEach(node => {
        node.classList.remove("selected");
    });

    const selected = document.querySelector(
        `[data-person="${id}"]`
    );

    if (selected) {
        selected.classList.add("selected");
    }

    showPersonInformation(id);
}



/* =========================================
   Information Panel
   ========================================= */

function showPersonInformation(id) {

    const person = findPerson(id);

    if (!person) return;

    const panel = document.getElementById("personPanel");

    if (!panel) return;

    panel.innerHTML = `
        <button
            class="close-panel"
            onclick="closePersonInformation()">
            ×
        </button>

        <p class="panel-label">
            ${person.relationship}
        </p>

        <h2>
            ${person.name}
        </h2>

        <p class="panel-role">
            ${person.role}
        </p>

        ${
            person.advisor
            ? `
                <div class="panel-detail">
                    <span>Lineage</span>
                    <strong>
                        ${findPerson(person.advisor).name}
                    </strong>
                </div>
            `
            : ""
        }

        ${
            person.mentors
            ? `
                <div class="panel-detail">
                    <span>Mentors</span>

                    <strong>
                        ${person.mentors
                            .map(id => findPerson(id).name)
                            .join("<br>")}
                    </strong>
                </div>
            `
            : ""
        }
    `;

    panel.classList.add("open");
}



/* =========================================
   Close Information Panel
   ========================================= */

function closePersonInformation() {

    const panel = document.getElementById("personPanel");

    if (panel) {
        panel.classList.remove("open");
    }

    document
        .querySelectorAll(".person-node")
        .forEach(node => {
            node.classList.remove("selected");
        });
}



/* =========================================
   Reset Genealogy
   ========================================= */

function resetGenealogy() {

    closePersonInformation();

}



/* =========================================
   Initialize
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "Academic genealogy loaded:",
        genealogy
    );

});
