//set the drag and drop type
var setTestType = function () {
    $(".initialPage").hide();
    pageIndex = $(".setIndex").index(this);
    if (!pageIndex) {
        $(".manyToOne").show();
        setTestElements($(".manyToOneTestContainer"), $(".manyToOneQuestionField"), "<div class='manyToOneAnswer' tabindex = '0'></div><br>", "<span class='manyToOneQuestion'></span>");
    } else if (pageIndex === 1) {
        $(".oneToMany").show();
        setTestElements($(".oneToManyTestContainer"), $(".oneToManyQuestionField"), "<div class='oneToManyAnswer' tabindex = '0'></div><br>", "<span class='oneToManyQuestion'></span>");
    } else {
        $(".oneToOne").show();
        oneToOneData();
        $(".mammal").attr("tabindex", 1).off("keydown").on("keydown", selectDraggable);
        $(".properties").attr("tabindex", -1).off("keydown").on("keydown", dropDraggable);
        tempStore = [];
    }
    setDragAndDrop();
    setDropType = [manyToOneOnDrop, oneToManyOnDrop, oneToOneOnDrop];
    setValidationType = [manyToOneValidation, oneToManyValidation, oneToOneValidation];
};

//set parent, question div, answer fields and question fields
var setTestElements = function (parentToSelect, questionToSelect, answersToSelect, questionSegmentToSelect) {
    selectParent = parentToSelect;
    selectQuestion = questionToSelect;
    selectAnswers = answersToSelect;
    selectQuestionSegment = questionSegmentToSelect;
    setQuestionField = selectQuestionSegment;
    dataViewPopulate();
    $(".manyToOneAnswer, .oneToManyAnswer").off("keydown").on("keydown", selectDraggable);
    $(".droppableTarget").off("keydown").on("keydown", dropDraggable);
};

//oneToMany Populate
var oneToOneData = function () {
    noOfMammals = $(".draggableMammals").children().length;
    for (dataIterator = 0; dataIterator < noOfMammals; dataIterator++) {
        imageURL = testData[pageIndex][0].mammals[dataIterator];
        imageText = testData[pageIndex][0].mammalsText[dataIterator];
        imagePopulate($(".draggableMammals")).attr("value", testData[pageIndex][0].mammals[dataIterator]);
        imageURL = testData[pageIndex][0].properties[dataIterator];
        imageText = testData[pageIndex][0].propertiesText[dataIterator];
        imagePopulate($(".droppableProperties"));
    }
    $(".droppableProperties").append(checkAnswers);
    $(".checkAnswer").removeClass("checkAnswer").addClass("matchAnswer").hide();
    $(".matchAnswer").off("click").on("click", validateAnswer);
    //    $(".checkAnswer").attr("disabled", true);
};

//background image of div
var imagePopulate = function (selectedDiv) {
    return selectedDiv.children().eq(dataIterator).html(imageText).css({
        "background-image": "url(" + imageURL + ")",
        "background-size": "100% 100%",
        "color": "transparent"
    });
};

//element creation and data population
var dataViewPopulate = function () {
    viewPopulate();
    dataPopulate();
    droppableTarget = $(".droppableTarget");
};

//loading elements
var viewPopulate = function () {
    //    $(".questionDiv").attr("aria-label", testData[pageIndex][questionIndex].question);
    questionData = testData[pageIndex][questionIndex].question.split("_");
    answerLength = testData[pageIndex][questionIndex].noOfAns;
    questionLength = questionData.length;
    questionAnswerPopulate();
    $(".checkAnswer").attr("disabled", true).off("click").on("click", validateAnswer);
    $(".nextQuestion").attr("disabled", true).off("click").on("click", showNext);
};

//populating questions and answers
var questionAnswerPopulate = function () {
    for (divIterator = 0; divIterator < questionLength - 1; divIterator++) {
        setQuestionField = setQuestionField + blankSpace + selectQuestionSegment;
    }
    selectQuestion.append();
    selectQuestion.append(setQuestionField);
    selectParent.append("<br>");
    for (divIterator = 0; divIterator < answerLength; divIterator++) {
        selectParent.append(selectAnswers);
    }
    selectParent.append(checkAnswers);
    if (testData[pageIndex][questionIndex + 1] === undefined) {
        selectParent.append(traverseQuestion);
        $(".nextQuestion").html("End Test!").addClass("endTest");
    } else {
        selectParent.append(traverseQuestion);
    }
};

//populating data into the elements
var dataPopulate = function () {
    correctAnswer = testData[pageIndex][questionIndex].correct;
    for (divIterator = 0, dataIterator = 0; dataIterator < questionLength; divIterator += 2, dataIterator++) {
        selectQuestion.children().eq(divIterator).html(questionData[dataIterator]);
    }
    for (divIterator = 2, dataIterator = 1; dataIterator <= answerLength; divIterator += 2, dataIterator++) {
        answerContent = testData[pageIndex][questionIndex]["answer" + dataIterator];
        selectParent.children().eq(divIterator).attr("value", answerContent);
        selectParent.children().eq(divIterator).html(answerContent);
    }
};

//making the elements draggable and droppable
var setDragAndDrop = function () {
    $(".manyToOneAnswer").draggable({
        revert: true
    });
    $(".oneToManyAnswer").draggable({
        revert: true,
        helper: "clone"
    });
    $(".mammal").draggable({
        revert: "invalid",
        containment: "body"
    });
    $(".droppableTarget, .properties").droppable({
        activeClass: "ui-state-hover",
        drop: onDrop
    });
};

//progress to next question
var showNext = function () {
    if (!$(".nextQuestion").hasClass("endTest")) {
        questionIndex++;
        $(".nextQuestion").attr("disabled", true);
        placeAnswer();
        elementsToRemove = $(".manyToOneQuestion, .oneToManyQuestion, .manyToOneAnswer, .oneToManyAnswer, .checkAnswer, .nextQuestion, .droppableTarget, br");
        elementsToRemove.remove();
        setQuestionField = selectQuestionSegment, tempStore = [];
        dataViewPopulate();
        setDragAndDrop();
        $(".manyToOneAnswer, .oneToManyAnswer").attr("tabindex", 0).off("keydown").on("keydown", selectDraggable);
        $(".droppableTarget").attr("tabindex", -1).off("keydown").on("keydown", dropDraggable);
    } else {
        if (!pageIndex) {
            $(".manyToOne").hide();
        } else {
            $(".oneToMany").hide();
        }
        $(".endTestSection").show();
        $(".redirectButton").off("click").on("click", redirectPage);
    }
};
