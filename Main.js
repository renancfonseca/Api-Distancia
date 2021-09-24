//set map options
var myLatLng = { lat: -23.55, lng: -46.64 }; //São Paulo-SP
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//crear map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//DirectionsService object para usar o método de rota e obter um resultado para nossa solicitação
var directionsService = new google.maps.DirectionsService();

//DirectionsRenderer object que usaremos para exibir a rota
var directionsDisplay = new google.maps.DirectionsRenderer();

//vincular o DirectionsRenderer ao map
directionsDisplay.setMap(map);


function calcRoute() {
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distancia e tempo
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>De: " + document.getElementById("from").value + ".<br />Para: " + document.getElementById("to").value + ".<br /> Distancia <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duração <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //deletar rota do mapa
            directionsDisplay.setDirections({ routes: [] });
            //centro de São Paulo
            map.setCenter(myLatLng);

            //mensagem de erro
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Não foi possivel calcular a distancia.</div>";
        }
    });

}

//autocomplete
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
