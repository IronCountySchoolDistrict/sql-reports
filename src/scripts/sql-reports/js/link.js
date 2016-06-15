import $ from 'jquery';

export function main() {
  var tabTemplate = $('#sql-reports-tab').html();
  $('ul.tabs').prepend(tabTemplate);
}
