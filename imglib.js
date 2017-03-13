// The function takes canvas, file and related buttons as parameters
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
	this.ori_width = 0;
	this.ori_height = 0;
	var context;

	var selectedFile;

	this.img_ori = new Image();

	// when the image file changes reload it and display
	myFile.onchange = function(event) {
	    selectedFile = event.target.files[0];
		var reader = new FileReader();
	    reader.onload = putImage2Canvas;
	    reader.readAsDataURL(selectedFile);
	}

	function putImage2Canvas(event) {

	    img_ori.src = event.target.result;
	    img_ori.onload = function(){
	        myCanvas.width = img_ori.width;
	        myCanvas.height = img_ori.height;
			ori_width = img_ori.width;
			ori_height = img_ori.height;
	        context = myCanvas.getContext('2d');
	        // context.drawImage(img, 0, 0);
	        // var imgdata = context.getImageData(0, 0, img_ori.width, img_ori.height);

			context.drawImage(img_ori, 0, 0, img_ori.width, img_ori.height);
	    }
	}
	// change it into grayscale
	grayscale.onclick = function() {
		var img = img_ori;
		var canvasData = context.getImageData(0, 0, ori_width, ori_height);
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

	// back to colorful image
	color.onclick = function() {
		var canvasData = context.getImageData(0, 0, ori_width, ori_height );
		context.clearRect(0, 0, myCanvas.width, myCanvas.height);
		context.drawImage(img_ori, 0, 0, ori_width, ori_height);
	}

	// zoon in by 10%
	zoomIn.onclick = function() {
		var canvasData = context.getImageData(0, 0, ori_width, ori_height );
		context.clearRect(0, 0, myCanvas.width, myCanvas.height);

		var img = img_ori;
		ori_width = ori_width - img_ori.width*0.1;
		ori_height = ori_height - img_ori.height*0.1;
		myCanvas.width = ori_width;
		myCanvas.height = ori_height;

		context.drawImage(img, 0, 0, ori_width, ori_height);
	}

	// zoom out by 10%
	zoomOut.onclick = function() {
		context.clearRect(0, 0, myCanvas.width, myCanvas.height);
		// alert("zoomout!");
		var img = img_ori;
		ori_width = ori_width + img_ori.width*0.1;
		ori_height = ori_height + img_ori.height*0.1;
		myCanvas.width = ori_width;
		myCanvas.height = ori_height;

		// zoom out
		context.drawImage(img, 0, 0, ori_width, ori_height);
	}

	// back to original size
	original.onclick = function() {
		context.clearRect(0, 0, myCanvas.width, myCanvas.height);
		ori_width = img_ori.width;
		ori_height = img_ori.height;
		myCanvas.width = img_ori.width;
		myCanvas.height = img_ori.height;
		context.drawImage(img_ori, 0, 0, img_ori.width, img_ori.height);
	}

}
