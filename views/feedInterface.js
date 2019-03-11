const getUser = async (content) => {
   let user = await localStorage.getItem("username");
    await $.ajax({
     url: "/post/create?userid=" + user + "&content=" + content,
     success: () => {
     },
     complete: () => {
       loadMessages()
     }
   })
 }

$(document).ready(function() {
  $('#submit').click(function(event) {
    event.preventDefault();
    let content = $('#postContent').val()
    getUser(content);
  })
})

const loadMessages = async () => {
  const response = await fetch ('/post')
  const jresponse = await response.json()
  formatMessages(jresponse)
}

const formatMessages = (jresponse) => {
  $('#postContainer').empty();
  jresponse.forEach((element) => {
    console.log(element);
    $('#postContainer').append(`<div id=${element.id}> ${element.message} -- ${element.user}<div>`)
  })
}

loadMessages()
