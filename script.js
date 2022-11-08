const name_regex = /^[А-ЯІЇ][А-Яа-яІЇії'\- ]+ [А-ЯІЇ]\.[А-ЯІЇ]\.$/;
const date_regex = /^(0[1-9]|[1-2]\d|3[0-1])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
const city_regex = /^м. [А-ЯІЇ][А-Яа-яІЇії'\- ]+$/;
const email_regex = /^[A-z][\w_\-\.]{3,}\w@[a-z]{2,9}(.[a-z]{2,9})+$/;
const telegram_regex = /^@[\w_]{5,}$/

const valide_name = (str) => name_regex.test(str);
const valide_date = (str) => date_regex.test(str);
const valide_city = (str) => city_regex.test(str);
const valide_email = (str) => email_regex.test(str);
const valide_telegram = (str) => telegram_regex.test(str);

const validetors = [valide_name, valide_date, valide_city, valide_email, valide_telegram]

function clear_output() {
    const outputs = document.querySelectorAll(".post-container div");
    outputs.forEach(el => {
        el.textContent = el.textContent.slice(0, el.textContent.indexOf(":") + 1);
    });
}

function validate_input() {
    clear_output();
    const inputs = document.querySelectorAll("input");
    var f = true;

    for(var i = 0; i < 5; i++) {
        if(validetors[i](inputs[i].value))  {
            inputs[i].style.boxShadow = "2px 2px 2px rgb(90, 90, 90)";
        }
        else {
            inputs[i].style.boxShadow =    `2px 2px 2px rgb(90, 90, 90),
                                    inset 0.5px 0.5px 0.5px 0.5px rgba(255, 0, 0, 0.7),
                                    inset -0.5px -0.5px 0.5px 0.5px rgba(255, 0, 0, 0.7)`;
            f = false;
        }
    }
    if(f) {
        const outputs = document.querySelectorAll(".post-container div");
        for(var i = 0; i < 5; i++) {
            outputs[i].textContent += " " + inputs[i].value;
        }
    }
}

// Second part //

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function random_change(el) {
    var red = getRandomInt(256);
    var green = getRandomInt(256);
    var blue = getRandomInt(256);
    el.style.background = `rgb(${red}, ${green}, ${blue})`;
}

function selected_change(el) {
    const pallete = document.querySelector('input[type="color"]');
    el.style.background = pallete.value;
}
function not_selected_change(el) {
    el.style.background = "rgb(255, 255, 255)";
}

function set_dbl() {
    const t = document.querySelector("table");
    t.setAttribute("data-dbl", (Number(t.getAttribute("data-dbl")) == 0)?1:0);
}

const cells = document.querySelectorAll("td");
cells.forEach(cell => {
    cell.addEventListener("mouseover", function() {
        if(Number(document.querySelector("table").getAttribute("data-dbl")) == 1) {
            var ip = this.parentElement.rowIndex;
            var jp = this.cellIndex;
            const rows = document.querySelectorAll("tr");
            for(var i = 0; i < 6; i++) {
                const cells = rows[i].children;
                for(var j = 0; j < 6; j++) {
                    if(i <= ip && j >= jp) selected_change(cells[j]);
                    else not_selected_change(cells[j]);
                }
            }
        }
    });
});