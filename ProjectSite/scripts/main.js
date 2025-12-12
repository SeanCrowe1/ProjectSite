const toggleLight = document.querySelector('.mode-toggle-day');
const mode = document.getElementById('style');
const sep = document.getElementById('seperator');
const current = document.getElementById('pageTitle').textContent;
const siteContent = document.getElementById('content');
const currentClasses = siteContent.className.split(" ");
let comics = document.getElementById('comics');

if (getCookie("darkMode") === "true") {
  mode.setAttribute("href", "./css/dark.css");
  toggleLight.textContent = "☾"
}

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

const openNav = () => {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
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
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}

window.onload = function checkCookie() {
  siteContent.className = `hidden ${currentClasses[1]}`;
  siteContent.className = `visible ${currentClasses[1]}`;
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

  // setCookie("cart", "Amazing Fantasy #15 (1965), Incredible Hulk #1 (1966)")
}

// String Literals

const marvel1 = "<img src='./images/comics/AmazingFantasy15.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Amazing Fantasy (1962) #15</h3><h4 class='price'>€39.99</h4><p>The First Appearance of the Amazing Spider-Man! When young Peter Parker gains remarkable abilities from a radioactive spider, he must step up and try to become a hero — while also dealing with the fantastic pressures of an everyday teenager! For with great power, there must also come great responsibility!</p></div>";
const marvel2 = "<img src='./images/comics/InfinityGauntlet1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Infinity Gauntlet (1991) #1</h3><h4 class='price'>€29.99</h4><p>One of the biggest events ever to hit the Marvel Universe! For Thanos, the Infinity Gauntlet was the ultimate prize to be coveted above all else. With it came omnipotence. Now it's up to Earth's super heroes to make a desperate attempt to thwart this mad god's insane plunge into galactic self-destruction.</p></div>";
const marvel3 = "<img src='./images/comics/SecretEmpire1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Secret Empire (2017) #1</h3><h4 class='price'>€34.99</h4><p>It's been building for months, across a bevy of titles! But now, the moment has arrived for Steve Rogers to step into the light and declare his allegiance to Hydra! How can the heroes of the Marvel Universe cope with this shattering betrayal by the most trusted figure among them? And what will this mean for the world? The map of the Marvel Universe changes in ways nobody will expect - TRUST THE SECRET EMPIRE!</p></div>";
const marvel4 = "<img src='./images/comics/Deadpool1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Deadpool (2015) #1</h3><h4 class='price'>€24.99</h4><p>He's annoying. He's dangerous. He smells terrible. But the public love him. That's right - the Merc with the Mouth may make money for missions of murky morality...but he's become the most popular hero in the world for it. Eat that, Spidey! The world belongs to...DEADPOOL. The fan favorite team of Gerry Duggan and Mike Hawthorne return to bring Deadpool in to his most successful adventures yet!</p></div>";
const marvel5 = "<img src='./images/comics/X-MenGold1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>X-Men: Gold (2017) #1</h3><h4 class='price'>€44.99</h4><p>FROM THE ASHES OF INHUMANS VS X-MEN, AN ALL-NEW TEAM OF X-MEN RISES! Xavier’s dream comes full circle as KITTY PRYDE takes the reins and assembles a squad of the most iconic X-Men to fight at her side. STORM. COLOSSUS. NIGHTCRAWLER. OLD MAN LOGAN. PRESTIGE. They are X-MEN GOLD! And they’re on a mission to be Earth’s finest heroes, even when that means defending those who hate and fear them. Brought to you by an all-star creative team of Marc Guggenheim (X-MEN, S.H.I.E.L.D., television’s Arrow) and Ardian Syaf (BATGIRL, SUPERMAN/BATMAN, BRIGHTEST DAY), a new beginning for the strangest heroes of all starts here!</p></div>";

