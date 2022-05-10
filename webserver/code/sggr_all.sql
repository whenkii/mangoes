drop table stock;

drop table orders;

drop table products;

create table products (id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY primary key,
                       name varchar2(50) unique,
                       category varchar2(50),
                       price number,
                       units varchar2(100),
                       offerprice number,
                       instock varchar2(10),
                       ts TIMESTAMP WITH LOCAL TIME ZONE default systimestamp
                      );




insert into products (name,category,units,price,offerprice,instock)
values ('Banginapalli','Mangoes','Approx 5kg/10+ pcs','37','33','Y');

insert into products (name,category,units,price,offerprice,instock)
values ('Alphonso','Mangoes','Approx 3.3kg/13+ pcs','35','30','Y');

insert into products (name,category,units,price,offerprice,instock)
values ('Chandura','Mangoes','Approx 3.5kg/13+ pcs','34','29','Y');

insert into products (name,category,units,price,offerprice,instock)
values ('Mixed','Mangoes','Approx 4.5kg/12+ pcs','35','31','Y');


/*
insert into products (name,category,units,price,offerprice,instock)
values ('AlphansoJumbo','Mangoes','3-3.2kg','39','35','Y'); 

insert into products (name,category,units,price,offerprice,instock)
values ('Kesar','Mangoes','2.6-2.8kg','34','31','Y');

*/

commit;

drop sequence orders_seq;
create sequence orders_seq start with 1000 increment by 10;


drop table users;

  CREATE TABLE users
   (FIRSTNAME VARCHAR2(50) NOT NULL ENABLE, 
	LASTNAME VARCHAR2(50) NOT NULL ENABLE, 
	EMAIL VARCHAR2(50), 
    MOBILE VARCHAR2(15), 
	PASSWORD VARCHAR2(30) NOT NULL ENABLE, 
	CREATED TIMESTAMP WITH LOCAL TIME ZONE default systimestamp ,
	LAST_MODIFIED TIMESTAMP WITH LOCAL TIME ZONE default systimestamp,
	TYPE VARCHAR2(10), 
	 PRIMARY KEY (EMAIL));

drop table orders;

create table orders (id number NOT NULL,
                     email varchar2(50),
                     prodid number,
                     qty number,
                     price number,
                     total_price number,
                     status varchar2(20) default 'NEW',
                     ts timestamp default systimestamp at time zone 'Asia/Singapore',
                     constraint fk_prodid foreign key(prodid)references products(id),
                     constraint fk_email foreign key(email)references users(email));

--drop table deliveries;

create table deliveries (order_id number,
                         del_mode varchar2(20),
                         address varchar2(1000),
                         details varchar2(1000),
                         location varchar2(100), 
                         deliverycharges number,
                         paymode varchar2(10));

create table stock (Name varchar2(100),stock number,ordered number,  constraint fk_name foreign key(name)references products(name),ts timestamp default systimestamp at time zone 'Asia/Singapore',updated_ts timestamp default systimestamp at time zone 'Asia/Singapore');

--insert into  stock (name,stock,ordered)
--select name,100,100
--from products 
--where instock='Y';

insert into  stock (name,stock,ordered)
values('Banginapalli',170,0);

insert into  stock (name,stock,ordered)
values('Alphonso',63,0);

insert into  stock (name,stock,ordered)
values('Chandura',29,0);

insert into  stock (name,stock,ordered)
values('Mixed',10,0);


--select * from stock;

commit;


