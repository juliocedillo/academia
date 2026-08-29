/* =========================================
   Julio Cedillo — Academic Genealogy
   ========================================= */


/* =========================================
   Scholar Data
   ========================================= */

const genealogy = {

    giddings: {
        name: "Franklin Henry Giddings",
        role: "Sociologist",
        institution: "Columbia University",
        relationship: "Academic Lineage",
        areas: [
            "Sociological Theory",
            "Social Organization",
            "Political Sociology"
        ]
    },


    chapin: {
        name: "F. Stuart Chapin",
        role: "Sociologist",
        institution: "University of Minnesota",
        relationship: "Academic Lineage",
        areas: [
            "Sociology",
            "Social Research",
            "Urban Studies"
        ]
    },


    sewell: {
        name: "William H. Sewell",
        role: "Sociologist",
        institution: "University of Chicago",
        relationship: "Academic Lineage",
        areas: [
            "Historical Sociology",
            "Social Theory",
            "Political Sociology"
        ]
    },


    haller: {
        name: "Archibald O. Haller",
        role: "Sociologist",
        institution: "University of Wisconsin–Madison",
        relationship: "Academic Lineage",
        areas: [
            "Social Stratification",
            "Status Attainment",
            "Education"
        ]
    },


    portes: {
        name: "Alejandro Portes",
        role: "Sociologist",
        institution: "University of Miami",
        relationship: "Academic Lineage",
        areas: [
            "Immigration",
            "Economic Sociology",
            "Social Capital"
        ]
    },


    itzigsohn: {
        name: "José Itzigsohn",
        role: "Sociologist",
        institution: "Brown University",
        relationship: "Academic Lineage",
        areas: [
            "Race & Ethnicity",
            "Immigration",
            "Political Sociology",
            "Du Boisian Sociology"
        ]
    },


    "rodriguez-muniz": {
        name: "Michael Rodríguez-Muñiz",
        role: "Sociologist",
        institution: "University of Chicago",
        relationship: "Mentor",
        areas: [
            "Race & Ethnicity",
            "Latinxs",
            "Political Sociology",
            "Social Theory"
        ]
    },


    hammer: {
        name: "Ricarda Hammer",
        role: "Sociologist",
        institution: "University of California, Berkeley",
        relationship: "Mentor",
        areas: [
            "Political Sociology",
            "Race & Empire",
            "Historical Sociology",
            "Postcolonial Sociology"
        ]
    },


    julio: {
        name: "Julio Cedillo",
        role: "Sociologist",
        institution: "University of California, Berkeley",
        relationship: "Current Scholar",
        areas: [
            "Citizenship",
            "Immigration",
            "Race & Ethnicity",
            "Military Sociology",
            "Political Sociology",
            "Social Theory"
        ]
    }

};



/* =========================================
   Open Scholar Panel
   ========================================= */

function selectPerson(id) {

    const person = genealogy[id];

    if (!person) {
        return;
    }


    /* Remove existing selection */

    document
        .querySelectorAll(".person-node")
        .forEach(node => {

            node.classList.remove("selected");

        });


    /* Select current node */

    const node =
        document.querySelector(
            `[data-person="${id}"]`
        );


    if (node) {

        node.classList.add("selected");

    }


    /* Create panel */

    const panel =
        document.getElementById("personPanel");


    if (!panel) {
        return;
    }


    const areas =
        person.areas
            .map(area => `<span>${area}</span>`)
            .join("");


    panel.innerHTML = `

        <button
            type="button"
            class="close-panel"
            id="closePanel"
            aria-label="Close"
        >
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


        <div class="panel-detail">

            <span>
                Institution
            </span>

            <strong>
                ${person.institution}
            </strong>

        </div>


        <div class="panel-detail">

            <span>
                Areas of Work
            </span>

            <div class="panel-areas">
                ${areas}
            </div>

        </div>


        <div class="panel-detail">

            <span>
                Place in Genealogy
            </span>

            <strong>
                ${person.relationship}
            </strong>

        </div>

    `;


    panel.classList.add("open");

    panel.setAttribute(
        "aria-hidden",
        "false"
    );


    /* Close button */

    document
        .getElementById("closePanel")
        .addEventListener(
            "click",
            closePanel
        );

}



/* =========================================
   Close Panel
   ========================================= */

function closePanel() {

    const panel =
        document.getElementById("personPanel");


    if (panel) {

        panel.classList.remove("open");

        panel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    document
        .querySelectorAll(".person-node")
        .forEach(node => {

            node.classList.remove("selected");

        });

}



/* =========================================
   Reset
   ========================================= */

function resetGenealogy() {

    closePanel();

}



/* =========================================
   Keyboard Accessibility
   ========================================= */

function handleKeyboard(event) {

    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        event.preventDefault();

        const id =
            event.currentTarget.dataset.person;

        selectPerson(id);

    }

}



/* =========================================
   Initialize
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        const nodes =
            document.querySelectorAll(
                ".person-node"
            );


        nodes.forEach(node => {

            node.addEventListener(
                "click",
                () => {

                    selectPerson(
                        node.dataset.person
                    );

                }
            );


            node.addEventListener(
                "keydown",
                handleKeyboard
            );

        });


        const resetButton =
            document.getElementById(
                "resetGenealogy"
            );


        if (resetButton) {

            resetButton.addEventListener(
                "click",
                resetGenealogy
            );

        }

    }
);
