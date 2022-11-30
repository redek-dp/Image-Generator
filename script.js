(function () {
  var tab = document.querySelector(".tabs");
  var instance = M.Tabs.init(tab);
})();

var fileName = "";
$(document).ready(function () {
  $("#imageFile").change(function (evt) {
    var files = evt.target.files;
    var file = files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("preview").src = e.target.result;
      };
      fileName = file.name;
      console.log(fileName);
      reader.readAsDataURL(file);
    }
  });
});

function ResizeImage(max_width, max_height, id) {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    var filesToUploads = document.getElementById("imageFile").files;
    var file = filesToUploads[0];
    if (file) {
      var reader = new FileReader();
      // Set the image once loaded into file reader
      reader.onload = function (e) {
        var img = document.createElement("img");
        img.src = e.target.result;

        canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = max_width;
        var MAX_HEIGHT = max_height;
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        dataurl = canvas.toDataURL(file.type);
        document.getElementById(id).src = dataurl;
        document.getElementById(id).download = "001.jpg";
      };
      reader.readAsDataURL(file);
    }
  } else {
    alert("As APIs de arquivo não são totalmente compatíveis com este navegador.");
  }
}

function download_img(id, size) {
  // get image URI from canvas object
  var fileNameReplace = fileName.replace("1200", size);
  document.getElementById("download_" + id).download = fileNameReplace;
  document.getElementById("download_" + id).href = document.getElementById(
    id
  ).src;
}