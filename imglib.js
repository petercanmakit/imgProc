var myCanvas = document.getElementById('myCanvas');
var myFile = document.getElementById('myFile');

myFile.onchange = function(event) {

    var selectedFile = event.target.files[0];
	var reader = new FileReader();
    reader.onload = putImage2Canvas;
    reader.readAsDataURL(selectedFile);
}

function putImage2Canvas(event) {
    var img = new Image();
    img.src = event.target.result;
    img.onload = function(){
        myCanvas.width = img.width;
        myCanvas.height = img.height;
        var context = myCanvas.getContext('2d');
        context.drawImage(img, 0, 0);
        var imgdata = context.getImageData(0, 0, img.width, img.height);
        // 处理imgdata
		context.drawImage(img, 0, 0);
    }
}
<script type="text/javascript" src="imglib.js"></script>
