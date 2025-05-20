function randString(length) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
console.log(randString(8));

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  let randomString = randString(8);
  document.cookie = cname + "=" + cvalue + ";" + expires +  ";path=/";
  console.log(document.cookie);
  return d.toISOString().replace('T', ' ').replace('Z',''); //SQL syntax for datetimes

}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
		console.log(c.substring(name.length, c.length))
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  console.log("In checkCookie");
  let user = getCookie("username");
  if (user != "") {
    console.log("Not equal to empty string");
    //alert("Welcome again " + user);
  } else {
    console.log("Is equal to empty string");
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      let expiry = setCookie("username", user, 365)
      setCookie("username", user, 365);
      randstring = randString(8)
      setCookie("randstring", randstring, 365);
      fetch("/add", {
        method: "POST",
        body: JSON.stringify({
          user: user,
          expires: expiry,
          randstring: randstring
        }), //for SQL format
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
        });
    }
  }
}