REM INSERTING into 
SET DEFINE OFF;
Insert into  users(FIRSTNAME,LASTNAME,EMAIL,PASSWORD,TYPE,CREATED,LAST_MODIFIED) values ('Venkatesh','Thammichetti','whenkii@yahoo.co.in','311083','admin',to_date('07/04/22','DD/MM/RR'),to_date('07/04/22','DD/MM/RR'));
Insert into  users(FIRSTNAME,LASTNAME,EMAIL,PASSWORD,TYPE,CREATED,LAST_MODIFIED) values ('Garden Roots','Garden Roots','GARDENROOTS.SG@GMAIL.COM','GardenRootsFresh123$','admin',to_date('08/04/22','DD/MM/RR'),to_date('08/04/22','DD/MM/RR'));
Insert into  users(FIRSTNAME,LASTNAME,EMAIL,PASSWORD,TYPE,CREATED,LAST_MODIFIED) values ('Mohan ','Reddy','Mohan.reddy02@gmail.com','Jai@9876','admin',to_date('08/04/22','DD/MM/RR'),to_date('08/04/22','DD/MM/RR'));
Insert into  users(FIRSTNAME,LASTNAME,EMAIL,PASSWORD,TYPE,CREATED,LAST_MODIFIED) values ('Mohan','Yadamuri','support@dailycart24x7.com','Jai@9876','admin',to_date('11/04/22','DD/MM/RR'),to_date('11/04/22','DD/MM/RR'));
Insert into  users(FIRSTNAME,LASTNAME,EMAIL,PASSWORD,TYPE,CREATED,LAST_MODIFIED) values ('Venkat','Vona','vona_venkat@yahoo.com','Venkat321','admin',to_date('11/04/22','DD/MM/RR'),to_date('11/04/22','DD/MM/RR'));
Insert into  users(FIRSTNAME,LASTNAME,EMAIL,PASSWORD,TYPE,CREATED,LAST_MODIFIED) values ('Prem Kumar','Kalavakunta ','kalavakunta@gmail.com','Qwer@1234','user',to_date('12/04/22','DD/MM/RR'),to_date('12/04/22','DD/MM/RR'));


commit;


grant select on products to ro;
grant select on orders to ro;
grant select on deliveries to ro;
grant select on stock to ro;
grant select on users to ro;
grant execute on pkg_orders to ro;
grant execute on addProduct to ro;
grant select on orders_seq to ro;

create or replace package pkg_orders is

 TYPE createOrderRec IS RECORD ( ORDERID orders.id%type,
                                 EMAIL orders.email%type,
                                 PRODID orders.prodid%type,
                                 QTY orders.qty%type,
                                 PRICE orders.price%type,
                                 DELMODE deliveries.del_mode%type,
                                 ADDRESS deliveries.address%type,
                                 LOCATION deliveries.location%type,
                                 PAYMODE deliveries.paymode%type);

procedure create_order (   p_in createOrderRec,
                           p_out out varchar2,
                           p_out_rec out createOrderRec
);

end pkg_orders;
/

create or replace package body pkg_orders is

procedure create_order ( p_in in createOrderRec,
                         p_out out varchar2,
                         p_out_rec out createOrderRec
) is
v_proc varchar2(50) := 'create_order';
v_cnt number;
begin

p_out := 'OK';

select count(*)
into v_cnt
from users
where email=trim(p_in.email);



if v_cnt = 0 and (p_in.email != 'Guest') then
p_out := 'User doesn''t exists, Please login to make an Order';
return;
end if;


insert into orders (id,email,prodid,qty,price,total_price)
values(
       p_in.ORDERID,
       p_in.EMAIL,p_in.PRODID,p_in.QTY,p_in.PRICE,p_in.Qty*p_in.PRICE);

insert into deliveries (order_id ,del_mode,address,details,location,paymode)
values(
       p_in.ORDERID,
       p_in.delmode,substr(p_in.address,instr(p_in.address,'|')+1),substr(p_in.address,1,instr(p_in.address,'|')-1) ,p_in.location,p_in.paymode);

delete from deliveries a
where rowid < (select max(rowid) from deliveries b where a.order_id=b.order_id);


-- insert into addresses (email,address1,address2,postalcode)
-- values(p_email,p_address1,p_address2,p_postalcode);

update stock
set ordered=ordered+p_in.qty
where name=(select name from products where id=p_in.prodid);

commit;

exception
when others then
p_out := 'Some error '||SQLERRM;
end create_order;

end pkg_orders;
/

create or replace package PKG_ACCOUNTS is

 TYPE ACCOUNT_REC IS RECORD     ( FIRSTNAME users.FIRSTNAME%type,
                                 LASTNAME users.LASTNAME%type,
                                 EMAIL users.EMAIL%type,
                                 MOBILE users.MOBILE%type,
                                 PASSWORD users.PASSWORD%type);

