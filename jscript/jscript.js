var teamValue = 1;
var currentLocation = 1;

var whiteboardWidth = $("body").width();

$("#canvas").drawr({ "enable_tranparency" : false, "canvas_width" : whiteboardWidth, "canvas_height" : 800 });
$("#canvas").drawr("start");

$("#select-button").click(function(){
	teamValue = $("#team-value").val();
	$("#game").removeClass("hidden");
	$("#gameArea").removeClass("hidden");
	$("#controls").removeClass("hidden");
	$("#start").addClass("hidden");
	for(teamStart=1; teamStart<=teamValue; teamStart++){
		var newBox = $("#hidden-template .score-box").clone();
		newBox.addClass("team-"+teamStart);
		newBox.find(".team-title").append(teamStart);
		newBox.appendTo("#teams");
		$("#team-select").append('<option value="team-'+teamStart+'">Team '+teamStart+'</option>');
	}
	$(".team-1").addClass("current");
});

$("#point-change").click(function(){
	$(this).prop("disabled", true);
	$("#team-select").val("team-"+currentLocation).change();
	$("#point-select").removeClass("hidden");
	$("canvas").addClass("hidden");
});

$("#points-submit").click(function(){
	var selectedTeam = $("#team-select").children("option:selected").val();
	var addPoints = parseInt($(".new-points").val());
	var currentPoints = parseInt($("#teams ."+selectedTeam+" .team-score").val());
	$("#teams ."+selectedTeam+" .team-score").val(currentPoints+addPoints);
	$("#point-change").prop("disabled", false);
	$("#point-select").addClass("hidden");
	$(document).find(".current").removeClass("current");
	currentLocation = parseInt(selectedTeam[selectedTeam.length-1]) + 1;
	if(currentLocation > teamValue){
		currentLocation = 1;
	}
	$("#teams .score-box:nth-child("+currentLocation+")").addClass("current");
	$(".new-points").val("0");
	$("canvas").removeClass("hidden");
});

$("#current-right").click(function(){
	$(document).find(".current").removeClass("current");
	currentLocation++;
	if(currentLocation > teamValue){
		currentLocation = 1;
	}
	$("#teams .score-box:nth-child("+currentLocation+")").addClass("current");
});

$("#current-left").click(function(){
	$(document).find(".current").removeClass("current");
	currentLocation--;
	if(currentLocation < 1){
		currentLocation = teamValue;
	}
	$("#teams .score-box:nth-child("+currentLocation+")").addClass("current");
});