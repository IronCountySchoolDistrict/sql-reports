import $ from 'jquery';

export default function() {
  if (!$('ul.tabs li:contains("ICSDReports")').length > 0) {
    var tabTemplate = $('#sql-reports-tab').html();
    $('ul.tabs').prepend(tabTemplate);
  }
}
