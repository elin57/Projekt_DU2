"use strict";

create_areas_filter();
create_countries_cities_filters();


document.querySelector("#search_field button").addEventListener("click", update_programmes);


update_programmes();


toggle_cities();
