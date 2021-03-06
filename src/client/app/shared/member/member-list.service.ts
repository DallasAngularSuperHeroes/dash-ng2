import {provide, Injectable, Injector, ReflectiveInjector} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import * as _ from 'lodash';
import {Member} from './member';

@Injectable()
export class MemberListService {

    public members:Member[] = [];
    private request:Observable<Member[]>;
    static instance: MemberListService = null;
    static isCreating:boolean = false;
    private http:Http;

    constructor(http:Http) {
      this.http = http;
        // if (!MemberListService.isCreating) {
        //     throw new Error("You can't call new in Singleton instances! Call SingletonService.getInstance() instead.");
        // }
    }

     static getInstance(http: Http): MemberListService {
       if (MemberListService.instance == null) {
          MemberListService.isCreating = true;
          //   var injector = ReflectiveInjector.resolveAndCreate([Http]);
          // var http = injector.get(Http);
            MemberListService.instance = new MemberListService(http);
            MemberListService.isCreating = false;
        }

        return MemberListService.instance;
    }

    init():Observable<Member[]> {
        if (this.members && this.members.length) {
            return Observable.from([this.members]);
        }
        if (!this.request) {
            this.request = this.http.get('/assets/meetupMembers.json')
                .map((response:Response) => response.json())
                .map((data) => {
                    this.request = null;
                    this.members = data.results;
                    return this.members;
                });
        }
        return this.request;
    }

    get():Observable<Member[]> {
        if (this.members && this.members.length) {
            return Observable.from([this.members]);
        }
        if (!this.request) {
            this.request = this.http.get('/assets/meetupMembers.json')
                .map((response:Response) => response.json())
                .map((data) => {
                    this.request = null;
                    console.log(data.results[0]);
                    this.members = data.results;
                    return this.members;
                });
        }
        return this.request;
    }


    getMember(id:number):Member {
        // if (!this.members) {
        //     this.get().filter(member => member.id === id);
        // }
        // return Observable.from(this.members).filter(member => member.id === id);

        return _.find(this.members, member => member.id === id)
    }

}

export const MemberListServiceProvider = [
    provide(MemberListService, {
        deps: [Http],
        useFactory: (http: Http): MemberListService => {
            return MemberListService.getInstance(http);
        }
    })
];


