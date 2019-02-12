$(document).ready(function() {
// --------------------

var vid = document.getElementById("trailer");
var volume = 1;

// RESET VID ON MODAL OPEN & CLOSE

$("#movie_details").on("show.bs.modal", function() {
	play_display("pause");
	$("#vid_slider").attr("max", vid.duration);
	$("#vid_slider").val(0);
});

$("#movie_details").on("hidden.bs.modal", function() {
	vid.pause();
	vid.load();
});

// VIDEO TIME RANGE INPUT

$(vid).on("timeupdate", function() {
	$("#vid_slider").val(parseFloat(vid.currentTime));
});

$("#vid_slider").click(function() {
	vid.currentTime = $("#vid_slider").val();
});

// PLAY AND PAUSE

$(".big_play .fa-play").on("click", function(e) {
	play_display("play");
	vid.play();
});

$(".bottom_controls .fa-play").on("click", function(e) {
	play_display("play");
	vid.play();
});

$(".bottom_controls .fa-pause").on("click", function() {
	play_display("pause");
	vid.pause();
});

// HIDE/SHOW BOTTOM CONTROLS & SLIDER

$("#vid_slider").hide();
$(".bottom_controls").hide();

$(".big_play").on("mouseover", function() {
	$(".bottom_controls").fadeIn("fast");
	$("#vid_slider").fadeIn("fast");
});

$(".bottom_controls").on("mouseover", function() {
	$(".bottom_controls").fadeIn("fast");
	$("#vid_slider").faseIn("fast");
});

$(".controls").on("mouseleave", function() {
	$(".bottom_controls").fadeOut("fast");
	$("#vid_slider").fadeOut("fast");
});

// VOLUME

$(".bottom_controls input").change(function(e) {
	vid.volume = parseFloat($(e.target).val());
	vol_display();
});

$(".fa-volume-up,.fa-volume-down").on("click", function() {
	non_zero_vol = vid.volume;
	vid.volume = 0;
	$(".bottom_controls input").val(vid.volume);
	vol_display();
});

$(".fa-volume-off").on("click", function() {
	vid.volume = non_zero_vol;
	$(".bottom_controls input").val(vid.volume);
	vol_display();
});

// FULLSCREEN

$(".bottom_controls .fa-arrows-alt").on("click", function() {
	vid.requestFullscreen();
});

function play_display(status) {
	switch(status) {
		case "play":
			$(".big_play .fa-play").hide();
			$(".bottom_controls .fa-play").hide();
			$(".bottom_controls .fa-pause").show();
			break;
		case "pause":
			$(".big_play .fa-play").show();
			$(".bottom_controls .fa-play").show();
			$(".bottom_controls .fa-pause").hide();
			break;
		}
}

function vol_display() {
	if (vid.volume == 0) {
		$(".fa-volume-up").hide();
		$(".fa-volume-down").hide();
		$(".fa-volume-off").show();
	} else if (vid.volume < 0.5) {
		$(".fa-volume-up").hide();
		$(".fa-volume-down").show();
		$(".fa-volume-off").hide();
	} else {
		$(".fa-volume-up").show();
		$(".fa-volume-down").hide();
		$(".fa-volume-off").hide();
	}
}

// --------------------------------
});
