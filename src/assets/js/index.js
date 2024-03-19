let series;
let categories = [{
    title: 'Heath and beauty',
    img: './img/health.png',
    sum: 0,
    currency: 'UAH',
}, {
    title: 'Food and shop',
    img: './img/shopping-basket.png',
    sum: 0,
    currency: 'UAH',
}, {
    title: 'Cafe and Restaurant',
    img: './img/cafe.png',
    sum: 0,
    currency: 'UAH',
}, {
    title: 'Clothes and shoes',
    img: './img/clothes.png',
    sum: 0,
    currency: 'UAH',
}, {
    title: 'Repair',
    img: './img/repair-tools.png',
    sum: 0,
    currency: 'UAH',
}, {
    title: 'Mobile phone',
    img: './img/mobile-phone.png',
    sum: 0,
    currency: 'UAH',
}, {
    title: 'Sport and entertainment',
    img: './img/sport.png',
    sum: 0,
    currency: 'UAH',
}, {
    title: 'Withdraw',
    img: './img/salary.png',
    sum: 0,
    currency: 'UAH',
}, {
    title: 'Car or taxi',
    img: './img/car.png',
    sum: 0,
    currency: 'UAH',
}, {
    title: 'Pets',
    img: './img/pets.png',
    sum: 0,
    currency: 'UAH',
}, {
    title: 'Utility payments',
    img: './img/payments.png',
    sum: 0,
    currency: 'UAH',
}, {
    title: 'Other',
    img: './img/dots.png',
    sum: 0,
    currency: 'UAH',
}];
let storage = JSON.parse(localStorage.getItem('storage')) ?? {
    salaryValue: 0,
    expenses: []
};
let activeCategory = null;

let categoriesCards = document.querySelector('.categories__cards');

function renderData(categories) {
    categories.forEach((item) => {
        categoriesCards.append(createCard(item))
    })
}

function createCard(item) {
    let cardOut = document.createElement("div");
    cardOut.classList.add('card');

    cardOut.addEventListener('click', () => {
        let cards = document.querySelectorAll('.card')
        cards.forEach(item => {
            item.classList.remove('active')

        })
        withdrawForm();
        cardOut.classList.add('active')
        activeCategory = item.title;

    })

    let cardTitle = document.createElement("h4");
    cardTitle.classList.add('card__title');
    cardTitle.innerHTML = item.title;

    let img = document.createElement('img');
    img.classList.add('card__img');
    img.src = item.img;

    let sum = document.createElement("p");
    sum.classList.add('card__sum');
    //sum.innerHTML = item.sum;
    sum.innerHTML = storage.expenses.find(expense => expense.title === item.title)?.sum ?? 0;

    let cardCurrency = document.createElement("span");
    cardCurrency.classList.add('card__currency');
    cardCurrency.innerHTML = item.currency;

    // let withdrawBtn = document.createElement("button");
    // withdrawBtn.classList.add('withdraw__money');
    // withdrawBtn.innerHTML = "Withdraw"


    cardOut.append(cardTitle, img, sum, cardCurrency);

    return cardOut;
}

let salaryValueElement = document.querySelector('.salary__value');
salaryValueElement.textContent = storage.salaryValue;

function AddSalary() {
    let salaryInp = document.querySelector('.salary__inp');
    let salaryBtn = document.querySelector('.salary__btn');

    salaryBtn.addEventListener('click', () => {
        let inputValue = parseFloat(salaryInp.value);

        if (!isNaN(inputValue) && inputValue > 0) {
            storage.salaryValue = parseInt(salaryValueElement.textContent) + parseInt(salaryInp.value);
            salaryValueElement.textContent = storage.salaryValue;
            updateLocalStorage();
            salaryInp.value = "";
        } else {
            alert('Please, enter the correct data')
        }

    })
}

function WaistSalary() {
    let waistInp = document.querySelector('.waist__inp');
    let waistBtn = document.querySelector('.waist__btn');

    waistBtn.addEventListener('click', () => {
        let cards = document.querySelectorAll('.card');
        let waistSum = parseInt(waistInp.value);

        let cardActive = Array.from(cards).find(card => card.classList.contains('active'));

        if (cardActive) {

            if (!isNaN(waistSum) && waistSum > 0) {
                if (storage.salaryValue >= waistSum) {
                    const activeTitle = cardActive.querySelector('.card__title').textContent;
                    storage.salaryValue = storage.salaryValue - waistSum;
                    salaryValueElement.textContent = storage.salaryValue;
                    waistInp.value = "";
                    activeCategory = null;

                    let cardSum = cardActive.querySelector('.card__sum');

                    let currentExpense = storage.expenses.find(expense => expense.title === activeTitle);

                    if (currentExpense) {
                        currentExpense.sum += waistSum;
                    } else {
                        currentExpense = {
                            title: activeTitle,
                            sum: waistSum
                        };
                        storage.expenses.push(currentExpense);
                    }

                    cardSum.textContent = currentExpense.sum;


                    updateLocalStorage();
                } else {
                    alert('Please add money')
                }
            } else {
                alert('Please, enter the correct data')
            }
        } else {
            alert('Please choose a category');
        }


    });
}

function updateLocalStorage() {
    localStorage.setItem('storage', JSON.stringify(storage));
    series.data.setAll(storage.expenses);
}

function renderPieChart() {
    let root = am5.Root.new("chartdiv");

    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(
        am5percent.PieChart.new(root, {})
    );

    series = chart.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "sum",
            categoryField: "title"
        })
    );

    series.data.setAll(storage.expenses);
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.querySelector('.wrapper').style.opacity = "0.5";
    document.getElementById("myForm").style.opacity  = "1";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.querySelector('.wrapper').style.opacity = "1";
}
let openFormBtn = document.querySelector('.open-button')
openFormBtn.addEventListener('click', openForm)

let closeFormBtn = document.querySelector('.btn_cancel');
closeFormBtn.addEventListener('click', closeForm)


function withdrawForm() {
    document.getElementById("WithdrawForm").style.display = "block";
    document.querySelector('.wrapper').style.opacity = "0.5";
    document.getElementById("WithdrawForm").style.opacity  = "1";
}
function closeWithdrawForm() {
    document.getElementById("WithdrawForm").style.display = "none";
    document.querySelector('.wrapper').style.opacity = "1";
}

// let withdrawFormBtn = document.querySelector('.withdraw-button')
// withdrawFormBtn.addEventListener('click', withdrawForm)

let closeWithdrawFormBtn = document.querySelector('.btn_cancel_waist');
closeWithdrawFormBtn.addEventListener('click', closeWithdrawForm)


AddSalary()
WaistSalary()
renderData(categories)

am5.ready(function () {
    renderPieChart();
})

