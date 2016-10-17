@objects

    noteText                     css .note
    strongText                   css .strong-text

= noteText =
    @on *
        = noteText =
        noteText:
            contains strongText 

