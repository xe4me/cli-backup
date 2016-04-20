@objects
    bolr-intro                          css .bolr-intro
    bolr-intro-logo                     css .bolr-intro-logo
    bolr-intro-main                     css .bolr-intro-main
        bolr-intro-main__title          css .bolr-intro-main__title
        bolr-intro-main__body           css .bolr-intro-main__body
        bolr-intro-main__notes          css .bolr-intro-main__notes
        bolr-into-btn                   css [data-automation-id="btn_bolr-intro-block"]

= Bolr Intro Block base =
    @on *
        = Make sure that everything is inside the container =
        bolr-intro-logo, bolr-intro-main:
            inside bolr-intro

        = Logo banner has the right height =
        bolr-intro-logo:
            height 80px
            width 100 % of bolr-intro/width

        = All body parts are left aligned =
        bolr-intro-main.bolr-intro-main__title:
            aligned vertically left bolr-intro-main.bolr-intro-main__body
            aligned vertically left bolr-intro-main.bolr-intro-main__notes
            aligned vertically left bolr-intro-main.bolr-into-btn

        = Ordering of body parts =
        bolr-intro-main.bolr-intro-main__title:
            above bolr-intro-main.bolr-intro-main__body 60 px

        bolr-intro-main.bolr-intro-main__body:
            above bolr-intro-main.bolr-intro-main__notes 60 px

        bolr-intro-main.bolr-intro-main__notes:
            above bolr-intro-main.bolr-into-btn 60 to 63 px

    @on laptop, desk
        = Main body has left nav padding =
        bolr-intro-main:
            css margin-left is "280px"

    @on tablet
        = Main body has left nav padding =
        bolr-intro-main:
            css margin-left is "40px"
