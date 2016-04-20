@objects

    ampSwitch                      .amp-switch
        label                           label

= Text Input base =
    @on *
        = Amp Switch Container width and height are per design , 420px and 56px  =
        ampSwitch:
            css     width           is  "420px"
            css     height          is  "56px"

        = Amp switch button has the right border styles=
        ampSwitch.label:
            css     border-width    is  "2px"
            css     border-style    is  "solid"
            css     border-color    is  "rgb(0, 170, 224)"

        = Amp switch button has right width and height=
        ampSwitch.label:
            css     height      is  "52px"
            css     width       is  "206px"

        = Text inside the buttons are centered vertically and horizontally =
        ampSwitch.label:
            css     text-align      is  "center"
            css     width           is  "206px"
            css     height          is  "52px"





