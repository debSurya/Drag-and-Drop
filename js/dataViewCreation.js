//set the drag and drop type
var setTestType = function () {
    $(".initialPage").hide();
    pageIndex = $(".setIndex").index(this);
    if (!pageIndex) {
        $(".manyToOne").show();
        setTestElements($(".manyToOneTestContainer"), $(".manyToOneQuestionField"), "<div class='manyToOneAnswer'></div><br>", "<span class='manyToOneQuestion'></span>");
    } else if (pageIndex === 1) {
        $(".oneToMany").show();
        setTestElements($(".oneToManyTestContainer"), $(".oneToManyQuestionField"), "<div class='oneToManyAnswer'></div><br>", "<span class='oneToManyQuestion'></span>");
    } else {
        $(".oneToOne").show();
        oneToOneData();
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
};

//oneToMany Populate
var oneToOneData = function () {
    noOfMammals = $(".draggableMammals").children().length;
    for (dataIterator = 0; dataIterator < noOfMammals; dataIterator++) {
        imageURL = testData[pageIndex][0].mammals[dataIterator];
        imagePopulate($(".draggableMammals")).attr("value", testData[pageIndex][0].mammals[dataIterator]);
        imageURL = testData[pageIndex][0].properties[dataIterator];
        imagePopulate($(".droppableProperties"));
    }
    $(".oneToOne").append(checkAnswers);
    $(".checkAnswer").off("click").on("click", validateAnswer);
    $(".checkAnswer").attr("disabled", true);
};

//background image of div
var imagePopulate = function (selectedDiv) {
    return selectedDiv.children().eq(dataIterator).css({
        "background-image": "url(" + imageURL + ")",
        "background-size": "100% 100%"
    })
};

//element creation and data population
var dataViewPopulate = function () {
    viewPopulate();
    dataPopulate();
    droppableTarget = $(".droppableTarget");
};

//loading elements
var viewPopulate = function () {
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
        drop: onDrop
    });
};

//progress to next question
var showNext = function () {
    if (!$(".nextQuestion").hasClass("endTest")) {
        droppableTarget.removeClass("blankStyle");
        questionIndex++;
        $(".nextQuestion").attr("disabled", true);
        placeAnswer();
        $(".manyToOneAnswer").draggable({
            disabled: false
        }).removeClass("placeAnswer");
        elementsToRemove = $(".manyToOneQuestion, .oneToManyQuestion, .manyToOneAnswer, .oneToManyAnswer, .checkAnswer, .nextQuestion, .droppableTarget, br")
        elementsToRemove.remove();
        setQuestionField = selectQuestionSegment, tempStore = [];
        dataViewPopulate();
        setDragAndDrop();
    } else {
        alert("Thank You!");
        if (!pageIndex) {
            $(".manyToOne").hide();
        } else {
            $(".oneToMany").hide();
        }
        $(".endTestSection").show();
    }
};
