// Current Page Constants

const toggleLight = document.querySelector('.mode-toggle-day');
const mode = document.getElementById('style');
const siteContent = document.getElementById('content');
const currentClasses = siteContent.className.split(" ");

// Responsive NavBar Functionality
function openNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Shopping Cart Functions

// Generating Products Array From JSON File
let products = [];
async function fetchProducts() {
  const res = await fetch("scripts/products.json");
  const data = await res.json();
  return data;
}

// Fetching Product From Products Array Via ID
function getProduct(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      return products[i];
    }
  }
}

// Updating Cart Cookie String When Adding Products
function addToCart(id) {
  // Retrieve Current Cart String
  let currentCart = getCookie("cart");

  // If Cart Is Empty, Just Enter 1 Of Added Product ID
  if (currentCart === "") {
    // Cart Stored As JSON Objects But Cookie Stored As String
    // Convert This JSON Object Into A String For Cookie
    setCookie("cart", JSON.stringify({"id": id, "amount": 1}), 0.04);
    return;
  } else {

    // Split Full Cookie String Into Pairs Of Product IDs And Amount Already In Cart
    let items = currentCart.split(",");

    // Loop Through Items Array By 2 Steps To Check Every Product ID
    for(let i = 0; i < items.length; i += 2) {

      // If Product ID Already In Cart, Just Increment Corresponding Amount By 1
      if (JSON.parse(`${items[i]}}`).id == id) {

        // Convert Amount String Into JSON To Increment Number Before Changing It Back To A String With The New Value
        items[i + 1] = JSON.stringify(JSON.parse(`{${items[i + 1]}`).amount += 1);
        JSON.stringify(items[i + 1]);

        // Initialise An Array To Piece Each Pair Of Strings Back Into Their Full JSON Objects
        let JSONitems = [];

        // Loop Through Each Pair Of Strings
        for (let j = 0; j < items.length; j += 2) {
          let elems = [];

          // If Amount Of Current Pair Was Turned Into A Full JSON Object To Increment It,
          // Convert Back To Second Half Of The Full Product Object Before Rejoining Elements
          if (JSON.parse(`${items[j]}}`).id == id) {
            elems = [items[j], `"amount":${items[j + 1]}}`];
          } else {
            elems = [items[j], items[j + 1]];
          }

          // Rejoin Each Pair Of JSON Elements And Push String To Full Object Array
          let item = elems.join(",");
          JSONitems.push(item);
        }

        // Set Cookie To New Updated String Of JSON Objects
        setCookie("cart", JSONitems, 0.04);
        if (currentClasses[1] === "cart") {
          displayCart();
        }
        return;
      }
    }

    // If Product ID Not Already In Cart, Add New JSON Object To Cookie String
    items += `,${JSON.stringify({"id": id, "amount": 1})}`;
    setCookie("cart", items, 0.04);
  }
}

// Updating Cart Cookie String When Removing Products
function removeFromCart(id) {
  // Retrieve Current Cart String And Split Into Pairs Of Product ID And Amount In Cart
  let currentCart = getCookie("cart");
  if (currentCart == "") {
    console.log("Cart already empty");
    return;
  }
  let items = currentCart.split(",");

  // Check Each Pair Of Products To Find ID Of Product To Remove
  for (let i = 0; i < items.length; i += 2) {
    if (JSON.parse(`${items[i]}}`).id == id) {
      // If There Is Only One Of The Product In Cart,
      // Use items.splice To Remove The 2 Items At The Current Index (i) Of The Items Array
      if (JSON.parse(`{${items[i + 1]}`).amount == 1) {
        items.splice(i, 2);

        // Use Same Logic As addToCart() To Rejoin Elemnt Pairs
        // And Set New Cart Cookie Value
        let JSONitems = [];
        for (let j = 0; j < items.length; j += 2) {
          let elems = [];
          if (JSON.parse(`${items[j]}}`).id == id) {
            elems = [items[j], `"amount":${items[j + 1]}}`];
          } else {
            elems = [items[j], items[j + 1]];
          }
          let item = elems.join(",");
          JSONitems.push(item);
        }
        setCookie("cart", JSONitems, 0.04);

      // If There Is More Than One Of The Product In Cart,
      // Use The Same Logic As Increasing Amount In addToCart() But Decrement The Amount Value
      // Before Rejoining The Element Pairs Into The New Cookie String
      } else {
      items[i + 1] = JSON.stringify(JSON.parse(`{${items[i + 1]}`).amount -= 1);
        JSON.stringify(items[i + 1]);
        let JSONitems = [];
        for (let j = 0; j < items.length; j += 2) {
          let elems = [];
          if (JSON.parse(`${items[j]}}`).id == id) {
            elems = [items[j], `"amount":${items[j + 1]}}`];
          } else {
            elems = [items[j], items[j + 1]];
          }
          let item = elems.join(",");
          JSONitems.push(item);
        }
        setCookie("cart", JSONitems, 0.04);
      }
      if (currentClasses[1] === "cart") {
        displayCart();
      }
      return;
    } 
  }

  // If The Loop Has Completed Without Returning From The Function
  // Log To Console That The Item To Remove Is Not Currently In The Cart
  console.log("item not found in current cart");
}

