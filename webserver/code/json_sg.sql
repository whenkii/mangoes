drop table react_config;

create table react_config (name varchar2(30) primary key,
                           JSON_STRING varchar2(4000),
                           ts timestamp with local time zone default systimestamp);

insert into react_config (name,JSON_STRING)
values('NAME','{"value":"tnrmangoes"}');

insert into react_config (name,JSON_STRING)
values( 'CURRENCY','{"value":"SGD"}');


insert into react_config (name,JSON_STRING)
values('SELF_LOCATIONS','{"value":[{"city":"Singapore","name":"Punggol","details":["Venkat Vona","Blk - 679A","Punggol Drive","S-821679","Mobile: 81601289"]},{"city":"Singapore","name":"Tampines","details":["Venky", "Blk - 929","Tampines St 91 (Tampines East MRT)","S-520929","Mobile: 98346177"]},{"city":"Singapore","name":"Upper Changi","details":["Desi Mart Pte Ltd","#01-67,20 The Glades","Bedok Rise","S-465411","Mobile: 98346177"]}]}');

insert into react_config (name,JSON_STRING)
values('DEL_LOCATIONS','{"value":[{"name":"Tampines","delCharge":"5"},{"name":"Sengkang","delCharge":"5"},{"name":"Punggol","delCharge":"5"},{"name":"Pasir Ris","delCharge":"5"},{"name":"Simei","delCharge":"5"},{"name":"Bedok","delCharge":"6"},{"name":"Upper East Coast","delCharge":"5"},{"name":"Other","delCharge":"7"}]}');

insert into react_config (name,JSON_STRING)
values('DEL_DATE','{"value":"28th/29th May (Sat/Sun)"}');

insert into react_config (name,JSON_STRING)
values('ADDRESSFORM','{"value":[{"name":"Name","type":"text","placeholder":"Your Name","value":"","required":"Y","minLength":"3"},{"name":"Blk","type":"text","placeholder":"Ex:929","value":"","required":"Y","minLength":"3"},{"name":"Unit","type":"text","placeholder":"Ex: #13-234","value":"","required":"Y","minLength":"3"},{"name":"Street ","type":"text","placeholder":"Ex: Tampines Street 22","value":"","required":"Y","minLength":"3"},{"name":"PostalCode","type":"text","placeholder":"Ex: 520202","value":"","required":"Y","minLength":"3"},{"name":"Mobile","type":"text","placeholder":"Mobile","value":"","required":"Y","minLength":"3"},{"name":"Location","type":"list","placeholder":"Location","value":"","listValues":["","Tampines","Sengkang","Punggol","Bedok","Simei","Other"],"required":"Y"}]}');


insert into react_config (name,JSON_STRING)
values('SELFFORM','{"value":[{"name":"Name","type":"text","placeholder":"Your Name","value":"","required":"Y","minLength":"3"},{"name":"Mobile","type":"text","placeholder":"Mobile No","value":"","required":"Y","minLength":"8"}]}');

insert into react_config (name,JSON_STRING)
values('PAYMENTINFO','{"value":{"companyName": "GARDEN ROOTS PTE. LTD","uniquePayID":"UEN : 201713208M","bankDetails":["GardenRoots Pte Ltd","OCBC Account# : 712177963001"],"whatsappNo":"81601289","bankIfscSwiftCodeType":"SWIFT","swiftIfscCodeValue" : "SWIFT","payemntOptions":[{"type":"PayNow","value":"qrcode"},{"type":"Bank A/C","value":"bank"},{"type":"PayLater","value":"later"}]}}');


commit;



