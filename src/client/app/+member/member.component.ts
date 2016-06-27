import {Component, OnInit} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms/index';
import  {Member, MemberListService} from '../shared/index';
import {Router} from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'member',
    templateUrl: 'member.component.html',
    styleUrls: ['member.component.css'],
    directives: [REACTIVE_FORM_DIRECTIVES]
})
/**
 * This class represents the lazy loaded MemberComponent.
 */
export class MemberComponent implements OnInit {

    member:Member;
    //memberListService: MemberListService;

    constructor(private router:Router
        , private memberListService: MemberListService) {
        //this.memberListService = MemberListService.getInstance(http);
    }

    ngOnInit() {
         this.router
            .routerState
            .queryParams
            .subscribe(params => {
                var selectedId = +params['id'];
                console.log(`230 this.memberListService.members ${JSON.stringify(this.memberListService.members)}`);

                if (selectedId) {
                    console.log(`211 selectedId ${JSON.stringify(selectedId)}`);
                    this.member = this.memberListService.getMember(selectedId);
                }
                console.log(`232 this.member ${JSON.stringify(this.member)}`);
            });

    }

    gotoList() {
        let memberId = this.member ? this.member.id : null;
        this.router.navigate([`/members`, {id: memberId}]);
    }

}
;