// Retrieve Data To Display On Cart Page From Cookie
function displayCart() {
  let itemString = getCookie("cart");
  if (itemString === "") {
    document.getElementById("currentCart").innerHTML = "";
    document.getElementById("checkout").innerHTML = `<div class="checkoutInfo"><h3>Total Price: €0.00</h3><p>Cart is currently empty</p></div>`;
    return;
  }
  let items = itemString.split(",");

  // Initialise All Variables To Be Displayed On Page
  let innerHTMLString = "";
  let totalPrice = 0;

  // For Each Object In Cookie string,
  // Fetch The Relevant Product Details From The Products Array,
  // Update The Total Cost Of The Cart 
  // And Update The HTML String With The Product Details To Be Displayed
  for (let i = 0; i < items.length; i += 2) {
    let id = JSON.parse(`${items[i]}}`).id;
    let amount = JSON.parse(`{${items[i + 1]}`).amount;
    let currentProduct = getProduct(id);
    totalPrice += (currentProduct.price * amount);
    innerHTMLString += `<div class="container"><img src="${currentProduct.image}" class="cartImage"><div class="cartInfo"><h3>${currentProduct.title} x ${amount}</h3><h4>€${(currentProduct.price * amount).toFixed(2)}</h4><div class="cartButtons"><button onclick="addToCart(${id})\">Add To Cart</button><button onclick="removeFromCart(${id})">Remove From Cart</button></div></div></div><br><br>`
  };

  // End The HTML String With A Display For The Total Cost Of The User's Purchase And Display It
  document.getElementById("currentCart").innerHTML = innerHTMLString;

  innerHTMLString = `<div class="checkoutInfo"><h3>Total Price: €${totalPrice.toFixed(2)}</h3><button onclick="checkout(${totalPrice.toFixed(2)})">Checkout</button></div>`;

  document.getElementById("checkout").innerHTML = innerHTMLString;
}

function resetCart() {
  let cart = getCookie("cart");
  let items = cart.split(",");
  items.splice(0, items.length);
  setCookie("cart", items, 0.4);
  console.log(getCookie("cart"));
}

function checkout(total) {
  resetCart();
  displayCart();
  alert(`Thank you for your purchase of €${total}`);
}

// Filter Functions

function displayComics(category) {
  if (category === "Marvel") {
    document.getElementById("1").innerHTML = marvel1;
    document.getElementById("2").innerHTML = marvel2;
    document.getElementById("3").innerHTML = marvel3;
    document.getElementById("4").innerHTML = marvel4;
    document.getElementById("5").innerHTML = marvel5;

  } else if (category === "DC") {
    document.getElementById("1").innerHTML = DC1;
    document.getElementById("2").innerHTML = DC2;
    document.getElementById("3").innerHTML = DC3;
    document.getElementById("4").innerHTML = DC4;
    document.getElementById("5").innerHTML = DC5;

  } else {
    document.getElementById("1").innerHTML = indie1;
    document.getElementById("2").innerHTML = indie2;
    document.getElementById("3").innerHTML = indie3;
    document.getElementById("4").innerHTML = indie4;
    document.getElementById("5").innerHTML = indie5;
  }
}

function displayGames(category) {
  if (category === "DnD") {
    document.getElementById("1").innerHTML = DnD1;
    document.getElementById("2").innerHTML = DnD2;
    document.getElementById("3").innerHTML = DnD3;
    document.getElementById("4").innerHTML = DnD4;
    document.getElementById("5").innerHTML = DnD5;
  } else {
    document.getElementById("1").innerHTML = WH1;
    document.getElementById("2").innerHTML = WH2;
    document.getElementById("3").innerHTML = WH3;
    document.getElementById("4").innerHTML = WH4;
    document.getElementById("5").innerHTML = WH5;
  }
}

// Light/Dark Mode Function

toggleLight.addEventListener('click', () => {
  if (getCookie("darkMode") === "true") {
    mode.setAttribute("href", "./css/light.css");
    setCookie("darkMode", "false", 365);
    toggleLight.textContent = "☼";
  } else {
    mode.setAttribute("href", "./css/dark.css");
    setCookie("darkMode", "true", 365);
    toggleLight.textContent = "☾";
  }
})

// Cookie Functions

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  setCookie(cname, "", 0.5);
}

