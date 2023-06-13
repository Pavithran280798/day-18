const body = document.body;
const div1 = document.createElement("div");
div1.classList.add("container");  
body.append(div1);

const div2 = document.createElement("div");
div2.classList.add("row", "country_row");
div1.append(div2);

async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  for (countries of data) {
    const div3 = document.createElement("div");
    div3.classList.add("card", "h-100", "col-lg-4", "col-sm-12");
    div2.append(div3);

    const div4 = document.createElement("div");
    div4.classList.add("card-header", "text-center", "name");
    div4.textContent = `${countries?.name?.common}`;
    div3.append(div4);

    const img = document.createElement("img");
    img.classList.add("card-img-top", "flag", "mt-3");
    img.setAttribute(
      "src",
      `${countries?.flags?.png ? countries?.flags?.png : countries?.flags?.svg}`
    );
    div3.append(img);
    const div5 = document.createElement("div");
    div5.classList.add("card-body");
    div3.append(div5);

    const div6 = document.createElement("div");
    div6.classList.add("capital");
    div6.innerHTML = `Capital: <span>${countries?.capital[0]}</span>`;

    const div7 = document.createElement("div");
    div7.classList.add("Region");
    div7.innerHTML = `Region: <span>${countries?.region}</span>`;

    const div8 = document.createElement("div");
    div8.classList.add("latlng");
    div8.innerHTML = `LatLng: <span>${countries?.latlng[0]}, ${countries?.latlng[1]} </span>`;

    const div9 = document.createElement("div");
    div9.classList.add("country_code");
    div9.innerHTML = `Country Code: <span>${countries?.altSpellings[0]}</span>`;
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.textContent = "click for weather";
    div5.append(div6, div7, div8, div9, button);

    const res2 = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${countries?.latlng[0]}&lon=${countries?.latlng[1]}&appid=fbb352a417c0f980535df5d4a273be35&units=metric`
    );
    const data2 = await res2.json();
    button.addEventListener("click", myFunction);
    function myFunction() {
      let a = div4.textContent;
      let b = img.getAttribute("src");
      div2.classList.add("hidden");
      let x = [];
      x.push(div8.firstElementChild.textContent);
      x = x[0].split(",").map(Number);
      const diva = document.createElement("div");
      diva.classList.add("container");
      body.append(diva);

      const divb = document.createElement("div");
      divb.classList.add("row", "country_row");
      diva.append(divb);

      const divc = document.createElement("div");
      divc.classList.add("card", "col-lg-4", "col-sm-12", "text-center", "weather-data");
      divb.append(divc);

      const divd = document.createElement("div");
      divd.classList.add("card-header", "text-center", "name");
      divd.textContent = `${a}`;
      divc.append(divd);

      const img2 = document.createElement("img");
      img2.classList.add("card-img-top", "flag", "mt-3");
      img2.setAttribute("src", `${b}`);
      divc.append(img2);

      const divbody = document.createElement("div");
      divbody.classList.add("card-body");
      divc.append(divbody);

      const dive = document.createElement("div");
      dive.classList.add("Weather");
      dive.innerHTML = `Weather: <span>${data2?.weather[0].description}</span>`;

      const divf = document.createElement("div");
      divf.classList.add("temp");
      divf.innerHTML = `temp: <span>${data2?.main.temp}°C </span>`;

      const divg = document.createElement("div");
      divg.classList.add("wind_speed");
      divg.innerHTML = `wind speed: <span>${data2?.wind.speed}m/sec </span>`;
      const button2 = document.createElement("button");
      button2.classList.add("btn", "btn-primary");
      button2.textContent = "Click to return";
      divbody.append(dive, divf, divg, button2);
      
      button2.addEventListener("click", () => {
        location.reload();
      });
    }
  }
}

getCountries();