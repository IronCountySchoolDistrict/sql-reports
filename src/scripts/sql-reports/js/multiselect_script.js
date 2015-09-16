//Copies the values from the multi select and stores them in the list for the hidden field xx


function saveValuesMulti(eleFrom, eleTo)
{
    var theList = "";

    for (var i=0; i<eleFrom.options.length; i++)
    {
        if (eleFrom.options[i].selected && eleFrom.options[i].value != "")
        {
            theList = theList + eleFrom.options[i].value + ",";
        }
    }
    eleTo.value = theList;
}

//Populates a list based on a hidden field
function loadValuesMulti(eleFrom, eleHidden)
{
            var Arr;
            Arr = eleHidden.value.split(",");
            
            if(eleHidden.value != "")
            {  
            for (var i=0; i<eleFrom.options.length; i++)
            {
                        for(var j=0; j<Arr.length-1; j++)
                        {
                                    if(eleFrom.options[i].value == Arr[j])
                                    {
                                                eleFrom.options[i].selected = true;
                                    }
                        }
            }
            }
            else
            {
                        for (var i=0; i<eleFrom.options.length; i++)
                        {
	                        eleFrom.options[i].selected = false;
                        }
                        eleFrom.options[0].selected = true;
            }
}