function setCookie(cname, cvalue, exdays=1) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}

function removeCookie(cname) {
  setCookie(cname, "", 0);
}

// Initialize Page Function,
// Starts Page-Load Animation, Fetches Product Array,
// Checks Cookies For Cart Contents and Light/Dark Mode

window.onload = async function Initialize() {
  siteContent.className = `hidden ${currentClasses[1]}`;
  siteContent.className = `visible ${currentClasses[1]}`;

  if (currentClasses[1] === "cart") {
    products = await fetchProducts();
    displayCart();
  }

  if (document.cookie === "") {
    document.cookie = "darkMode:false;expires=Thur, 31 Dec 2099 23:59:59 UTC";
    return;
  }

  let status = getCookie("darkMode");
  if (status === "true") {
    mode.setAttribute("href", "./css/dark.css");
    toggleLight.textContent = "☾";
    console.log("Dark Mode enabled");
  } else {
    console.log("Light Mode enabled");
  }
}

// String Literals For Filtered Displays

const marvel1 = "<img src='./images/comics/AmazingFantasy15.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Amazing Fantasy (1962) #15</h3><h4 class='price'>€59.99</h4><p>The First Appearance of the Amazing Spider-Man! When young Peter Parker gains remarkable abilities from a radioactive spider, he must step up and try to become a hero — while also dealing with the fantastic pressures of an everyday teenager! For with great power, there must also come great responsibility!</p><div class=\"cartButtons\"><button onclick=\"addToCart('1')\">Add To Cart</button><button onclick=\"removeFromCart('1')\">Remove From Cart</button></div></div>";
const marvel2 = "<img src='./images/comics/InfinityGauntlet1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Infinity Gauntlet (1991) #1</h3><h4 class='price'>€29.99</h4><p>One of the biggest events ever to hit the Marvel Universe! For Thanos, the Infinity Gauntlet was the ultimate prize to be coveted above all else. With it came omnipotence. Now it's up to Earth's super heroes to make a desperate attempt to thwart this mad god's insane plunge into galactic self-destruction.</p><div class=\"cartButtons\"><button onclick=\"addToCart('2')\">Add To Cart</button><button onclick=\"removeFromCart('2')\">Remove From Cart</button></div></div>";
const marvel3 = "<img src='./images/comics/SecretEmpire1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Secret Empire (2017) #1</h3><h4 class='price'>€34.99</h4><p>It's been building for months, across a bevy of titles! But now, the moment has arrived for Steve Rogers to step into the light and declare his allegiance to Hydra! How can the heroes of the Marvel Universe cope with this shattering betrayal by the most trusted figure among them? And what will this mean for the world? The map of the Marvel Universe changes in ways nobody will expect - TRUST THE SECRET EMPIRE!</p><div class=\"cartButtons\"><button onclick=\"addToCart('3')\">Add To Cart</button><button onclick=\"removeFromCart('3')\">Remove From Cart</button></div></div>";
const marvel4 = "<img src='./images/comics/Deadpool1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Deadpool (2015) #1</h3><h4 class='price'>€24.99</h4><p>He's annoying. He's dangerous. He smells terrible. But the public love him. That's right - the Merc with the Mouth may make money for missions of murky morality...but he's become the most popular hero in the world for it. Eat that, Spidey! The world belongs to...DEADPOOL. The fan favorite team of Gerry Duggan and Mike Hawthorne return to bring Deadpool in to his most successful adventures yet!</p><div class=\"cartButtons\"><button onclick=\"addToCart('4')\">Add To Cart</button><button onclick=\"removeFromCart('4')\">Remove From Cart</button></div></div>";
const marvel5 = "<img src='./images/comics/X-MenGold1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>X-Men: Gold (2017) #1</h3><h4 class='price'>€44.99</h4><p>FROM THE ASHES OF INHUMANS VS X-MEN, AN ALL-NEW TEAM OF X-MEN RISES! Xavier’s dream comes full circle as KITTY PRYDE takes the reins and assembles a squad of the most iconic X-Men to fight at her side. STORM. COLOSSUS. NIGHTCRAWLER. OLD MAN LOGAN. PRESTIGE. They are X-MEN GOLD! And they’re on a mission to be Earth’s finest heroes, even when that means defending those who hate and fear them. Brought to you by an all-star creative team of Marc Guggenheim (X-MEN, S.H.I.E.L.D., television’s Arrow) and Ardian Syaf (BATGIRL, SUPERMAN/BATMAN, BRIGHTEST DAY), a new beginning for the strangest heroes of all starts here!</p><div class=\"cartButtons\"><button onclick=\"addToCart('5')\">Add To Cart</button><button onclick=\"removeFromCart('5')\">Remove From Cart</button></div></div>";

