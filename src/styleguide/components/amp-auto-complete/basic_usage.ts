import { Component , AfterViewInit , ChangeDetectorRef } from '@angular/core';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES } from '@angular/common';
import { ScrollService } from 'amp-ddc-ui-core/ui-core'
import{ Highlight } from '../../highlight'
import { AmpAutoCompleteComponent } from '../../../app/components/amp-autocomplete/amp-autocomplete.component';
import { ThemeService } from '../../services/theme';
@Component( {
    templateUrl : 'src/styleguide/components/amp-auto-complete/basic_usage.html' ,
    providers   : [ ScrollService ] ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [
        FORM_DIRECTIVES ,
        Highlight ,
        AmpAutoCompleteComponent ,
        CORE_DIRECTIVES
    ] ,
    selector    : 'amp-auto-complete-basic-usage'
} )

export default class AMPGoogleAddressComponentBasicUsage implements AfterViewInit {
    control : Control       = new Control();
    selectControl : Control = new Control();
    isInSummaryState        = false;
    private options         = [
        {
            'id'       : 1 ,
            'title'    : 'Professional (medical)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 2 ,
            'title'    : 'White collar professional (specialist)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 3 ,
            'title'    : 'White collar (no manual)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 4 ,
            'title'    : 'White collar (light manual)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 5 ,
            'title'    : 'Light manual (special risk)' ,
            'IPClass'  : 'BY' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 6 ,
            'title'    : 'Manual' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 7 ,
            'title'    : 'Manual special risk' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 8 ,
            'title'    : 'Heavy manual' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 9 ,
            'title'    : 'Heavy manual special risk 1' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 10 ,
            'title'    : 'Heavy manual special risk 2' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 11 ,
            'title'    : 'Heavy manual special risk 3' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 12 ,
            'title'    : 'Heavy manual special risk 4' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 13 ,
            'title'    : 'Heavy manual special risk 5' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 14 ,
            'title'    : 'Trauma only (low risk)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 15 ,
            'title'    : 'Trauma only (medium risk)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 16 ,
            'title'    : 'Trauma (high risk)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 17 ,
            'title'    : 'Abalone diver' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 18 ,
            'title'    : 'Abattoir worker (not slaughterer)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 19 ,
            'title'    : 'Accountant (CPA/CA qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 20 ,
            'title'    : 'Accountant (not CPA/CA qualified )' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 21 ,
            'title'    : 'Actuary (FIAA qualified or overseas equivalent)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1051 ,
            'title'    : 'Actuary (not FIAA qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1052 ,
            'title'    : 'Acupuncturist (not qualified)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 22 ,
            'title'    : 'Acupuncturist (qualified and registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 23 ,
            'title'    : 'Acupuncturist (qualified, not registered)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 24 ,
            'title'    : 'Administration/clerical (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 25 ,
            'title'    : 'Advertising - executive (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 27 ,
            'title'    : 'Advertising - other staff (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 26 ,
            'title'    : 'Advertising - sales representative (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 32 ,
            'title'    : 'Adviser - insurance/salesperson (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 28 ,
            'title'    : 'Agent - advertising (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1041 ,
            'title'    : 'Agent - customs and shipping (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 29 ,
            'title'    : 'Agent - customs and shipping (some light manual work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 30 ,
            'title'    : 'Agent - employment (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 33 ,
            'title'    : 'Agent - machinery' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 34 ,
            'title'    : 'Agent - mercantile/repossession/private detective' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 35 ,
            'title'    : 'Agent - real estate (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1053 ,
            'title'    : 'Agent - real estate (light manual work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 36 ,
            'title'    : 'Agent - stock/station' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1081 ,
            'title'    : 'Agronomist - analytical/lab (Degree Qualified)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1082 ,
            'title'    : 'Agronomist - field work' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1083 ,
            'title'    : 'Agronomist - office based consultant' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 39 ,
            'title'    : 'Air conditioning - installation/repairs/servicing' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 40 ,
            'title'    : 'Air conditioning - office and consulting (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 41 ,
            'title'    : 'Air conditioning - supervisor/inspector' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 43 ,
            'title'    : 'Air traffic controller' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 44 ,
            'title'    : 'Airforce (all ranks, no special hazards)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1002 ,
            'title'    : 'Airport management (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 45 ,
            'title'    : 'Aluminium fixer/framer/installer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 47 ,
            'title'    : 'Ambulance personnel - officer/paramedic/driver' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 46 ,
            'title'    : 'Ambulance personnel (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 48 ,
            'title'    : 'Amusement parlour - employee' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 50 ,
            'title'    : 'Amusement parlour - owner/manager (10 or more employees)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 49 ,
            'title'    : 'Amusement parlour - owner/manager (less than 10 employees)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 51 ,
            'title'    : 'Anaesthetist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 52 ,
            'title'    : 'Annealer and locksmith' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 54 ,
            'title'    : 'Antenna erector (commercial/industrial)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 53 ,
            'title'    : 'Antenna erector (domestic only)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 55 ,
            'title'    : 'Antique dealer' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 58 ,
            'title'    : 'Apiarist/beekeeper' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1003 ,
            'title'    : 'Apprentice (1st, 2nd, 3rd year)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 938 ,
            'title'    : 'Apprentice (4th year)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 57 ,
            'title'    : 'Archaeologist - field' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 60 ,
            'title'    : 'Archaeologist (100% office work/research)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 61 ,
            'title'    : 'Architect (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 62 ,
            'title'    : 'Architectural draftperson' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 64 ,
            'title'    : 'Armoured car driver' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 65 ,
            'title'    : 'Army (all ranks, bomb disposal)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 63 ,
            'title'    : 'Army (all ranks, no special hazards)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 66 ,
            'title'    : 'Artificial inseminator' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 67 ,
            'title'    : 'Artist commercial (full-time, not working at home)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 68 ,
            'title'    : 'Artist graphic (full-time, not working from home)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 70 ,
            'title'    : 'Artist others' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 69 ,
            'title'    : 'Artist sculptor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 71 ,
            'title'    : 'Asbestos worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 72 ,
            'title'    : 'Asphalt layer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 73 ,
            'title'    : 'Assembly worker/production line' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 74 ,
            'title'    : 'Assessor/loss adjuster' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 75 ,
            'title'    : 'Astronomer' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 77 ,
            'title'    : 'Atomic research/development - energy worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 76 ,
            'title'    : 'Atomic research/development (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 79 ,
            'title'    : 'Auctioneer - livestock (minimum 3 years experience)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 78 ,
            'title'    : 'Auctioneer - real estate' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 81 ,
            'title'    : 'Audiologist (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 82 ,
            'title'    : 'Audiometrist' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 84 ,
            'title'    : 'Auditor (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 83 ,
            'title'    : 'Auditor (not degree qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 85 ,
            'title'    : 'Author/writer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 86 ,
            'title'    : 'Auto electrician' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 87 ,
            'title'    : 'Aviation industry - flying personnel - aircrew/flight attendants' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 88 ,
            'title'    : 'Aviation industry - flying personnel - instructor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1054 ,
            'title'    : 'Aviation industry - flying personnel - pilot' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 89 ,
            'title'    : 'Aviation industry - non-flying personnel - air traffic controller' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 91 ,
            'title'    : 'Aviation industry - non-flying personnel - baggage handler' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 90 ,
            'title'    : 'Aviation industry - non-flying personnel - mechanic maintenance staff' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 92 ,
            'title'    : 'Aviation industry - non-flying personnel - other manual' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 93 ,
            'title'    : 'Aviation industry - non-flying personnel (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 94 ,
            'title'    : 'Backhoe operator' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 95 ,
            'title'    : 'Bakery - others (minimum 2 years experience)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 96 ,
            'title'    : 'Bakery - pastry cook (fully qualified)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 97 ,
            'title'    : 'Balloonist' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 99 ,
            'title'    : 'Banana farmer- owner/manager' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 939 ,
            'title'    : 'Banking - administration (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1004 ,
            'title'    : 'Banking - merchant' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 100 ,
            'title'    : 'Banking - senior management (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 101 ,
            'title'    : 'Bar staff' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 102 ,
            'title'    : 'Barber (not working at home)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 103 ,
            'title'    : 'Barber (working at home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 104 ,
            'title'    : 'Batteries - manufacturing' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 106 ,
            'title'    : 'Batteries - repairs and fitting' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 105 ,
            'title'    : 'Batteries - sales' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 107 ,
            'title'    : 'Beach inspector' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 108 ,
            'title'    : 'Beautician (not working from home)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 109 ,
            'title'    : 'Beautician (working at home )' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 110 ,
            'title'    : 'Bicycle - dealer/shopowner' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 111 ,
            'title'    : 'Bicycle - repairs' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 114 ,
            'title'    : 'Billiard saloon - employee' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 112 ,
            'title'    : 'Billiard saloon - proprietor (10 or more employees)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 113 ,
            'title'    : 'Billiard saloon - proprietor (less than 10 employees)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 117 ,
            'title'    : 'Biologist (100% office/research)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 115 ,
            'title'    : 'Biologist (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 118 ,
            'title'    : 'Blacksmith/farrier' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 119 ,
            'title'    : 'Blaster/explosives handling' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 121 ,
            'title'    : 'Blind/awning/screen - installer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 120 ,
            'title'    : 'Blind/awning/screen - manufacturer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 122 ,
            'title'    : 'Boarding house - proprietor/owner' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 123 ,
            'title'    : 'Boat builder (tradesperson qualified)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 124 ,
            'title'    : 'Boat/watercraft operator' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 125 ,
            'title'    : 'Bobcat owner/operator' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 126 ,
            'title'    : 'Boilermaker' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 127 ,
            'title'    : 'Boilermaker - inspector (no manual work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 128 ,
            'title'    : 'Bomb disposal' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 129 ,
            'title'    : 'Bookbinder' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 130 ,
            'title'    : 'Bookbinder, compositor' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 131 ,
            'title'    : 'Bookkeeper' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 132 ,
            'title'    : 'Bookmaker/betting' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 133 ,
            'title'    : 'Botanist (100% office/research)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1055 ,
            'title'    : 'Botanist (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 134 ,
            'title'    : 'Bottle dealer' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 135 ,
            'title'    : 'Bottle shop attendant' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 136 ,
            'title'    : 'Bouncers/crowd control' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 137 ,
            'title'    : 'Bread vendor' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 138 ,
            'title'    : 'Brewery/distillery - admin/clerical/management (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 139 ,
            'title'    : 'Brewery/distillery - chemist (degree qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 140 ,
            'title'    : 'Brewery/distillery - supervisor' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 141 ,
            'title'    : 'Brewery/distillery - worker' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 142 ,
            'title'    : 'Bricklayer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 143 ,
            'title'    : 'Brickworks employee (non-skilled)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 144 ,
            'title'    : 'Bridgebuilder' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 145 ,
            'title'    : 'Broker - commodities (fully qualified)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 146 ,
            'title'    : 'Broker - general insurance' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 147 ,
            'title'    : 'Broker - land' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 148 ,
            'title'    : 'Broker - life insurance' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 149 ,
            'title'    : 'Broker - stocks' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 152 ,
            'title'    : 'Builder (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 153 ,
            'title'    : 'Builder (without trade qualification)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 151 ,
            'title'    : 'Builder administration (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 154 ,
            'title'    : 'Builders labourer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 157 ,
            'title'    : 'Builders supply merchant' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 155 ,
            'title'    : 'Building and construction - joiner' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 156 ,
            'title'    : 'Building and construction - mason' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 158 ,
            'title'    : 'Building inspector' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 159 ,
            'title'    : 'Business executive (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 160 ,
            'title'    : 'Butcher (shop only)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 161 ,
            'title'    : 'Butcher (slaughterer)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 162 ,
            'title'    : 'Butler' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 163 ,
            'title'    : 'Buyer (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1056 ,
            'title'    : 'Cabinet maker (1st, 2nd, 3rd year apprentice)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 166 ,
            'title'    : 'Cabinet maker (4th year apprentice)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1057 ,
            'title'    : 'Cabinet maker (unqualified/labourer)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 165 ,
            'title'    : 'Cabinet maker (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 169 ,
            'title'    : 'Cable maker/wire maker' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 168 ,
            'title'    : 'Cafe proprietor' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 170 ,
            'title'    : 'Cane farmer - owner/manager' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 171 ,
            'title'    : 'Car salesperson' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 172 ,
            'title'    : 'Caravan park - employee' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 173 ,
            'title'    : 'Caravan park - proprietor/owner' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 174 ,
            'title'    : 'Cardiologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 175 ,
            'title'    : 'Caretaker' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1058 ,
            'title'    : 'Carpenter (1st, 2nd, 3rd year apprentice)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 177 ,
            'title'    : 'Carpenter (4th year apprentice)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1005 ,
            'title'    : 'Carpenter (unqualified/labourer)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 176 ,
            'title'    : 'Carpenter (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 178 ,
            'title'    : 'Carpet - cleaner (full-time)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 179 ,
            'title'    : 'Carpet - layer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 180 ,
            'title'    : 'Cartage contractor/carrier - local/metropolitan' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 181 ,
            'title'    : 'Cartage contractor/carrier - long distance' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 183 ,
            'title'    : 'Cartographer (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 182 ,
            'title'    : 'Cartographer (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 184 ,
            'title'    : 'Cartoonist' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 185 ,
            'title'    : 'Cashier - financial institution' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 186 ,
            'title'    : 'Cashier - service station (no driveway work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 187 ,
            'title'    : 'Cashier - shop' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 188 ,
            'title'    : 'Cashier/console operator' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 189 ,
            'title'    : 'Casino - croupier (minimum 2 years experience)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 190 ,
            'title'    : 'Casino - manager and clerk' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 192 ,
            'title'    : 'Casino - poker/gaming machine staff' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 195 ,
            'title'    : 'Catering (cooking)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 194 ,
            'title'    : 'Catering (no cooking)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1077 ,
            'title'    : 'Ceiling fixer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1084 ,
            'title'    : 'Cement renderer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 196 ,
            'title'    : 'Cemetery/crematorium worker' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 197 ,
            'title'    : 'Chainman (surveying)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 198 ,
            'title'    : 'Chandler' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 199 ,
            'title'    : 'Charter services (regular flights)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 200 ,
            'title'    : 'Chauffeur' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 201 ,
            'title'    : 'Chef (qualified)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 202 ,
            'title'    : 'Chef (unqualified, minimum 2 years experience)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 203 ,
            'title'    : 'Chemist - analytical or lab (degree qualified)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 205 ,
            'title'    : 'Chemist - industrial (non hazardous materials)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 207 ,
            'title'    : 'Chemist - pharmacist (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 208 ,
            'title'    : 'Chemist - research (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 940 ,
            'title'    : 'Child care/day care - (not registered)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 210 ,
            'title'    : 'Child care/day care - (with qualification, registered, not working from home' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1006 ,
            'title'    : 'Child care/day care - (with qualification, registered, working from home' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 209 ,
            'title'    : 'Child care/day care - others - (not working from home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 211 ,
            'title'    : 'Chiropodist/podiatrist (registered)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 213 ,
            'title'    : 'Chiropractor (registered)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 216 ,
            'title'    : 'Circus animal trainer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 215 ,
            'title'    : 'Circus performer/worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 217 ,
            'title'    : 'Cleaner - airport (full-time)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 218 ,
            'title'    : 'Cleaner - brick (full-time)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 219 ,
            'title'    : 'Cleaner - carpet (full-time)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 220 ,
            'title'    : 'Cleaner - factory/office/school (full-time)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 221 ,
            'title'    : 'Cleaner - household (full-time)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 222 ,
            'title'    : 'Cleaner - street (full-time)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 223 ,
            'title'    : 'Cleaner - window - (full-time, does not work above 10 metres)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 224 ,
            'title'    : 'Cleaner - window - (full-time, work above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 225 ,
            'title'    : 'Clergy' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 226 ,
            'title'    : 'Clerical worker/clerk' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 227 ,
            'title'    : 'Club entertainment' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 228 ,
            'title'    : 'Club night/disco' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 229 ,
            'title'    : 'Club private/exclusive - management/admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 231 ,
            'title'    : 'Commercial artist (full-time, not working from home)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 232 ,
            'title'    : 'Commercial traveller' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 233 ,
            'title'    : 'Composer - music/recording (full-time, not working from home)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 234 ,
            'title'    : 'Compositor (keyboard work only)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 235 ,
            'title'    : 'Compositor (other)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1085 ,
            'title'    : 'Computer industry consultant (other)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 236 ,
            'title'    : 'Computer industry consultant (professional, degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1042 ,
            'title'    : 'Computer industry engineer (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 237 ,
            'title'    : 'Computer industry keyboard operator' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 238 ,
            'title'    : 'Computer industry maintenance engineer' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 239 ,
            'title'    : 'Computer industry operator (no keyboard work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 240 ,
            'title'    : 'Computer industry programmer/systems analyst' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 241 ,
            'title'    : 'Computer industry sales representative' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 242 ,
            'title'    : 'Computer industry technician' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 243 ,
            'title'    : 'Concierge/bell captain' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 244 ,
            'title'    : 'Concretor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 245 ,
            'title'    : 'Cook (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 246 ,
            'title'    : 'Coroner (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 249 ,
            'title'    : 'Crane labourer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 248 ,
            'title'    : 'Crane person/driver - other' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 247 ,
            'title'    : 'Crane person/driver - tower crane' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 254 ,
            'title'    : 'Curator of art gallery, library, museum' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1059 ,
            'title'    : 'Customs inspector (airport / mail centre)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 255 ,
            'title'    : 'Customs inspector (docked ships only)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1060 ,
            'title'    : 'Customs officer (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 257 ,
            'title'    : 'Dairy delivery person' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 258 ,
            'title'    : 'Dairy employee' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 256 ,
            'title'    : 'Dairy proprietor' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1043 ,
            'title'    : 'Debt collector (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 259 ,
            'title'    : 'Debt collector no repossessing' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 260 ,
            'title'    : 'Debt collector repossessing' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 261 ,
            'title'    : 'Decorator/designer - design only (no manual work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 262 ,
            'title'    : 'Decorator/designer - interior/exterior (manual work, does not work above 10 metres)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 263 ,
            'title'    : 'Decorator/designer - interior/exterior (manual work, works above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1008 ,
            'title'    : 'Demolisher (building) - foreperson' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1009 ,
            'title'    : 'Demolisher (building) - other' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 264 ,
            'title'    : 'Dental nurse' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 265 ,
            'title'    : 'Dental prosthesist' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 266 ,
            'title'    : 'Dental surgeon (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 267 ,
            'title'    : 'Dental technician' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 268 ,
            'title'    : 'Dentist (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 269 ,
            'title'    : 'Dermatologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 270 ,
            'title'    : 'Despatch clerk' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 271 ,
            'title'    : 'Diamond cutter/polisher/setter' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 272 ,
            'title'    : 'Diemaker/caster' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 273 ,
            'title'    : 'Dietician (qualified and registered)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1061 ,
            'title'    : 'Dietician (unqualified)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1010 ,
            'title'    : 'Director (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 274 ,
            'title'    : 'Disc jockey' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 275 ,
            'title'    : 'Ditcher/drainer (trade qualified)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 276 ,
            'title'    : 'Diver (professional)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 277 ,
            'title'    : 'Docker/waterside worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 278 ,
            'title'    : 'Doctor (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 279 ,
            'title'    : 'Dogman' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 280 ,
            'title'    : 'Dogs - breeder' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 281 ,
            'title'    : 'Dogs - grooming (not mobile, 3 years experience)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 282 ,
            'title'    : 'Dogs - kennel operator' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 283 ,
            'title'    : 'Dogs - trainer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 284 ,
            'title'    : 'Domestic help - butler/maid/gardener (full-time)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 285 ,
            'title'    : 'Draftsperson' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 286 ,
            'title'    : 'Drainage contractor (trade qualified)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 287 ,
            'title'    : 'Dredge (harbour or river)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 288 ,
            'title'    : 'Dressmaker (full-time, not working from home)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 289 ,
            'title'    : 'Dressmaker (working from home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 290 ,
            'title'    : 'Driver - ambulance' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 291 ,
            'title'    : 'Driver - bulldozer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 292 ,
            'title'    : 'Driver - bus/coach - local' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 293 ,
            'title'    : 'Driver - bus/coach - long distance' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 294 ,
            'title'    : 'Driver - chauffeur (not hire car)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 295 ,
            'title'    : 'Driver - courier (bicycle)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 297 ,
            'title'    : 'Driver - courier (cars, small vans)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 296 ,
            'title'    : 'Driver - courier (motorcycle)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 298 ,
            'title'    : 'Driver - crane (other than dock worker and tower cranes)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 299 ,
            'title'    : 'Driver - dairy delivery person' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 300 ,
            'title'    : 'Driver - earthmoving and construction equipment' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 301 ,
            'title'    : 'Driver - explosives' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 302 ,
            'title'    : 'Driver - fork lift' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 303 ,
            'title'    : 'Driver - garbage collector' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 304 ,
            'title'    : 'Driver - instructor (car)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1062 ,
            'title'    : 'Driver - instructor (truck)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 305 ,
            'title'    : 'Driver - log hauler' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 306 ,
            'title'    : 'Driver - mail van' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 307 ,
            'title'    : 'Driver - taxi' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 308 ,
            'title'    : 'Driver - tow truck' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 310 ,
            'title'    : 'Driver - train (interstate)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 309 ,
            'title'    : 'Driver - train (metropolitan)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 312 ,
            'title'    : 'Driver - tram' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 313 ,
            'title'    : 'Driver - trucks (local/metropolitan)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 314 ,
            'title'    : 'Driver - trucks (long distance)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 315 ,
            'title'    : 'Drover/musterer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 317 ,
            'title'    : 'Dry cleaning industry - employee' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 316 ,
            'title'    : 'Dry cleaning industry - owner/manager' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 319 ,
            'title'    : 'Earthenware pipe manufacturer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 318 ,
            'title'    : 'Earthmoving worker' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 320 ,
            'title'    : 'Economist (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 321 ,
            'title'    : 'Editor - newspaper industry' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 322 ,
            'title'    : 'Editor - painting and publishing' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 323 ,
            'title'    : 'Electrical fitter' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 324 ,
            'title'    : 'Electrical lines installer or repairer/power lines (does not work above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1063 ,
            'title'    : 'Electrical lines installer or repairer/power lines (works above 10 metres)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 325 ,
            'title'    : 'Electrician - domestic or light commercial (with trade qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 326 ,
            'title'    : 'Electrician - industrial high voltage (with trade qualification)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 327 ,
            'title'    : 'Electroplater/electrotyper/enameller' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 328 ,
            'title'    : 'Elevator mechanic/installer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 330 ,
            'title'    : 'Employment agency worker (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 331 ,
            'title'    : 'Endocrinologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1044 ,
            'title'    : 'Engineer - aircraft (degree qualified, no manual work) (flying endorsement will apply)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 333 ,
            'title'    : 'Engineer - aircraft (manual work) (flying endorsement will apply)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 340 ,
            'title'    : 'Engineer - manual work (not involved with bridges or heights, underground work or explosives)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 344 ,
            'title'    : 'Engineer - maritime (degree qualified, not sea going, no manual work)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 347 ,
            'title'    : 'Engineer - supervising (not involved with bridges or heights, underground work or explosives)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 332 ,
            'title'    : 'Engineer (degree qualified, 100% office work)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 348 ,
            'title'    : 'Engraver/etcher' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 349 ,
            'title'    : 'Entertainer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 350 ,
            'title'    : 'Executive (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 351 ,
            'title'    : 'Explosives worker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 352 ,
            'title'    : 'Exporter/importer (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1011 ,
            'title'    : 'Exporter/importer (some light manual work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 353 ,
            'title'    : 'Factory hand/worker' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 354 ,
            'title'    : 'Farm hand/labourer' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 355 ,
            'title'    : 'Farm manager (involved in farm management)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 356 ,
            'title'    : 'Farmer owner/manager' ,
            'IPClass'  : 'F' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 357 ,
            'title'    : 'Farrier' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 358 ,
            'title'    : 'Fashion designer' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 360 ,
            'title'    : 'Fencing contractor - employee' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 359 ,
            'title'    : 'Fencing contractor - proprietor' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 361 ,
            'title'    : 'Fibreglass worker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 362 ,
            'title'    : 'Financial planner/consultant' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 363 ,
            'title'    : 'Firefighter - airport' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 364 ,
            'title'    : 'Firefighter - city' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 365 ,
            'title'    : 'Firefighter - explosives' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1086 ,
            'title'    : 'Firefighter - rural' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1012 ,
            'title'    : 'Fishing - deep sea or seasonal' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 369 ,
            'title'    : 'Fishing - other workers (Aust waters only)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 370 ,
            'title'    : 'Fishing - owner/skipper (Aust waters only)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 368 ,
            'title'    : 'Fitter and turner' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 371 ,
            'title'    : 'Flats/units proprietor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 372 ,
            'title'    : 'Floor coverer/layer (linoleum/plastic, not carpet)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 373 ,
            'title'    : 'Floor surfacer/tiler/sander' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 374 ,
            'title'    : 'Foreperson - building and construction (no demolition/wrecking)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 376 ,
            'title'    : 'Forester - mill worker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 375 ,
            'title'    : 'Forester - tree feller' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 378 ,
            'title'    : 'Foundry - other' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 1013 ,
            'title'    : 'Foundry - patternmaker' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 379 ,
            'title'    : 'Freezing works - employee' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 380 ,
            'title'    : 'French polisher' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 381 ,
            'title'    : 'Fruit picker' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 384 ,
            'title'    : 'Funeral parlour - driver/embalmer/pall bearer/other' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 383 ,
            'title'    : 'Funeral parlour - funeral director/undertaker (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1014 ,
            'title'    : 'Furniture removalist (local)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1015 ,
            'title'    : 'Furniture removalist (long distance)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 386 ,
            'title'    : 'Furniture restorer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 387 ,
            'title'    : 'Garbage collector' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 389 ,
            'title'    : 'Gardener - domestic landscape (less than 2 years experience)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 388 ,
            'title'    : 'Gardener - domestic landscape (minimum 2 years experience)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 390 ,
            'title'    : 'Gas industry - atter (fully qualified)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 391 ,
            'title'    : 'Gas industry - fitter' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 392 ,
            'title'    : 'Gas industry - inspector' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 393 ,
            'title'    : 'Gas industry - mechanic' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 394 ,
            'title'    : 'Gas industry - meter reader' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 395 ,
            'title'    : 'Gas industry - pipe laying' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 396 ,
            'title'    : 'Gastroenterologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 397 ,
            'title'    : 'General practitioner (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 398 ,
            'title'    : 'Geneticist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 399 ,
            'title'    : 'Geologist (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 400 ,
            'title'    : 'Geologist (field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 401 ,
            'title'    : 'Glass cutter/blower' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 402 ,
            'title'    : 'Glazier' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 403 ,
            'title'    : 'Goldsmith/silversmith' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 404 ,
            'title'    : 'Golf professional (full-time, minimum 3 years experience, not touring or professional player)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 405 ,
            'title'    : 'Golf professional (touring)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 406 ,
            'title'    : 'Government employee (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1080 ,
            'title'    : 'Graduate dental professional MP (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1079 ,
            'title'    : 'Graduate medical doctor AA (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1078 ,
            'title'    : 'Graduate medical doctor MP (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 407 ,
            'title'    : 'Graphic artist/designer (not working from home)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 408 ,
            'title'    : 'Grave digger' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 410 ,
            'title'    : 'Greenkeeper/grounds person - other' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 409 ,
            'title'    : 'Greenkeeper/grounds person - supervisor (detail training/occupational history)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 411 ,
            'title'    : 'Guest house proprietor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1087 ,
            'title'    : 'Gym instructor (other)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1070 ,
            'title'    : 'Gym instructor (qualified, minimum 3 years experience, working in practice/sports club only)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 412 ,
            'title'    : 'Gynaecologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 413 ,
            'title'    : 'Haberdasher' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 414 ,
            'title'    : 'Haematologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 415 ,
            'title'    : 'Hairdresser/barber (not working at home)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 416 ,
            'title'    : 'Hairdresser/barber (working at home)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 417 ,
            'title'    : 'Handyperson (minimum 2 years experience)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 1088 ,
            'title'    : 'Harbour pilot' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 418 ,
            'title'    : 'Hardware/building supplies - management/admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 419 ,
            'title'    : 'Hardware/building supplies - storeperson (heavy lifting)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 420 ,
            'title'    : 'Hardware/building supplies - storeperson (light lifting)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 421 ,
            'title'    : 'Harvester (crops/fruit, not seasonal)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 422 ,
            'title'    : 'Helicopter pilot - commercial' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 424 ,
            'title'    : 'Herbalist (with industry qualification)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 423 ,
            'title'    : 'Herbalist (without industry qualification)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 425 ,
            'title'    : 'Home duties (full-time care and maintenance of home and dependents)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 426 ,
            'title'    : 'Horse riding instructor' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 427 ,
            'title'    : 'Horse stablehand/strapper' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 428 ,
            'title'    : 'Horse trainer/breeder (no horse breaking)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 430 ,
            'title'    : 'Horticulturist (degree qualified, less than 25% manual work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 431 ,
            'title'    : 'Hospital - aides' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 432 ,
            'title'    : 'Hospital - domestic' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 433 ,
            'title'    : 'Hospital - orderly/wardperson' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 434 ,
            'title'    : 'Hospital - porter' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 435 ,
            'title'    : 'Hospitality industry - admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 436 ,
            'title'    : 'Hotel industry (including motels) - manager/proprietor (10 or more full-time employees)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 437 ,
            'title'    : 'Hotel industry (including motels) manager/proprietor (under 10 full-time employees)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 438 ,
            'title'    : 'Hotel industry (including motels) staff - bar' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 439 ,
            'title'    : 'Hotel industry (including motels) staff - bouncer' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 440 ,
            'title'    : 'Hotel industry (including motels) staff - chef' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 943 ,
            'title'    : 'Hotel industry (including motels) staff - cleaner' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 441 ,
            'title'    : 'Hotel industry (including motels) staff - driveway attendant' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1016 ,
            'title'    : 'Hotel industry (including motels) staff - kitchen hand (less than 2 years experience)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 944 ,
            'title'    : 'Hotel industry (including motels) staff - kitchen hand (minimum 2 years experience)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 442 ,
            'title'    : 'Hotel industry (including motels) staff - office/admin (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 945 ,
            'title'    : 'Hotel industry (including motels) staff - waiter' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 445 ,
            'title'    : 'Housekeeper' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 946 ,
            'title'    : 'Houseperson' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 446 ,
            'title'    : 'Human resources/personnel' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 447 ,
            'title'    : 'Hypnotherapist (degree qualified, not working from home)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1067 ,
            'title'    : 'Hypnotherapist (not degree qualified)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 448 ,
            'title'    : 'Importer/exporter (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 1017 ,
            'title'    : 'Importer/exporter (some light manual work)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 449 ,
            'title'    : 'Inspector - electrical industry' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 1018 ,
            'title'    : 'Inspector - insurance' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 450 ,
            'title'    : 'Inspector - meat industry' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 451 ,
            'title'    : 'Instrument maker' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 452 ,
            'title'    : 'Insulation installer' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 453 ,
            'title'    : 'Interpreter' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 454 ,
            'title'    : 'Investigator/inquiry agent' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 455 ,
            'title'    : 'Investment adviser (licenced)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 457 ,
            'title'    : 'Investor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 458 ,
            'title'    : 'Jackaroo/jillaroo' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 459 ,
            'title'    : 'Janitor' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 461 ,
            'title'    : 'Jeweller - cutter/polisher/setter/engraver' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 460 ,
            'title'    : 'Jeweller - manufacture/repair' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 462 ,
            'title'    : 'Jeweller - sales only' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 463 ,
            'title'    : 'Jockey' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 465 ,
            'title'    : 'Journalist (employee, no overseas assignments)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 466 ,
            'title'    : 'Journalist (employee, overseas assignments)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 464 ,
            'title'    : 'Journalist (freelance, no overseas assignments)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1068 ,
            'title'    : 'Journalist (freelance, overseas assignments)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 1069 ,
            'title'    : 'Journalist Salaried (overseas assignments)' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 467 ,
            'title'    : 'Juice vendor (more than 12 months established)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 468 ,
            'title'    : 'Key punch operator' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 469 ,
            'title'    : 'Knitter (mill worker)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 470 ,
            'title'    : 'Laboratory technician (not handling radioactive or toxic substances or chemicals)' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 472 ,
            'title'    : 'Labourer (not under specified industry)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'E'
        } ,
        {
            'id'       : 473 ,
            'title'    : 'Landscape gardener (no horticultural degree/diploma, minimum 2 years experience)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 475 ,
            'title'    : 'Landscape gardener (other)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 474 ,
            'title'    : 'Landscape gardener qualified (with horticultural degree/diploma, less than 25% manual work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 476 ,
            'title'    : 'Lathe operator' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 477 ,
            'title'    : 'Laundry staff' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 955 ,
            'title'    : 'Lawnmowing contractor (less than 3 years experience)' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 954 ,
            'title'    : 'Lawnmowing contractor (minimum 3 years experience)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 478 ,
            'title'    : 'Legal industry - administration/clerical (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 479 ,
            'title'    : 'Legal industry - article clerk' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 899 ,
            'title'    : 'Typist' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 900 ,
            'title'    : 'Tyre fitter' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 1075 ,
            'title'    : 'Unemployed' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 904 ,
            'title'    : 'University - lecturer/professor/dean (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 901 ,
            'title'    : 'University - office administration staff (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 903 ,
            'title'    : 'University - tutor (degree qualified)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 905 ,
            'title'    : 'Upholsterer' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 906 ,
            'title'    : 'Urologist (registered)' ,
            'IPClass'  : 'AA' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 907 ,
            'title'    : 'Valuer (registered)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 908 ,
            'title'    : 'Vending machine serviceman' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 909 ,
            'title'    : 'Veterinarian - domestic pets (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 910 ,
            'title'    : 'Veterinarian - other' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 911 ,
            'title'    : 'Veterinary surgeon - city practice (registered)' ,
            'IPClass'  : 'MP' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 912 ,
            'title'    : 'Veterinary surgeon - country practice' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 913 ,
            'title'    : 'Vigneron/winemaker (minimal manual work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 914 ,
            'title'    : 'Waiter/waitress - bar duties incuded' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 915 ,
            'title'    : 'Waiter/waitress - table service only' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 916 ,
            'title'    : 'Wardrobe - film/theatre' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 917 ,
            'title'    : 'Wardrobe - radio/television' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'D'
        } ,
        {
            'id'       : 918 ,
            'title'    : 'Washing machine mechanic' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 919 ,
            'title'    : 'Watchmaker' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 921 ,
            'title'    : 'Welder (with trade qualification)' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 920 ,
            'title'    : 'Welder (without trade qualification)' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 922 ,
            'title'    : 'White water rafting - guide/instructor' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 923 ,
            'title'    : 'Window dresser' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 1040 ,
            'title'    : 'Window framers/fitters' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 924 ,
            'title'    : 'Windscreen fitter' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 925 ,
            'title'    : 'Wine/spirit merchant' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 926 ,
            'title'    : 'Wool buyer/classer' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 927 ,
            'title'    : 'Word processing operator' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 928 ,
            'title'    : 'Wrecker (building) - supervisor/manager/overseer' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 929 ,
            'title'    : 'Wrecker/demolisher - foreperson' ,
            'IPClass'  : 'CY' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 930 ,
            'title'    : 'Wrecker/demolisher - other' ,
            'IPClass'  : 'NA' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 931 ,
            'title'    : 'X-ray technician' ,
            'IPClass'  : 'B' ,
            'TPDClass' : 'B'
        } ,
        {
            'id'       : 932 ,
            'title'    : 'Yard worker' ,
            'IPClass'  : 'DY' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 933 ,
            'title'    : 'Youth worker/welfare officer (100% office work)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        } ,
        {
            'id'       : 934 ,
            'title'    : 'Youth worker/welfare officer (other)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 935 ,
            'title'    : 'Zoo keeper/wildlife attendant' ,
            'IPClass'  : 'D' ,
            'TPDClass' : 'NA'
        } ,
        {
            'id'       : 953 ,
            'title'    : 'Zoologist (degree qualified, field work)' ,
            'IPClass'  : 'C' ,
            'TPDClass' : 'C'
        } ,
        {
            'id'       : 936 ,
            'title'    : 'Zoologist (degree qualified, lab only)' ,
            'IPClass'  : 'A' ,
            'TPDClass' : 'A'
        }
    ];
    private selectedOption;

    private onChange ( option ) {
        this.selectedOption = option;
    }

    constructor ( private  themeService : ThemeService , private _cd : ChangeDetectorRef ) {
    }

    ngAfterViewInit () {

        // To prevent the ExpressionChangedAfterHasBeenCheckedException, new Change Detection rule
        this._cd.detectChanges();
    }

    private onAcknowledgeSelect ( value ) {
        console.log( 'onAcknowledgeSelect value' , value );
    }
}
