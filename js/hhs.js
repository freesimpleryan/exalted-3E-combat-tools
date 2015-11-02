var testToon = {
	name: "Test Toon",
	evasion: 4,
	parry: 3,
	initiative: 4,
	guile: 2,
	resolve: 1,
	willpower: 5,
	essence: 10,
	penalties: {
		health: 0,
		onslaught: 0,
		other: 0,
		total: function(){return health + onslaught + other;}
	}
};

var Combatants = [];
Combatants.push(testToon);

function initiativesort(a, b){
	return parseInt($(b).find(".initiative").val()) > parseInt($(a).find(".initiative").val()) ? 1 : -1;
}

$(document).ready(function(){
	
	$('#btn-new-turn').on('click', function(){
		$('.combatant').sort(initiativesort).appendTo('#combatants');
		$('#combatants :checkbox').attr('checked', false);
	});
	
	$('#btn-add-combatant').on('click', function(){
		var newcombatant = '<li class="combatant"><span class="btn btn-default combatant-btn"><input type="checkbox"><span class="combatant-name">New Combatant</span><input type="number" class="initiative" style="width:40px;"><span class="glyphicon glyphicon-trash combatant-delete" aria-hidden="true"></span></span></li>';
		$('#combatants').append(newcombatant);
		
		// Listeners
		// Name change
		$('#combatants li').last().find('.combatant-name').on('click', function(){
			if(!$(this).hasClass('editable')){
				var temp = $(this).text;
				var placeholder = "New Combatant";
				$(this).empty();
				if($(this).val())
					placeholder = temp;
				var textbox = '<input type="text" class="combatant-name-field" value="'+placeholder+'">';
				$(this).append(textbox);
				$(this).addClass('editable');
				$(this).find('.combatant-name').focus();
				// Set on focusout
				$('#combatants li').last().find('.combatant-name-field').on("focusout", function(){
						var temp = $(this).val();
						$(this).closest('span').removeClass('editable');
						$(this).closest('span').text(temp);
						$(this).remove();
				});
			}
		});
		
		// Delete button
		$('#combatants li').last().find('.combatant-delete').on('click', function(){
			$(this).closest('li').remove();
		});
	});
	
	// Combat tracker controls
	$('#combatants').sortable({
		revert: true,
		items: "li"
	});
	
});