const DC1 = "<img src='./images/comics/AbsoluteGreenLantern1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Absolute Green Lantern Vol 1: Without Fear (2025)</h3><h4 class='price'>€49.99</h4><p>On an alternate version of Earth, a powerful alien descends on a small town in Nevada. Terror reigns as he enacts his judgment on the residents of Evergreen—among them, ordinary citizens Guy Gardner, Hal Jordan, John Stewart, and Jo Mullein. When fighting back carries an unimaginable cost, who will conquer their fear and emerge a hero? Writer Al Ewing (Metamorpho: The Element Man) and artist Jahnoy Lindsay (Superboy: Man of Tomorrow) get cosmic in this story from the Absolute Universe! Collects Absolute Green Lantern #1-6.</p><div class=\"cartButtons\"><button onclick=\"addToCart('6')\">Add To Cart</button><button onclick=\"removeFromCart('6')\">Remove From Cart</button></div></div>";
const DC2 = "<img src='./images/comics/SecretSix1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Secret Six (2025)</h3><h4 class='price'>€39.99</h4><p>After Amanda Waller and her Suicide Squad finally went too far, the government locked her up in the prison that was once her base of operations. But when Waller disappears from her cell at Belle Reve, every world-changing piece of intel stored in her head could fall into the wrong hands. To win this race against time, heroes Jon Kent (Superman), Jay Nakamura (Gossamer), and Nia Nal (Dreamer) must team up with the three villains closest to Waller: Deadshot, Catman, and Black Alice. Can these six reluctant teammates reclaim the biggest trove of information in the DC Universe without stabbing each other in the back first? From acclaimed writer and actress Nicole Maines (Supergirl) and superstar artist Stephen Segovia (Spawn), the Secret Six are back in an all-new, high-stakes, twist-filled limited series! Collects Secret Six #1-6.</p><div class=\"cartButtons\"><button onclick=\"addToCart('7')\">Add To Cart</button><button onclick=\"removeFromCart('7')\">Remove From Cart</button></div></div>";
const DC3 = "<img src='./images/comics/BirdsOfPrey28.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Birds Of Prey (2023 -) #28</h3><h4 class='price'>€19.99</h4><p>One last mission. One final fight. No do-overs. No second chances. And the fate of the Birds of Prey hangs in the balance. The Unreality is collapsing and threatening all of Gotham as it spills out into the real world in dangerous and unexpected ways. As the Birds of Prey struggle to survive inside the game, the final showdown will test everything the team has built. Can the Birds get to the heart of what the Shadow Army’s real goal has been all along before it’s too late for them…and for Gotham?</p><div class=\"cartButtons\"><button onclick=\"addToCart('8')\">Add To Cart</button><button onclick=\"removeFromCart('8')\">Remove From Cart</button></div></div>";
const DC4 = "<img src='./images/comics/MartianManhunter1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Absolute Martian Manhunter Vol. 1: Martian Vision (2025)</h3><h4 class='price'>€39.99</h4><p>FBI agent John Jones has a problem. His brain has been infected by an alien consciousness calling itself “the Martian,” and its perception of reality is utterly incomprehensible to the human psyche. Now he must navigate this new status quo, all while balancing the deeply grounded and important duties of his day job! Reinvented from top to bottom by Deniz Camp (Ultimates, 20th Century Men) and Javier Rodríguez (Zatanna: Bring Down the House), Absolute Martian Manhunter takes Justice League’s resident Martian on a mind-bending, psychedelic journey that transcends dimensions. Collects Absolute Martian Manhunter #1-6.</p><div class=\"cartButtons\"><button onclick=\"addToCart('9')\">Add To Cart</button><button onclick=\"removeFromCart('9')\">Remove From Cart</button></div></div>";
const DC5 = "<img src='./images/comics/HarleyQuinn53.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Harley Quinn (2021 -)#53</h3><h4 class='price'>€29.99</h4><p>Hello. This is Harley Quinn. Today, I’m going to be announcing three exciting new products coming from DC. A new way to disrupt super-villains without getting your hands dirty, a hilarious comic about a super-cute clown girl who everyone is in love with, and a story about an angry industrialist whose portfolio value is through the roof. Three products. Disrupting super-villainy, a super cute clown girl, and an angry industrialist. Are you getting it? Is this making sense?! I’m talking about the new issue of my comic! It’s all in there. Hello? Is this thing on? Does anyone even read these things?????</p><div class=\"cartButtons\"><button onclick=\"addToCart('10')\">Add To Cart</button><button onclick=\"removeFromCart('10')\">Remove From Cart</button></div></div>";

