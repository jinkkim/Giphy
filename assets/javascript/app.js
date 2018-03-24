$( document ).ready(function() {
    var topics = ["Australian Cattle Dog",
                   "Beagle",
                   "Siberian Husky",
                   "Chow Chow",
                   "Chihuahua",
                   "Dalmatian",
                   "English Springer Spaniel",
                   "Fox Terrier",
                   "German Shepherd",
                   "Shiba Inu",
                   "Irish Terrier",
                   "Jack Russell Terrier",
                   "Korean Jindo Dog",
                   "Labrador Retriever",
                   "Maltese",
                   "Norwich Terrier"];

    function displayTopicButtons(){
        //empty query buttons to remove any duplicates
        $("#queryButtons").empty();

        for (var i = 0; i < topics.length; i++) {
            var queryButton ="<button class='btn btn-secondary m-1 goSearch' data-name='" + topics[i] + "'>" + topics[i] + "</button>"
            $("#queryButtons").append(queryButton);
        }
    }


    $("#addQuery").click(function(){
        var action = $("#queryInput").val().trim();

        // do not add if the input is blank
        if (action ==""){
            return false;
        }

        // add query buttons only it is not a duplicate
        if (topics.indexOf(action) == -1){
            topics.push(action);
        }
        displayGif2(action);
        displayTopicButtons();
       
    });

    $("#removeQuery").click(function(){

        topics.pop();
        //var action = $("#queryInput").val().trim();
        //var index = topics.indexOf(action);
        //topics.splice(index,1);
        displayTopicButtons();
    });

    var results = "";

    function displayGif(){
        //ajax
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=J7j8kfdm8HGROJpl31kkxwXHhWDF5EoD";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#searchResults").empty();

            //shows results of gifs
            results = response.data;
            if (results == ""){
                alert("There isn't a gif for this selected button.");
            }

            //for (var i=0; i<results.length; i++){
            for (var i=0; i < 10; i++){

                // pulling gif
                var foundGIF = $("<img>");
                foundGIF.attr("src", results[i].images.fixed_height_still.url);
                foundGIF.attr("data-still", results[i].images.fixed_height_still.url);
                foundGIF.attr("data-animate", results[i].images.fixed_height.url);

                // set the image state
                foundGIF.attr("data-state", "still");
                foundGIF.addClass("image");
                foundGIF.addClass("m-2");

                // generate one div for each search result
                var resultCell = $("<div>");

                var title = results[i].title.slice(0, -3);
                resultCell.append("<p class = 'text-center mb-0 mt-5'>" + title.substr(0,23) + "</p>");
                resultCell.append(foundGIF);
                resultCell.append("<p class='mb-0 col-10 text-center'>Rating: " + results[i].rating + "</p>");
                resultCell.append("<a href='" + results[i].images.fixed_height.url + "' class ='btn-sm btn-warning mt-0 offset-4 col-8' download> Download</a>");
                

                // adding resultCell to searchResults area
                $("#searchResults").append(resultCell);
                $("#more").show();
            
            }
        });

    };



    function displayGif2(topic){
        //ajax
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=J7j8kfdm8HGROJpl31kkxwXHhWDF5EoD";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#searchResults").empty();

            //shows results of gifs
            results = response.data;
            if (results == ""){
                alert("There isn't a gif for this selected button.");
            }

            //for (var i=0; i<results.length; i++){
            for (var i=0; i < 10; i++){

                // pulling gif
                var foundGIF = $("<img>");
                foundGIF.attr("src", results[i].images.fixed_height_still.url);
                foundGIF.attr("data-still", results[i].images.fixed_height_still.url);
                foundGIF.attr("data-animate", results[i].images.fixed_height.url);

                // set the image state
                foundGIF.attr("data-state", "still");
                foundGIF.addClass("image");
                foundGIF.addClass("m-2");

                // generate one div for each search result
                var resultCell = $("<div>");

                var title = results[i].title.slice(0, -3);
                resultCell.append("<p class = 'text-center mb-0 mt-5'>" + title.substr(0,23) + "</p>");
                resultCell.append(foundGIF);
                resultCell.append("<p class='mb-0 col-10 text-center'>Rating: " + results[i].rating + "</p>");
                resultCell.append("<a href='" + results[i].images.fixed_height.url + "' class ='btn-sm btn-warning mt-0 offset-4 col-8' download> Download</a>");
                
                // adding resultCell to searchResults area
                $("#searchResults").append(resultCell);
                $("#more").show();
            }
        });

    };
            
    $(document).on("click",".goSearch",displayGif);

    // event listener for searhed images
    $(document).on("click", ".image", function(){
        var state = $(this). attr("data-state");
        if (state == "still"){
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }

    });

    $("#more").click(function(){
        for (var i=10; i < 20; i++){

            // pulling gif
            var foundGIF = $("<img>");
            foundGIF.attr("src", results[i].images.fixed_height_still.url);
            foundGIF.attr("data-still", results[i].images.fixed_height_still.url);
            foundGIF.attr("data-animate", results[i].images.fixed_height.url);

            // set the image state
            foundGIF.attr("data-state", "still");
            foundGIF.addClass("image");
            foundGIF.addClass("m-2");

            // generate one div for each search result
            var resultCell = $("<div>");

            var title = results[i].title.slice(0, -3);
            resultCell.append("<p class = 'text-center mb-0 mt-5'>" + title.substr(0,23) + "</p>");
            resultCell.append(foundGIF);
            resultCell.append("<p class='mb-0 col-10 text-center'>Rating: " + results[i].rating + "</p>");
            resultCell.append("<a href='" + results[i].images.fixed_height.url + "' class ='btn-sm btn-warning mt-0 offset-4 col-8' download> Download</a>");
            
            // adding resultCell to searchResults area
            $("#searchResults").append(resultCell);
            
        }
        $("#more").hide();
    });

    displayTopicButtons();
    $("#more").hide();

});

