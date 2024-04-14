$(function() {
    InitializeDropDownList("#request_type");
});

function FormatISK(num) {
    var units = ["","K","M","B","T","Q"]
    var unit = (num / 1.0e+1).toFixed(0).toString().length
    var r = unit%3
    var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
    return ((Math.round(x)==x) ? x : x.toFixed(2))+ ' ' + units[Math.floor(unit / 3)]
}

function InitializeDropDownList(id) {
        var $this = $(id), numberOfOptions = $(id).children('option').length;
      
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="select"></div>');
        $this.after('<svg style="top: 7px;position: absolute;right: 10px;" viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>');
        $this.after('<div class="select-styled"></div>');
    
        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());
      
        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);
      
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
            if ($this.children('option').eq(i).is(':selected')){
              $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
            }
        }
      
        var $listItems = $list.children('li');
      
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });
      
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
          $list.find('li.is-selected').removeClass('is-selected');
          $list.find('li[rel="' + $(this).attr('rel') + '"]').addClass('is-selected');
            $list.hide();
            $this.trigger('change');
          //  console.log($this.val());
        });
      
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    }