const indie1 = "<img src='./images/comics/Invincible1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Invincible (2003) #1</h3><h4 class='price'>€24.99</h4><h4>Published by Image Studios</h4><p>Mark Grayson is teenage superhero Invincible. He was a normal high school senior with a normal part-time job and otherwise normal life, except his father Nolan is the superhero Omni-Man, the most powerful superhero on the planet. At the age of 17, Mark begins to display superpowers, which come from his father being a member of the Viltrumite race, who, according to Nolan, pioneer the galaxy on a mission of benevolence and enlightenment.<br><br>As Invincible, Mark begins working as a superhero, with his father acting as his mentor, and meeting other heroes. Mark worked occasionally with a superhero team called the Teen Team (consisting of Robot, Rex Plode, Dupli-Kate and Atom Eve), from there discovering that his Physics teacher has been turning his students into human bombs. He stops his teacher with the help of the heroine, Atom Eve. He also foils a plan to make an army of robots, created by the Mauler Twins. Meanwhile Omni-Man is kidnapped by aliens, taken to another dimension, but returns after what seems to be only a few days, but was actually eight months to him.</p><div class=\"cartButtons\"><button onclick=\"addToCart('11')\">Add To Cart</button><button onclick=\"removeFromCart('11')\">Remove From Cart</button></div></div>";
const indie2 = "<img src='./images/comics/MightyMorphinPowerRangersVol7.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Mighty Morphin Power Rangers Vol. 7 (2019)</h3><h4 class='price'>€19.99</h4><h4>Published by BOOM! Studios</h4><p>The epic start of Mighty Morphin Power Rangers’ first comic book crossover event: Shattered Grid! <br><br> FOREVER RANGERS. <br><br> After Lord Drakkon escapes from the Mighty Morphin Power Rangers, he sets his sights on one goal: conquering Power Rangers across all eras. From Time Force to RPM, no Ranger is safe as Drakkon’s conquest causes the Morphin Grid to shatter, jeopardizing all of existence. But it’s this very act that might give the Rangers a fighting chance against Lord Drakkon and his armies. <br><br> Writer Kyle Higgins (Nightwing) and artist Daniele DiNicuolo (Mighty Morphin Power Rangers: Pink) raise the stakes as Rangers from across time and space band together to save the universe in this first installment of the critically acclaimed event, Shattered Grid.</p><div class=\"cartButtons\"><button onclick=\"addToCart('12')\">Add To Cart</button><button onclick=\"removeFromCart('12')\">Remove From Cart</button></div></div>";
const indie3 = "<img src='./images/comics/HellboyVol8.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Hellboy Vol. 8: Darkness Calls</h3><h4 class='price'>€29.99</h4><h4>Published by Dark Horse Comics</h4><p>Hellboy has finally returned from his adventures at sea, but no sooner has he settled on land than a conclave of witches drags him from his respite and into the heart of Russian folklore, where he becomes the quarry of the powerful and bloodthirsty witch Baba Yaga. Bent on revenge for the eye she had lost to Hellboy, Baba Yaga has enlisted the aid of a deathless warrior who will stop at nothing to destroy Hellboy.<br><br>Since his creation in 1993, Mike Mignola's Hellboy has accumulated dozens of industry awards and become a favorite of fans and critics alike. Now, Mignola turns over drawing duties to Duncan Fegredo (Enigma, Ultimate Adventures) for a new chapter in the life of the World's Greatest Paranormal Investigator.<br><br>* Collects the entire six-issue miniseries, along with two new epilogues--one drawn by Mignola, and one by Fegredo--and an extensive sketchbook section from both artists</p><div class=\"cartButtons\"><button onclick=\"addToCart('13')\">Add To Cart</button><button onclick=\"removeFromCart('13')\">Remove From Cart</button></div></div>";
const indie4 = "<img src='./images/comics/ScottPilgrim1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Scott Pilgrim Volume 1: Scott Pilgrim's Precious Little Life (2004)</h3><h4 class='price'>€19.99</h4><h4>Published by Oni Press</h4><p>Scott Pilgrim's life is totally sweet. He's 23 years old, he's in a rockband, he's \"between jobs,\" and he's dating a cute high school girl. Nothing could possibly go wrong, unless a seriously mind-blowing, dangerously fashionable, rollerblading delivery girl named Ramona Flowers starts cruising through his dreams and sailing by him at parties. Will Scott's awesome life ge tturned upside-down? Will he have to face Ramona's seven evil ex-boyfriends in battle? The short answer is yes. The long answer is Scott Pilgrim, Volume 1:Scott Pilgrim's Precious Little Life.</p><div class=\"cartButtons\"><button onclick=\"addToCart('14')\">Add To Cart</button><button onclick=\"removeFromCart('14')\">Remove From Cart</button></div></div>";
const indie5 = "<img src='./images/comics/LockeAndKey1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Locke & Key | Welcome To Lovecraft (2008)</h3><h4 class='price'>€9.99</h4><h4>Published by IDW Comics</h4><p>After the murder of their father, Tyler, Kinsey, and Bode Locke relocate with their mother to the family estate of Keyhouse, located in Lovecraft, Massachusetts. Sam Lesser, one of the teens who murdered Mr. Locke, is in a juvenile detention center and, by gazing in water, communicates with a supernatural force that promises to free him. Bode Locke, the youngest of the family, uncovers The Ghost Door, which separates his spirit from his body.</p><div class=\"cartButtons\"><button onclick=\"addToCart('15')\">Add To Cart</button><button onclick=\"removeFromCart('15')\">Remove From Cart</button></div></div>";

