
function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  speechSynthesis.speak(utterance);
}

$(document).ready(function () {

  var currentIndex = 0;
  var texts = ["SHOP", "SHIP", "SHIFT","Share"];

  function updateText() {
    $("#hiddenText").text(texts[currentIndex]);
  }
  $("#playButton").click(function () {
    // speakWord('shop')
    $("#hiddenText").fadeIn(1, function () {
      $(this).animate({ fontSize: '4.7em' }, 500);
    });
  });


  $("#nextButton").click(function () {

    currentIndex = (currentIndex + 1) % texts.length;
    updateText();
  });

  $("#prevButton").click(function () {
    currentIndex = (currentIndex - 1 + texts.length) % texts.length;
    updateText();
  });

  $("#stopButton").click(function () {
    $("#playButton").removeClass("animation-button");
    $("#belowSection").show();
    $("#hiddenText").hide();
  });

  document.getElementById("btn1").addEventListener("click", function () {
    var div2 = document.querySelector("#hiddenText");
    var div3 = document.querySelector("#textarea");
    var div4 = document.querySelector("#textarea");

    $("#hiddenText").fadeIn(1, function () {
      div2.innerText = "New text ";
      div3.style.display = "block";
      div3.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fuga minus ea quis odit ullam architecto nemo laboriosam veniam reprehenderit sint ducimus  cum provident eos natus inventore, temporibus error modi.";
      $(div3).animate({ fontSize: '15px' }, 500);

      $(this).animate({ fontSize: '4.7em' }, 500);
    });
  });
  document.getElementById("btn2").addEventListener("click", function () {
    var div2 = document.querySelector("#hiddenText");
    $("#hiddenText").fadeIn(1, function () {
      div2.innerText = "New text 2";



      $(this).animate({ fontSize: '4.7em' }, 500);
    });
  });
  document.getElementById("btn3").addEventListener("click", function () {
    var div2 = document.querySelector("#hiddenText");
    $("#hiddenText").fadeIn(1, function () {
      div2.innerText = "New text 3";

      $(this).animate({ fontSize: '4.7em' }, 500);
    });
  });
  $('#btn4');
  document.getElementById("btn4").addEventListener("click", function () {
    var div2 = document.querySelector("#hiddenText");
    $("#hiddenText").fadeIn(1, function () {
      div2.innerText = "New text 4";

      $(this).animate({ fontSize: '4.7em' }, 500);
    });
  });


  
  
  $('.btn11').click(function(){
    popup(1,'');
    $('.popup').show();
  });
  $(document).on('click','.msg-x, .overlay',function(){
  // $('.msg-x, .overlay').click(function(){
    $('.popup').hide();
  });
  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      // escape key maps to keycode `27`
      $('.popup').hide();
    }
  });


});

