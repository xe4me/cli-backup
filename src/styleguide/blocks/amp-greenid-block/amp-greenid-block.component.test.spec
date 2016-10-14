@objects

    introlist                     css .intro-list
    intro-message-heading         css .intro-message-heading

= intro list exists =
    @on *
        = check intro list =
         introlist:
            css font-size is "24px"

= intro message heading =
    @on desk
        = check intro-message-heading =
         intro-message-heading:
              css margin-bottom is "46px"

    @on palm
        = check intro-message-heading =
         intro-message-heading:
              css margin-bottom is "24px"