const DnD1 = "<img src=\"./images/games/DnDDice.jpg\" class=\"gamesImage\"><div class=\"gamesInfo\"><h3 class=\"title\">Vintage Engraved 5-piece Dice Sets With Pouches</h3><h4 class=\"price\">€29.95</h4><p>Polyhedral Dices set: 5 sets Vintage engraving series polyhedral dices, each 7-die set contains 1 piece d20, 1 piece d12, 2 pieces d10 (00-90 and 0-9), 1 piece d8, 1 piece d6, 1 piece d4; 35 Pieces in total.<br><br>Easy to read: Made from high-quality acrylic material with precisely carved mold, these polyhedral dice are extremely durable. The Polyhedral Game Dice are easy to roll, and the largest possible font is easy to read.<br><br>Exclusive Design: The base color of the dice is classic black, combined with red, blue, yellow, white, green respectively to form 5 different colors of engraved dice, beautifully unique.<br><br>Widely Used: Perfect and high quality Role Playing Dice for table games, board game, RPG, D&D, MTG. If you receive a defective mold or a missing mold set, we will give you a free replacement.<br><br>Dice Combination：5 sets polyhedral dices, all dice set comes with a small drawstring flannel pouch to store your dice, convenient to store and carry</p><div class=\"cartButtons\"><button onclick=\"addToCart('16')\">Add To Cart</button><button onclick=\"removeFromCart('16')\">Remove From Cart</button></div></div>";
const DnD2 = "<img src=\"./images/games/DnDEssentialsKit.jpg\" class=\"gamesImage\"><div class=\"gamesInfo\"><h3 class=\"title\">D&D Essentials Kit</h3><h4 class=\"price\">€34.99</h4><p>Everything you need to create characters and play the new adventures in this introduction to the world’s greatest roleplaying game.<br><br>Dungeons & Dragons is a cooperative storytelling game that harnesses your imagination and invites you to explore a fantastic world of adventure, where heroes battle monsters, find treasures and overcome quests. The D&D Essentials Kit is a new introductory product meant to bring D&D to audiences interested in jumping into a fantasy story.<br><br>This box contains the essentials you need to run a D&D game with one Dungeon Master and one to five adventurers. A newly designed rulebook on-boards players by teaching them how to make characters, and the included adventure, Dragon of Icespire Peak, introduces a new 1-on-1 rules variant.<br><br> Contents include: <ul><li>64 page rulebook that teaches you how to create characters of levels 1 - 6 and to play the game.</li><li>Dragon of Icespire Peak, an introductory adventure</li><li>Double-sided poster map</li><li>6 blank character sheets</li><li>11 polyhedral dice</li><li>81 cards describing magic items, sidekicks, and more</li></ul></p><div class=\"cartButtons\"><button onclick=\"addToCart('17')\">Add To Cart</button><button onclick=\"removeFromCart('17')\">Remove From Cart</button></div></div>";
const DnD3 = "<img src=\"./images/games/DnDPlayersHandbook.jpg\" class=\"gamesImage\"><div class=\"gamesInfo\"><h3 class=\"title\">D&D Player's Handbook</h3><h4 class=\"price\">€64.99</h4><p>The Player's Handbook is the essential reference for every Dungeons & Dragons roleplayer. It contains rules for character creation and advancement, backgrounds and skills, exploration and combat, equipment, spells, and much more.<br><br>Use this book to create exciting characters from among the most iconic D&D races and classes.<br><br>Dungeons & Dragons immerses you in a world of adventure. Explore ancient ruins and deadly dungeons. Battle monsters while searching for legendary treasures. Gain experience and power as you trek across uncharted lands with your companions.<br><br>The world needs heroes. Will you answer the call?</p><div class=\"cartButtons\"><button onclick=\"addToCart('18')\">Add To Cart</button><button onclick=\"removeFromCart('18')\">Remove From Cart</button></div></div>";
const DnD4 = "<img src=\"./images/games/DnDDiceTower.jpg\" class=\"gamesImage\"><div class=\"gamesInfo\"><h3 class=\"title\">Skull King D&D Dice Tower</h3><h4 class=\"price\">€42.99</h4><p>Enhance your tabletop gaming experience with this meticulousy crafted D&D dice tower, standing tall at 11 inches.<br><br>Key features: <ul><li>11 inches of unpainted, highly detailed design, ready for customization</li><li>High-quality PLA ensures durability and precision in every detail</li><li>Paint, stain, or embellish to match your unique style or game theme</li><li>Perfect for Dungeons & Dragons, Pathfinder, or any tabletop RPG, this set makes a unique gift for the discerning adventurer.</li></ul></p><div class=\"cartButtons\"><button onclick=\"addToCart('19')\">Add To Cart</button><button onclick=\"removeFromCart('19')\">Remove From Cart</button></div></div>";
const DnD5 = "<img src=\"./images/games/DnDStarterKitBundle.jpg\" class=\"gamesImage\"><div class=\"gamesInfo\"><h3 class=\"title\">D&D Starter Set + Core Rulebooks Bundle</h3><h4 class=\"price\">€174.50</h4><p>Need a gift for the holidays, a birthday present or just a treat for yourself? This is it. Inside the D&D Core Rulebook Gift Set are special foil cover editions of the three Dungeons & Dragons core rulebooks (the Players Handbook, Dungeon Master's Guide, and Monster Manual) plus a Dungeon Master's screen, all collected in a stylish slipcase. It's the perfect gift for any D&D fan.<br><br>- Each of the three books and the Dungeon Master's screen feature reflective foil covers, available ONLY with this release.<br><br>- The Player's Handbook, Dungeon Master's Guide, and Monster Manual are the foundational texts of D&D's fifth edition for beginners and for veterans alike.<br><br>- The D&D Gift Set includes the latest rules updates and errata.<br><br>- Dungeons & Dragons is the world's greatest roleplaying game. Created in 1974, D&D transformed gaming culture by blending traditional fantasy with miniatures and wargaming.</p><div class=\"cartButtons\"><button onclick=\"addToCart('20')\">Add To Cart</button><button onclick=\"removeFromCart('20')\">Remove From Cart</button></div></div>";

