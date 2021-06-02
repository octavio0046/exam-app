import { HttpHeaders } from '@angular/common/http';

export function getHeaders() {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    //  'Content-Length': '10000000'
    //'Access-Control-Allow-Origin': '*'
  });
}