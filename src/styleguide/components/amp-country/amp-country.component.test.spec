@objects

    checkboxBox                     css .off
    checkboxTick                    css .on

= Text Input base =
    @on *
        = Check box has 30px width and height and border color of #cccccc =
        checkboxBox:
            css width           is      "30px"
            css height          is      "30px"
            css border-color    is      "rgb(204, 204, 204)"
