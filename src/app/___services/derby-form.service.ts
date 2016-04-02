import {Injectable}     from 'angular2/core';
import {ControlGroup} from 'angular2/common';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class DerbyFormService {
  constructor (private http: Http) {}

  private _heroesUrl = 'dist/heroes.json';  // URL to web api
  private _saveUrl = 'http://localhost:8000/users/francis/forms';

  getHeroes () {
    return this.http.get(this._heroesUrl)
                    .map(res => res.json()) // .map(res => <Hero[]> res.json().data)
                    .do(data => console.log("getHeroes", data)) // eyeball results in the console
                    .catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    //console.error(error);

    return Observable.throw(error || ". Server error!");
  }

  saveForm(form: ControlGroup) : Observable<string> {

    let body = JSON.stringify(form.value);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._saveUrl, body, options)
                    .map(res => res.json())
                    .do(data => console.log("SaveForm", data)) // eyeball results in the console
                    .catch(this.handleError);
  }

}
