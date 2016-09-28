@objects

    textInput                     css [data-automation-id="text_firstname"]

= Text Input base =
    @on *
        = TextInput only has bottom border width solid =
        textInput:
            css border-width is "0px 0px 1px"
            css border-style is "solid"
            css border-color is "rgb(204, 210, 217)"
