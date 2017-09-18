import $ from 'jquery';

export function main() {
  // BUG: this script may be executed twice, so check if the ICSDReports link has already been
  // inserted
  if (!$('ul.tabs li:contains("ICSDReports")').length > 0) {
    var tabTemplate = $('#sql-reports-tab').html();
    $('ul.tabs').prepend(tabTemplate);
  }
}
