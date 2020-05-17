d3.csv("assets/data/data.csv", function(error, data) {
    if (error) throw error;
    
    var sortAscending = true;
    var div= d3.select('#page-wrap').append('div').attr('id', 'table_holder' )
    var table = d3.select('#table_holder').append('table')
                    .attr("class","table table-hover table-sm")
                    .attr("style", "padding-right: 5em")
                    
    var titles = d3.keys(data[0]);
    var headers = table.append('thead').append('tr')
                .selectAll('th')
                .data(titles).enter()
                .append('th')
                .text(function (d) {
                    return d;
                })
                .on('click', function (d) {
                    headers.attr('class', 'header');
                    
                    if (sortAscending) {
                    rows.sort(function(a, b) { return b[d] < a[d]; });
                    sortAscending = false;
                    this.className = 'aes';
                    } else {
                    rows.sort(function(a, b) { return b[d] > a[d]; });
                    sortAscending = true;
                    this.className = 'des';
                    }
                    
                });
    
    var rows = table.append('tbody').selectAll('tr')
                .data(data).enter()
                .append('tr');
    rows.selectAll('td')
      .data(function (d) {
          return titles.map(function (k) {
              return { 'value': d[k], 'name': k};
          });
      }).enter()
      .append('td')
      .attr('data-th', function (d) {
          return d.name;
      })
      .text(function (d) {
          return d.value;
      });
});
