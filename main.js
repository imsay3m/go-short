let res
function shorturl() {
  if (document.querySelector("#text").value == "") {
    alert("Url cannot be empty!")
    return
  }

  document.getElementById("searchbtn").disabled = true;
  document.getElementById("searchbtn").innerHTML = '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Please wait...';
  fetch(window.location.pathname, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: document.querySelector("#text").value })
  }).then(function (response) {
    return response.json();
  })
    .then(function (myJson) {
      res = myJson;
      document.getElementById("searchbtn").disabled = false;
      document.getElementById("searchbtn").innerHTML = ' Shorten it';
      if (res.key !== "")
        document.getElementById("result").innerHTML = window.location.host + res.key;
      $('#exampleModal').modal('show')
    }).catch(function (err) {
      alert("Unknow error. Please retry!");
      console.log(err);
      document.getElementById("searchbtn").disabled = false;
      document.getElementById("searchbtn").innerHTML = ' Shorten it';
    })
}
function copyurl(id, attr) {
  let target = null;

  if (attr) {
    target = document.createElement('div');
    target.id = 'tempTarget';
    target.style.opacity = '0';
    if (id) {
      let curNode = document.querySelector('#' + id);
      target.innerText = curNode[attr];
    } else {
      target.innerText = attr;
    }
    document.body.appendChild(target);
  } else {
    target = document.querySelector('#' + id);
  }

  try {
    let range = document.createRange();
    range.selectNode(target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    console.log('Copy success')
  } catch (e) {
    console.log('Copy error')
  }

  if (attr) {
    // remove temp target
    target.parentElement.removeChild(target);
  }
}
$(function () {
  $('[data-toggle="popover"]').popover()
})
console.log("https://github.com/imsay3m/go-short/")
let notice = "Notice: The generated short links will automatically expire after 24 hours."
if (window.location.host == "go.imsay3m.eu.org/") {
  document.getElementById("notice").innerHTML = notice
}