const WH1 = "<img src=\"./images/games/WHStarterKit.jpg\" class=\"gamesImage\"><div class=\"gamesInfo\"><h3 class=\"title\">Warhammer 40,000 Starter Set</h3><h4 class=\"price\">€84.95</h4><p>Across the far-flung worlds of the Imperium of Mankind, in a galaxy riven by warp storms and unceasing conflict, the armies of Humanity battle for survival. With the Imperium already standing upon the brink of annihilation, the Tyranid hive fleets emerge from the cold void between the stars. The Space Marines stand as the last line of defence between this ravenous alien menace and the beleaguered worlds of the Imperium.<br><br>Take the plunge into the 41st Millennium with this Starter Set for Warhammer 40,000. This box gives you a compelling introductory experience, with incredible models, a game mat to fight over, helpful guides, and all the dice and tools you need to play your first games. Pick the noble Space Marines or swarming Tyranids, give control of the other army to a friend or family member, and battle it out for hours of entertainment. This box is a fantastic way to get into the Warhammer 40,000 hobby – it's also great for expandinng your existing collections.<br><br>This box set includes: <ul><li>1x 64-page softcover <i>Warhammer 40,000 Starter Set Handbook</i></li><li>38x plastc push-fit Citadel miniatures</li><li>11x Space Marines (- 1x Captain in Terminator Armor, - 5x Terminators, - 5x Infernus Marines)</li><li>27x Tyranids (- 1x Winged Tyranid Prime, - 1x Psychophage, - 3x Von Ryan's Leapers, - 20x Termagants, - 2x Ripper Swarms)</li><li>2x Reference sheets</li><li>1x 30\" by 22.4\" double-sided gaming mat</li><li>2x range rulers and 10x six-sided dice</li></ul></p><div class=\"cartButtons\"><button onclick=\"addToCart('21')\">Add To Cart</button><button onclick=\"removeFromCart('21')\">Remove From Cart</button></div></div>";
const WH2 = "<img src=\"./images/games/WHPaintAndTools.jpg\" class=\"gamesImage\"><div class=\"gamesInfo\"><h3 class=\"title\">Warhammer 40,000: Paints + Tools Set</h3><h4 class=\"price\">€29.95</h4><p>Building and painting Citadel miniatures is a fun and exciting way to engage with the Warhammer hobby, and it only gets more rewarding with time. You’ll need a few tools and a set of paints to get started, and this box includes the basics that will form the core of your Warhammer hobby toolbox.<br><br>Get started with comfortable clippers to remove your models from the frame, a mouldline scraper to help prepare them for paint, and a starter brush that’s just the right size to get the basics painted<br><br>This box includes the following tools and paints: <ul><li>Starting Tools - Citadel Starter Brush, Citadel Starter Clippers, Citadel Mouldline Scraper</li><br><li>Base Colors - Abaddon Black, Corax White, Wraithbone, Naggaroth Night, Macragge Blue, Leadbelcher, Balthasar Gold, Bugman's Glow, Mephiston Red</li><li>Thunderhawk Blue (Layer)</li><li>Magos Purple (Contrast)</li><li> Agrax Earthshade (Shade)</li><li>Armageddon Dust (Technical)</li></ul></p><div class=\"cartButtons\"><button onclick=\"addToCart('22')\">Add To Cart</button><button onclick=\"removeFromCart('22')\">Remove From Cart</button></div></div>";
const WH3 = "<img src=\"./images/games/WHTombZone.jpg\" class=\"gamesImage\"><div class=\"gamesInfo\"><h3 class=\"title\">Killzone: Tomb World</h3><h4 class=\"price\">€119.95</h4><p>The Tomb Worlds of the Necrons are eternal mausoleums composed of strange xenos machinery. Within their labyrinthine corridors, you'll find teleport pads, deactivated Necron warriors, and a great many sarcophagi containing dormant Necrons and their constructs.<br><br>This multipart plastic kit builds 25 modular terrain pieces for use in your games of Kill Team. They have been designed to accommodate a dizzying variety of configurations. Together, they represent the twisting corridors of a Necron Tomb World – ideal for playing close-quarters games of Kill Team. You'll also find a double-sided game board measuring 606mm by 703mm, the standard size for a game of Kill Team.<br><br>This kit comprises 74 plastic components. These terrain pieces require assembly and are supplied unpainted – we recommend using Citadel Plastic Glue and Citadel Colour paints.<br><br>Rules for using this Killzone in your games of Kill Team can be downloaded for free from the Warhammer Community website.</p><div class=\"cartButtons\"><button onclick=\"addToCart('23')\">Add To Cart</button><button onclick=\"removeFromCart('23')\">Remove From Cart</button></div></div>";
const WH4 = "<img src=\"./images/games/WHGloomspiteGlitz.jpg\" class=\"gamesImage\"><div class=\"gamesInfo\"><h3 class=\"title\">Spearhead: Gloomspite Glitz</h3><h4 class=\"price\">€109.95</h4><p>The Gloomspite Gitz are cunning and vindictive in the extreme, their deranged grotty minds forever spinning up fresh tricks and vicious ploys. Dismiss the cackling cruelty of the grots, the hungry ferocity of their squigs, and the thoughtless strength of the cavern-dwelling troggoths at your peril – these are the true children of the Bad Moon.<br><br>If you want to launch spiteful attacks from the shadows of the Mortal Realms, this box makes an ideal start to a Gloomspite Gitz army – or a way to expand your collection – and will save you money over buying its component kits individually. The box includes a cunning Loonboss to lead a horde of Battleline grots into battle, such as fiendish Stabbas and bouncing Squig Hoppers, supported by hulking Rockgut Troggoths. It’s a full army in one box, leaving you ready to emerge from the caves and descend on your foes.<br><br>This set includes:<ul><li>1x Loonboss</li><li>3x Rockgut Troggoths</li><li>10x Squig Hoppers</li><li>20x Moonclan Stabbas</li></ul></p><div class=\"cartButtons\"><button onclick=\"addToCart('24')\">Add To Cart</button><button onclick=\"removeFromCart('24')\">Remove From Cart</button></div></div>";
const WH5 = "<img src=\"./images/games/WHPaperback.jpg\" class=\"gamesImage\"><div class=\"gamesInfo\"><h3 class=\"title\">War For The Mortal Realms (Paperback)</h3><h4 class=\"price\">€19.95</h4><p>I have a story to tell you…<br><br>I shall start at the breaking of the Tempest, where history begins…Follow the tumultuous saga of the Mortal Realms in a single volume – from the battles against the forces of Chaos, through the Soul Wars against the hordes of Nagash, to the chosen warriors of Sigmar fighting in the Era of the Beast.<br><br>The Mortal Realms are lost.<br><br>From the ashes of the World-that-Was, the God-King Sigmar plucks from oblivion the souls of warriors that die in his name, and on the Anvil of Apotheosis reforges them anew. These brave but damaged Stormcast Eternals face near-insurmountable odds to bring Sigmar’s light back to the Mortal Realms, and reclaim them from the grasp of the ascendant Ruinous Powers of Chaos.</p><div class=\"cartButtons\"><button onclick=\"addToCart('25')\">Add To Cart</button><button onclick=\"removeFromCart('25')\">Remove From Cart</button></div></div>";