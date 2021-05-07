console.warn("Vous êtes désormais dans la console, prenez garde à ne pas entrer des commandes par mégarde sans les connaître au préalable !");

var canvas = document.getElementById("editor_upload");
var ctx = canvas.getContext('2d');
var upload = document.getElementById("upload_file");
var icon_up_element = document.getElementById("icon_up_element");
var remove = document.getElementById("remove_file");
var download = document.getElementById("download_file");
const image = new Image();
var exportName;

var blur_effect = document.getElementById("blur_effect");
var mosaic_effect = document.getElementById("mosaic_effect");
var black_and_white_effect = document.getElementById("black_and_white_effect");
var image_grain_effect = document.getElementById('image_grain_effect');
var vintage_effect = document.getElementById('vintage_effect');
var negative_effect = document.getElementById('negative_effect');
var pencil_effect = document.getElementById('pencil_effect');

upload.addEventListener('change', getImage, false);
remove.addEventListener('click', removeFile, false);
download.addEventListener('click', exportImage, false);

blur_effect.addEventListener('click', blurEffect, false);
mosaic_effect.addEventListener('click', mosaic, false);
black_and_white_effect.addEventListener('click', blackAndWhiteEffect, false);
image_grain_effect.addEventListener('click', imageGrainEffect, false);
vintage_effect.addEventListener('click', vintageEffect, false);
negative_effect.addEventListener('click', negativeEffect, false);
pencil_effect.addEventListener('click', pencilEffect, false);

function blurEffect() {
    var filter = 'blur(4px)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderFiltersExceptMosaic(filter);
}

function mosaic() {
    var file = upload.files[0];
    var name = file.name;
    var reader = new FileReader();
    dynamicRenderSkinBtn();

    reader.addEventListener("load", function () {
        const blob = reader.result;
        image.src = blob;
        image.addEventListener('load', function() {
            canvas.width = image.width;
            canvas.height = image.height;
            width = image.width;
            height = image.height;
            ctx.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
            var pixelData = ctx.getImageData(0, 0, width, height).data;
            pixelSize = 10;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var y = 0; y < height; y += pixelSize) {
                for (var x = 0; x < width; x += pixelSize) {
                  var p = (x + (y*width)) * 4;
                  ctx.fillStyle = "rgba(" + pixelData[p] + "," + pixelData[p + 1] + "," + pixelData[p + 2] + "," + pixelData[p + 3] + ")";
                  ctx.fillRect(x, y, pixelSize, pixelSize);
                }
            }
        });
    }, false);
    reader.readAsDataURL(file);
    exportName = name;
}

function blackAndWhiteEffect() {
    var filter = 'grayscale(100%)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderFiltersExceptMosaic(filter);
}

function imageGrainEffect() {
    var file = upload.files[0];
    var name = file.name;
    var reader = new FileReader();
    dynamicRenderSkinBtn();

    reader.addEventListener("load", function () {
        const blob = reader.result;
        const image_filter = new Image();
        image.src = blob;
        image_filter.src = "grain_effect_filter.png";
        image.addEventListener('load', function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            image_filter.addEventListener('load', function() {
                var pattern = ctx.createPattern(image_filter, 'repeat');
                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });
        });
    }, false);
    reader.readAsDataURL(file);
    exportName = name;
}

function vintageEffect() {
    var file = upload.files[0];
    var name = file.name;
    var reader = new FileReader();
    dynamicRenderSkinBtn();

    reader.addEventListener("load", function () {
        const blob = reader.result;
        const image_filter = new Image();
        image.src = blob;
        image_filter.src = "grain_effect_filter.png";
        image.addEventListener('load', function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.filter = 'brightness(1.9) sepia(0.80) saturate(4) grayscale(0.5)';
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            image_filter.addEventListener('load', function() {
                var pattern = ctx.createPattern(image_filter, 'repeat');
                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });
        });
    }, false);
    reader.readAsDataURL(file);
    exportName = name;
}

function negativeEffect() {
    var filter = 'invert(1)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderFiltersExceptMosaic(filter);
}

function pencilEffect() {
    var file = upload.files[0];
    var name = file.name;
    var reader = new FileReader();
    dynamicRenderSkinBtn();

    reader.addEventListener("load", function () {
        const blob = reader.result;
        const image_filter = new Image();
        const second_image_filter = new Image();
        image.src = blob;
        image_filter.src = "painting_effect_filter.png";
        second_image_filter.src = "painting_second_effect_filter.png";
        image.addEventListener('load', function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.filter = 'grayscale(0.4)';
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            image_filter.addEventListener('load', function() {
                var pattern = ctx.createPattern(image_filter, 'repeat');
                ctx.fillStyle = pattern;
                ctx.globalAlpha = 0.4;
                ctx.fillRect(0, 0, image.width, image.height,);
            });
            second_image_filter.addEventListener('load', function() {
                var pattern = ctx.createPattern(second_image_filter, 'repeat');
                ctx.fillStyle = pattern;
                ctx.globalAlpha = 0.3;
                ctx.fillRect(0, 0, image.width, image.height,);
            });
        });
    }, false);
    reader.readAsDataURL(file);
    exportName = name;
}

function getImage() {
    var file = upload.files[0];
    var name = file.name;
    var reader = new FileReader();
    dynamicRenderSkinBtn();

    reader.addEventListener("load", function () {
        const blob = reader.result;
        image.src = blob;
        image.addEventListener('load', function() {
            canvas.width = image.width;
            canvas.height = image.height; 
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
        });
    }, false);
    reader.readAsDataURL(file);
    exportName = name;
}

function removeFile() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    upload.value = '';
    dynamicVanishSkinBtn();
}

function renderFiltersExceptMosaic(filter) {
    var file = upload.files[0];
    var name = file.name;
    var reader = new FileReader();
    dynamicRenderSkinBtn();

    reader.addEventListener("load", function () {
        const blob = reader.result;
        image.src = blob;
        image.addEventListener('load', function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.filter = filter;
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
        });
    }, false);
    reader.readAsDataURL(file);
    exportName = name;
}

function exportImage() {
    var link = document.createElement('a');
    link.download = 'Edition_de_' + exportName;
    link.href = canvas.toDataURL();
    link.click();
}

function dynamicRenderSkinBtn() {
    icon_up_element.style.opacity = "0.3";
    upload.disabled = true;
    remove.disabled = false;
    download.disabled = false;
    blur_effect.disabled = false;
    mosaic_effect.disabled = false;
    black_and_white_effect.disabled = false;
    image_grain_effect.disabled = false;
    vintage_effect.disabled = false;
    negative_effect.disabled = false;
    pencil_effect.disabled = false;
}

function dynamicVanishSkinBtn() {
    icon_up_element.style.opacity = "1";
    upload.disabled = false;
    remove.disabled = true;
    download.disabled = true;
    blur_effect.disabled = true;
    mosaic_effect.disabled = true;
    black_and_white_effect.disabled = true;
    image_grain_effect.disabled = true;
    vintage_effect.disabled = true;
    negative_effect.disabled = true;
    pencil_effect.disabled = true;
}