import {Component, OnInit} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms/index';
import  {Member, MemberListService} from '../shared/index';
import {Router} from '@angular/router';
import {Http} from '@angular/http';


@Component({
  moduleId: module.id,
  selector: 'member',
  templateUrl: 'member.component.html',
  styleUrls: ['member.component.css'],
  // providers: [memberListServiceProvider],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
/**
 * This class represents the lazy loaded MemberComponent.
 */
export class MemberComponent implements OnInit {

  member:Member;
  memberListService:MemberListService;

  constructor(private router:Router, private http:Http) {
    this.memberListService = MemberListService.getInstance(this.http);
    console.log('148 ' + this.memberListService.members);
  }

  ngOnInit() {
    var ctrl = this;
    return this.memberListService.init().subscribe(members => {
      console.log(`132  ${JSON.stringify(members[0].country)}`);
      console.log(`133  `);

      return ctrl.router
        .routerState
        .queryParams
        .subscribe(params => {
          var selectedId = +params['id'];
          console.log(`230 this.memberListService.members ${JSON.stringify(this.memberListService.members[0])}`);

          if (selectedId) {
            console.log(`211 selectedId ${JSON.stringify(selectedId)}`);
            this.member = this.memberListService.getMember(selectedId);
          }
          console.log(`232 this.member ${JSON.stringify(this.member)}`);
        });
    });


  }

  gotoList() {
    let memberId = this.member ? this.member.id : null;
    this.router.navigate([`/members`, {id: memberId}]);
  }

}
;
