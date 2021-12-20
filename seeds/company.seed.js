const mongoose = require('mongoose');
require('dotenv').config();

const Company = require('../models/Company.model');

const companies = [
  {
    name: 'Rhenus Logistics S.A.U',
    email: 'rhenus@rhenus.com',
    password: 'User1234',
    professionalSector: 'Logistics',
    cif:'A08211989',
    address: 'Pasaje Vaciabotas, s/n, 28830 San Fernando de Henares',
    province: 'Madrid',
    companyUrl:'https://www.rhenuslogistics.es/',
    companyDescription:'The Rhenus Group is the benchmark for logistics and transport in Europe. With a turnover in excess of EUR 5.4 billion, our 820 locations worldwide and 33,500 employees we guarantee maximum reliability. We offer solutions across the entire supply chain for a wide range of industries, including multimodal transport, warehousing, customs clearance and innovative value-added services. We have expertise in different areas for managing complex supply chains in order to achieve maximum benefit for our customers',   
    companyLogo:'https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/46/46923075-5c4a-4a95-9903-f917cdff9c5d?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NTk2NTc1OTksImV4cCI6MTczNjc2NzI0NSwicnFzIjoiR0VUXFwvdGVuYW50cy9jN2UyYjljMS04NDgwLTQzYjAtYWQ5ZS0wMDBjMTdhYTJjYmIvZG9tYWlucy83MTgzMDJiNi01MzQzLTQzZDMtYThhMy04MjlkYzNkYTA4OTMvYnVja2V0cy82ZjNhYjFjYy01OTIwLTRmNGUtYjEzMS00NmE0NTg3YTBlMWYvaW1hZ2VzLzQ2LzQ2OTIzMDc1LTVjNGEtNGE5NS05OTAzLWY5MTdjZGZmOWM1ZCIsIm1ldGFkYXRhIjp7InJ1bGUiOnsidmVyc2lvbiI6IjIwMTYtMTAiLCJhY3Rpb25zIjpbXX19fQ.kRk2ZO6mExQ9jEueWg9IkLg-jd4JKwpPBMraDUaumajo8NVzs1WLGW0ouAOt6ldXM1EAYZdWvxz7DUWPHmFm_swkKjVd1G9nZcy1HmKiCLMiz88Bbp1ySjoNc2vVM5g2fvXxjTPFgLR6KO62et7Cmm6H6243ZmkAhgNs_VrFudDR0IcutCLkmEHQjYdEsegugT7WDJ8jyKu1QLG5No5kspuVQaYXnFs_Pi4O3Fj_Cdbw7VJM51cRQc_shI8XwNxeAmY-hIiKzVWgnBM9sTOC0jrH0m4S66pniy3Wq446UKoyLZrg3ZIdfzRN7Ky8BfuhG1CHr-x7SjKSQqMDSWsC-g&AccessKeyId=d724d9a53d95a810',
  },
  {
    name: 'Santander',
    email: 'santander@santander.com',
    password: 'User1234',
    professionalSector: 'Financial Services',
    cif:'A39000013',
    address: 'Ciudad Grupo Santander, Avda de Cantabria s/n, 28660 Boadilla del Monte',
    province: 'Madrid',
    companyUrl:'http://empleo.bancosantander.es',
    companyDescription:'Santander professionals strive every day to help millions of people thrive and achieve their dreams. Any small action has the potential to have a positive impact on the lives of many people. Our corporate culture and values are focused on creating value to help people and companies prosper, our priority of promoting diverse and inclusive teams in which everyone can offer the best of themselves, our commitment to the continuous development of our employees, the opportunity to learn from great professionals who are international leaders in their field, and the strength and stability of an organization that has been in existence for more than 160 years.',
    companyLogo:'https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/18/1878304b-042e-4838-a693-66da6d2303c2?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MjQ1Njg5MDksImV4cCI6MTczNjc2NzI0NSwicnFzIjoiR0VUXFwvdGVuYW50cy9jN2UyYjljMS04NDgwLTQzYjAtYWQ5ZS0wMDBjMTdhYTJjYmIvZG9tYWlucy83MTgzMDJiNi01MzQzLTQzZDMtYThhMy04MjlkYzNkYTA4OTMvYnVja2V0cy82ZjNhYjFjYy01OTIwLTRmNGUtYjEzMS00NmE0NTg3YTBlMWYvaW1hZ2VzLzE4LzE4NzgzMDRiLTA0MmUtNDgzOC1hNjkzLTY2ZGE2ZDIzMDNjMiIsIm1ldGFkYXRhIjp7InJ1bGUiOnsidmVyc2lvbiI6IjIwMTYtMTAiLCJhY3Rpb25zIjpbXX19fQ.O0_VkE-HrOb7adczr44Q-JxGhUV2HpGRG1h5j3EHMOzna6j6rXyhzYqCcg5iuS52CZ8u3r1r1GYnlYX5dBmeMEr_zwCPbkyJwxtlwzQn6OwWks_cbi3ZOle_DyRr01Ld2FQghHniLdBpI24rJQClbJC5HEBQ6eakoNc3IuWzQgxAwFvenhZCXWqpTexHOkZwNMVKll6jjPe3_y6ZoIHKekUwbKeYol5AEQBxSAUudgcHicFMywsGgXIut5UPkQMppQsBrG9kgybPjuP-wXVEQ-LttWAi2Ja_zLkZkRlVzE1Hjm3tHI5VbQULFjMrqz9TV_8zbq8xMgGtwZYhHWsh8A&AccessKeyId=d724d9a53d95a810',
  },
  {
    name: 'Quimi Romar SL',
    email: 'rrhh@quimiromar.com',
    password: '$2b$10$7SfD2bYiP9E72k93nguJbeBc5EGIPDD/lTZzl5HxEbejZ/B3oPnZu',
    professionalSector: 'Chemical Industry',
    cif:'B46660502',
    address: 'Ctra. Moncada a Náquera, Km. 11,2',
    province: 'Valencia',
    companyUrl:'https://quimiromar.com',
    companyDescription:'Founded in 1968, GRUPO ROMAR is a consolidated company with 50 years of experience dedicated to the drugstore and perfumery sector in all its range. During all this time it has evolved and grown hand in hand with great professionals, aware of the need to adapt to each new scenario that arose. Today it is a reference company in the global market, and our products are used daily in more than 70 countries around the world.',
    companyLogo:'https://media-exp1.licdn.com/dms/image/C560BAQEorAM4kTeLvw/company-logo_200_200/0/1519861533417?e=2159024400&v=beta&t=O4hlT_xlUNU3K0basWpoYvAYSjL8YY1n_75hK7R7uVg',
  },
  {
    name: 'Mercadona',
    email: 'mercadona@mercadona.com',
    password: 'User1234',
    professionalSector: 'Commerce',
    cif:'A46103834',
    address: 'Calle Valencia, 5, Tavernes Blanques, 46016',
    province: 'Valencia',
    companyUrl:'http://www.mercadona.es',
    companyDescription:'Mercadona, a family-owned company, is one of the leading physical and online supermarket companies in Spain that aims to take responsibility for prescribing "The Boss" (customer) the best option to meet their needs for food, household cleaning, personal hygiene and pet care. Founded in 1977 by the Cárnicas Roig Group, it currently has 1,639 stores throughout Spain and 20 in Portugal, and a staff of 95,000 people focused on excellence, 1,700 of them from Portugal.',  
    companyLogo:'https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/ae/ae7871ff-1ef7-406c-9feb-ffca2bbbba23?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MDA4NDU3ODIsImV4cCI6MTczNjc2NzI0NSwicnFzIjoiR0VUXFwvdGVuYW50cy9jN2UyYjljMS04NDgwLTQzYjAtYWQ5ZS0wMDBjMTdhYTJjYmIvZG9tYWlucy83MTgzMDJiNi01MzQzLTQzZDMtYThhMy04MjlkYzNkYTA4OTMvYnVja2V0cy82ZjNhYjFjYy01OTIwLTRmNGUtYjEzMS00NmE0NTg3YTBlMWYvaW1hZ2VzL2FlL2FlNzg3MWZmLTFlZjctNDA2Yy05ZmViLWZmY2EyYmJiYmEyMyIsIm1ldGFkYXRhIjp7InJ1bGUiOnsidmVyc2lvbiI6IjIwMTYtMTAiLCJhY3Rpb25zIjpbXX19fQ.L8WE9bUVZBurpHzzarpE-mUCzwxbXA_ng3wgVgHTrOLvzQ6a4isQrmMEDiD0V3E-zodtK5eUq8IngJ1rimBqRl_jdM8pURcy9vA8jPYbsUkRterOzu6Z45jUc7jRgimTsCBj6I_oziyaLXoraRZ9r8jClFRsbXyskKO5F1j4KKWyWxbNuX2XEVs6Cj24cLGNM3WULnH8_n53AHNTZts6_79-KZGsx-IwV5jo4uScjizPOu9V9LdZAfSDJYAmHX_VB4P-gujjWk96G8-p1c_8HZa7DgvbIZcp9SEX4ySUtROnmi7V1Y0G8N-A-VsmnS4sUPEgQzKbhas_gECQAV0ipA&AccessKeyId=d724d9a53d95a810',
  },
  {
    name: 'Prosegur',
    email: 'prosegur@prosegur.com',
    password: 'User1234',
    professionalSector: 'Security',
    cif:'B87222006',
    address: 'C/ Pajaritos 24, 28007, MADRID',
    province: 'Madrid',
    companyUrl:'http://www.prosegur.es',
    companyDescription: 'More than 175,000 employees worldwide.presence in 5 continents.we offer comprehensive security solutions based on innovation, operational excellence and proximity to customers.we promote the inclusion of people with disabilities and multigenerational coexistence, thus betting on the formation of diverse teams, whose differences enrich our company and its professionals.',
    companyLogo:'https://www.gmkfreelogos.com/logos/P/img/Prosegur-2.gif',
  },
  {
    name: 'Toptal',
    email: 'toptal@toptal.com',
    password: '$2b$10$OUjmRQ55UgWekSweI7r4NOW7MvbqHLbbKqsevfUHFUozDFnSMnXzu',
    professionalSector: 'IT',
    cif:'B37462583',
    address: 'C/ Sin Número, 123',
    province: 'Madrid',
    companyUrl:'https://toptal.com',
    companyDescription:'Toptal is an exclusive network of the top freelance software developers, designers, finance experts, product managers, and project managers in the world. Top companies hire Toptal freelancers for their most important projects.',
    companyLogo:'https://i.ytimg.com/vi/0RIgqw_Xycc/maxresdefault.jpg',
  },
  {
    name: 'Grupo Mapfre',
    email: 'mapfre@mapfre.com',
    password: 'User1234',
    professionalSector: 'Insurance',
    cif:'A28141935',
    address: 'Carretera de Pozuelo, 50, 28222 Majadahonda',
    province: 'Madrid',
    companyUrl:'http://www.mapfre.es',
    companyDescription:'At MAPFRE we are committed to business development, which is why we aim to incorporate mediators into our commercial structure by giving them the opportunity to be successful entrepreneurs',
    companyLogo:'https://noticias.mapfre.com/media/2018/10/LOGO-MAPFRE_POS_2536X1270.jpg',
  },
  {
    name: 'Repsol',
    email: 'repsol@repsol.com',
    password: 'User1234',
    professionalSector: 'Oil and energy',
    cif:'A78374725',
    address: 'C/Méndez Álvaro 44, 28045',
    province: 'Madrid',
    companyUrl:'http://www.repsol.com',
    companyDescription:'We are a global energy company with a diverse team of more than 27,000 people. We have a solid growth project driven by our most important asset: people.we develop activities in the Upstream area: we explore and produce hydrocarbons in more than 40 countries and we have an exploration success rate well above the industry average, thanks to the state-of-the-art technology of our operations and the experience of our professionals. In the Downstream area, we have more than five refineries in Spain, one in Peru and a chemical plant in Sines and China, which position us as leaders in integrated refining.',
    companyLogo:'https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/5a/5a1bf6fd-1421-453f-b714-f1766bb76349?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MjQ1ODAzMDEsImV4cCI6MTczNjc2NzI0NSwicnFzIjoiR0VUXFwvdGVuYW50cy9jN2UyYjljMS04NDgwLTQzYjAtYWQ5ZS0wMDBjMTdhYTJjYmIvZG9tYWlucy83MTgzMDJiNi01MzQzLTQzZDMtYThhMy04MjlkYzNkYTA4OTMvYnVja2V0cy82ZjNhYjFjYy01OTIwLTRmNGUtYjEzMS00NmE0NTg3YTBlMWYvaW1hZ2VzLzVhLzVhMWJmNmZkLTE0MjEtNDUzZi1iNzE0LWYxNzY2YmI3NjM0OSIsIm1ldGFkYXRhIjp7InJ1bGUiOnsidmVyc2lvbiI6IjIwMTYtMTAiLCJhY3Rpb25zIjpbXX19fQ.A7vrXG2-vgLfytF41LDr1D9FEiuZut6ZwZByEJ8tkYhRP5YwDdL-rOYkc9YEUse8C3ss7rhBkMK10ETyK5RyZqVr4drowPzaq9hB2Pt0VPdPnQ7lm6y5S1pWCEqo7pGgJggj66sQY8gzDsFxYXrivp2drWfDb41P3QL-dCsvz1j5yKKWzigSaJUloE1qTJeAf2wNJJooTfqqbz-MB3Wo6LGbUQtZYZdTvwVqeYy5bQZDm50hhldlUuNztyUbBGeXDA6SuO85c1bGgV1jRkddQXE1ELPnXK51y7H7FAiddx4hmUsqDNNGdtZamPBldEIPkusOBOlrRnI1xXG_5NF0Ww&AccessKeyId=d724d9a53d95a810',
  },
  {
    name: 'Mercedes Benz',
    email: 'mercedes@mercedes.com',
    password: 'User1234',
    professionalSector: 'Automotive',
    cif:'A79380465',
    address: 'Avenida De Bruselas, 30,  28108, Alcobendas',
    province: 'Madrid',
    companyUrl:'http://www.mercedes-benz.es',
    companyDescription:'Mercedes benz spain promotes a motivating work environment, in permanent innovation, training and professional development, encouraging the full application of advanced teamwork and knowledge management systems.',    
    companyLogo:'https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/14/14d67a5c-28ea-44b5-9c6a-567dbfa66850?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjYzMzU3MzgsImV4cCI6MTY1Nzg3MTczOCwicnFzIjoiR0VUXFwvdGVuYW50cy9jN2UyYjljMS04NDgwLTQzYjAtYWQ5ZS0wMDBjMTdhYTJjYmIvZG9tYWlucy83MTgzMDJiNi01MzQzLTQzZDMtYThhMy04MjlkYzNkYTA4OTMvYnVja2V0cy82ZjNhYjFjYy01OTIwLTRmNGUtYjEzMS00NmE0NTg3YTBlMWYvaW1hZ2VzLzE0LzE0ZDY3YTVjLTI4ZWEtNDRiNS05YzZhLTU2N2RiZmE2Njg1MCIsIm1ldGFkYXRhIjp7InJ1bGUiOnsidmVyc2lvbiI6IjIwMTYtMTAiLCJhY3Rpb25zIjpbXX19fQ.Uw-5RWjLPPikTMXx39vP0MZMfC_8oTofU6SW2FZdYREXU8m6XMgoDaNp_dO-hYiXURb-XumnDUP7d3up7yw-84jZhYsnSkpQc1eT5-bWDQYpvfLXVDOnbmOr2F2-SIb3t1HprJ1xNwh6HJhsqDQwvQG2S54iFab5dprZ72Ouw9SMUm0pQ6ySV4Hx9b00NJ9LpitJuqaJ8SS-sY-i3XijK_qC7EcMVlAWtt8S8QgnvR_zBVX0yK5TAVnTbEnEFRl6q1aZ29f3hVXmzFgHws0FEvj5vvSl5W1OdykjTymSPGVk1GfFqa-eqANjSjeUyJc-iuM0vV4AiQA7_KbYZA_xgA&AccessKeyId=d724d9a53d95a810',
  },
  {
    name: 'Mahou',
    email: 'mahou@mahou.com',
    password: 'User1234',
    professionalSector: 'Food and related product',
    cif:'B87094918',
    address: 'Calle Titan, 15, Madrid, 28045',
    province: 'Madrid',
    companyUrl:'http://www.mahou.es',
    companyDescription:'Mahou San Miguel is a 100% Spanish family-owned company with 130 years of history, leader in the beer sector in our country. We have eleven breweries, four springs and water bottling plants and a team of close to 3,200 professionals. Working at Mahou San Miguel means much more than working in a large company. It means being a member of a community in constant evolution. It means putting people at the center of the strategy. It means that the ultimate goal is to contribute value in a sustainable way.',    
    companyLogo:'https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/5f/5f85d057-14a4-418b-85d0-bcc917f07615?rule=largeDevice155',
  },
  {
    name: 'HP Solutions',
    email: 'hp@hp.com',
    password: 'User1234',
    professionalSector: 'Web development',
    cif:'B87297214',
    address: 'Julia Morros 1, Parque Tecnológico de León, 24009',
    province: ' León',
    companyUrl:'http://www.hpscds.com/',
    companyDescription:'HP SCDS is a technology company specialized in the development of firmware and software for HP large format 2D and 3D printers based in León, Spain. Technology and innovation are part of our daily work. We work in teams specialized in different types of development languages, which open the door to a wide range of possibilities for personal and professional growth. Diverse teams in age, gender and nationality, make the experience of working with us even more enriching. Today we are already 175 people working and creating in a multicultural environment that seeks sustainability through innovation. PEOPLE FIRST. ',    
    companyLogo:'https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/a5/a51e348d-e4f1-4eaf-8eb0-d6e5d3800b5a?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MTgyMzkxNTEsImV4cCI6MTY0OTc3NTE1MSwicnFzIjoiR0VUXFwvdGVuYW50cy9jN2UyYjljMS04NDgwLTQzYjAtYWQ5ZS0wMDBjMTdhYTJjYmIvZG9tYWlucy83MTgzMDJiNi01MzQzLTQzZDMtYThhMy04MjlkYzNkYTA4OTMvYnVja2V0cy82ZjNhYjFjYy01OTIwLTRmNGUtYjEzMS00NmE0NTg3YTBlMWYvaW1hZ2VzL2E1L2E1MWUzNDhkLWU0ZjEtNGVhZi04ZWIwLWQ2ZTVkMzgwMGI1YSIsIm1ldGFkYXRhIjp7InJ1bGUiOnsidmVyc2lvbiI6IjIwMTYtMTAiLCJhY3Rpb25zIjpbXX19fQ.I52FmF9l1he-L6PkHrf6_KpeHeP6C_vZp8tL5YjmWsdgNEjH4lx5z134t1zHZRKNsVwYz_wLL1Yp1MP_T8BRrHi2C0mGhZbZuFA4ul1qGF31u59omxVg8LvgvqSTSDfzAvxRn-PTdCc5ShiUf7TYmWAITDcNwcfD23FTbplTTBBMjA8ZJi4x8dIWmM9wt7rSS4a1bVgOH3LzQsexEH0zulW__Gr1jz2xESlAvEM73LH6R6zf84RIgmpfjOTFlf82NKUJmqPW4sAbcz1w189MxI_I42JqIIwPYYFHc8i7vbyjQPyVbr1sITLcVn1qtl1kgX6Q83rOVo-DpRPuSe6PnQ&AccessKeyId=d724d9a53d95a810',
  },
  {
    name: 'Babel',
    email: 'babel@babel.com',
    password: 'User1234',
    professionalSector: 'Information technology and services',
    cif:'B83603191',
    address: 'C. del Príncipe de Vergara, 108, 8, 28002',
    province: 'Madrid',
    companyUrl:'http://www.babel.es',
    companyDescription:'BABEL is a multinational consulting firm, which provides services related to the organization of companies and business processes; information technologies and telecommunications; and corporate image and communication. It provides its services to large corporations in the Public Administration, Banking, Insurance, Industry and Telecommunications sectors. It has offices in Madrid, Barcelona and Seville (Spain), Casablanca (Morocco), Lisbon (Portugal) and Mexico City. Based on a strong human orientation, BABEL has managed to position itself at the forefront of the major consulting providers.',
    companyLogo:'https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/1c/1cfa122f-53f8-4949-9e96-2df31d8dbd5e?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzEyMDAxNDcsImV4cCI6MTY2MjczNjE0NywicnFzIjoiR0VUXFwvdGVuYW50cy9jN2UyYjljMS04NDgwLTQzYjAtYWQ5ZS0wMDBjMTdhYTJjYmIvZG9tYWlucy83MTgzMDJiNi01MzQzLTQzZDMtYThhMy04MjlkYzNkYTA4OTMvYnVja2V0cy82ZjNhYjFjYy01OTIwLTRmNGUtYjEzMS00NmE0NTg3YTBlMWYvaW1hZ2VzLzFjLzFjZmExMjJmLTUzZjgtNDk0OS05ZTk2LTJkZjMxZDhkYmQ1ZSIsIm1ldGFkYXRhIjp7InJ1bGUiOnsidmVyc2lvbiI6IjIwMTYtMTAiLCJhY3Rpb25zIjpbXX19fQ.BZiXczR5SKtrSG0DI_9gOVkwT-ZlEcbVBf0C4mS1DW5HeUJ0p1fyTs_HchDyINdjKnb9j2j57xIBYGvhWDoFvxztUecJPMx6LLBW64wAxAoMhncl-302-OPfTRMFcl-mSLmJic-s1awk-1B1UgSAKT-swiz89ei4BKf9kEnSvFm_NnLpiKYtHta8iO5_D_MWkSQixjeSZkMVtAirmP9GbjtVdoFojq7uOSivTc7qOlxZrrmuamn1_doWBV_56MaGrm9RJswg-d3nVbhRFiQjHxavUsmqfJW0pBmwdRMyFSOr6i5iSkEKAZrtZ8l3L8--3LhNxAVS5UGwRL0nSGwRZQ&AccessKeyId=d724d9a53d95a810',
  },
];

const MONGODB_URI = process.env.MONGODB_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Mongo');
  } catch (err) {
    console.log('Error connecting to Mongo: ', err);
  }
};
connectToMongo();

const companiesCreate = async () => {
  try {
    await Company.create(companies);
    await mongoose.connection.close();
  } catch (err) {
    console.log('ERROR: ', err);
  }
};
companiesCreate();