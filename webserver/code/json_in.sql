drop table react_config;

create table react_config (name varchar2(30) primary key,
                           JSON_STRING varchar2(4000),
                           ts timestamp with local time zone default systimestamp);

insert into react_config (name,JSON_STRING)
values('NAME','{"value":"tnrmangoes"}');

insert into react_config (name,JSON_STRING)
values( 'CURRENCY','{"value":"INR"}');


insert into react_config (name,JSON_STRING)
values('SELF_LOCATIONS','{"value":[{"city":"Bangalore","name":"Ayyappa Nagar","details":["Fresh Depot","Site 2, Beside Reliance SMART", "Ayyappa Nagar, KR Puram","Mobile: 9740654559"]},{"city":"Bangalore","name":"Alpha Garden","details":["Sruthi","KR Puram","Mobile: 9741188878"]},{"city":"Bangalore","name":"Dommasandra","details":["Pavani","Mahaveer Promenade","Mobile: 9900526886"]}]}');

insert into react_config (name,JSON_STRING)
values('DEL_LOCATIONS','{"value":[{"name":"WhiteField","delCharge":"0"},{"name":"Electronic City","delCharge":"0"},{"name":"KR Puram","delCharge":"0"},{"name":"Ayyappa Nagar","delCharge":"0"},{"name":"Alpha Garden","delCharge":"0"}]}');

insert into react_config (name,JSON_STRING)
values('DEL_DATE','{"value":"28th/29th May (Sat/Sun)"}');

insert into react_config (name,JSON_STRING)
values('ADDRESSFORM','{"value":[{"name":"Name","type":"text","placeholder":"Your Name","value":"","required":"Y","minLength":"3"},{"name":"House No/Building Name","type":"text","placeholder":"Ex:929","value":"","required":"Y","minLength":"3"},{"name":"Door No","type":"text","placeholder":"Ex: #13-234","value":"","required":"Y","minLength":"3"},{"name":"Street/Cross ","type":"text","placeholder":"Ex: 7th Cross","value":"","required":"Y","minLength":"3"},{"name":"PostalCode","type":"text","placeholder":"Ex: 520202","value":"","required":"Y","minLength":"3"},{"name":"Mobile","type":"text","placeholder":"Mobile","value":"","required":"Y","minLength":"3"},{"name":"Location","type":"list","placeholder":"Location","value":"",
"listValues":["","WhiteField","Electronic City","KR Puram","Ayyappa Nagar","Alpha Garden"],"required":"Y"}]}');


insert into react_config (name,JSON_STRING)
values('SELFFORM','{"value":[{"name":"Name","type":"text","placeholder":"Your Name","value":"","required":"Y","minLength":"3"},{"name":"Mobile","type":"text","placeholder":"Mobile No","value":"","required":"Y","minLength":"8"}]}');

insert into react_config (name,JSON_STRING)
values('PAYMENTINFO','{"value":{"companyName": "DailyCart 24X7 Pvt. LTD","uniquePayID":"Q81684283","bankDetails":["N/A"],"whatsappNo":"9740654559","bankIfscSwiftCodeType":"SWIFT","swiftIfscCodeValue" : "SWIFT","payemntOptions":[{"type":"PhonePe","value":"qrcode"},{"type":"Bank A/C","value":"bank"},{"type":"PayLater","value":"later"}]}}');


commit;



