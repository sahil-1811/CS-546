$(document).ready(function(){
    var searchForm=$('#searchForm'),
     search_term=$('#search_term'),
     show=$('#show'),
     showList=$('#showList'),
     error=$('#error'),
     homeLink=$('#homeLink'),
     footer=$('#footer')

    let requestConfig={
        method:'GET',
        url:'http://api.tvmaze.com/shows' ,
    }
    $.ajax(requestConfig).then((response)=>{
        var li
        for(let object of response){
            footer.css('position','fixed')
            li=`<li><a class="eachShow" href="${object._links.self.href}">${object.name}</a></li>`
            showList.append(li)
        }
    showList.show()
    })
    $(document).on('submit','#searchForm',function(event){
        event.preventDefault(),
        error.empty(),
        error.hide(),
        show.empty(),
        showList.empty()
        homeLink.show()

        let searchterm=search_term.val()
        searchterm=searchterm.trim()

        if(!searchterm){
            let e=`<p class="error">Enter Valid ShowSearch or Empty Spaces not allowed.</p>`
            footer.css('position','fixed')
            error.append(e)
            error.show()
        }
        let requestConfig = {
            method: 'GET',
            url: 'http://api.tvmaze.com/search/shows?q=' + searchterm,
        };

        $.ajax(requestConfig).then((response)=>{
            if(searchterm && response.length==0){
                let e=`<p>No results found</p>`
                footer.css('position','fixed')
                error.append(e)
                error.show()
            }
            let li
            for(let object of response){
                footer.css('position','fixed')
                li=`<li><a class="eachShow" href="${object.show._links.self.href}">${object.show.name}</a></li>`
                showList.append(li)
            }
            showList.show()
        })
    })
    $(document).on('click','ul#showList>li>a',function(event){
        event.preventDefault()
        showList.hide()
        showList.empty()
        show.empty()
        homeLink.show()

        let link=$(this).attr('href')
        let requestConfig = {
            method: 'GET',
            url: link,
        };

        $.ajax(requestConfig).then((response)=>{
            footer.css("position","fixed")
            if(response.name){
                let h1=`<h1>${response.name}</h1>`
                show.append(h1)
            }
            else{
                let h1=`<h1>N/A</h1>`
                show.append(h1)
            }

            if(response.image){
                let img=`<img src="${response.image.medium}"</img>`
                show.append(img)
            }
            else{
                let img = `<img src="../public/img/no_image.jpeg"></img>`;
                show.append(img)
            }

            let language=response.language
            ?`<dt>Language</dt><dd>${response.language}</dd>`
            :`<dt>Language</dt><dd>N/A</dd>`

            let genres=`<dt>Genres</dt><dd><ul>`
            if(response.genres && response.genres.length>0){
                $.each(response.genres,function (index,value){
                    genres=genres+`<li>${value}</li>`
                })
                genres=genres+`</ul></dd>`
            }
            else{
                genres = `<dt>Genres</dt><dd>N/A</dd>`;
            }

            let network=response.network
            ?`<dt>Network</dt><dd>${response.network.name}</dd>`
            :`<dt>Network</dt><dd>N/A</dd>`

            let summary=response.summary
            ?`<dt>Summary</dt><dd>${response.summary}</dd>`
            :`<dt>Summary</dt><dd>N/A</dd>`

            let average=''
            if(response.rating.average){
                average=`<dt>Average Rating</dt><dd>${response.rating.average}</dd>`
            }
            else{
                average=`<dt>Average Rating</dt><dd>N/A</dd>`
            }

            let dl = `<dl>${language} ${genres} ${average} ${network} ${summary}</dl>`;
            show.append($(dl))
            show.show()
        })
    })
})