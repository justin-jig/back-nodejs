function imageChange(kind) {

    if ($('div').children('.default')[0]) {
        $('.default').remove();
    }
    $('.image-box').css('background-image', `url("public/img/${kind}.jpg")`) 

}
