//the drop() function of many to one
var onDrop = function (ui) {
    draggableElement = $(".ui-draggable-dragging");
    answerContent = draggableElement.html();
    $(this).html(answerContent).css({
        "text-decoration": "underline"
    });
    setDropType[pageIndex]($(this));
};

//manyToOne OnDrop operations
var manyToOneOnDrop = function (selectDroppable) {
    $(".checkAnswer").attr("disabled", false);
    if (tempStore[0]) {
        tempStore[0].show();
        tempStore[0] = draggableElement;
        draggableElement.hide();
    } else {
        tempStore[0] = draggableElement;
        draggableElement.hide();
    }
};

//oneToMany OnDrop operations
var oneToManyOnDrop = function (selectDroppable) {
    tempStore[droppableTarget.index(selectDroppable.addClass("blankStyle"))] = answerContent;
    for (divIterator = 0; divIterator < correctAnswer.length; divIterator++) {
        if (tempStore[divIterator] === undefined) {
            blankChecker = 1;
            break;
        }
    }
    if (blankChecker !== 1) {
        $(".checkAnswer").attr("disabled", false);
    }
    if (!keyboardSelect) {
        draggableElement.hide();
    }
    blankChecker = 0;
};

//oneToOne OnDrop operations
var oneToOneOnDrop = function (selectDroppable) {
    blankChecker = 0;
    selectDroppable.css({
        border: "none"
    }).addClass("avoidSelection");
    appendedDraggable = draggableElement.addClass("fitToParent").draggable("disable").addClass("avoidSelection");
    tempStore[$(".properties").index(selectDroppable.append(appendedDraggable).droppable("disable"))] = draggableElement;
    for (divIterator = 0; divIterator < testData[pageIndex][1].answers.length; divIterator++) {
        if (tempStore[divIterator] === undefined) {
            blankChecker = 1;
            break;
        }
    }
    if (!blankChecker) {
        $(".checkAnswer").attr("disabled", false);
    }
};

//setting the blank to default condition
var placeAnswer = function () {
    if (!pageIndex) {
        tempStore[0].show();
        tempStore[0].addClass("placeAnswer").draggable("disable").addClass("avoidSelection").attr("tabindex", -1);
        droppableTarget.html("_____").removeClass("errorStatus").addClass("blankStatus");
    } else {
        for (divIterator = 0, dataIterator = 1; divIterator < arrayLimit; divIterator++, dataIterator += 2) {
            selectDroppable = selectQuestion.children().eq(dataIterator);
            if (selectDroppable.hasClass("blankStyle")) {
                selectDroppable.html("_____").removeClass("errorStatus").addClass("blankStatus");
                selectDroppable.addClass("placeAnswer");
            }
        }
    }
};

//validation of the dropped answer
var validateAnswer = function () {
    $(".checkAnswer").attr("disabled", true);
    setValidationType[pageIndex]();
};

//var manyToOne validator operations
var manyToOneValidation = function () {
    if (droppableTarget.html() === correctAnswer[0]) {
        $(".nextQuestion").attr("disabled", false);
        $(".manyToOneAnswer").draggable("disable").attr("tabindex", -1);
        droppableTarget.addClass("correctStatus").attr("tabindex", -1);
    } else {
        droppableTarget.addClass("errorStatus");
        setTimeout(placeAnswer, 1000);
    }
};

//var oneToMany validator operations
var oneToManyValidation = function () {
    if (tempStore.toString() === correctAnswer.toString()) {
        $(".nextQuestion").attr("disabled", false);
        $(".oneToManyAnswer").draggable("disable").attr("tabindex", -1);
        droppableTarget.addClass("correctStatus").attr("tabindex", -1);
    } else {
        oneToManyIncorrectOperations();
    }
};

//oneToMany incorrect answers operations
var oneToManyIncorrectOperations = function () {
    arrayLimit = tempStore.length;
    for (dataIterator = 0, divIterator = 1; dataIterator < arrayLimit; dataIterator++, divIterator += 2) {
        selectDroppable = selectQuestion.children().eq(divIterator);
        if (correctAnswer[dataIterator] !== selectDroppable.html() && selectDroppable.hasClass("blankStyle")) {
            tempStore[dataIterator] = undefined;
            selectDroppable.addClass("errorStatus");
            setTimeout(placeAnswer, 1000);
        } else if (correctAnswer[dataIterator] === selectDroppable.html()) {
            selectDroppable.removeClass("blankStyle").droppable("disable").addClass("correctStatus").addClass("avoidSelection");
        }
    }
};

//var oneToOne validator operations
var oneToOneValidation = function () {
    for (answersIterator = 0; answersIterator < noOfMammals; answersIterator++) {
        droppedMammal = $(".droppableProperties").children().eq(answersIterator).children();
        correctAnswer = testData[pageIndex][1].answers[answersIterator];
        if (droppedMammal.length !== 0 && droppedMammal.attr("value") !== correctAnswer) {
            tempStore[answersIterator] = undefined;
            divToRevert = ($(".droppableProperties").children().eq(answersIterator).children().removeClass("avoidSelection").attr("tabindex", 0));
            divToRevert.appendTo($(".draggableMammals")).removeClass("fitToParent").css({
                "top": 0,
                "left": 0
            });
            $(".droppableProperties").children().eq(answersIterator).droppable({
                disabled: false
            }).css({
                border: "4px solid red"
            }).removeClass("avoidSelection");
            droppedMammal.draggable({
                disabled: false
            });
        } else {
            droppedMammal.draggable("disable");
            $(".droppableProperties").children().eq(answersIterator).droppable("disable").css({
                border: "4px solid blue"
            });
        }
    }
};
