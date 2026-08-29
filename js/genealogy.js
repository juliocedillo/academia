/* =========================================
   Julio Cedillo — Academic Genealogy
   ========================================= */


/*
   =========================================
   GENEALOGY DATA
   =========================================

   The data is kept separate from the HTML
   so that the genealogy can easily be expanded.

   IMPORTANT:
   Michael Rodríguez-Muñiz and Ricarda Hammer
   are both listed as Julio's mentors.
*/


const genealogy = {

    giddings: {
        name: "Franklin Henry Giddings",
        role: "Sociologist",
        relationship: "Academic Lineage",
        description:
            "An early figure in American sociology and a foundational scholar in the intellectual lineage represented here."
    },


    chapin: {
        name: "F. Stuart Chapin",
        role: "Sociologist",
        relationship: "Academic Lineage",
        description:
            "A sociologist whose scholarship forms part of the academic lineage represented in this genealogy."
    },


    sewell: {
        name: "William H. Sewell",
        role: "Sociologist",
        relationship: "Academic Lineage",
        description:
            "A prominent historical sociologist whose work contributed to the development of historical and comparative approaches within sociology."
    },


    haller: {
        name: "Archibald O. Haller",
        role: "Sociologist",
        relationship: "Academic Lineage",
        description:
            "A sociologist associated with research on social stratification, status attainment, and educational and occupational mobility."
    },


    portes: {
        name: "Alejandro Portes",
        role: "Sociologist",
        relationship: "Academic Lineage",
        description:
            "A sociologist known for influential scholarship on immigration, migration, transnationalism, social capital, and economic sociology."
    },


    itzigsohn: {
        name: "José Itzigsohn",
        role: "Sociologist",
        relationship: "Academic Lineage",
        description:
            "A sociologist whose scholarship addresses race, ethnicity, immigration, political sociology, and the development of Du Boisian sociology."
    },


    "rodriguez-muniz": {
        name: "Michael Rodríguez-Muñiz",
        role: "Mentor",
        relationship: "Mentor",
        description:
            "A mentor whose scholarship and guidance have contributed to Julio's intellectual development in sociology."
    },


    hammer: {
        name: "Ricarda Hammer",
        role: "Mentor",
        relationship: "Mentor",
        description:
            "A mentor whose scholarship and guidance have contributed to Julio's intellectual development in sociology."
    },


    julio: {
        name: "Julio Cedillo",
        role: "Sociologist",
        relationship: "Current Scholar",
        description:
            "Sociologist interested in citizenship, immigration, race and ethnicity, political sociology, military sociology, and social theory.",

        mentors: [
            "rodriguez-muniz",
            "hammer"
        ]
    }

};



/* =========================================
   Find Person
   ========================================= */

function getPerson(id) {

    return genealogy[id];

}



/* =========================================
   Select Person
   ========================================= */

function selectPerson(id) {

    const person = getPerson(id);

    if (!person) {
        return;
    }


    /*
       Remove selection from every node.
    */

    document
        .querySelectorAll(".person-node")
        .forEach(node => {

            node.classList.remove("selected");

        });



    /*
       Highlight selected node.
    */

    const selectedNode =
        document.querySelector(
            `[data-person="${id}"]`
        );


    if (selectedNode) {

        selectedNode.classList.add("selected");

    }



    /*
       Show information panel.
    */

    showPersonPanel(person);

}



/* =========================================
   Show Person Panel
   ========================================= */

function showPersonPanel(person) {

    const panel =
        document.getElementById("personPanel");


    if (!panel) {
        return;
    }



    /*
       Mentor information
    */

    let mentorInformation = "";


    if (person.mentors) {

        const mentors = person.mentors
            .map(id => {

                const mentor = getPerson(id);

                return mentor
                    ? mentor.name
                    : "";

            })
            .filter(Boolean)
            .join("<br>");


        mentorInformation = `

            <div class="panel-detail">

                <span>
                    Mentors
                </span>

                <strong>
                    ${mentors}
                </strong>

            </div>

        `;

    }



    /*
       Build panel.
    */

    panel.innerHTML = `

        <button
            type="button"
            class="close-panel"
            id="closePanel"
            aria-label="Close scholar information"
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


        <p>
            ${person.description}
        </p>


        ${mentorInformation}

    `;


    /*
       Open panel.
    */

    panel.classList.add("open");

    panel.setAttribute(
        "aria-hidden",
        "false"
    );



    /*
       Close button.
    */

    const closeButton =
        document.getElementById("closePanel");


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closePersonPanel
        );

    }

}



/* =========================================
   Close Person Panel
   ========================================= */

function closePersonPanel() {

    const panel =
        document.getElementById("personPanel");


    if (panel) {

        panel.classList.remove("open");

        panel.setAttribute(
            "aria-hidden",
            "true"
        );

    }



    /*
       Remove selected node.
    */

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

    closePersonPanel();

}



/* =========================================
   Initialize Page
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /*
           Find every scholar node.
        */

        const nodes =
            document.querySelectorAll(
                ".person-node"
            );


        /*
           Make each node clickable.
        */

        nodes.forEach(node => {

            node.addEventListener(
                "click",
                () => {

                    const id =
                        node.dataset.person;

                    selectPerson(id);

                }
            );

        });



        /*
           Reset button.
        */

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
