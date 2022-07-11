drop table react_config;

create table react_config (name varchar2(30) primary key,
                           JSON_STRING varchar2(4000),
                           ts timestamp with local time zone default systimestamp);

insert into react_config (name,JSON_STRING)
values('NAME','{"value":"tnrmangoes"}');

insert into react_config (name,JSON_STRING)
values( 'CURRENCY','{"value":"SGD"}');

insert into react_config (name,JSON_STRING)
values('SELF_LOCATIONS','{"value":[{"city":"Singapore","name":"Punggol","details":["Venkat Vona","Blk - 679A","Punggol Drive","S-821679","Mobile: 81601289"]},{"city":"Singapore","name":"Tampines","details":["Venky", "Blk - 929","Tampines St 91 (Tampines West MRT)","S-520929","Mobile: 98346177"]},{"city":"Singapore","name":"Pasir Ris","details":["Mohan","Blk 574","Pasir Ris St 53","S-520574","Mobile: 90628025"]},{"city":"Singapore","name":"Melville Park","details":["Venky","Blk - 22","LOBBY 4 #02-15","Meliville Park","14 Simei Street","Mobile: 98346177"]},{"city":"Singapore","name":"Tanah Merah","details":["Desi Mart Pte Ltd","#01-67,20 The Glades","Bedok Rise","S-465411","Mobile: 98346177"]},{"city":"Singapore","name":"Simei","details":["Nirmal","#10-03, Tower 3C","Eastpoint Green","5 Simei St 3","529892","Mobile : 85062360"]},{"city":"Singapore","name":"Woodlands","details":["Srinivas Reddy","Blk 724, #03-502","Woodlands ave 6","730724","Mobile : 91003247"]},{"city":"Singapore","name":"Upper Changi","details":["Naveen"," Blk 718,03-06","Changi Green","486849","Mobile : 86482486"]}]}');

insert into react_config (name,JSON_STRING)
values('DEL_DATE','{"value":"Starting 18th June(Saturday)"}');

insert into react_config (name,JSON_STRING)
values('ADDRESSFORM','{"value":[{"name":"Name","type":"text","placeholder":"Your Name","value":"","required":"Y","minLength":"3"},{"name":"Blk","type":"text","placeholder":"Ex:929","value":"","required":"Y","minLength":"1"},{"name":"Unit","type":"text","placeholder":"Ex: #13-234","value":"","required":"Y","minLength":"3"},{"name":"Street ","type":"text","placeholder":"Ex: Tampines Street 22","value":"","required":"Y","minLength":"3"},{"name":"PostalCode","type":"text","placeholder":"Ex: 520202","value":"","required":"Y","minLength":"3"},{"name":"Mobile","type":"text","placeholder":"Mobile","value":"","required":"Y","minLength":"3"},{"name":"Location","type":"list","placeholder":"Location","value":"","listValues":["","Tampines","Sengkang","Punggol","Bedok","Simei","Other"],"required":"Y"}]}');


insert into react_config (name,JSON_STRING)
values('SELFFORM','{"value":[{"name":"Name","type":"text","placeholder":"Your Name","value":"","required":"Y","minLength":"3"},{"name":"Mobile","type":"text","placeholder":"Mobile No","value":"","required":"Y","minLength":"8"}]}');

insert into react_config (name,JSON_STRING)
values('COMMENTFORM','{"value":[{"name":"PRICE","type":"text","placeholder":"Received Price","value":"","required":"Y","minLength":"1"},{"name":"Comments","type":"textarea","placeholder":"","value":"","required":"","minLength":""}]}');

insert into react_config (name,JSON_STRING)
values('STOCKFORM','{"value":[{"name":"STOCK_LOC","type":"text","placeholder":"Enter stock location Name","value":"","required":"Y","minLength":"1"},{"name":"Comments","type":"textarea","placeholder":"","value":"","required":"","minLength":""}]}');

insert into react_config (name,JSON_STRING)
values('PAYMENTINFO','{"value":{"companyName": "GARDEN ROOTS PTE. LTD","uniquePayID":"UEN : 201713208M","bankDetails":["GardenRoots Pte Ltd","OCBC Account# : 712177963001"],"whatsappNo":"81601289","bankIfscSwiftCodeType":"SWIFT","swiftIfscCodeValue" : "SWIFT","payemntOptions":[{"type":"PayNow","value":"qrcode"},{"type":"Bank A/C","value":"bank"},{"type":"PayLater","value":"later"}]}}');


commit;



