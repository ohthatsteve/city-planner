
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    //Retrieve the address from the city and street elements
    var city = $('#city').val();
    var street = $('#street').val();

    var address = street + ', ' + city;

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    //Set greeting
    $greeting.text("Here's some information about " + address);

    //Create streetview url
    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address;

    //Append streetview url to the body of the page
    $body.append('<img class = "bgimg" src="' + streetViewUrl + '">');

    //NYT ajax request
    var nytAPI = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=36926d2a3ec74a3b950d72fc8062f0ad';
    $.getJSON(nytAPI)
        .done(function(data){

            $.each(data.response.docs, function(){
                $nytElem.append('<li class = "article"><a href="' + this.web_url + '">' + this.headline.main + '</a><p>' + this.snippet + '</p></li>');
            })
        })
        .fail(function(){
            $nytHeaderElem.text('No New York Times data is currently available');
        });

    //Wiki ajax request
    var wikiAPI = 'https://en.wikipedia.org/w/api.php';
    $.ajax({
        url: wikiAPI,
        data :{action: 'opensearch',
        search: city,
        dataType: 'jsonp'
        },
        callback: this.success,
        success: function(response) {
            var list = response[0];
            var url = 'http://en.wikipedia.org/wiki/' + list;
            $wikiElem.append('<li><a href"' + url + '">' + list + '</a></li>');
            }
        
    });

    return false;
};

$('#form-container').submit(loadData);

