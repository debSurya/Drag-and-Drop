var pageIndex, firstQuestionSegment, arrayLimit, selectDroppable, droppableTarget, answerLength, answerContent, questionLength, selectQuestion,
    selectParent, manyToOneAnswers, oneToManyAnswers, questionData, noOfMammals, droppedMammal, testData, imageURL, divIterator, dataIterator, draggableElement, appendedDraggable, divToRevert, oneToOneOnDrop, oneToManyOnDrop, manyToOneOnDrop, oneToManyValidation, manyToOneValidation, oneToOneValidation, buttonCode,
    keyboardSelect = 0,
    questionIndex = 0,
    correctAnswer = [],
    blankChecker = 0,
    tempStore = [],
    checkAnswers = "<button class='btn btn-default checkAnswer'>Check Answer!</button><br><br>",
    traverseQuestion = "<button class='btn btn-primary nextQuestion'>Next Question</button>",
    blankSpace = "<span class='droppableTarget'>_____</span>",
    manyToOne = $(".manyToOneTestContainer"),
    oneToMany = $(".oneToManyTestContainer");

//load json data
$.getJSON("data/testData.json", function (data) {
    testData = data;
});

$(document).ready(function () {
    $(".manyToOne").hide();
    $(".oneToMany").hide();
    $(".oneToOne").hide();
    $(".endTestSection").hide();
    $(".setIndex").off("click").on("click", setTestType);
    $(document).mousemove(function () {
        keyboardSelect = 0;
    });
});
