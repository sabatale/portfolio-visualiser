/*
Portfolio Visualizer

Copyright (C) 2017 Codento

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


$(function() {

  var djdata = $("#dj-data").data(),
  start_date = djdata['start'],
  end_date = djdata['end'],
  project_id = djdata['project'],
  y_dimension_id = djdata['y']
  x_dimension_ids = [];

  if(typeof djdata['x'] == "string") {
  	if(djdata['x'] != "") {
      x_dimension_ids = djdata['x'].trim().split(",");
    }
  } else {
    x_dimension_ids.push(djdata['x']);
  }
  data_url = djdata['url'];
  //console.log(djdata)

  $.ajax({
    url: data_url
  }).done(function(data) {
    var db_json = data;

    data_id_array = x_dimension_ids;
    data_id_array.unshift(y_dimension_id);
    data_id_array.unshift(project_id);

        $("#loading-icon").hide();

  	generate_path_svg(
          db_json,
          "visualization",
          data_id_array,
          (start_date * 1000),
          (end_date * 1000)
        );

    $("#projectPanel").html($("#projectName").text())
    $(".pathXlabel").each( function(i) {
      $("#xPanel").html($("#xPanel").html() + this.textContent + "<br>");
    })
    $("#yPanel").html($("#yAxisLabel").text())

  });


});
