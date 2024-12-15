var nameInput = document.getElementById("Name");
var urlInput = document.getElementById("Url");
var list = [];

if (localStorage.getItem("product") !== null) {
  list = JSON.parse(localStorage.getItem("product"));
  displaydat();
}

function validateName() {
  var name = nameInput.value.trim();
  if (name.length >= 3) {
    nameInput.classList.remove("is-invalid");
    nameInput.classList.add("is-valid");
  } else {
    nameInput.classList.remove("is-valid");
    nameInput.classList.add("is-invalid");
  }
}

function validateUrl() {
  var url = urlInput.value.trim();
  if (isValidUrl(url)) {
    urlInput.classList.remove("is-invalid");
    urlInput.classList.add("is-valid");
  } else {
    urlInput.classList.remove("is-valid");
    urlInput.classList.add("is-invalid");
  }
}

function isValidUrl(url) {
  var urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i;
  return urlPattern.test(url);
}

function displaydat() {
  var count = "";
  for (var i = 0; i < list.length; i++) {
    var url = list[i].url || ""; 
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }

    count += `
      <tr>
        <td>${i + 1}</td>
        <td>${list[i].name || "Unnamed"}</td>
        <td>
          <a href="${url}" target="_blank" class="btn btn-success"> <i class="fa-regular fa-eye"></i> Visit</a>
        </td>
        <td>
          <button class="btn btn-danger" onclick="deletitems(${i})"><i class="fa-solid fa-trash"></i> Delete</button>
        </td>
      </tr>`;
  }
  document.getElementById("bookmarksResults").innerHTML = count;
}


function deletitems(index) {
  list.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(list));
  displaydat();
}

function validateInputs() {
  var name = nameInput.value.trim();
  var url = urlInput.value.trim();

  if (name.length < 3 || !isValidUrl(url)) {
    showPopup();
    return false;
  }
  return true;
}

function dataproudct() {
  validateName();
  validateUrl();

  if (!validateInputs()) return;

  var product = {
    name: nameInput.value,
    url: urlInput.value,
  };

  list.push(product);
  localStorage.setItem("product", JSON.stringify(list));
  displaydat();
  clearproduct();
}

function clearproduct() {
  nameInput.value = "";
  urlInput.value = "";
  nameInput.classList.remove("is-valid", "is-invalid");
  urlInput.classList.remove("is-valid", "is-invalid");
}

function showPopup() {
  document.getElementById("popupModal").classList.remove("d-none");
}


function closePopup() {
  document.getElementById("popupModal").classList.add("d-none");
}
