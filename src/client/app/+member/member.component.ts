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
  directives: [REACTIVE_FORM_DIRECTIVES]
})
/**
 * This class represents the lazy loaded MemberComponent.
 */
export class MemberComponent implements OnInit {

  member:Member;
  
  //memberListService:MemberListService;

  constructor(private router:Router, private http:Http,
              private memberListService: MemberListService ) {
    // this.memberListService = MemberListService.getInstance(this.http);
    // console.log('148 ' + this.memberListService.members);
  }

  ngOnInit() {
    var ctrl = this;
    return this.memberListService.init().subscribe( members => {
      return ctrl.router
        .routerState
        .queryParams
        .subscribe(params => {
          var selectedId = +params['id'];
          if (selectedId) {
            this.member = this.memberListService.getMember(selectedId);
          }
        });
    });


  }

  gotoList() {
    let memberId = this.member ? this.member.id : null;
    this.router.navigate([`/members`, {id: memberId}]);
  }

}
;
