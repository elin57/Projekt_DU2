
// G
// CODE According to specification
function click_filter_element (event) {
  
  if(event.originalTarget.classList[0] === "selected") {
    event.originalTarget.classList.toggle("selected");
    event.originalTarget.classList.add("unselected");
  } else {
    event.originalTarget.classList.remove("unselected");
    event.originalTarget.classList.toggle("selected");
  }
  update_programmes();
  console.log(event);
  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  
}


// G
// CODE according to specification
function create_filter_element (data) {

  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */
  const parent = data.parent;
  const attribute = data.class;
  const content = data.textContent;

  const new_dom_element = document.createElement("li");
  new_dom_element.classList.add(data.class);
  parent.appendChild(new_dom_element);
  new_dom_element.textContent = content;
  new_dom_element.addEventListener("click", click_filter_element);

  return new_dom_element;

}


// VG
// CODE according to specification
function add_group_toggling (filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */
  
}

// VG
// CODE according to specifications
function toggle_cities (event) {

  let elements = document.querySelectorAll(".country ul.filter_list li");

  let button = document.querySelector("#country_filter > button");
  button.addEventListener("click", switch_elements);
  
  function switch_elements() {
    if(elements[0].classList[0] === "selected") {
      for(let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("selected");
        elements[i].classList.add("unselected");
      }
    } else {
      for(let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("unselected");
        elements[i].classList.add("selected");
      }
    }
    update_programmes();
  }
  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */

}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city