const DC1 = "<img src='./images/comics/AbsoluteGreenLantern1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Absolute Green Lantern Vol 1: Without Fear (2025)</h3><h4 class='price'>€49.99</h4><p>On an alternate version of Earth, a powerful alien descends on a small town in Nevada. Terror reigns as he enacts his judgment on the residents of Evergreen—among them, ordinary citizens Guy Gardner, Hal Jordan, John Stewart, and Jo Mullein. When fighting back carries an unimaginable cost, who will conquer their fear and emerge a hero? Writer Al Ewing (Metamorpho: The Element Man) and artist Jahnoy Lindsay (Superboy: Man of Tomorrow) get cosmic in this story from the Absolute Universe! Collects Absolute Green Lantern #1-6.</p></div>";
const DC2 = "<img src='./images/comics/SecretSix1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Secret Six (2025)</h3><h4 class='price'>€39.99</h4><p>After Amanda Waller and her Suicide Squad finally went too far, the government locked her up in the prison that was once her base of operations. But when Waller disappears from her cell at Belle Reve, every world-changing piece of intel stored in her head could fall into the wrong hands. To win this race against time, heroes Jon Kent (Superman), Jay Nakamura (Gossamer), and Nia Nal (Dreamer) must team up with the three villains closest to Waller: Deadshot, Catman, and Black Alice. Can these six reluctant teammates reclaim the biggest trove of information in the DC Universe without stabbing each other in the back first? From acclaimed writer and actress Nicole Maines (Supergirl) and superstar artist Stephen Segovia (Spawn), the Secret Six are back in an all-new, high-stakes, twist-filled limited series! Collects Secret Six #1-6.</p></div>";
const DC3 = "<img src='./images/comics/BirdsOfPrey28.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Birds Of Prey (2023-) #28</h3><h4 class='price'>€39.99</h4><p>One last mission. One final fight. No do-overs. No second chances. And the fate of the Birds of Prey hangs in the balance. The Unreality is collapsing and threatening all of Gotham as it spills out into the real world in dangerous and unexpected ways. As the Birds of Prey struggle to survive inside the game, the final showdown will test everything the team has built. Can the Birds get to the heart of what the Shadow Army’s real goal has been all along before it’s too late for them…and for Gotham?</p></div>";
const DC4 = "<img src='./images/comics/MartianManhunter1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Absolute Martian Manhunter Vol. 1: Martian Vision (2025)</h3><h4 class='price'>€39.99</h4><p>FBI agent John Jones has a problem. His brain has been infected by an alien consciousness calling itself “the Martian,” and its perception of reality is utterly incomprehensible to the human psyche. Now he must navigate this new status quo, all while balancing the deeply grounded and important duties of his day job! Reinvented from top to bottom by Deniz Camp (Ultimates, 20th Century Men) and Javier Rodríguez (Zatanna: Bring Down the House), Absolute Martian Manhunter takes Justice League’s resident Martian on a mind-bending, psychedelic journey that transcends dimensions. Collects Absolute Martian Manhunter #1-6.</p></div>";
const DC5 = "<img src='./images/comics/HarleyQuinn53.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Harley Quinn (2021-) #53</h3><h4 class='price'>€39.99</h4><p>Hello. This is Harley Quinn. Today, I’m going to be announcing three exciting new products coming from DC. A new way to disrupt super-villains without getting your hands dirty, a hilarious comic about a super-cute clown girl who everyone is in love with, and a story about an angry industrialist whose portfolio value is through the roof. Three products. Disrupting super-villainy, a super cute clown girl, and an angry industrialist. Are you getting it? Is this making sense?! I’m talking about the new issue of my comic! It’s all in there. Hello? Is this thing on? Does anyone even read these things?????</p></div>";

