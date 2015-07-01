function trimFrom(s) 
   {
   	// Remove leading spaces and carriage returns
   	while ((s.substring(0,1) == ' ') || (s.substring(0,1) == '\n') || (s.substring(0,1) == '\r'))
   	 { s = s.substring(1,s.length); }
     
   	// Remove trailing spaces and carriage returns
	while ((s.substring(s.length-1,s.length) == ' ') || (s.substring(s.length-1,s.length) == '\n') || (s.substring(s.length-1,s.length) == '\r'))
   	 { s = s.substring(0,s.length-1); }
     
   	return s;
   }

function countColumns(sqlText) {

		var textArray = sqlText;

		var numberOfParts = 0;
		numberOfParts = textArray.length - 1;

		var indexCount = 0;
		var parenCnt = 0;
		var selectWord = "";
		var selectCnt = 0;
		var fromWord = "";
		var fromCnt = 0;
		var totalColumns = 0;

		while (indexCount <= numberOfParts)
		{
			if (textArray.substr(indexCount,1) == "("){parenCnt++;}
			if (textArray.substr(indexCount,1) == ")"){parenCnt--;}
			if (indexCount >= 5 && fromCnt == 0)
			{
				selectWord = textArray.substr(indexCount-6,1)+textArray.substr(indexCount-5,1)+textArray.substr(indexCount-4,1)+textArray.substr(indexCount-3,1)+textArray.substr(indexCount-2,1)+textArray.substr(indexCount-1,1);
				selectWord = selectWord.toUpperCase();

				fromWord = textArray.substr(indexCount,1)+textArray.substr(indexCount+1,1)+textArray.substr(indexCount+2,1)+textArray.substr(indexCount+3,1)+textArray.substr(indexCount+4,1)+textArray.substr(indexCount+5,1); //dd
				fromWord = trimFrom(fromWord.toUpperCase());

// code by Bob McGregor to allow mulitple WITHs
withClause = textArray.substr(indexCount,numberOfParts);
if (withClause.search(/^([\s,]\w+\s+as\s+\()/i) == 0) {
totalColumns--;
}

			}
			if (selectWord == "SELECT" && parenCnt == 0 && selectCnt == 0)
			{
				selectCnt = 1;	// allow only one SELECT command to be tagged
			}

			if (fromWord == "FROM" && parenCnt == 0 && fromCnt == 0)
			{
				fromCnt = 1;	// allow only one FROM command to be tagged; once FROM tagged, no more commas are tagged
				totalColumns++;
			}

			if (textArray.substr(indexCount,1) == ',' && parenCnt == 0 && fromCnt == 0)
			{
				totalColumns++;
			}
			indexCount++;
		}
	return totalColumns;
}