/* 
  SPECIFICATION - create_countries_cities_filters()
  ARGUMENTS
    This function does not take any arguments.
  SIDE EFFECTS
    Creates country containers based on array COUNTRIES through inner function create_country.
    Also creates filter elements based on array CITIES through inner function create_city.
    Calls on create_country with array_each.
  NO RETURN VALUE

  SPECIFICATION - create_country(country)
  ARGUMENTS
    country: each element in array COUNTRIES.
  SIDE EFFECTS
    Creates DOM element out of 'country' that was sent as argument, with tag "div".
    Gives it the classes "country" and "filter_container".
    Gives it an id out of "country_" + "country.id".
    Appends it as child to "#country_filter > div".
    Creates a new array out of array CITIES by using array_filter and 
    checking if country.id is the same as city.countryID.
    Calls on create_city
  NO RETURN VALUE

  SPECIFICATION - create_city(city)
  ARGUMENTS
    city: element out of the new array that array_filter resulted in.
  SIDE EFFECTS
    Creates filter element by calling create_filter_element and
    sending an object as argument. The function call results in a 
    DOM element.
    The object sent as argument contains the following keys:
      parent: querySelector with argument "#country_" + city.countryID + " > ul"
      class: "selected"
      textContent: city.name
    This function also gives each DOM element dataset.id = city.id
  NO RETURN VALUE 
*/
function create_countries_cities_filters () {
  function create_country (country) {
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);
    
    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;
    
    const cities = array_filter(CITIES, test_function);
    function test_function (city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city (city) {

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.
/*
 SPECIFICATION - create_areas_filters()
  ARGUMENTS
    This function does not take any arguments.
  SIDE EFFECTS
    Creates filter elements through inner function create_area out of arrays
    LEVELS, SUBJECTS, and LANGUAGES. Calls on inner function through three 
    separate array_each(). Inside create_area a filter element is created by the use of
    function create_filter_element.
  NO RETURN VALUE
  SPECIFICATION - create_area(element)
  ARGUMENTS
    element: one element from each array in each array_each function call.
  SIDE EFFECTS
    Creates filter element through create_filter_element(). For each 'element'
    an object is sent as argument. 
    The object contains the following keys:
      parent: querySelector with argument "#" + variable + "_filter > ul".
      class: "selected"
      textContent: element.name

    The function create_area checks which variable to send as value in the 
    parent key by checking if 'element' is the same as array[index].
    Function also gives the dataset.id of each DOM element the value of element.id.
  NO RETURN VALUE
*/
function create_areas_filter() {
  function create_area(element) {
    let area;
    for(let i = 0; i < LEVELS.length; i++) {
      if(element === LEVELS[i]) {
        area = "level";
      }
    }
    for(let i = 0; i < SUBJECTS.length; i++) {
      if(element === SUBJECTS[i]) {
        area = "subject";
      }
    }
    for(let i = 0; i < LANGUAGES.length; i++) {
      if(element === LANGUAGES[i]) {
        area = "language";
      }
    }

    const dom = create_filter_element({
      parent: document.querySelector(`#${area}_filter > ul`),
      class: "selected",
      textContent: element.name
    });
    dom.dataset.id = element.id;
  }

  array_each(LEVELS, create_area);
  array_each(SUBJECTS, create_area);
  array_each(LANGUAGES, create_area);
}


/*function create_levels_filter () {
  function create_level (level) {
    const dom = create_filter_element({
      parent: document.querySelector("#level_filter > ul"),
      class: "selected",
      textContent: level.name,
    });
    dom.dataset.id = level.id;
  }
  array_each(LEVELS, create_level);
}
// Create Subjects Filter
function create_subjects_filter () {
  function create_subject (subject) {
    const dom = create_filter_element({
      parent: document.querySelector("#subject_filter > ul"),
      class: "selected",
      textContent: subject.name,
    });
    dom.dataset.id = subject.id;
  }
  array_each(SUBJECTS, create_subject);
}
// Create Search Field
function create_language_filter () {
  function create_element (data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}*/


// G / VG (see details in specification)
// CODE according to specifications

function create_programme (programme) {
 
  let programme_element = document.createElement("li");
  let parent = document.querySelector("#programmes > ul");
  parent.appendChild(programme_element);
  programme_element.classList.add("programme");
  //programme_element.classList.add("show_more");
  
  function find_uni(element) {
    if(programme.universityID === element.id) {
      return true;
    }
  }

  function find_city(element) {
    if(university.cityID === element.id) {
      return true;
    }
  }

  function find_country(element) {
    if(city.countryID === element.id) {
      return true;
    }
  }

  function find_level(element) {
    if(programme.levelID === element.id) {
      return true;
    }
  }

  function find_subject(element) {
    if(programme.subjectID === element.id) {
      return true;
    }
  }

  function find_language(element) {
    if(programme.languageID === element.id) {
      return true;
    }
  }
  
  let university = array_find(UNIVERSITIES, find_uni);
  let city = array_find(CITIES, find_city);
  let country = array_find(COUNTRIES, find_country);
  let level = array_find(LEVELS, find_level);
  let subject = array_find(SUBJECTS, find_subject);
  let language = array_find(LANGUAGES, find_language);

  let percent = percenter(city.sun, 365);

  programme_element.innerHTML = `
  <div>
    <b>${programme["name"]}</b><br>
    ${university.name}<br>
    ${city.name}, ${country["name"]}<br> 
    ${level.name}, ${subject.name}, ${language.name}
  </div>
  <div class="more_info"></div>
  <div class="bottom_programme"> 
    ${city.name}, sun-index: ${city.sun} (${percent}%)
  </div>
  `;

  let array_length = city.imagesNormal.length;
  let index = get_random_number(array_length, 0);

  let image = city.imagesNormal[index];
  programme_element.style.backgroundImage = `url('../media/geo_images/${image}')`;
  
  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */  

}


// G
// CODE according to the specification
function update_programmes () {
  let element = document.querySelectorAll("#programmes li");
  for(let i = 0; i < element.length; i++) {
    element[i].remove();
  }

  let array = read_filters();
  console.log(array);
  for(let i = 0; i < PROGRAMMES.length; i++) {
    let programme_object = PROGRAMMES[i];
    for(let ii = 0; ii < array.length; ii++) {
      let array_object = array[ii];
      if(programme_object.id === array_object.id) {
        create_programme(programme_object);
      } 
    }
  }
  let text = document.querySelector("#programmes > p");
  if(array.length > 0) {
    text.style.display = "none";
  } else {
    text.style.display = "block";
  }

  let first_div = document.querySelector("#top_images div:first-child");
  let second_div = document.querySelector("#top_images div:nth-child(2)");
  let third_div = document.querySelector("#top_images div:nth-child(3)");

  let countries_and_button = document.querySelectorAll("#country_filter > *");
  let other_containers = document.querySelectorAll(".filter_container");

  for(let i = 0; i < other_containers.length; i++) {
    other_containers[i].addEventListener("click", change_images);
  }
  for(let i = 0; i< countries_and_button.length; i++) {
    countries_and_button[i].addEventListener("click", change_images);
  }

  change_images();
  
  function change_images() {
    let i = 0;
    let images_array = [];
    while(i < 3) {
      let countries_index = get_random_number(COUNTRIES.length, 0);
      let object = COUNTRIES[countries_index];
      let images_index = get_random_number(object.imagesNormal.length, 0);
      let image = object.imagesNormal[images_index];
      
      images_array.push(image);
      i = i + 1;
    }
    first_div.style.backgroundImage = `url('../media/geo_images/${images_array[0]}')`;
    second_div.style.backgroundImage = `url('../media/geo_images/${images_array[1]}')`;
    third_div.style.backgroundImage = `url('../media/geo_images/${images_array[2]}')`;
  }
  
  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */

}

// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it
/* 
  SPECIFICATION - read_filters()
    ARGUMENTS
      This function does not take any arguments.
    SIDE EFFECTS
      Function read_filters puts id's of selected city elements into a new array. Then takes one 
      integer from this array and checks if UNIVERSITIES[index].cityID === integer. If true the 
      UNIVERSITIES[index] gets put into new array: universities. 
      Then it checks if PROGRAMMES[index].universityID === universities[index].id. If true the object
      from PROGRAMMES gets put into new array: programmes.
      Function also puts id's from selected level, language and subject filter elements into their own arrays.
      Then checks if the value from matching key in programmes[index] is included in each array of integers.
      Each time this is checked, the "programmes" array is resulted in a new array.
      Function read_filters() also checks if search field value is included in the "name" key of each "programmes" index.
    RETURN VALUE
      This function returns a new array of objects based on array PROGRAMMES after checking mentioned values.

*/
function read_filters () {
  
  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
    console.log(city_id_selected);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);


  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);


  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }
  return programmes;
}