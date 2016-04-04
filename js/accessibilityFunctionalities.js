var selectDraggable = function (event) {
    if (event.keyCode === 32) {
        $(".manyToOneAnswer, .oneToManyAnswer, .mammal").attr("tabindex", -1);
        $(".droppableTarget, .properties").not(".avoidSelection").attr("tabindex", 0).focus();
        draggableElement = $(this);
    }
}

var dropDraggable = function (event) {
    if (event.keyCode === 32) {
        keyboardSelect = 1;
        answerContent = draggableElement.html();
        $(this).html(answerContent).css({
            "text-decoration": "underline"
        });
        setDropType[pageIndex]($(this));
        $(".manyToOneAnswer, .oneToManyAnswer, .mammal").not(".avoidSelection").attr("tabindex", 0).focus();
        $(".droppableTarget, .properties").attr("tabindex", -1);
        if (tempStore.length === correctAnswer.length) {
            $(".checkAnswer").focus();
        }
    }
}