const indie1 = "<img src='./images/comics/Invincible1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Invincible (2003) #1</h3><h4 class='price'>€39.99</h4><h4>Published by Image Studios</h4><p>Mark Grayson is teenage superhero Invincible. He was a normal high school senior with a normal part-time job and otherwise normal life, except his father Nolan is the superhero Omni-Man, the most powerful superhero on the planet. At the age of 17, Mark begins to display superpowers, which come from his father being a member of the Viltrumite race, who, according to Nolan, pioneer the galaxy on a mission of benevolence and enlightenment.<br><br>As Invincible, Mark begins working as a superhero, with his father acting as his mentor, and meeting other heroes. Mark worked occasionally with a superhero team called the Teen Team (consisting of Robot, Rex Plode, Dupli-Kate and Atom Eve), from there discovering that his Physics teacher has been turning his students into human bombs. He stops his teacher with the help of the heroine, Atom Eve. He also foils a plan to make an army of robots, created by the Mauler Twins. Meanwhile Omni-Man is kidnapped by aliens, taken to another dimension, but returns after what seems to be only a few days, but was actually eight months to him.</p></div>";
const indie2 = "<img src='./images/comics/MightyMorphinPowerRangersVol7.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Mighty Morphin Power Rangers Vol. 7 (2019)</h3><h4 class='price'>€39.99</h4><h4>Published by BOOM! Studios</h4><p>The epic start of Mighty Morphin Power Rangers’ first comic book crossover event: Shattered Grid! <br><br> FOREVER RANGERS. <br><br> After Lord Drakkon escapes from the Mighty Morphin Power Rangers, he sets his sights on one goal: conquering Power Rangers across all eras. From Time Force to RPM, no Ranger is safe as Drakkon’s conquest causes the Morphin Grid to shatter, jeopardizing all of existence. But it’s this very act that might give the Rangers a fighting chance against Lord Drakkon and his armies. <br><br> Writer Kyle Higgins (Nightwing) and artist Daniele DiNicuolo (Mighty Morphin Power Rangers: Pink) raise the stakes as Rangers from across time and space band together to save the universe in this first installment of the critically acclaimed event, Shattered Grid.</p></div>";
const indie3 = "<img src='./images/comics/HellboyVol8.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Hellboy Vol. 8: Darkness Calls</h3><h4 class='price'>€39.99</h4><h4>Published by Dark Horse Comics</h4><p>Hellboy has finally returned from his adventures at sea, but no sooner has he settled on land than a conclave of witches drags him from his respite and into the heart of Russian folklore, where he becomes the quarry of the powerful and bloodthirsty witch Baba Yaga. Bent on revenge for the eye she had lost to Hellboy, Baba Yaga has enlisted the aid of a deathless warrior who will stop at nothing to destroy Hellboy.<br><br>Since his creation in 1993, Mike Mignola's Hellboy has accumulated dozens of industry awards and become a favorite of fans and critics alike. Now, Mignola turns over drawing duties to Duncan Fegredo (Enigma, Ultimate Adventures) for a new chapter in the life of the World's Greatest Paranormal Investigator.<br><br>* Collects the entire six-issue miniseries, along with two new epilogues--one drawn by Mignola, and one by Fegredo--and an extensive sketchbook section from both artists</p></div>";
const indie4 = "<img src='./images/comics/ScottPilgrim1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Scott Pilgrim Volume 1: Scott Pilgrim's Precious Little Life (2004)</h3><h4 class='price'>€39.99</h4><h4>Published by Oni Press</h4><p>Scott Pilgrim's life is totally sweet. He's 23 years old, he's in a rockband, he's \"between jobs,\" and he's dating a cute high school girl. Nothing could possibly go wrong, unless a seriously mind-blowing, dangerously fashionable, rollerblading delivery girl named Ramona Flowers starts cruising through his dreams and sailing by him at parties. Will Scott's awesome life ge tturned upside-down? Will he have to face Ramona's seven evil ex-boyfriends in battle? The short answer is yes. The long answer is Scott Pilgrim, Volume 1:Scott Pilgrim's Precious Little Life.</p></div>";
const indie5 = "<img src='./images/comics/LockeAndKey1.jpg' class='comicImage'><div class='comicInfo'><h3 class='title'>Locke & Key | Welcome To Lovecraft (2008)</h3><h4 class='price'>€39.99</h4><h4>Published by IDW Comics</h4><p>After the murder of their father, Tyler, Kinsey, and Bode Locke relocate with their mother to the family estate of Keyhouse, located in Lovecraft, Massachusetts. Sam Lesser, one of the teens who murdered Mr. Locke, is in a juvenile detention center and, by gazing in water, communicates with a supernatural force that promises to free him. Bode Locke, the youngest of the family, uncovers The Ghost Door, which separates his spirit from his body.</p></div>";

const DnD1 = "";
const DnD2 = "";
const DnD3 = "";
const DnD4 = "";
const DnD5 = "";

const WH1 = "";
const WH2 = "";
const WH3 = "";
const WH4 = "";
const WH5 = "";