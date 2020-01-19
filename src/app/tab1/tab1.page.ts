import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
user: any;
  D1: any;
  list: [];
  loader: any;
  D2: any;
  constructor(private http: HTTP,public storage:Storage) { }
  async ionViewWillEnter() { 
    await this.setVal();
    await this.getnewuser();
  }
  async setVal() {
    console.log("open Setval!");
      await this.storage.get('user').then((val) => {
        console.log('==', val);
          this.user = val;
      });
      await this.storage.get('D1').then((val) => {
        console.log('==', val);
          this.D1 = val;
      });
      await this.storage.get('D2').then((val) => {
        console.log('==', val);
          this.D2 = val;
      });
  }
  async getnewuser() {
    this.loader = true;
    const url = 'https://spmoveapi.herokuapp.com/getblockuser?user=' + this.user + '&D1=' + this.D1 + '&D2=' + this.D2;
    await this.http.get(url, {}, {})
      .then(data => { 
        console.log(data.data);
        const rp1 = data.data.replace(']', "");
        const rp2 = rp1.replace('[', "");
        const ary = rp2.split(',');
        console.log(rp2);
        if (ary.length == 0) {
          console.log("empgty list");
        } else {
          this.list = ary;
        }
        this.loader = false;
      })
      .catch(error => {
        this.loader = false;
        console.log(error);
       });
  }
}
