  /*----------------------------------------------
  The Common functions used for all dropdowns are:
  -----------------------------------------------

  -- function FindKeyCode(e)
  -- function FindKeyChar(e)
  -- function fnBackspace(e)
  -- function fnLeftToRight(getdropdown)
  -- function fnRightToLeft(getdropdown)

  --------------------------- Subrata Chakrabarty */

  function fnBackspace(e)
  {

    if(navigator.appVersion.search('Chrome')!=-1)
    {
      alert("For Google Chrome browser only: \n\n ** Backspace will not work **. \n\n Alternatives:\n (1) Use Delete instead of Backspace. \n (2) Use a different browser.");
      if (typeof e.preventDefault == "function")
      {
        e.preventDefault();
      }
    }
    if(e.which) //NetscapeFirefoxChrome
    {
      //e.which = ''; //this property has only a getter.
    }
    else //Internet Explorer
    {
      //To prevent backspace from activating the -Back- button of the browser
      e.keyCode = '';
      if(window.event.keyCode)
      {
        window.event.keyCode = '';
      }
    }
    return true;
  }

  function fnLeftToRight(getdropdown)
  {
    getdropdown.style.direction = "ltr";
  }

  function fnRightToLeft(getdropdown)
  {
    getdropdown.style.direction = "rtl";
  }

  function FindKeyCode(e)
  {
    if(e.which)
    {
    keycode=e.which;  //NetscapeFirefoxChrome
    }
    else
    {
    keycode=e.keyCode; //Internet Explorer
    }

    //alert("FindKeyCode"+ keycode);
    return keycode;
  }

  function FindKeyChar(e)
  {
    keycode = FindKeyCode(e);
    if((keycode==8)||(keycode==127))
    {
    character="backspace"
    }
    else if((keycode==46))
    {
    character="delete"
    }
    else
    {
    character=String.fromCharCode(keycode);
    }
    //alert("FindKey"+ character);
    return character;
  }

  var vEditableOptionIndex_A = 0;

  var vEditableOptionText_A = "--?--";

  var vPreviousSelectIndex_A = 0;
 
  var vSelectIndex_A = 0;
 
  var vSelectChange_A = 'MANUAL_CLICK';
 
  function fnSanityCheck_A(getdropdown)
  {
    if(vEditableOptionIndex_A>(getdropdown.options.length-1))
    {
    alert("PROGRAMMING ERROR: The value of variable vEditableOptionIndex_... cannot be greater than (length of dropdown - 1)");
    return false;
    }
  }

  function fnKeyDownHandler_A(getdropdown, e)
  {
    fnSanityCheck_A(getdropdown);

    var vEventKeyCode = FindKeyCode(e);

    // Delete key pressed
    if(vEventKeyCode == 46)
    {
      if(getdropdown.options.length != 0)
      // if dropdown is not empty
      {
        if (getdropdown.options.selectedIndex == vEditableOptionIndex_A)
        // if option the Editable field
        {
          getdropdown.options[getdropdown.options.selectedIndex].text = '';
          getdropdown.options[getdropdown.options.selectedIndex].value = '';
        }
      }
    }

    // backspace key pressed
    if(vEventKeyCode == 8 || vEventKeyCode == 127)
    {
      fnBackspace(e);
    }
  }

  function fnChangeHandler_A(getdropdown)
  {
    fnSanityCheck_A(getdropdown);

    vPreviousSelectIndex_A = vSelectIndex_A;
    // Contains the Previously Selected Index

    vSelectIndex_A = getdropdown.options.selectedIndex;
    // Contains the Currently Selected Index

    if ((vPreviousSelectIndex_A == (vEditableOptionIndex_A)) && (vSelectIndex_A != (vEditableOptionIndex_A))&&(vSelectChange_A != 'MANUAL_CLICK'))
    // To Set value of Index variables - Subrata Chakrabarty
    {
      getdropdown[(vEditableOptionIndex_A)].selected=true;
      vPreviousSelectIndex_A = vSelectIndex_A;
      vSelectIndex_A = getdropdown.options.selectedIndex;
      vSelectChange_A = 'MANUAL_CLICK';
      // Indicates that the Change in dropdown selected
      // option was due to a Manual Click
    }
  }

  function fnKeyPressHandler_A(getdropdown, e)
  {
    fnSanityCheck_A(getdropdown);

    keycode = FindKeyCode(e);
    keychar = FindKeyChar(e);

    if ((keycode>47 && keycode<59)||(keycode>62 && keycode<127) ||(keycode==32))
    {
      var vAllowableCharacter = "yes";
    }
    else
    {
      var vAllowableCharacter = "no";
    }

    if(getdropdown.options.length != 0)
    // if dropdown is not empty
      if (getdropdown.options.selectedIndex == (vEditableOptionIndex_A))
      // if selected option the Editable option of the dropdown
      {

        var vEditString = getdropdown[vEditableOptionIndex_A].value;

        // make Editable option Null if it is being edited for the first time
        if((vAllowableCharacter == "yes")||(keychar=="backspace"))
        {
          if (vEditString == vEditableOptionText_A)
            vEditString = "";
        }
        if (keychar=="backspace")
        // To handle backspace - Subrata Chakrabarty
        {
          vEditString = vEditString.substring(0,vEditString.length-1);
          // Decrease length of string by one from right

          vSelectChange_A = 'MANUAL_CLICK';
          // Indicates that the Change in dropdown selected
          // option was due to a Manual Click

        }
        //alert("EditString2:"+vEditString);

        if (vAllowableCharacter == "yes")
        // To handle addition of a character - Subrata Chakrabarty
        {
          vEditString+=String.fromCharCode(keycode);

          var i=0;
          var vEnteredChar = String.fromCharCode(keycode);
          var vUpperCaseEnteredChar = vEnteredChar;
          var vLowerCaseEnteredChar = vEnteredChar;


          if(((keycode)>=97)&&((keycode)<=122))
          // if vEnteredChar lowercase
            vUpperCaseEnteredChar = String.fromCharCode(keycode - 32);
            // This is UpperCase


          if(((keycode)>=65)&&((keycode)<=90))
          // if vEnteredChar is UpperCase
            vLowerCaseEnteredChar = String.fromCharCode(keycode + 32);
            // This is lowercase

          if(e.which) //For NetscapeFirefoxChrome
          {
            for (i=0;i<=(getdropdown.options.length-1);i++)
            {
              if(i!=vEditableOptionIndex_A)
              {
                var vReadOnlyString = getdropdown[i].value;
                var vFirstChar = vReadOnlyString.substring(0,1);
                if((vFirstChar == vUpperCaseEnteredChar)||(vFirstChar == vLowerCaseEnteredChar))
                {
                  vSelectChange_A = 'AUTO_SYSTEM';
                  // Indicates that the Change in dropdown selected
                  // option was due to System properties of dropdown
                  break;
                }
                else
                {
                  vSelectChange_A = 'MANUAL_CLICK';
                  // Indicates that the Change in dropdown selected
                  // option was due to a Manual Click
                }
              }
            }
          }
        }

        // Set the new edited string into the Editable option
        getdropdown.options[vEditableOptionIndex_A].text = vEditString;
        getdropdown.options[vEditableOptionIndex_A].value = vEditString;

        return false;
      }
    return true;
  }

  function fnKeyUpHandler_A(getdropdown, e)
  {
    fnSanityCheck_A(getdropdown);

    if(e.which) // NetscapeFirefoxChrome
    {
      if(vSelectChange_A == 'AUTO_SYSTEM')
      {
        getdropdown[(vEditableOptionIndex_A)].selected=true;
      }
      var vEventKeyCode = FindKeyCode(e);
      // if [ <- ] or [ -> ] arrow keys are pressed, select the editable option
      if((vEventKeyCode == 37)||(vEventKeyCode == 39))
      {
        getdropdown[vEditableOptionIndex_A].selected=true;
      }

    }
  }