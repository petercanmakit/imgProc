function myFunction(canvas, file, width, height, gray, colorful, zin, zout, zori) {
    this.myCanvas = canvas;
    this.myFile  = file;
	this.pageWidth = width;
	this.pageHeight = height;
	// button
	this.grayscale = gray;
	this.color = colorful;
	this.zoomIn = zin;
	this.zoomOut = zout;
	this.original = zori;

	var selectedFile;

	this.img_ori = new Image();

	myFile.onchange = function(event) {
	    selectedFile = event.target.files[0];
		var reader = new FileReader();
	    reader.onload = putImage2Canvas;
	    reader.readAsDataURL(selectedFile);
	}

	function putImage2Canvas(event) {

	    img_ori.src = event.target.result;
	    img_ori.onload = function(){
	        myCanvas.width = img_ori.width/4;
	        myCanvas.height = img_ori.height/4;
	        var context = myCanvas.getContext('2d');
	        // context.drawImage(img, 0, 0);
	        // var imgdata = context.getImageData(0, 0, img_ori.width, img_ori.height);

			context.drawImage(img_ori, 0, 0, img_ori.width/5, img_ori.height/5);
	    }
	}

	grayscale.onclick = function() {
		var img = img_ori;
		var context = myCanvas.getContext('2d');
		var canvasData = context.getImageData(0, 0, img.width/5, img.height/5);
		// alert("grayscale!!");

		// grayscale
		for ( var x = 0; x < canvasData.width; x++) {
	        for ( var y = 0; y < canvasData.height; y++) {

	            // Index of the pixel in the array
	            var idx = (x + y * canvasData.width) * 4;
	            var r = canvasData.data[idx + 0];
	                var g = canvasData.data[idx + 1];
	                var b = canvasData.data[idx + 2];

	                // calculate gray scale value
	                var gray = .299 * r + .587 * g + .114 * b;

	            // assign gray scale value
	            canvasData.data[idx + 0] = gray; // Red channel
	            canvasData.data[idx + 1] = gray; // Green channel
	            canvasData.data[idx + 2] = gray; // Blue channel
	            canvasData.data[idx + 3] = 255; // Alpha channel

	            // add black border
	            if(x < 8 || y < 8 || x > (canvasData.width - 8) || y > (canvasData.height - 8))
	            {
	                canvasData.data[idx + 0] = 0;
	                canvasData.data[idx + 1] = 0;
	                canvasData.data[idx + 2] = 0;
	            }
	        }
		}
		context.putImageData(canvasData, 0, 0);
		// context.drawImage(canvasData, 0, 0, img.width/5, img.height/5);
	}

	color.onclick = function(){
		// alert("back to colorful");
		var reader = new FileReader();
	    reader.onload = putImage2Canvas;
	    reader.readAsDataURL(selectedFile);
	}

}
