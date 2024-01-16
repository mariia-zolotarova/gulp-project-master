document.getElementById("burger-btn").addEventListener("click", onBurgerClick);

function onBurgerClick() {
    var mobileMenu = document.getElementById("mobile");

    if (mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
    } else {
        mobileMenu.style.display = "block";
    }
}