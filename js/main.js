var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkUrl");

var btnClose = document.getElementById("close");
var lightContainer ;
var bookMarkList = [];

if(localStorage.getItem( "BookMarkContainer") !== null ){
    bookMarkList = JSON.parse (localStorage.getItem("BookMarkContainer"))
    displayData();
}

function addBookMark(){ 
    lightContainer = document.getElementById("lightContainer");

    if( advancedValidation(bookmarkName) &&
        advancedValidation( bookmarkUrl) ){
            BookMark = {
                websiteName: bookmarkName.value.trim() ,
                Url : bookmarkUrl.value.trim(),
            };
            bookMarkList.push(BookMark);
            localStorage.setItem("BookMarkContainer", JSON.stringify(bookMarkList));

            lightContainer.classList.add("d-none");
            clearInput();
            displayData();
    }
    else{
        lightContainer.classList.remove("d-none");
        btnClose.addEventListener('click' , function(){
            lightContainer.classList.add("d-none")
        })

        document.addEventListener('click', function(e){
            if(e.target === lightContainer){
                lightContainer.classList.add("d-none")
            }
        })
    }
}
function clearInput(){
    bookmarkName.value = null;
    bookmarkUrl.value =  null;
    bookmarkName.classList.remove("is-valid");
    bookmarkUrl.classList.remove("is-valid");
}
function displayData(){
    cartona = "";
    for( i=0 ; i < bookMarkList.length ; i++){
        cartona += ` <tr>
                        <td>${i}</td>
                        <td>${bookMarkList[i].websiteName}</td>
                        <td><button class="btn btn-visit"><i class="fa-solid fa-eye"></i><a target="-blank" href="${bookMarkList[i].Url}" class="text-decoration-none" >Visit</a></button></td>
                        <td><button class="btn btn-delete" onclick=" deleteBookMark(${i})" ><i class="fa-solid fa-trash"></i>Delete</button></td>
                    </tr>`
    }
    document.getElementById("tableContent").innerHTML = cartona;

};
function deleteBookMark(deleteIndex){
    bookMarkList.splice(deleteIndex , 1);
    localStorage.setItem("BookMarkContainer" , JSON.stringify(bookMarkList));
    displayData();
}
function advancedValidation(element){
    var regex = {
        bookmarkName:/^[a-zA-z][a-zA-z0-9 ]{2,19}$/,
        bookmarkUrl:/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:[0-9]{1,5})?(\/\S*)?$/ ,
    } ;

    var text = element.value;

    if(regex[element.id].test(text)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }
    
}


