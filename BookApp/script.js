document.addEventListener('DOMContentLoaded', () => {
    let modeToggle = document.getElementById('toggle-switch');
    let nav = document.getElementsByClassName("navbar")[0];

    modeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        toggleSignupSigninSections();
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('mode', 'dark');
        } else {
            localStorage.setItem('mode', 'light');
        }
    });

    if (localStorage.getItem('mode') === 'dark') {
        document.body.classList.add('dark-mode');
        modeToggle.checked = true;
        toggleSignupSigninSections();
    }

    let signup_btn = document.querySelector(".signup");
    signup_btn.addEventListener("click", signup_fun);

    function signup_fun() {
        let signup_container = document.createElement("div");
        signup_container.classList.add("signup_section");

        signup_container.innerHTML = `
            <div class="signup_panel">
                <form action="" method="post" class="signup_form">
                    <span class="del_btn"><button type="button" class="close_btn">X</button></span>
                    <span class="input_name rotate"><input type="text" name="name" class="name" placeholder="NAME" required></span>
                    <span class="input_email rotate"><input type="email" name="email" class="email" placeholder="EMAIL" required></span>
                    <span class="input_password rotate"><input type="password" name="password" class="password" placeholder="PASSWORD" required></span>
                    <span class="sign_btn rotate"><button type="submit" class="signup_btn">SIGN UP</button></span>
                    <span class="link_tab">
                        <button type="button" class="signup_link_btn">SIGN UP</button>  
                        <button type="button" class="signin_btn">SIGN IN</button>
                    </span>
                </form>
            </div>
        `;

        document.querySelector(".container").appendChild(signup_container);
        document.querySelector(".left").style.display = "none";
        document.querySelector(".right").style.display = "none";

        let closeBtn = signup_container.querySelector(".close_btn");
        closeBtn.addEventListener("click", () => {
            signup_container.remove();
            document.querySelector(".left").style.display = "block";
            document.querySelector(".right").style.display = "block";
        });

        let signupForm = signup_container.querySelector(".signup_form");
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let name = signupForm.querySelector(".name").value;
            let email = signupForm.querySelector(".email").value;
            let password = signupForm.querySelector(".password").value;

            if (name && email && password) {
                let userData = { name, email, password };
                localStorage.setItem("userData", JSON.stringify(userData));
                alert("Sign up successful!");
                signup_container.remove();
                document.querySelector(".left").style.display = "block";
                document.querySelector(".right").style.display = "block";
            } else {
                alert("Please fill in all fields.");
            }
        });

        let signinBtn = signup_container.querySelector(".signin_btn");
        signinBtn.addEventListener("click", () => {
            signup_container.remove();
            signin_fun();
        });
    }

    function signin_fun() {
        let signin_container = document.createElement("div");
        signin_container.classList.add("signin_section");

        signin_container.innerHTML = `
            <div class="signin_panel">
                <form action="" method="post" class="signin_form">
                    <span class="del_btn"><button type="button" class="close_btn">X</button></span>
                    <span class="input_email rotate"><input type="email" name="email" class="email" placeholder="EMAIL" required></span>
                    <span class="input_password rotate"><input type="password" name="password" class="password" placeholder="PASSWORD" required></span>
                    <span class="sign_btn"><button type="submit" class="signin_btn">SIGN IN</button></span>
                    <span class="link_tab">
                        <button type="button" class="signup_link_btn">SIGN UP</button>  
                        <button type="button" class="signin_link_btn">SIGN IN</button>
                    </span>
                </form>
            </div>
        `;

        document.querySelector(".container").appendChild(signin_container);

        let closeBtn = signin_container.querySelector(".close_btn");
        closeBtn.addEventListener("click", () => {
            signin_container.remove();
            document.querySelector(".left").style.display = "block";
            document.querySelector(".right").style.display = "block";
        });

        let signinForm = signin_container.querySelector(".signin_form");
        signinForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let email = signinForm.querySelector(".email").value;
            let password = signinForm.querySelector(".password").value;

            let storedData = JSON.parse(localStorage.getItem("userData"));

            if (storedData && storedData.email === email && storedData.password === password) {
                alert("Sign in successful!");
                signin_container.remove();
            } else {
                alert("Invalid email or password.");
            }
        });

        let signupLinkBtn = signin_container.querySelector(".signup_link_btn");
        signupLinkBtn.addEventListener("click", () => {
            signin_container.remove();
            signup_fun();
        });
    }

    function toggleSignupSigninSections() {
        document.querySelectorAll('.signup_section, .signin_section').forEach(section => {
            section.classList.toggle('dark-mode-bg');
        });
    }
});