procedure create_account ( p_in ACCOUNT_REC,
                           p_out out varchar2,
                           p_out_rec out ACCOUNT_REC
);

end PKG_ACCOUNTS;
/

create or replace package body PKG_ACCOUNTS is
procedure create_account ( p_in ACCOUNT_REC,
                           p_out out varchar2,
                           p_out_rec out ACCOUNT_REC
) is
v_proc varchar2(50) := 'create_account';
v_cnt number;
begin

p_out := 'OK';

select count(*)
into v_cnt
from users
where lower(email)=lower(p_in.email);

if v_cnt > 0 then
p_out := 'User already exists';
return;
end if;

insert into users (firstname,lastname,email,mobile,password)
values(p_in.firstname,p_in.lastname,p_in.email,p_in.mobile,p_in.password);

-- insert into addresses (email,address1,address2,postalcode)
-- values(p_email,p_address1,p_address2,p_postalcode);

commit;

exception
when others then
p_out := 'Some error '||SQLCODE;
end create_account;

end PKG_ACCOUNTS;
/


-- drop table orders

create or replace procedure create_order ( p_order_id orders.id%type,
                                           p_email orders.email%type,
                                           p_prodid orders.prodid%type,
                                           p_qty orders.qty%type,
                                           p_price orders.price%type,
                                           p_del_mode deliveries.del_mode%type,
                                           p_address deliveries.address%type,
                                           p_location deliveries.location%type,
                                           p_deliverycharges deliveries.deliverycharges%type,
                                           p_out out varchar2
) is
v_proc varchar2(50) := 'create_order';
v_cnt number;
begin

p_out := 'OK';

select count(*)
into v_cnt
from users
where lower(email)=lower(trim(p_email));

if v_cnt = 0 and p_email != 'Guest' then
p_out := 'User doesn''t exists ';
return;
end if;

insert into orders (id,email,prodid,qty,price,total_price)
values(p_order_id,p_email,p_prodid,p_qty,p_price,p_qty*p_price);

insert into deliveries (order_id ,del_mode,address,details,location,deliverycharges)
values(p_order_id,p_del_mode,substr(p_address,instr(p_address,'|')+1),substr(p_address,1,instr(p_address,'|')-1) ,p_location,p_deliverycharges);

delete from deliveries a
where rowid < (select max(rowid) from deliveries b where a.order_id=b.order_id);


-- insert into addresses (email,address1,address2,postalcode)
-- values(p_email,p_address1,p_address2,p_postalcode);

update stock
set ordered=ordered+p_qty
where name=(select name from products where id=p_prodid);

commit;

exception
when others then
p_out := 'Some error '||SQLERRM;
end create_order;
/



create or replace procedure addProduct  (p_name        products.name%type,
                                         p_units      products.units%type,
                                         p_price      products.price%type,
                                         p_offerprice products.offerprice%type,
                                         p_inStock    products.instock%type,
                                         p_out        out varchar2
) is
v_proc varchar2(50) := 'addProduct';
v_cnt number;
begin

p_out := 'OK';

select count(*)
into v_cnt
from products
where name=p_name;

if v_cnt > 0 then
p_out := 'Product already exists';
return;
end if;

insert into products (name,units,price,offerprice,inStock)
values(p_name,p_units,p_price,p_offerprice,p_inStock);

-- insert into addresses (email,address1,address2,postalcode)
-- values(p_email,p_address1,p_address2,p_postalcode);

commit;

exception
when others then
p_out := 'Some error '||SQLCODE;
end addProduct;
/


with ordersall as (select id order_id,sum(price) Total_Price,sum(qty) quantity,to_char(max(ts + interval '8' hour ),'DD-MON-YY HH24:MI') time,max(status) status from orders group by id order by id desc) select a.order_id,total_price price,decode(del_mode,'delivery',decode(location,'other',6,4)+total_price,total_price) total_price,quantity,time,status,del_mode,location,details,paymode,address from ordersall a,deliveries b where a.order_id=b.order_id;
