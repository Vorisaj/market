$(document).ready(function() {
  $('.copy-text').on('click', function() {
      var textToCopy = $(this).text();
      var $tempInput = $('<input>');
      $('body').append($tempInput);
      $tempInput.val(textToCopy).select();
      document.execCommand('copy');
      $tempInput.remove();
      $("#loading").show(0.5).delay(500).hide(0.5);
  });
  $("html").mousemove(function(e) {
      $("#loading").css({
          "top": e.pageY,
          "left": e.pageX + 15
      });
  });

});

function sortTable(sender) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = sender.parentElement.parentElement.parentElement;

  switching = true;
  dir = "asc";

    var n = 0;
    for(i = 0; i < table.rows[0].getElementsByTagName("TD").length; i++)
        if (table.rows[0].getElementsByTagName("TD")[i] == sender) {
            n = i;
            break;
        }

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {

      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      var num1 = getISK(x.innerHTML);
      var num2 = getISK(y.innerHTML);
      if (dir == "asc") {
        
        if (num1 > num2) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (num1 < num2) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function getISK(isk) {
    if (isk.indexOf('0') > 0)
      return parseFloat(isk.replace(",",""));
    else return isk;
}
