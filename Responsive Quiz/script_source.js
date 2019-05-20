document.onselectstart = function () {
    alert("This function is disabled!");
    return false;
};

document.oncontextmenu = function () {

    return false;
};

$(document).ready(function () {
    
    var buttonColor = "#503E8A";
    
    var currentQuestion = 1;
    var totalQuestions = 8;
    var review = new Array();

    // Start Quize button on Click
    $("#startQuiz").click(function () {
        $("#prev").prop('disabled', true);
        $("#prev").fadeTo("fast", .5);
        $("#startPage").hide();
        $("#quiz").show();

    });

    // Side bar question button on Click
    $("#sidebar input[type='button']").click(function () {
        showCurrentQuestion(parseInt($(this).val()));
    });

    // Previous button on Click
    $("#prev").click(function () {
        showCurrentQuestion(currentQuestion - 1);
    });

    // Next button on Click
    $("#next").click(function () {
        showCurrentQuestion(currentQuestion + 1);
    });

    // Review button on Click
    $("#review").click(function () {

        if (review.includes(currentQuestion)) {
            review.splice(review.indexOf(currentQuestion), 1);
            $("#question" + currentQuestion + "Button").css('background-color', buttonColor);
            $("#review").css('background-color', buttonColor);
        } else {
            review.push(currentQuestion);
            $("#question" + currentQuestion + "Button").css('background-color', '#C33');
            $("#review").css('background-color', '#C33');
        }

    });

    // Submit Quiz button on Click
    $("#submit").click(function () {

        if (confirm("Are you sure? you want to submit and end quiz.")) {

            var score = 0;

            var rightAnswer1 = "true";
            var rightAnswer2 = "false";
            var rightAnswer3 = "option2";
            var rightAnswer4 = "option3";
            var rightAnswer5 = ["option1"];
            var rightAnswer6 = ["option1", "option2", "option3"];
            var rightAnswer7 = "val";
            var rightAnswer8 = "html";

            var RightAnswer3String = "Interaction";
            var RightAnswer4String = "focus()";
            var RightAnswer5String = "fadeToggle()";
            var RightAnswer6String = "Selectable, Draggable, Droppable";


            //------------------------------ Process Question 1 --------------------------------//

            if ($("input[name='answer1']:checked").val() === rightAnswer1) {
                score++;
                $("#answer1").text("Right answer!");

            } else {
                $("#answer1").css("background-color", "#F66");
                $("#answer1").text("Right answer is " + rightAnswer1);
            }

            $("input[name='answer1']").prop('disabled', true);
            $("#answer1").show();

            //------------------------------ Process Question 2 --------------------------------//

            if ($("input[name='answer2']:checked").val() === rightAnswer2) {
                score++;
                $("#answer2").text("Right answer!");

            } else {
                $("#answer2").css("background-color", "#F66");
                $("#answer2").text("Right answer is " + rightAnswer2);
            }

            $("input[name='answer2']").prop('disabled', true);
            $("#answer2").show();

            //------------------------------ Process Question 3 --------------------------------//

            if ($("input[name='answer3']:checked").val() === rightAnswer3) {
                score++;
                $("#answer3").text("Right answer!");

            } else {
                $("#answer3").css("background-color", "#F66");
                $("#answer3").text("Right answer is " + RightAnswer3String);
            }

            $("input[name='answer3']").prop('disabled', true);
            $("#answer3").show();

            //------------------------------ Process Question 4 --------------------------------//

            if ($("input[name='answer4']:checked").val() === rightAnswer4) {
                score++;
                $("#answer4").text("Right answer!");

            } else {
                $("#answer4").css("background-color", "#F66");
                $("#answer4").text("Right answer is " + RightAnswer4String);
            }

            $("input[name='answer4']").prop('disabled', true);
            $("#answer4").show();

            //------------------------------ Process Question 5 --------------------------------//

            var multichoice = new Array();
            multichoice = $("input[name='answer5']:checked").map(function () {
                return this.value;
            }).get();

            if (multichoice.length <= rightAnswer5.length) {
                for (var i = 0; i < multichoice.length; i++) {
                    if (rightAnswer5.includes(multichoice[i])) {
                        score += (1 / rightAnswer5.length);
                    }
                }
            }

            $("#answer5").css("background-color", "#FC9");
            $("#answer5").text("Right answers are " + RightAnswer5String);
            $("input[name='answer5']").prop('disabled', true);
            $("#answer5").show();

            //------------------------------ Process Question 6 --------------------------------//

            multichoice = $("input[name='answer6']:checked").map(function () {
                return this.value;
            }).get();

            if (multichoice.length <= rightAnswer6.length) {
                for (var i = 0; i < multichoice.length; i++) {
                    if (rightAnswer6.includes(multichoice[i])) {
                        score += (1 / rightAnswer6.length);
                    }
                }
            }

            $("#answer6").css("background-color", "#FC9");
            $("#answer6").text("Right answers are " + RightAnswer6String);
            $("input[name='answer6']").prop('disabled', true);
            $("#answer6").show();

            //------------------------------ Process Question 7 --------------------------------//

            if ($("input[name='answer7']").val().toUpperCase() === rightAnswer7.toUpperCase()) {
                score++;
                $("#answer7").text("Right answer!");

            } else {
                $("#answer7").css("background-color", "#F66");
                $("#answer7").text("Right answer is " + rightAnswer7 + "()");
            }

            $("input[name='answer7']").prop('disabled', true);
            $("#answer7").show();

            //------------------------------ Process Question 8 --------------------------------//

            if ($("input[name='answer8']").val().toLowerCase() === rightAnswer8.toLowerCase()) {
                score++;
                $("#answer8").text("Right answer!");

            } else {
                $("#answer8").css("background-color", "#F66");
                $("#answer8").text("Right answer is " + rightAnswer8 + "()");
            }

            $("input[name='answer8']").prop('disabled', true);
            $("#answer8").show();

            //------------------------------ Make Result Page Ready --------------------------------//

            $("#result").text("You got " + ((score / totalQuestions) * 100).toFixed(2) + "%");
            $("#result").show();
            $("#buttons").hide();
            $("#reload").show();
            $("#sidebar").hide();
            $("#questionSection").toggleClass("aftertest");
            $("#questionSection").children().show();

        } // End of Confirm!

    }); // End of Submit on click

    // Re-start quize button on click: Re-attempt
    $("#reload").click(function () {
        location.reload();
    });

    // Funtion which decides what to do when moving to next questions
    var showCurrentQuestion = function (qNumber) {

        if (isAnswredOrReviewd()) {
            currentQuestion = qNumber;

            if (currentQuestion === 1) {
                $("#prev").prop('disabled', true);
                $("#prev").fadeTo("fast", .5);
            } else {
                $("#prev").prop('disabled', false);
                $("#prev").fadeTo("fast", 1);
            }

            if (currentQuestion === totalQuestions) {
                $("#next").prop('disabled', true);
                $("#next").fadeTo("fast", .5);
            } else {
                $("#next").prop('disabled', false);
                $("#next").fadeTo("fast", 1);
            }

            $("#questionSection").children().hide();
            $("#question" + currentQuestion).show();

            //$("#sidebar input[type:'button']").css("background-color", "#FFF");
            //$("#question"+currentQuestion+"Button").css("background-color", "#279");

            if (review.includes(currentQuestion)) {
                $("#review").css("background-color", "#C33");
            } else {
                $("#review").css("background-color", buttonColor);
            }

        } else {
            alert("You must answer this Question or mark it for Review before moving to next Question");
        }

    }; // End of Function showCurrentQuestion()

    // This function returns boolean value:
    // True if Question is answred or marked for Review before moving forward else False
    var isAnswredOrReviewd = function () {

        var isMarked = false;

        if (review.includes(currentQuestion)) {
            isMarked = true;
        }

        if (currentQuestion <= 6) {
            if ($("input[name='answer" + currentQuestion + "']:checked").length > 0) {
                isMarked = true;
            }
        } else {
            if ($("input[name='answer" + currentQuestion + "']").val().length > 0) {
                isMarked = true;
            }
        }
        return isMarked;
    };
});