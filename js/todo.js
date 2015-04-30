$("#sortable").sortable();
$("#sortable").disableSelection();

countTodos();

// all done btn
$("#checkAll").click(function(){
    AllDone();
});

//Add todo button
$("#addtodo").click(function(){
  AddToDo($("#whatodo"));
});

function AddToDo(element)
{
if($(element).val() != ''){
   var todo = $(element).val();
    createTodo(todo);
    countTodos();
   }else{
       // some validation
   }
}

//create todo
$('.add-todo').on('keypress',function (e) {
      e.preventDefault
      if (e.which == 13) {
       AddToDo(this);
      }
});
// mark task as done
$('.todolist').on('change','#sortable li input[type="checkbox"]',function(){
    if($(this).prop('checked')){
        var doneItem = $(this).parent().parent().find('label').text();
        $(this).parent().parent().parent().addClass('remove');
        done(doneItem);
        countTodos();
    }
});

//delete done task from "already done"
$('.todolist').on('click','.remove-item',function(){
    removeItem(this);
});

// count tasks
function countTodos(){
    var count = $("#sortable li").length;
    $('.count-todos').html(count);
}

//create task
function createTodo(text){
    var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ text +'</label></div></li>';
    $('#sortable').append(markup);
    localStorage[text] = "todo";
    $('.add-todo').val('');
}

//mark task as done
function done(doneItem){
    var done = doneItem;
    var markup = '<li><label>'+ done +'</label><button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
    $('#done-items').append(markup);
    console.log(done);
    localStorage[done] = "done";
    $('.remove').remove();
}

//mark all tasks as done
function AllDone(){
    var myArray = [];

    $('#sortable li').each( function() {
         myArray.push($(this).text());
    });

    // add to done
    for (i = 0; i < myArray.length; i++) {
        $('#done-items').append('<li>' + myArray[i] + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
    }

    // myArray
    $('#sortable li').remove();
    countTodos();
}

//remove done task from list
function removeItem(element){
    delete localStorage[($(element).parent().find('label').text())];
    $(element).parent().remove();
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function restoreState() {
  if (!supports_html5_storage ()) { return false; }
  for (var i = 0; i < localStorage.length; i++)
  {
    if(localStorage[localStorage.key(i)] == "todo")
        createTodo(localStorage.key(i));
    else if(localStorage[localStorage.key(i)] == "done")
        done(localStorage.key(i));
  }
  countTodos();
}

window.onload=(function () {
  restoreState();
});