let list = document.querySelector(".list");
let card = document.querySelector(".card");
let data;

window.addEventListener("load", () => {
  console.log("loaded");
  display_all();

  (async function listFetch() {
    let fetched = await fetch(
      "https://books-backend.p.goit.global/books/category-list"
    );
    data = await fetched.json();
    list.innerHTML += `
      <p class="list_item" onclick="display_all()">All Categories</p>
    `;
    data.forEach((element) => {
      let elementJSON = JSON.stringify(element).replace(/"/g, '&quot;');
      list.innerHTML += `
        <p class="list_item" onclick="display('${elementJSON}')">${element.list_name}</p>
      `;
    });
  })();
});

let book_data;

function display(elementJSON) {
  let element = JSON.parse(elementJSON.replace(/&quot;/g, '"'));
  
  async function get_books(element) {
    try {
      let response = await fetch('https://books-backend.p.goit.global/books/top-books');
      book_data = await response.json();
      card.innerHTML = '';
      book_data.forEach(book => {
        if (book.list_name.includes(element.list_name)) {
          card.innerHTML += `<h1>${book.list_name}</h1>`;
          book.books.forEach(detail => {
            cardCreate(detail.book_image, detail.author, detail.title);
          });
        }
      });
      addCardClickListeners();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }
  get_books(element);
}

function displayCat(elementBook) {
  async function get_books(elementBook) {
    try {
      let response = await fetch("https://books-backend.p.goit.global/books/top-books");
      book_data = await response.json();
      card.innerHTML = "";
      book_data.forEach((book) => {
        if (book.list_name.includes(elementBook)) {
          card.innerHTML += `<h1>${book.list_name}</h1>`;
          book.books.forEach((detail) => {
            cardCreate(detail.book_image, detail.author, detail.title);
          });
        }
      });
      addCardClickListeners();
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
  get_books(elementBook);
}

async function display_all() {
  try {
    let response = await fetch("https://books-backend.p.goit.global/books/top-books");
    book_data = await response.json();
    card.innerHTML = "";
    book_data.forEach((book) => {
      card.innerHTML += `<h1>${book.list_name}</h1>`;
      let counter = 0;
      book.books.forEach((detail) => {
        if (counter <= 3) {
          cardCreate(detail.book_image, detail.author, detail.title);
          counter++;
        }
      });
      let create_btn = document.createElement('div');
      create_btn.className = 'create_btn';
      let elementBook = JSON.stringify(book.list_name).replace(/"/g, "&quot;");
      create_btn.innerHTML += `<button onclick="displayCat(${elementBook})">Show More</button>`;
      card.appendChild(create_btn);
    });
    addCardClickListeners();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

function cardCreate(img, author, title) {
  card.innerHTML += `
    <div class="cards">
      <img src="${img}" alt="">
      <div class="detail">
        <h4>${author}</h4>
        <p><i>${title}</i></p>
      </div>
    </div>
  `;
}

function addCardClickListeners() {
  let cards = document.querySelectorAll(".cards");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      let img = card.querySelector("img").src;
      let author = card.querySelector("h4").innerText;
      let title = card.querySelector("p").innerText;
      showCardDetails(img, author, title);
    });
  });
}

function showCardDetails(img, author, title) {
  let cardDetail = document.querySelector(".card-detail");
  cardDetail.innerHTML = `
    <div class="card-detail-content">
      <span class="close-card-detail">X</span>
      <img src="${img}" alt="">
      <h4>${author}</h4>
      <p><i>${title}</i></p>
      <h1>Add to Shopping List</h1>
    </div>
  `;
  cardDetail.style.display = "block";

  let closeBtn = cardDetail.querySelector(".close-card-detail");
  closeBtn.addEventListener("click", () => {
    cardDetail.style.display = "none";
  });
}