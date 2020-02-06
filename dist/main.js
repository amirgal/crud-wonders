const source = $("#wonders-template").html()
const template = Handlebars.compile(source)

const render = function(wonders){
    $("#new-wonder-input").val("")
    $("#new-location-input").val("")
    $("#wonders").empty()
    let newHtml = template({wonders})
    $("#wonders").append(newHtml)
}

const fetch = function(){
    $.get("/wonders", function(response){
        render(response)
    })
}

const addWonder = function(){
    let newWonder = $("#new-wonder-input").val()
    let newLocation = $("#new-location-input").val()
    //POST the newWonder to the server
    let data = { name: newWonder, location: newLocation }
    $.post('/wonder', data, function (response) {
    console.log("POST complete")
    fetch()
})
}

const updateVisited = function (wonder) {
    $.ajax({
        url: `wonder/${wonder}`,
        method: "PUT",
        success: function (response) {
            console.log("PUT complete")
        }
    })
}

$("#wonders").on("click", ".visit", function(){
    let wonder = $(this).closest(".wonder").find(".name").text()
    //PUT this to the server: update the wonder's `visited` status to `true`
    wonder = wonder.split('-')[0].trim()
    updateVisited(wonder)
    fetch()
})

const deleteWonder = wonder => {
    $.ajax({
        url: `/wonder/${wonder}`,
        method: "DELETE",
        success: function (response) {
            console.log('Delete complete')
         }
    })
}

$("#wonders").on("click", ".delete", function(){
    let wonder = $(this).closest(".wonder").find(".name").text()
    //PUT this to the server: update the wonder's `visited` status to `true`
    wonder = wonder.split('-')[0].trim()
    deleteWonder(wonder)
    fetch()
})

fetch() //load the data on page load